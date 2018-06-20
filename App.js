import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, ListView } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';
import { createSwitchNavigator } from 'react-navigation';
import TimeFormatter from 'minutes-seconds-milliseconds';

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

export class FooterTabNav extends Component {
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

export class HeaderTitle extends Component {
  render() {
    return (
      // <Container>
	    <Header>
	      <Left/>
	      <Body>
	        <Title>{this.props.text}</Title>
	      </Body>
	      <Right />
	    </Header>
      // </Container>
    );
  }
}

const stopwatchStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		borderBottomWidth: 0.5,
		paddingTop: 20,
		paddingBottom: 10,
		backgroundColor: '#F9F9F9'
	},
	title: {
		alignSelf: 'center',
		fontWeight: '600',
	},
	timerWrapper: {
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		flex: 1
	},
	top: {
		flex: 1,
	},
	bottom: {
		flex: 2,
		backgroundColor: '#F0EFF5'
	},

	mainTimer: {
		fontSize: 80,
		fontWeight: '100',
		// borderWidth: 0.5,
		alignSelf: 'flex-end',
		fontFamily: 'Helvetica Neue'
		// fontFamily: 'Menlo'
	},
	lapTimer: {
		fontSize: 25,
		fontWeight: '100',
		// borderWidth: 0.5,
		alignSelf: 'flex-end',
		fontFamily: 'Helvetica Neue'
		// fontFamily: 'Proxima Nova'
	},
	timerWrapperInner: {
		// borderWidth: 0.5,
		alignSelf: 'center',
	},
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 15,
		paddingBottom: 30,
	},
	button: {
		height: 80,
		width: 80,
		borderRadius: 40,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center'
	},

	lapRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 40,
		paddingTop: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#ddd'
	},
	lapNumber: {
		fontSize: 16,
		color: '#777'
	},
	lapTime: {
		color: '#000',
		fontSize: 20,
		fontWeight: '300'
	},

	startBtn: {
		color: '#00cc00'
	},
	stopBtn: {
		color: 'red'
	},

	lapsWrapper: {
		flex: 1,
	}
});

// let laps = [
// 	{ name: 'Lap 1', value: '00.00.01' },
// 	{ name: 'Lap 2', value: '00.00.02' },
// 	{ name: 'Lap 3', value: '00.00.03' },
// 	{ name: 'Lap 4', value: '00.00.04' },
// 	{ name: 'Lap 5', value: '00.00.05' },
// ];
let ds = new ListView.DataSource({
	rowHasChanged: (row1, row2) => row1 !== row2,
});


class Stopwatch extends Component {

	constructor(props) {
		super(props);

		// laps = [];
		this.state = {
			lapList: [],
			dataSource: ds.cloneWithRows([]),
			isRunning: false,
			mainTimer: null,
			lapTimer: null,
			mainTimerStart: null,
			lapTimerStart: null,
		}
	}

	_renderLaps() {
		return (
			<View style={stopwatchStyles.lapsWrapper}>
				<ListView
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderRow={ (rowData) => (
						<View style={stopwatchStyles.lapRow}>
							<Text style={stopwatchStyles.lapNumber}>{rowData.name}</Text>
							<Text style={stopwatchStyles.lapNumber}>{rowData.value}</Text>
						</View>
					)}
				/>
			</View>
		);
	}

	_renderTimers() {
		return (
			<View style={stopwatchStyles.timerWrapper}>
				<View style={stopwatchStyles.timerWrapperInner}>
					<Text style={stopwatchStyles.lapTimer}>{ TimeFormatter(this.state.lapTimer) }</Text>
					<Text style={stopwatchStyles.mainTimer}>{ TimeFormatter(this.state.mainTimer) }</Text>
				</View>
			</View>
		);
	}

