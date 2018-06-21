'use strict';
import React, { Component } from 'react';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Alert
} from 'react-native';
import SettingsList from 'react-native-settings-list';

const styles = StyleSheet.create({
	imageStyle:{
	marginLeft:15,
	alignSelf:'center',
	height:30,
	width:30
	},
	titleInfoStyle:{
	fontSize:16,
	color: '#8e8e93'
	}
});

export default class AppSettings extends Component {
	constructor(){
		super();
		this.onValueChange = this.onValueChange.bind(this);
		this.state = {switchValue: false, loggedIn: false};
	}
	render() {
		var bgColor = '#DCE3F4';
		return (
		<View style={{backgroundColor:'#EFEFF4',flex:1}}>
			<View style={{backgroundColor:'#EFEFF4',flex:1}}>
					<SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						{this.state.toggleAuthView ?
							<SettingsList.Item
								icon={
									<Image style={styles.imageStyle} source={require('./images/user.png')}/>
								}
								title='Logged In As...'
								hasNavArrow={false}
							/>
							:
							<SettingsList.Item
								icon={
									<Image style={styles.imageStyle} source={require('./images/user.png')}/>
								}
								isAuth={true}
								authPropsUser={{placeholder:'E-mail'}}
								authPropsPW={{placeholder:'Password'}}
								onPress={() => this.toggleAuthView()}
							/>
						}
						<SettingsList.Header headerStyle={{marginTop:15}}/>

						<SettingsList.Item
							icon={
								<Image style={styles.imageStyle} source={require('./images/airplane.png')}/>
							}
							switchState={this.state.switchValue}
							switchOnValueChange={this.onValueChange}
							title='App Version'
							titleInfo='0.0'
							titleInfoStyle={styles.titleInfoStyle}
						/>

						<SettingsList.Header headerStyle={{marginTop:15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/control.png')}/>}
							title='Rate This App!'
							onPress={() => Alert.alert('Route to App Store')}
						/>
						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/dnd.png')}/>}
							title='Send Feedback'
							onPress={() => Alert.alert('Route to email')}
						/>
						<SettingsList.Header headerStyle={{marginTop:15}}/>
						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/general.png')}/>}
							title='General'
							onPress={() => Alert.alert('Route To General Page')}
						/>
						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/display.png')}/>}
							title='Display & Brightness'
							onPress={() => Alert.alert('Route To Display Page')}
						/>

						<SettingsList.Header headerStyle={{marginTop:15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/notifications.png')}/>}
							title='Reset App Data'
							onPress={() => Alert.alert('Resetting the app')}
						/>

						<SettingsList.Header headerStyle={{marginTop:15}}/>

						<SettingsList.Item
							icon={<Image style={styles.imageStyle} source={require('./images/notifications.png')}/>}
							title='License'
							onPress={() => Alert.alert('Route to license screen')}
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
