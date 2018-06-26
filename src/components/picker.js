import React, { Component } from "react";

import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Form, View, Text } from "native-base";
import {Picker} from 'react-native';

export default class PickerWithIcon extends Component {

	render() {
		return (
			<Container>
					<Form>
						<Picker
						    mode="dropdown"
						    selectedValue={this.props.selectedLabelIndex}
						    onValueChange={this.props.handlePickerSelect}>

						    {(this.props.labels).map((item, index) => {
						        return (<Picker.Item label={item} value={index} key={index}/>)
						    })}

						</Picker>
					</Form>
			</Container>
		);
	}
}
