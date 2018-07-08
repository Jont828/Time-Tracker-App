import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';

import { FooterTabNav, HeaderTitle, AppSettings } from '../components/index.js';

export default class More extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="More" />

				<AppSettings {...this.props.screenProps} navigation={this.props.navigation} />

				<Footer>
					<FooterTabNav active="More" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}
