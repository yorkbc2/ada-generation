import React from "react";
import {ScrollView, Text, View, Image} from "react-native";

const styles = {
	title: {
		fontSize: 36,
		fontWeight: "bold"
	},
	content: {
		fontSize: 18
	},
	image: {
		width: 280
	},
	center: {
	},
	wrapper: {
		paddingLeft: 10,
		paddingRight: 10
	}
}

class Single extends React.Component {
	render() {
		const {title, content, image} = this.props.navigation.state.params;
		return (<ScrollView style={styles.wrapper}>
			<View style={styles.center}>
				{typeof image === "string"? (<Image source={{uri: image}} style={styles.image} />):
				(<Image source={image} style={styles.image} />)}
			</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.content}>{content}</Text>
			
		</ScrollView>)
	}
}

export default Single;