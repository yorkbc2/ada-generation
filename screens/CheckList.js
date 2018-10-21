import React from "react";
import { Text, View, StyleSheet, ScrollView, Button, Picker, TouchableOpacity, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import TodoModal from "./../components/TodoModal";
import InfoModal from "./../components/InfoModal";
import { connect } from "react-redux";

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
	},
	button: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: "#f4097f"
	}
}

class CheckList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isTodoModal: false,
			isInfoModal: false
		};
	}
	toggleTodoModal() {
		this.setState(state => ({...state, isTodoModal: !state.isTodoModal}))
	}
	toggleInfoModal() {
		this.setState(state => ({...state, isInfoModal: !state.isInfoModal}))
	}
	addTodo(data) {
		this.toggleTodoModal();
		this.props.addTodo(data.text);
	}
	changeCategory(value) {
		this.props.changeCategory(value);
	}
	render() {
		return (
			<View style={styles.wrapper}>
				<ScrollView>
					<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10, marginBottom: 10, backgroundColor: "#fff"}}>
						<TouchableOpacity onPress={() => this.toggleTodoModal.call(this)} style={styles.button}>
							<Text style={{color: "#fff", fontSize: 18}}>Add +</Text>
						</TouchableOpacity>
						<Picker selectedValue={this.props.todos.currentCategory}
										style={{width: 130}}
										onValueChange={(value, index) => this.changeCategory.call(this, value)}>
							{Object.values(this.props.todos.data).map((i, index) => {
								return <Picker.Item  key={index} value={i.key.toLowerCase()} label={i.key.toUpperCase()} />
							})}
						</Picker>
						<TouchableOpacity onPress={this.toggleInfoModal.bind(this)}>
							<Image source={require("./../assets/question.png")} style={{width: 48, height: 48}} />
						</TouchableOpacity>
					</View>
					{this.props.todos.data[this.props.todos.currentCategory].todos.map((i, index) => {
						return (
						<View key={index} style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", padding: 3, marginBottom: 10, backgroundColor: "#fff"}}>
							<CheckBox
							  checked={i.completed}
							  onPress={() => this.props.toggleTodo(index)}
							/>
							<Text style={{paddingTop: 15, fontSize: 18}}>{i.text}</Text>
						</View>);
					})}
					<InfoModal visible={this.state.isInfoModal} info={this.props.todos.data[this.props.todos.currentCategory].info} toggle={this.toggleInfoModal.bind(this)} />
				</ScrollView>
				<TodoModal visible={this.state.isTodoModal} category={this.props.todos.currentCategory} toggle={this.toggleTodoModal.bind(this)} submit={this.addTodo.bind(this)} />
				
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

export default connect(
	state => ({todos: state.todos}),
	dispatch => ({
		addTodo: value => dispatch({type: "ADD_CHECK", payload: value}),
		changeCategory: val => dispatch({type: "TODO_CHANGE_CATEGORY", payload: val}),
		toggleTodo: index => dispatch({type: "TOGGLE_TODO", payload: index})
	})
)(CheckList);