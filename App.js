import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';
import { createSwitchNavigator } from 'react-navigation';

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
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>{this.props.text}</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
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
				<Content>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					  <Text>Hello, world!!</Text>
					</View>
				</Content>
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
				<Content />
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
