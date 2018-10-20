import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import List from "./screens/List";
import CheckList from "./screens/CheckList";
import NewsList from "./screens/NewsList";
import { createStackNavigator, createBottomTabNavigator  } from "react-navigation";
import store from "./store";
import { Provider } from "react-redux"; 
import Single from "./screens/Single";
import Graph from "./screens/Graph";


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

const HomeStack = createStackNavigator({
  Home: {
    screen: List
  },
  Single: {
    screen: Single,
    navigationOptions: ({navigation}) => {
      title: `${navigation.state.params.title}`
    }
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
  CheckList: {
    screen: CheckListStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/check.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } },
  Graph: {
    screen: GraphStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/graph.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } },
  Home: { screen: HomeStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/list.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } },
  News: { screen: NewsStack,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Image source={require("./assets/newspaper.png")} style={[styles.icon, {tintColor: tintColor}]} />
    } }
});

class App extends React.Component {
  render() {
    return <Provider store={store}><Tab/></Provider>;
  }
} 

export default App;