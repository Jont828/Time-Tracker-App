import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Moment from 'react-moment';

import { TimeFormatter } from './index.js';

export default class TimeLog extends Component {

	render() {
		console.log("in TimeLog");
		return (
			<View>
				{Object.keys(this.props.listOfTimesWithLabels).sort().reverse().map( (key, index) => {
					return (
						<View key={key}>
							{console.log(key)}
							<Moment
								element={Text}
								style={styles.date}
								parse="YYYY-MM-DD"
								format="MM-DD-YYYY"
							>
								{key}
							</Moment>
							{TimeLogRowGroup(this.props.listOfTimesWithLabels[key])}
						</View>
					) //if you have a bunch of keys value pair
			    })}
			</View>
		);
	}

}

function TimeLogRowGroup(timeArray) {

	return (
		<View>
			{timeArray.map( (entry, index) => {
				return (
					<View style={styles.row} key={index}>
						<Text style={styles.label}>{entry.label}</Text>
						<Text style={styles.time}>{TimeFormatter(entry.time, true)}</Text>
					</View>
				)
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	date: {
		color: '#000',
		fontSize: 20,
		fontWeight: '300',
		marginTop: 10,
		marginLeft: '5%',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
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
