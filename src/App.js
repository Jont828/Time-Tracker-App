import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import { Timer, Stats, Labels, More } from './screens/index.js';

const TabNavFooter = createSwitchNavigator(
	{
		TimerScreen: { screen: Timer },
		StatsScreen: { screen: Stats },
		LabelsScreen: { screen: Labels },
		MoreScreen: { screen: More },
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

		const initialLabels = [
			'Lecture',
			'Homework',
			'Commuting',
			'Eating',
			'Internet',
			'Gym',
		];

		let initialTimes = [
			{label: initialLabels[0], time: 3599000},
			{label: initialLabels[1], time: 59000},
			{label: initialLabels[2], time: 1000000},
			{label: initialLabels[3], time: 860000},
			{label: initialLabels[4], time: 10000000},
		];

		this.state = {
			labels: initialLabels,
			selectedLabelIndex: (initialLabels.length / 2),
			listOfTimesWithLabels: initialTimes,
		}

		this.handleAddLabel = this.handleAddLabel.bind(this);
		this.handleRenameLabel = this.handleRenameLabel.bind(this);
		this.handleDeleteLabel = this.handleDeleteLabel.bind(this);

		this.handlePickerSelect = this.handlePickerSelect.bind(this);

		this.recordTimesWithLabels = this.recordTimesWithLabels.bind(this);
	}

	////////////////////////////////////////
	// Functions to handle the label list //
	////////////////////////////////////////

	handleAddLabel(label) {
		console.log("Handling add label");
		this.setState({
			labels: this.state.labels.concat([label]),
		})
	}

	handleRenameLabel(newLabel, indexToReplace) {
		console.log("Handling rename label", indexToReplace);
		let list = this.state.labels;
		list.splice(indexToReplace, 1, newLabel);
		this.setState({
			labels: list
		});
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

	recordTimesWithLabels(label, time) {
		console.log("Handling times with labels");
		let list = [ {label: label, time: time}, ];
		list = list.concat(this.state.listOfTimesWithLabels);
		this.setState({
			listOfTimesWithLabels: list
		})
		console.log(label, time);
		// console.log(list);
	}

	///////////////////////////////////////
	// Functions to handle the stopwatch //
	///////////////////////////////////////



	render() {
		const newProps = {
			...this.state,
			handleAddLabel: this.handleAddLabel,
			handleRenameLabel: this.handleRenameLabel,
			handleDeleteLabel: this.handleDeleteLabel,
			handlePickerSelect: this.handlePickerSelect,
			recordTimesWithLabels: this.recordTimesWithLabels,
		};
		// console.log(newProps);
		return <TabNavFooter
			screenProps={newProps}
		/>;
	}
}
