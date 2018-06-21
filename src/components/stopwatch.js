import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, ListView } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';
import TimeFormatter from 'minutes-seconds-milliseconds';

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
		flex: 2,
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
		color: '#777'
	},
	lapTime: {
		color: '#000',
		fontSize: 20,
		fontWeight: '300'
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

let ds = new ListView.DataSource({
	rowHasChanged: (row1, row2) => row1 !== row2,
});


export default class Stopwatch extends Component {

	constructor(props) {
		super(props);

		// laps = [];
		this.state = {
			lapList: [],
			dataSource: ds.cloneWithRows([]),
			isRunning: false,
			mainTimer: null,
			lapTimer: null,
			mainTimerStart: null,
			lapTimerStart: null,
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.top}>
					{this._renderTimers()}
				</View>
				<View style={styles.bottom}>
					{this._renderButtons()}
					{this._renderLaps()}
				</View>
			</View>
		);
	}

	_renderLaps() {
		return (
			<View style={styles.lapsWrapper}>
				<ListView
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderRow={ (rowData) => (
						<View style={styles.lapRow}>
							<Text style={styles.lapNumber}>{rowData.name}</Text>
							<Text style={styles.lapNumber}>{rowData.value}</Text>
						</View>
					)}
				/>
			</View>
		);
	}

	_renderTimers() {
		return (
			<View style={styles.timerWrapper}>
				<View style={styles.timerWrapperInner}>
					<Text style={styles.lapTimer}>{ TimeFormatter(this.state.lapTimer) }</Text>
					<Text style={styles.mainTimer}>{ TimeFormatter(this.state.mainTimer) }</Text>
				</View>
			</View>
		);
	}

	_renderButtons() {
		return(
			<View style={styles.buttonWrapper}>
				<TouchableHighlight underlayColor='#777' onPress={this.handleLapReset.bind(this)} style={styles.button}>
					<Text>{ (this.state.mainTimerStart && !this.state.isRunning) ? 'Reset' : 'Lap'}</Text>
				</TouchableHighlight>
				<TouchableHighlight underlayColor='#ddd' onPress={this.handleStartStop.bind(this)} style={styles.button}>
					<Text style={[styles.startBtn, this.state.isRunning && styles.stopBtn]}>{this.state.isRunning ? 'Stop' : 'Start'}</Text>
				</TouchableHighlight>

			</View>
		);
	}

	handleStartStop() {
		let { isRunning, firstTime, mainTimer, lapTimer } = this.state;

		// Case 1: stop button clicked
		if(isRunning) {
			clearInterval(this.interval);
			this.setState({
				isRunning: false
			});

			return;
		}

		// Case 2: start button clicked
		this.setState({
			mainTimerStart: new Date(),
			lapTimerStart: new Date(),
			isRunning: true
		});


		this.interval = setInterval(() => {
			this.setState({
				mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
				lapTimer: new Date() - this.state.lapTimerStart + lapTimer,
			});
		}, 30);
	}

	handleLapReset() {
		let {isRunning, mainTimerStart, laps} = this.state;

		var list = [];
		// Case 1: reset button clicked
		if(mainTimerStart && !isRunning) {
			this.setState({
				mainTimerStart: null,
				lapTimerStart: null,
				mainTimer: 0,
				lapTimer: 0,
			});
		}

		var lapTime = this.state.lapTimer;
		// Case 2: lap button clicked
		if(mainTimerStart && isRunning) {
			list = [{ name: 'Lap ' + (this.state.lapList.length + 1), value: TimeFormatter(lapTime) }];
			list = list.concat(this.state.lapList);

			this.setState({
				lapTimerStart: new Date(),
				lapTimer: 0
			});
		}

		this.setState({
			lapList: list,
			dataSource: this.state.dataSource.cloneWithRows(list)
		});

	}


}
