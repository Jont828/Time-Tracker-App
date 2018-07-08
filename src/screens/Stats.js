import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title, Tab, Tabs } from 'native-base';

import { FooterTabNav, HeaderTitle, TimeLog, TimeChart, Pie, DailyStats } from '../components/index.js';

export default class Stats extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {

		// let
		let pieProps = {
			...this.state,
			...this.props.screenProps,
			data: this.props.screenProps.listOfTimesWithLabels,
			dailyTotals: this.props.screenProps.totalTimesForEachLabel,
			pieWidth: 300,
			pieHeight: 300,
			width: '100%',
			height: 500,
		};

		return (
			<Container>
				<HeaderTitle text="Statistics" />
				<Tabs initialPage={0}>
					<Tab heading="Summary">
						{/* <Content> */}
						<DailyStats {...pieProps} />
						{/* </Content> */}
					</Tab>
					<Tab heading="Daily Logs">
					  <Content>
							<TimeLog {...this.props.screenProps} />
					  </Content>
					</Tab>
					{/* <Tab heading="Animated Pie">
						<Content style={{flex: 1}}>
							<TimeChart {...pieProps} />
							<Text>Hello</Text>
						</Content>
					</Tab> */}
				</Tabs>
				<Footer>
					<FooterTabNav active="Stats" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}
