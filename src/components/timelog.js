import React, { Component } from 'react';
import { Text, View, Stylesheet } from 'react-native';

export default class TimeLog extends Component {

	render() {
		console.log("in TimeLog");
		return (
			<View>
				{this.props.listOfTimesWithLabels.map((item, index) => {
			        return (<Text key={index}>{item.label} - {item.time}</Text>) //if you have a bunch of keys value pair
			    })}
			</View>
		);
	}

}
