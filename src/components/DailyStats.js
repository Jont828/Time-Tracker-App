import React, { Component, } from 'react';
import { Text, View, StyleSheet, DatePickerIOS, ScrollView, } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Content, Container, Icon } from 'native-base';

import { Pie, TimeFormatter } from './index.js';

import moment from 'moment';

export default class DailyStats extends Component {

	constructor(props) {
		super(props);

		// this.state = {
		// 	selectedDate: this.props.selectedDate
		// }

	}

	render() {

		// let this.props.selectedDate = moment(this.props.this.props.selectedDate).format('YYYY-MM-DD');
		console.log(this.props.selectedDate);
		console.log(this.props.handleSelectDate === undefined);

		return (
			<View style={styles.wrapper}>
				<DatePicker
				   style={styles.datePicker}
				   date={this.props.selectedDate}
				   mode="date"
				   placeholder="Select a date"
				   format="YYYY-MM-DD"
				   maxDate={moment().format("YYYY-MM-DD")}
				   confirmBtnText="Okay"
				   cancelBtnText="Cancel"
				   onDateChange={this.props.handleSelectDate}
				   // onDateChange={(date) => {this.setState({date: date})}}
				 />

				<Pie {...this.props} date={this.props.selectedDate} style={styles.pie} />

				<ScrollView style={styles.logWrapper}>
					{
						( this.props.selectedDate in this.props.data ) ? (

							this.props.data[this.props.selectedDate].map( (entry, index) => {

								let colorIndex = this.props.labels.indexOf(entry.label);

								return (
									<View style={styles.row} key={index}>
										<Text style={styles.label}>
											<Icon
												active
												style={[
													{ color: this.props.colors[colorIndex] },
													styles.listIcon,
												]}
												// type='Octicons'
												// name='primitive-dot'
												type='FontAwesome'
												name='square'
											/>  {entry.label}
										</Text>
										<Text style={styles.time}>{TimeFormatter(entry.time, true)}</Text>
									</View>
								)
							})
						) : (
							 <Text>Rip no data for {this.props.selectedDate}</Text>
						)

					}
				</ScrollView>

			</View>
		);
	}

}

const styles = StyleSheet.create({
	pie: {
		marginTop: 10,
		marginBottom: 10,
	},
	listIcon: {
		fontSize: 16,
		marginRight: 20,
	},
	datePicker: {
		width: 200,
		marginTop: 10,
		alignSelf: 'center',
		marginBottom: 10,
	},
	wrapper: {
		flex: 1,
		// alignItems: 'center',
		// backgroundColor: '#dddddd',
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
