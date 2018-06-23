import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';

import { FooterTabNav, HeaderTitle, Stopwatch, ModifiedStopwatch } from './../components/index.js';

export default class Timer extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="Timer" />

				<ModifiedStopwatch />

				<Footer>
					<FooterTabNav active="Timer" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}
