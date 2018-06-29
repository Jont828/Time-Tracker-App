import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title, Tab, Tabs } from 'native-base';

import { FooterTabNav, HeaderTitle, TimeLog, TimeChart, Pie } from '../components/index.js';

export default class Stats extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {

		let pieProps = {
			...this.state,
			data: this.props.screenProps.listOfTimesWithLabels,
			pieWidth: 200,
			pieHeight: 200,
			width: 300,
			height: 500,
		};

		return (
			<Container>
				<HeaderTitle text="Statistics" />
				<Tabs initialPage={0}>
					<Tab heading="Logs">
					  <Content>
							<TimeLog {...this.props.screenProps} />
					  </Content>
					</Tab>
					<Tab heading="Charts">
						<Content>
							<Pie {...pieProps} />
						</Content>
					</Tab>
					<Tab heading="Pie">
						<Content>
							<TimeChart {...pieProps} />
							<Text>Hello</Text>
						</Content>
					</Tab>
				</Tabs>
				<Footer>
					<FooterTabNav active="Stats" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}
