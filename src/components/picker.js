import React, { Component } from "react";

import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Form, View, Text } from "native-base";
import {Picker} from 'react-native';

import { labelList } from './nativebaseswipeablelist.js';

var internalList = labelList;

export default class PickerWithIcon extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: "key1",
			label: null,
		};
	}

	onValueChange = (value) => {
		this.props.handlePickerSelect(internalList[value]);
		// console.log(label + value);
		this.setState({
			selected: value
		});
	}


	render() {
		var options =["Home","Savings","Car","GirlFriend"];
		return (
			<Container>
					<Form>
						{/* <Picker
							iosHeader="Select your SIM"
							iosIcon={<Icon name="ios-arrow-down-outline" />}
							style={{ width: undefined }}
							selectedValue={this.state.selected}
							// onValueChange={this.onValueChange.bind(this)}
						>
							{labelList.map((item, index) => {
							   return (< Picker.Item label={item} value={index} key={index} />);
							})}
						</Picker> */}
						<Picker
						    mode="dropdown"
						    selectedValue={this.state.selected}
						    onValueChange={this.onValueChange}>

						    {(internalList).map((item, index) => {
						        return (<Picker.Item label={item} value={index} key={index}/>)
						    })}


						</Picker>
					</Form>
			</Container>
		);
	}
}
