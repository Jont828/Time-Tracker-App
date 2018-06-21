import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';

import { Timer, Stats, Labels, More } from './screens/index.js';

const TabNavFooter = createSwitchNavigator(
	{
		Timer: { screen: Timer },
		Stats: { screen: Stats },
		Labels: { screen: Labels },
		More: { screen: More },
	},
	{
		initialRouteName: 'Timer',
	},
);

export default class App extends React.Component {
	render() {
		return <TabNavFooter />;
	}
}
