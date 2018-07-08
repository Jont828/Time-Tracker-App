import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';

import { FooterTabNav, HeaderTitle, Stopwatch, AppStopwatch } from './../components/index.js';

export default class Timer extends Component {

	static navigationOptions = {
		header: null,
		// tabBarIcon: () => (
		// 	<Text><Icon active name="timer" style={{color:'#007aff'}} /></Text>
		// )
	}

	render() {
		return (
			<Container>
				<HeaderTitle text="Timer" />

				<AppStopwatch {...this.props.screenProps} />

				<Footer>
					<FooterTabNav active="Timer" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}
