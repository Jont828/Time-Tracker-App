import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';

import { FooterTabNav, HeaderTitle } from '../components/index.js';
import SettingsList from 'react-native-settings-list';

export default class More extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="More" />
				<Content>
				</Content>
				<Footer>
					<FooterTabNav active="More" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}
