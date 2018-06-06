import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';
import { createSwitchNavigator } from 'react-navigation';

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

export class Apps extends Component {

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
					<FooterTab>
						<Button vertical active onPress={() => this.props.navigation.navigate('Home')}>
							<Icon active name="timer" />
							<Text>Timer</Text>
						</Button>
						<Button vertical onPress={() => this.props.navigation.navigate('Details')}>
							<Icon name="stats" />
							{/* <Icon type="FontAwesome" name="home" /> */}
							<Text>Stats</Text>
						</Button>
						<Button vertical>
							{/* <Icon type="FontAwesome" name="tags" /> */}
							<Icon name="pricetags" />
							<Text>Labels</Text>
						</Button>
						<Button vertical>
							<Icon name="options" />
							<Text>Settings</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

export class Camera extends Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<Container>
				<Header />
				<Content />
				<Footer>
					<FooterTab>
						<Button vertical onPress={() => this.props.navigation.navigate('Home')}>
							<Icon name="timer" />
							<Text>Timer</Text>
						</Button>
						<Button vertical active onPress={() => this.props.navigation.navigate('Details')}>
							<Icon active name="stats" />
							{/* <Icon type="FontAwesome" name="home" /> */}
							<Text>Stats</Text>
						</Button>
						<Button vertical>
							{/* <Icon type="FontAwesome" name="tags" /> */}
							<Icon name="pricetags" />
							<Text>Labels</Text>
						</Button>
						<Button vertical>
							<Icon name="options" />
							<Text>Settings</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}

const RootStack = createSwitchNavigator(
	{
		Home: { screen: Apps },
		Details: { screen: Camera },
	},
	{
		initialRouteName: 'Home',
	},
);

export default class App extends React.Component {
	render() {
		return <RootStack />;
	}
}
