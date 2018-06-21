import React, { Component } from 'react';
import { FooterTab } from 'native-base';
import { Button, Icon, Text } from 'native-base';

export default class FooterTabNav extends Component {
	render() {
		return (
			<FooterTab>
				<FooterButton active={this.props.active=="Timer"} 	tabLink="Timer" icon="timer" text="Timer" navigation={this.props.navigation} />
				<FooterButton active={this.props.active=="Stats"} 	tabLink="Stats" icon="stats" text="Stats" navigation={this.props.navigation} />
				<FooterButton active={this.props.active=="Labels"} 	tabLink="Labels" icon="pricetags" text="Labels" navigation={this.props.navigation} />
				<FooterButton active={this.props.active=="More"} 	tabLink="More" icon="menu" text="More" navigation={this.props.navigation} />
			</FooterTab>
		);
	}
}

export class FooterButton extends Component {

	render() {
		return (
			<Button vertical active={this.props.active} onPress={() => this.props.navigation.navigate(this.props.tabLink)}>
				<Icon active={this.props.active} name={this.props.icon} />
				<Text>{this.props.text}</Text>
			</Button>
		);

	}
}
