import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TimeFormatter } from './index.js';

export default class TimeLog extends Component {

	render() {
		console.log("in TimeLog");
		return (
			<View>
				{this.props.listOfTimesWithLabels.map((item, index) => {
			        return (
						<View style={styles.row} key={index}>
							<Text style={styles.label}>{item.label}</Text>
						 	<Text style={styles.time}>{TimeFormatter(item.time, true)}</Text>
						</View>
					) //if you have a bunch of keys value pair
			    })}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 40,
		paddingTop: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#ddd'
	},
	label: {
		fontSize: 16,
		color: '#777',
		marginLeft: '5%',
	},
	time: {
		color: '#000',
		fontSize: 20,
		fontWeight: '300',
		marginRight: '5%',
		fontFamily: 'Helvetica Neue',
	},
});
