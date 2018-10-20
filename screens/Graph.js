import React from "react";
import {ScrollView, ActivityIndicator, View, StyleSheet, Text, Picker} from "react-native";
import { connect } from "react-redux";
import {
  fetchStart,
  fetchEnd,
  fetchError
} from "./../store/ducks/info";
import axios from "axios"; 
import { Grid, XAxis, YAxis, LineChart, Path } from "react-native-svg-charts";
import * as shape from "d3-shape";



class Graph extends React.Component {
	componentDidMount() {
		this.props.dispatch(fetchStart());
    const url = "https://ada-inserter.herokuapp.com/api/info";
    axios.get(url) 
      .then(response => {
        const { status, data } = response.data;
        if (status === true) {
          this.props.dispatch(fetchEnd(data));
        }
      });
	}
	render() {
		const verticalContentInset = {top: 10, bottom: 10};
		const yaxisStyle = { marginBottom: 30 };
		const axesSvg = { fontSize: 10, fill: 'grey' };
		const Shadow = ({ line }) => (
      <Path
          key={'shadow'}
          y={2}
          d={line}
          fill={'none'}
          strokeWidth={4}
          stroke={'rgba(134, 65, 244, 0.2)'}
      />
  	)
		return (
			<ScrollView style={styles.wrapper}>
				{this.props.info.fetching === true || typeof this.props.info.graphData.Japan === 'undefined'? 
					(<ActivityIndicator size={"large"} color={"#f4097f"} />)
					:
					(<View>
						<Picker
							selectedValue={this.props.info.currentCountry}
							style={{height: 50, width: 320, borderWidth: 1, borderColor: "#e7e7e7"}}
							onValueChange={(value, index) => this.props.dispatch({type: "INFO_CHANGE_COUNTRY", payload: value})}>
								{this.props.info.countries.map((c, i) => {
									return (<Picker.Item key={i} label={c} value={c} />)
								})}
						</Picker>
						{Object.keys(this.props.info.graphData[this.props.info.currentCountry]).map(type => {
							return Object.keys(this.props.info.graphData[this.props.info.currentCountry][type]).map((subtype, index) => {
									return (<View style={{ height: 300, padding: 10, flexDirection: 'row', position: 'relative' }} key={index}>
											<YAxis
						              data={this.props.info.yAxis}
						              style={{ marginBottom: 30 }}
						              contentInset={{ top: 10, bottom: 10 }}
						              svg={{ fontSize: 10, fill: 'grey' }}
					         			/>		
					         			<View style={{ flex: 1, marginLeft: 10 }}>
					         				<LineChart
						         				style={{ flex: 1 }}
					                  data={this.props.info.graphData[this.props.info.currentCountry][type][subtype]['data']}
					                  contentInset={verticalContentInset}
					                  svg={{ stroke: this.props.info.graphData[this.props.info.currentCountry][type][subtype]['color'] }}
						         			>		
						         				<Grid/>	
						         				<Shadow/>
						         			</LineChart>
					         				<XAxis
				                      style={{ marginHorizontal: -10, height: 30 }}
				                      data={this.props.info.graphData[this.props.info.currentCountry][type][subtype]['data']}
				                      formatLabel={(value, index) => this.props.info.xAxis[index]}
				                      contentInset={{ left: 10, right: 10 }}
				                      svg={{ fontSize: 10, fill: 'grey' }}
				                  	/>
					         			</View>
				         		</View> )
							})
						})}
					</View>)
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		paddingTop: 20
	}
})

Graph.navigationOptions = {
	title: "Graph", 
	headerTitle: "Graph",
	headerStyle: {
    backgroundColor: '#f4097f',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}


export default connect(
	state => ({info: state.info})
)(Graph);