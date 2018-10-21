import React from 'react';
import { StyleSheet, Image, View, Text, Alert } from 'react-native';
import Info from "./screens/Info";
import CheckList from "./screens/CheckList";
import NewsList from "./screens/NewsList";
import { createStackNavigator, createBottomTabNavigator  } from "react-navigation";
import store from "./store";
import { Provider } from "react-redux"; 
import Single from "./screens/Single";
import NewsSingle from "./screens/NewsSingle";
import Graph from "./screens/Graph";
import {
  fetchStart,
  fetchEnd,
  fetchError
} from "./store/ducks/info";
import {
  fetchNews
} from "./store/ducks/news"
import axios from "axios"; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26
  }
});

const CheckListStack = createStackNavigator({
  CheckList: {
    screen: CheckList
  }
});

const GraphStack = createStackNavigator({
  Graph: {
    screen: Graph
  }
});

const InfoStack = createStackNavigator({
  Home: {
    screen: Info
  },
  NewsSingle: {
    screen: NewsSingle
  },
  Graph: {
    screen: Graph
  }
});

const NewsStack = createStackNavigator({  
  News: {
    screen: NewsList
  },
  Single: { 
    screen: Single
  }
})

const Tab = createBottomTabNavigator({
  
  Check: {
    screen: CheckListStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/check.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } },
  Info: { screen: InfoStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/chart.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } },
    
  
    
  Graph: {
    screen: GraphStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/graph.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } },
  News: { screen: NewsStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/newspaper.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } }
});

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visibleWarningMessage: false,
      contentWarningMessage: ""
    }
  }
  componentDidMount() {
    store.dispatch(fetchStart());
    const url = "https://ada-inserter.herokuapp.com/api/info";
    axios.get(url) 
      .then(response => {
        const { status, data } = response.data;
        if (status === true) {
          store.dispatch(fetchEnd(data));
          store.dispatch({type: "FETCHING_START"})
          setTimeout(() => fetchNews(store.dispatch, store.getState().info.currentCountry, store.getState().info.currentYear), 2000);
        }
      });

    const ws = new WebSocket("ws://ada-generation.herokuapp.com/");
    ws.onopen = e => {
      console.log("Working!")
    }
    ws.onmessage = e => {
      if (e.data !== "")
        Alert.alert(
          'Warning',
          e.data,
          [
            {text: "OK"}
          ]
        )
    }
  }
  render() {
    return (<Provider store={store}>
            <Tab/>
        </Provider>);
  }
} 

export default App;