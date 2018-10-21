import React from "react";
import { Modal, View, Text, Button, TextInput } from "react-native";

class TodoModal extends React.Component {
	state = {
		text: ""
	}
	submit() {
		this.props.submit(this.state);
		this.props.toggle();
		this.setState({text: ""})
	}
	render() {
		return (
			<Modal visible={this.props.visible} animationType="slide" transparent={false} onRequestClose={()=>{}}>
				<View style={{marginTop: 20, marginLeft: 40, marginRight: 40}}>
					<Text style={{fontSize: 22, textAlign: "center"}}> Add a todo: </Text>
					<Text style={{fontSize: 16, color: "#333"}}>You can add todo and check it in extreme situation.</Text>
					<View style={{display: "flex", flexDirection: "row"}}>
						<TextInput
				        style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 1}}
				        onChangeText={(text) => this.setState({text})} 
				        value={this.state.text}
				      />
					</View>
					<View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 20}}>
						<Button title="Add" onPress={this.submit.bind(this)} color="yellowgreen" />
						<Button title="Cancel" onPress={e => this.props.toggle()} color="red" />
					</View>
				</View>
			</Modal>
		);
	}
}

export default TodoModal;