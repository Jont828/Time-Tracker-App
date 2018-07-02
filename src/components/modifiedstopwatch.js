import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, ListView } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';

import { labelList, LabelPicker, TimeFormatter } from './index.js';
import IOSPicker from 'react-native-ios-picker';

export default class ModifiedStopwatch extends Component {

	constructor(props) {
		super(props);

		// var ds = new ListView.DataSource({
		// 	rowHasChanged: (row1, row2) => row1 !== row2,
		// });

		this.state = {
			isRunning: false,
			mainTimer: null,
			lapTimer: null,
			mainTimerStart: null,
			lapTimerStart: null,
			selectedLabel: null,
		}
	}


	render() {
		// console.log("In stopwatch!", this.props.myText);
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					{this._renderTimers()}
				</View>
				<View style={styles.bottom}>
					{this._renderButtons()}
					<LabelPicker
						{...this.props}
						title={this.state.isRunning ? ('Selected: ' + this.state.selectedLabel) : 'Select a label:'}
						style={styles.picker}
					/>
					{/* <IOSPicker
					  data={internalList}
					  onValueChange={(d, i)=> { this.change(d, i);  }}/> */}

					{/* {this._renderLaps()} */}
				</View>
			</View>
		);
	}

	_renderTimers() {
		return (
			<View style={styles.timerWrapper}>
				<View style={styles.timerWrapperInner}>
					<Text style={styles.mainTimer}>{TimeFormatter(this.state.mainTimer)}</Text>
					{/* <TimeFormatter milliseconds={this.state.mainTimer + 3599000} style={styles.mainTimer} /> */}
				</View>
			</View>
		);
	}

	_renderButtons() {
		return(
			<View style={styles.buttonWrapper}>
				{/* <TouchableHighlight underlayColor='#777' onPress={this.handleLapReset.bind(this)} style={styles.button}>
					<Text>{ (this.state.mainTimerStart && !this.state.isRunning) ? 'Reset' : 'Lap'}</Text>
				</TouchableHighlight> */}
				<TouchableHighlight underlayColor='#ddd' onPress={this.handleStartStop.bind(this)} style={styles.button}>
					<Text style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>{this.state.isRunning ? 'Stop' : 'Start'}</Text>
				</TouchableHighlight>

			</View>
		);
	}

	handleStartStop() {

		let { isRunning, firstTime, mainTimer, lapTimer } = this.state;

		if(!isRunning) { // Start button clicked
			this.setState({
				mainTimerStart: new Date(),
				lapTimerStart: new Date(),
				isRunning: true,
				selectedLabel: this.props.labels[this.props.selectedLabelIndex],
			});
			console.log(new Date());
		} else { // Stop button clicked
			clearInterval(this.interval);
			this.setState({
				isRunning: false,
				mainTimerStart: null,
				mainTimer: 0
			});

			let mainTimer = this.state.mainTimer;
			this.props.recordTimesWithLabels(this.state.selectedLabel, mainTimer);

			return;
		}

		// Case 2: start button clicked



		this.interval = setInterval(() => {
			this.setState({
				mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
				lapTimer: new Date() - this.state.lapTimerStart + lapTimer,
			});
		}, 30);
	}

	handleLapReset() {
		let {isRunning, mainTimerStart, laps} = this.state;

		// var list = [];
		// Case 1: reset button clicked
		if(mainTimerStart && !isRunning) {

			this.setState({
				mainTimerStart: null,
				// lapTimerStart: null,
				mainTimer: 0,
				// lapTimer: 0,
			});

		}

		// var lapTime = this.state.lapTimer;
		// // Case 2: lap button clicked
		// if(mainTimerStart && isRunning) {
		// 	list = [{ name: (this.state.label) , value: TimeFormatter(lapTime) }];
		// 	list = list.concat(this.state.lapList);
		//
		// 	this.setState({
		// 		lapTimerStart: new Date(),
		// 		lapTimer: 0
		// 	});
		// }
		//
		// this.setState({
		// 	lapList: list,
		// 	dataSource: this.state.dataSource.cloneWithRows(list)
		// });

	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		borderBottomWidth: 0.5,
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: '#F9F9F9'
	},
	title: {
		alignSelf: 'center',
		fontWeight: '600',
	},
	timerWrapper: {
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		flex: 1
	},
	top: {
		flex: 1,
	},
	bottom: {
		flex: 3,
		backgroundColor: '#F0EFF5'
	},

	mainTimer: {
		fontSize: 80,
		fontWeight: '100',
		// borderWidth: 0.5,
		alignSelf: 'flex-end',
		fontFamily: 'Helvetica Neue'
		// fontFamily: 'Menlo'
	},
	lapTimer: {
		fontSize: 25,
		fontWeight: '100',
		// borderWidth: 0.5,
		alignSelf: 'flex-end',
		fontFamily: 'Helvetica Neue'
		// fontFamily: 'Proxima Nova'
	},
	timerWrapperInner: {
		// borderWidth: 0.5,
		alignSelf: 'center',
	},
	picker: {
		// flex: 2
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: '5%',
		paddingBottom: 30,
	},
	button: {
		height: 80,
		width: 80,
		borderRadius: 40,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center'
	},

	lapRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 40,
		paddingTop: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#ddd'
	},
	lapNumber: {
		fontSize: 16,
		color: '#777',
	},
	lapTime: {
		color: '#000',
		fontSize: 20,
		fontWeight: '300',
	},

	startBtn: {
		color: '#00cc00'
	},
	stopBtn: {
		color: 'red'
	},

	lapsWrapper: {
		flex: 1,
	}
});
