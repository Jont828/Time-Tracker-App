import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import Moment from 'react-moment';

import { TimeFormatter } from './index.js';

export default class TimeLog extends Component {

	render() {
		console.log("in TimeLog");
		return (
			// <Accordion
			//   sections={SECTIONS}
			//   renderSectionTitle={this._renderSectionTitle}
			//   renderHeader={this._renderHeader}
			//   renderContent={this._renderContent}
			// />
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
							{ TimeLogRowGroup(this.props, key) }
						</View>
					) //if you have a bunch of keys value pair
			    })}
			</View>
		);
	}

}

function TimeLogRowGroup(props, date) {
	return (
		<View>
			{props.listOfTimesWithLabels[date].map( (entry, index) => {

				let colorIndex = props.labels.indexOf(entry.label) % props.colors.length;

				return (
					<View style={styles.row} key={index}>
						<Text style={styles.label}>
							<Icon
								active
								style={{
									color: props.colors[colorIndex],
									fontSize: 16,
								}}
								// type='Octicons'
								// name='primitive-dot'
								type='FontAwesome'
								name='square'
							/>  {entry.label}
						</Text>
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
