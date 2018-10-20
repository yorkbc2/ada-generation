import React from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

export const styles = StyleSheet.create({
	icon: {
		width: 26,
		height: 26
	},
	row: {
		backgroundColor: "#ffffff",
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#e7e7e7",
		borderStyle: "solid",
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 10,
		paddingRight: 10
	},
	listImage: {
		width: 96,
		height: 82
	},
	listImageContainer: { flex: 1 },
	listContentContainer: { flex: 2 },
	listHeader: {
		fontSize: 24
	},
	listDescription: {
		fontSize: 18
	}
})

class List extends React.Component {
	direct(data) {
		this.props.navigation.navigate('Single', data)
	}
	render() { 
		return (
			<ScrollView>
				{this.props.info.data.map((action, index) => {
					return (
						<TouchableOpacity key={index} onPress={e => this.direct.call(this, 
						{
							title: action.title,
							image: action.thumbnail,
							content: action.description
						})}>
						<View style={styles.row} key={index}>
						<View style={styles.listImageContainer}>
							<Image source={action.thumbnail} style={styles.listImage} />	
						</View>
						<View style={styles.listContentContainer}>
							<Text style={styles.listHeader}>{action.title}</Text>
							<Text style={styles.listDescription}>{action.shortDescription}</Text>
						</View>
					</View></TouchableOpacity>)
				})}
			</ScrollView>
		);
	}
}

List.navigationOptions = {
	title: "List", 
	headerTitle: "List",
	tabBarIcon: ({tintColor}) => <Image source={require("./../assets/list.png")} style={[styles.icon, {tintColor: tintColor}]} />,
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
)(List);