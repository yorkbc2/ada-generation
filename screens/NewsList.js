import React from "react";
import axios from "axios";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "./List";

const url = "https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=d4c48ccd7a07497b9ed6bd4ed875abd5";

// const styles = StyleSheet.create({
// 	icon: {
// 		width: 26,
// 		height: 26
// 	},
// 	itemContainer: {
// 		display: "flex",
// 		flexDirection: "row"
// 	},
// 	itemImage: {
// 		width: 64,
// 		height: 64
// 	}
// 	itemImageContainer
// })
// 


class NewsList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			news: [  ]
		}
	}
	componentDidMount() {
		axios.get(url)
			.then(response => {
				this.setState(state => ({...state, news: response.data.articles}));
			});
	}
	direct(data) {
		this.props.navigation.navigate('Single', data)
	} 
	render() {
		return (
			<ScrollView>
				{this.state.news.map((item, index) => {
					return (
					<TouchableOpacity onPress={this.direct.bind(this, {
						title: item.title,
						content: item.content,
						image: item.urlToImage
					})}  key={index}>
					<View style={styles.row}>
						{item.urlToImage !== "" ? 
						(<View style={styles.listImageContainer}>
							<Image source={{uri: item.urlToImage}} style={styles.listImage} />
						</View>): null}
						<View style={styles.listContentContainer}>
							<Text style={styles.listHeader}>{item.title}</Text>
						</View>
					</View>
					</TouchableOpacity>);
				})}
			</ScrollView>
		)
	}
}

NewsList.navigationOptions = {
	title: "News", 
	headerTitle: "News",
	tabBarIcon: ({tintColor}) => <Image source={require("./../assets/newspaper.png")} style={[styles.icon, {tintColor: tintColor}]} />
}

export default NewsList;