	_renderButtons() {
		return(
			<View style={stopwatchStyles.buttonWrapper}>
				<TouchableHighlight underlayColor='#777' onPress={this.handleLapReset.bind(this)} style={stopwatchStyles.button}>
					<Text>{ (this.state.mainTimerStart && !this.state.isRunning) ? 'Reset' : 'Lap'}</Text>
				</TouchableHighlight>
				<TouchableHighlight underlayColor='#ddd' onPress={this.handleStartStop.bind(this)} style={stopwatchStyles.button}>
					<Text style={[stopwatchStyles.startBtn, this.state.isRunning && stopwatchStyles.stopBtn]}>{this.state.isRunning ? 'Stop' : 'Start'}</Text>
				</TouchableHighlight>

			</View>
		);
	}

	render() {
		return (
			<View style={stopwatchStyles.container}>
				<View style={stopwatchStyles.top}>
					{this._renderTimers()}
				</View>
				<View style={stopwatchStyles.bottom}>
					{this._renderButtons()}
					{this._renderLaps()}
				</View>
			</View>
		);
	}

	handleStartStop() {
		let { isRunning, firstTime, mainTimer, lapTimer } = this.state;

		// Case 1: stop button clicked
		if(isRunning) {
			clearInterval(this.interval);
			this.setState({
				isRunning: false
			});

			return;
		}

		// Case 2: start button clicked
		this.setState({
			mainTimerStart: new Date(),
			lapTimerStart: new Date(),
			isRunning: true
		});

		this.interval = setInterval(() => {
			this.setState({
				mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
				lapTimer: new Date() - this.state.lapTimerStart + lapTimer,
			});
		}, 30);
	}

	handleLapReset() {
		let {isRunning, mainTimerStart, laps} = this.state;

		// console.log("In handleLapReset");
		var list = [];
		// Case 1: reset button clicked
		if(mainTimerStart && !isRunning) {
			// console.log("Resetting!");
			this.setState({
				mainTimerStart: null,
				lapTimerStart: null,
				mainTimer: 0,
				lapTimer: 0,
			});
		}

		var lapTime = this.state.lapTimer;
		// Case 2: lap button clicked
		if(mainTimerStart && isRunning) {
			// console.log("Lapping!");
			list = [{ name: 'Lap ' + (this.state.lapList.length + 1), value: TimeFormatter(lapTime) }];
			list = this.state.lapList.concat(list);

			this.setState({
				lapTimerStart: new Date(),
				lapTimer: 0
			});
		}

		this.setState({
			lapList: list,
			dataSource: this.state.dataSource.cloneWithRows(list)
		});
		// console.log(this.state.lapList);
		// console.log(list);
		// console.log("Set the state\n");

	}


}

export class Timer extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="Timer" />
                {/* <Header><Title>Timer</Title></Header> */}
				{/* <Content style={{flex: 1}}> */}
				<Stopwatch />
				{/* </Content> */}
				<Footer>
					<FooterTabNav active="Timer" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}

export class Stats extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="Statistics" />
				<Content>

				</Content>
				<Footer>
					<FooterTabNav active="Stats" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}

export class Labels extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="Labels" />
				<Content />
				<Footer>
					<FooterTabNav active="Labels" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}

export class More extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<HeaderTitle text="More" />
				<Content />
				<Footer>
					<FooterTabNav active="More" navigation={this.props.navigation}/>
				</Footer>
			</Container>
		);
	}
}

const TabNavFooter = createSwitchNavigator(
	{
		Timer: { screen: Timer },
		Stats: { screen: Stats },
		Labels: { screen: Labels },
		More: { screen: More },
	},
	{
		initialRouteName: 'Timer',
	},
);

export default class App extends React.Component {
	render() {
		return <TabNavFooter />;
	}
}


{/* <Footer>
	<FooterTab>
		<Button vertical onPress={() => this.props.navigation.navigate('Timer')}>
			<Icon name="timer" />
			<Text>Timer</Text>
		</Button>
		<Button vertical active onPress={() => this.props.navigation.navigate('Stats')}>
			<Icon active name="stats" />
			<Text>Stats</Text>
		</Button>
		<Button vertical>
			<Icon name="pricetags" />
			<Text>Labels</Text>
		</Button>
		<Button vertical>
			<Icon name="menu" />
			<Text>More</Text>
		</Button>
	</FooterTab>
</Footer> */}
