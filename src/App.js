import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';

import { Timer, Stats, Labels, More, License } from './screens/index.js';

const TabNavFooter = createSwitchNavigator(
	{
		TimerScreen: { screen: Timer },
		StatsScreen: { screen: Stats },
		LabelsScreen: { screen: Labels },
		// MoreScreen: { screen: More },
		MoreStack: createStackNavigator({
			MoreScreen: { screen: More },
			LicenseScreen: { screen: License },
		}, { initialRouteName: 'MoreScreen' })
	},
	{
		initialRouteName: 'TimerScreen',
	},
);

function createComponent(instance, props) {
	return () => React.createElement(instance, props);
}

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.initialLabels = [
			'Lecture',
			'Homework',
			'Commuting',
			'Eating',
			'Internet',
			'Gym',
		];


		// initialLabels = (storedLabels !== null) ? storedLabels : initialLabels;

		let colorList = [
			"#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
			"#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
		];

		// let initialTimes = [
		// 	{
		// 		date: '1999/08/28',
		// 		times: [
		// 			{label: initialLabels[0], time: 3599000},
		// 			{label: initialLabels[1], time: 59000},
		// 			{label: initialLabels[2], time: 1000000},
		// 			{label: initialLabels[3], time: 860000},
		// 			{label: initialLabels[4], time: 10000000},
		// 		],
		// 	}
		// ];

		let initialTimes = {};
		// initialTimes['1999-08-28'] = [
		// 	{label: initialLabels[0], time: 3599000},
		// 	{label: initialLabels[1], time: 59000},
		// 	{label: initialLabels[2], time: 1000000},
		// 	{label: initialLabels[3], time: 860000},
		// 	{label: initialLabels[4], time: 10000000},
		// ];
		// initialTimes['2018-07-05'] = [
		// 	{label: initialLabels[4], time: 20000000},
		// 	{label: initialLabels[0], time: 3599000},
		// 	{label: initialLabels[1], time: 59000},
		// 	{label: initialLabels[2], time: 1000000},
		// 	{label: initialLabels[3], time: 860000},
		// 	{label: initialLabels[4], time: 10000000},
		// ];
		//
		let initialTotals = {};
		// initialTotals['2018-07-05'] = {};
		// let entry = initialTotals['2018-07-05'];
		// entry[initialLabels[0]] = 3599000;
		// entry[initialLabels[1]] = 59000;
		// entry[initialLabels[2]] = 1000000;
		// entry[initialLabels[3]] = 860000;
		// entry[initialLabels[4]] = 30000000;



		this.state = {
			labels: this.initialLabels,
			colors: colorList,
			selectedLabelIndex: (this.initialLabels.length / 2),
			listOfTimesWithLabels: initialTimes,
			totalTimesForEachLabel: initialTotals,
			selectedDate: moment().format("YYYY-MM-DD"),
		}

		this.handleAddLabel = this.handleAddLabel.bind(this);
		this.handleRenameLabel = this.handleRenameLabel.bind(this);
		this.handleDeleteLabel = this.handleDeleteLabel.bind(this);

		this.handlePickerSelect = this.handlePickerSelect.bind(this);

		this.recordTimesWithLabels = this.recordTimesWithLabels.bind(this);

		this.handleSelectDate = this.handleSelectDate.bind(this);

		this.handleReset = this.handleReset.bind(this);
	}

	componentDidMount() {
		this.loadFromAsync('labels').then(
			result => {
				if(typeof result !== 'undefined' && result !== null) {
					console.log("Got", result);
					this.setState({
						labels: result,
					})
				}
			}
		).catch(_ => {console.log("Failed to load from AsyncStorage")});
		this.loadFromAsync('time-log').then(
			result => {
				if(typeof result !== 'undefined' && result !== null) {
					console.log("Got", result);
					this.setState({
						listOfTimesWithLabels: result,
					})
				}
			}
		).catch(_ => {console.log("Failed to load from AsyncStorage")});
		this.loadFromAsync('time-summary').then(
			result => {
				if(typeof result !== 'undefined' && result !== null) {
					console.log("Got", result);
					this.setState({
						totalTimesForEachLabel: result,
					})
				}
			}
		).catch(_ => {console.log("Failed to load from AsyncStorage")});
	}

	//////////////////////////////////////
	// Functions to handle AsyncStorage //
	//////////////////////////////////////

	storeToAsync = async (key, value) => {
		try {
			await AsyncStorage.setItem(key, JSON.stringify(value));
			console.log("Stored to key:", key);
		} catch (error) {
			console.log("error syncing to async");
		}
	}

	loadFromAsync = async (key) => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				// We have data!!
				console.log("Retrieved:", value);
				console.log("Parsed into:", JSON.parse(value));
				return JSON.parse(value);
			}
		} catch (error) {
			// Error retrieving data
			console.log("Couldn't find anything for ", key);
			return null;
		}
	}

	//////////////////////////////////////
	// Functions to handle AsyncStorage //
	//////////////////////////////////////

	////////////////////////////////////////
	// Functions to handle the label list //
	////////////////////////////////////////

	handleAddLabel(label) {
		console.log("Handling add label");
		let labels = this.state.labels;
		labels.push(label);
		this.setState({
			labels: labels,
		});
		this.storeToAsync('labels', labels);
	}

	handleRenameLabel(newLabel, indexToReplace) {
		console.log("Handling rename label", indexToReplace);
		let list = this.state.labels;
		list.splice(indexToReplace, 1, newLabel);
		this.setState({
			labels: list
		});
		this.storeToAsync('labels', list);
	}

	handleDeleteLabel(indexToDelete) {
		console.log("Handling delete label");
		let list = this.state.labels;
		console.log("Deleting index", indexToDelete);
		console.log("Length is", list.length);
		list.splice(indexToDelete, 1);
		this.setState({
			labels: list
		});
		this.storeToAsync('labels', list);
	}

	////////////////////////////////////////
	// Functions to handle the label list //
	////////////////////////////////////////

	////////////////////////////////////
	// Functions to handle the picker //
	////////////////////////////////////

	handlePickerSelect(index) {
		console.log("Handling picker select");
		this.setState({
			selectedLabelIndex: index,
		})
	}

	////////////////////////////////////
	// Functions to handle the picker //
	////////////////////////////////////

	///////////////////////////////////////
	// Functions to handle the stopwatch //
	///////////////////////////////////////

	// Calc totals for a given day

	recordTimesWithLabels(label, time) {
		console.log("Handling times with labels");
		let date = moment().format('YYYY-MM-DD');
		let todaysList = [ {label: label, time: time}, ];

		let totalList = this.state.listOfTimesWithLabels;

		if(date in this.state.listOfTimesWithLabels) {
			todaysList = todaysList.concat(this.state.listOfTimesWithLabels[date]);

		} else {
			console.log("Took else");
			// let obj = {
			// 	date: date,
			// 	times: todaysList,
			// };
			// totalList.unshift(obj); // Put obj at the beginning of the array
		}
		totalList[date] = todaysList;



		let dailyTotalsList = this.state.totalTimesForEachLabel;
		if(!(date in dailyTotalsList)) {
			dailyTotalsList[date] = {};
		}
		let todaysTotals = dailyTotalsList[date];

		if(!(label in todaysTotals)) {
			todaysTotals[label] = 0;
		}
		todaysTotals[label] += time;
		dailyTotalsList[date] = todaysTotals;



		console.log(totalList);
		this.setState({
			listOfTimesWithLabels: totalList,
			totalTimesForEachLabel: dailyTotalsList,
		});
		this.storeToAsync('time-log', totalList);
		this.storeToAsync('time-summary', dailyTotalsList);
		console.log(label, time);
		// console.log(list);
	}

	///////////////////////////////////////
	// Functions to handle the stopwatch //
	///////////////////////////////////////

	handleSelectDate(date) {
		console.log("Handing select date:", date);
		this.setState({
			selectedDate: date
		});
	}

	handleReset() {
		console.log("Handling reset");
		try {
			AsyncStorage.clear();
		} catch(error) {
			console.log("Couldn't reset app");
		}
		console.log("labels are", this.initialLabels);
		this.setState({
			labels: this.initialLabels,
			listOfTimesWithLabels: {},
			totalTimesForEachLabel: {},
		});
	}


	render() {
		const newProps = {
			...this.state,
			handleAddLabel: this.handleAddLabel,
			handleRenameLabel: this.handleRenameLabel,
			handleDeleteLabel: this.handleDeleteLabel,
			handlePickerSelect: this.handlePickerSelect,
			recordTimesWithLabels: this.recordTimesWithLabels,
			handleSelectDate: this.handleSelectDate,
			handleReset: this.handleReset,
		};
		// console.log(newProps);
		return <TabNavFooter
			screenProps={newProps}
		/>;
	}
}
