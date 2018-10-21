import React from "react";
import {Button, ScrollView, Text, Picker, View, TouchableHighlight, StyleSheet, Image, ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import {
	fetchNews
} from "./../store/ducks/news";

const styles = {
	card: {
		margin: 15,
		padding: 10,
		backgroundColor: "#fff"
	},
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	button: {
		width: 42,
		height: 42
	},
	buttonImage: {
		width: 42,
		height: 42
	},
	lastYearData: {
		fontSize: 72,
		textAlign: "center",
		fontWeight: "bold"
	},
	lastYearDataDesc: {
		textAlign: "center",
		fontSize: 18,
		margin: 10
	},
	news: {
		backgroundColor: "#fff",
		padding: 10,
		margin: 10
	}
};

class Info extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			fetching: false,
		}
	}

	direct(item, currentCountry, currentYear) {
		console.log(currentCountry, currentYear)
		this.props.navigation.navigate('NewsSingle', {
			title: item.title,
			content: item.content,
			urlToImage: item.image,
			urlToWebsite: item.source,
			year: currentYear,
			country: currentCountry
		});
	}

	render() {
		return (
			<ScrollView>
				<View style={{...styles.card, ...styles.row}}>
					<Picker
						selectedValue={this.props.info.currentCountry}
						style={{height: 50, width: 150, borderWidth: 1, borderColor: "#e7e7e7"}}
						onValueChange={(value, index) => {
							this.props.dispatch({type: "INFO_CHANGE_COUNTRY", payload: value})
							fetchNews(this.props.dispatch, value, this.props.news.currentYear);
						}}>
							{this.props.info.countries.map((c, i) => {
								return (<Picker.Item key={i} label={c} value={c} />)
							})}
					</Picker>
					<Picker
						selectedValue={this.props.info.currentYear}
						style={{height: 50, width: 150, borderWidth: 1, borderColor: "#e7e7e7"}}
						onValueChange={(value, index) => {
							this.props.dispatch({type: "INFO_CHANGE_YEAR", payload: value});
							fetchNews(this.props.dispatch, this.props.news.currentCountry, value);
						}}>
							<Picker.Item label={"2018"} value={"2018"} />
							<Picker.Item label={"2017"} value={"2017"} />
							<Picker.Item label={"2016"} value={"2016"} />
					</Picker>
				</View>
				<View style={styles.card}>
					<Text style={styles.lastYearData}>{this.props.info.lastYearData}</Text>
					<Text style={styles.lastYearDataDesc}>
						Catastrophic problems in {this.props.info.currentYear} year
					</Text>
				</View>
				<View style={{margin: 20}}>
					<Button title="Go to graphs" color="purple" onPress={e => this.props.navigation.navigate('Graph')} />
				</View>
				<View style={styles.card}>
					<Text style={{...styles.lastYearData, color: (this.props.info.middleValue < 40? "green": "red")}}>
						{this.props.info.middleValue}%
					</Text>
					<Text style={styles.lastYearDataDesc}>
						Part of bad things got from total length of bad things. (Year: {this.props.info.currentYear})
					</Text>
				</View>
				<View style={styles.card}>
					<Text style={styles.lastYearDataDesc}>
						<Text style={{color: "red"}}>Notice</Text>: {this.props.info.middleValue >= 50 && this.props.info.middleValue <= 70? 
							(`The situation in ${this.props.info.currentCountry} is not the best. There are disasters in this region, we recommend coming later`):
							(this.props.info.middleValue < 50? (`You can travel safely to ${this.props.info.currentCountry}. According to our information catastrophes are not expected in the near future`): 
								`The situation in ${this.props.info.currentCountry} is worse. In this region there is a high risk of catastrophes, visiting the country is prohibited!`)
						}
						
					</Text>
				</View>
				{this.props.news.fetching === true?(
					<View style={styles.card}><ActivityIndicator color="#f4097f" size="large" /></View>
					): this.props.news.data.map((item, index) => {
						return (
							<TouchableHighlight key={index} onPress={this.direct.bind(this, item, this.props.info.currentCountry, this.props.info.currentYear)}>
								
								<View style={styles.news}>
									<Text>{item.title}</Text>
								</View>
							</TouchableHighlight>
						);
					})}
			</ScrollView>
		);
	}
}

Info.navigationOptions = {
	title: "Info", 
	headerTitle: "Info",
	tabBarIcon: ({tintColor}) => <Image source={require("./../assets/chart.png")} style={[styles.icon, {tintColor: tintColor}]} />,
	headerStyle: {
    backgroundColor: '#f4097f',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

export default connect(
	state => ({info: state.info, news: state.news}),
	null
)(Info);