import React from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import TodoModal from "./../components/TodoModal";

const styles = {
	icon: {
		width: 26,
		height: 26
	},
	wrapper: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 15,
		paddingRight: 15
	}
}

class CheckList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isTodoModal: false,
			isSOSModal: false
		};
	}
	toggleTodoModal() {
		this.setState(state => ({...state, isTodoModal: true}))
	}
	addTodo(text) {
		console.log(text);
	}
	render() {
		return (
			<View style={styles.wrapper}>
				<ScrollView>
					<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#fff"}}>
						<Button onPress={() => this.toggleTodoModal.call(this)} type="button" color="#f4097f" title="Add +" />
						<Button onPress={() => this.toggleTodoModal.call(this)} type="button" color="red" title="SOS" />
					</View>
				</ScrollView>
				<TodoModal visible={this.state.isTodoModal} toggle={this.toggleTodoModal.bind(this)} submit={this.addTodo.bind(this)} />
			</View>
		);
	}
}

CheckList.navigationOptions = {
	title: "Check", 
	headerTitle: "Check list",
	headerStyle: {
		backgroundColor: "#f4097f"
	},
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
	tabBarIcon: ({tintColor}) => <Image source={require("./../assets/check.png")} style={[styles.icon, {tintColor: tintColor}]} />
}

export default CheckList;