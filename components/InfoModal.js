import React from "react";
import { Modal, View, Text, Button, ScrollView } from "react-native";

class InfoModal extends React.Component {
	render() {
		return (
			<Modal visible={this.props.visible} animationType="slide" transparent={false} onRequestClose={()=>{}}>
				<ScrollView>
					<View style={{marginTop: 20, marginLeft: 40, marginRight: 40}}>
						<Text style={{fontSize: 18}}>{this.props.info}</Text>
						<Button onPress={this.props.toggle} title="Close" color="red" />
					</View>
				</ScrollView>
			</Modal>
		);
	}
}

export default InfoModal;