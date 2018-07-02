import React, { Component } from 'react';
import { FooterTab } from 'native-base';
import { Button, Icon, Text } from 'native-base';

export default class FooterTabNav extends Component {
	render() {
		return (
			<FooterTab>
				<FooterButton active={this.props.active=="Timer"} 	tabLink="TimerScreen" icon="timer" text="Timer" navigation={this.props.navigation} />
				<FooterButton active={this.props.active=="Stats"} 	tabLink="StatsScreen" icon="stats" text="Stats" navigation={this.props.navigation} />
				<FooterButton active={this.props.active=="Labels"} 	tabLink="LabelsScreen" icon="pricetags" text="Labels" navigation={this.props.navigation} />
				<FooterButton active={this.props.active=="More"} 	tabLink="MoreScreen" icon="menu" text="More" navigation={this.props.navigation} />
			</FooterTab>
		);
	}
}

function FooterButton(props) {

	return (
		<Button vertical active={props.active} onPress={() => props.navigation.navigate(props.tabLink)}>
			<Icon active={props.active} name={props.icon} />
			<Text>{props.text}</Text>
		</Button>
	);
}
