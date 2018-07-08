'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Alert,
	AsyncStorage
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Modal from 'react-native-modal';
import { Linking } from 'react-native';

const styles = StyleSheet.create({
	imageStyle: {
		marginLeft: 15,
		alignSelf: 'center',
		height: 30,
		width: 30
	},
	titleInfoStyle: {
		fontSize: 16,
		color: '#8e8e93'
	},
	appVersionStyle: {
		fontSize: 16,
		color: '#222',
	}
});

export default class AppSettings extends Component {
	constructor(){
		super();
		this.onValueChange = this.onValueChange.bind(this);
		this.state = {
			licenseIsVisible: false,
		};
	}
	render() {
		var bgColor = '#DCE3F4';
		return (
		<View style={{backgroundColor: '#EFEFF4', flex: 1, flexDirection: 'column', height: '100%'}}>
			<View style={{backgroundColor: '#EFEFF4', flex: 1}}>
					<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
						<SettingsList.Header headerStyle={{marginTop: 15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/version.png')}/>}
							switchState={this.state.switchValue}
							switchOnValueChange={this.onValueChange}
							title='App Version'
							titleInfo='1.0'
							titleInfoStyle={styles.appVersionStyle}
							hasNavArrow={false}
						/>

						<SettingsList.Header headerStyle={{marginTop: 15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/thumbs-up.png')}/>}
							title='Rate This App!'
							onPress={() => Alert.alert('Route to App Store')}
						/>
						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/feedback.png')}/>}
							title='Send Feedback'
							onPress={() => Linking.openURL('mailto:jt572@cornell.edu?subject=Time Tracker App Feedback')}
						/>

						<SettingsList.Header headerStyle={{marginTop: 15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/reset.png')}/>}
							title='Reset App Data'
							onPress={() => { Alert.alert(
								'Confirmation',
								'Are you sure you want to reset the app\'s data?',
								[
									{
										text: 'No',
										style: 'cancel',
									},
									{
										text    : 'Yes, I\'m sure',
										onPress : this.props.handleReset
									}
								],
							); }}
							hasNavArrow={false}

						/>

						<SettingsList.Header headerStyle={{marginTop: 15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/copyleft.png')}/>}
							title='License'
							onPress={() => this.props.navigation.navigate('LicenseScreen')}
						/>

				</SettingsList>
			</View>
		</View>
		);
	}
	toggleAuthView() {
		this.setState({toggleAuthView: !this.state.toggleAuthView});
	}
	onValueChange(value){
		this.setState({switchValue: value});
	}
 }
