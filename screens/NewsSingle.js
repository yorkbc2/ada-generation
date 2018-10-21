import React from "react";
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from "react-native";

const styles = {
	card: {
		margin: 15,
		padding: 10,
		backgroundColor: "#fff"
	},
	topHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"	
	},
	topHeaderText: {
		fontSize: 16,
		color: "#777",
		flex: 1
	},
	header: {
		fontSize: 32,
		marginTop: 10,
		marginBottom: 10
	},
	content: {
		fontSize: 18,
		marginTop: 10,
		marginBottom: 10
	},
	image: {
		width: 300,
		height: 150
	},
	link: {
		color: "royalblue"
	}
}

// Props
// title, content, image, urlToWebsite, urlToImage, country, year

class NewsSingle extends React.Component {
	open(url) {
		Linking.canOpenURL(url).then(supported => {
	    if (supported) {
	      Linking.openURL(url);
	    } else {
	      console.log("Don't know how to open URI: " + url);
	    }
	  });
	}
	render() {
		const {title, content, urlToImage, urlToWebsite, country, year} = this.props.navigation.state.params;
		return (
			<ScrollView>
				<View style={{...styles.topHeader, ...styles.card}}>
					<Text style={styles.topHeaderText}>{country}</Text>
					<Text style={{...styles.topHeaderText, textAlign: "right"}}>{year}</Text>
				</View>
				<View style={styles.card}>
					<Text style={styles.header}>{title}</Text>
					<Image source={{uri: urlToImage}} style={styles.image} />
					<Text style={styles.content}>{content}</Text>
					<TouchableOpacity onPress={e => this.open(urlToWebsite)}>
						<Text style={styles.link}>Source: {urlToWebsite}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

export default NewsSingle;