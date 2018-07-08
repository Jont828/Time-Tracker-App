import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title, Tab, Tabs } from 'native-base';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { FooterTabNav, HeaderTitle, TimeLog, TimeChart, Pie, DailyStats } from '../components/index.js';

export default class License extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button
							transparent
							navigation={this.props.navigation}
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon name='arrow-back' />
							<Text>More</Text>
						</Button>
					</Left>
					<Body>
						<Title>License</Title>
					</Body>
					<Right />
				</Header>

				<Content style={styles.license}>
					<Text style={styles.title}>About</Text>
					<Text style={styles.licenseText}>
						This app was designed and maintained by Jonathan Tong. The source code can be
						found at <Text style={styles.link} onPress={_ => Linking.openURL('https://github.com/Jont828/Time-Tracker-App')}>
						this GitHub repository</Text>.
					</Text>

					<Text style={styles.title}>Acknowledgements</Text>
					<Text style={styles.licenseText}>
						This project was bootstrapped with Create React Native App. Additionally, I used components from
						NativeBase to create the UI.
					</Text>

					<Text style={styles.title}>License</Text>
					<Text>
						This work is licensed under the <Text style={styles.link} onPress={_ => Linking.openURL('https://gnu.org/licenses/gpl-3.0.en.html')}>
						GNU General Public License v3</Text>. Follow the link for more details.
					</Text>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	license: {
		margin: '5%'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	licenseText: {
		marginBottom: 16,
	},
	link: {
		color: '#2980b9',
	}
});
