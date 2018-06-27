import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Form, View, Text } from "native-base";
import { StyleSheet, Picker } from 'react-native';

export default class LabelPicker extends Component {

	render() {
		return (
			<Container>
				<Text style={styles.title}>{this.props.title}</Text>
				<Form style={styles.form}>
					<View style={styles.pickerWrapper}>
						<Picker
							style={styles.picker}
						    mode="dropdown"
						    selectedValue={this.props.selectedLabelIndex}
						    onValueChange={this.props.handlePickerSelect}>

						    {(this.props.labels).map((item, index) => {
						        return (<Picker.Item label={item} value={index} key={index}/>)
						    })}

						</Picker>
					</View>
				</Form>
			</Container>
		);
	}

}

const styles = StyleSheet.create({
	title: {
		fontFamily: 'Helvetica Neue',
		alignSelf: 'center',
		fontSize: 20,
		marginBottom: 20
	},
	picker: {
		borderColor: '#ccc',
		borderBottomWidth: 1,
		borderTopWidth: 1,
		maxWidth: '50%',
		// alignSelf: 'center'
		marginLeft: '25%',
	},
	// form: {
	// 	alignSelf: 'center',
	// }
	pickerWrapper: {
		// alignItems: 'center'
	},
});
