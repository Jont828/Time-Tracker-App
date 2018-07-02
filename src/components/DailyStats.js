import React, { Component, } from 'react';
import { Text, View, StyleSheet, DatePickerIOS, ScrollView, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Content, Container } from 'native-base';

import { Pie, TimeFormatter } from './index.js';

import moment from 'moment';

export default class DailyStats extends Component {

	constructor(props) {
		super(props);

		this.state = {
			date: moment().format("YYYY-MM-DD"),
		}
	}

	render() {

		let selectedDate = moment(this.state.date).format('YYYY/MM/DD');

		return (
			<View style={styles.wrapper}>
				<DatePicker
				   style={{width: 200}}
				   date={this.state.date}
				   mode="date"
				   placeholder="select date"
				   format="YYYY-MM-DD"
				   confirmBtnText="Okay"
				   cancelBtnText="Cancel"
				   onDateChange={(date) => {this.setState({date: date})}}
				 />

				<Pie {...this.props} date={this.state.date} style={styles.pie}/>

				<ScrollView style={styles.logWrapper}>
					{
						( selectedDate in this.props.data ) ? (
							// <Text>Took the if</Text>
							this.props.data[selectedDate].map( (entry, index) => {
								return (
									<View style={styles.row} key={index}>
										<Text style={styles.label}>{entry.label}</Text>
										<Text style={styles.time}>{TimeFormatter(entry.time, true)}</Text>
									</View>
								)
							})
						) : (
							 <Text>Rip no data here</Text>
						)

					}
				</ScrollView>

			</View>
		);
	}

}

const styles = StyleSheet.create({
	pie: {
		marginTop: 20,
		marginBottom: 20,
	},
	wrapper: {
		flex: 1
	},
	logWrapper: {
		flex: 1,
		// borderColor: 'red',
		// borderWidth: 5,
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
