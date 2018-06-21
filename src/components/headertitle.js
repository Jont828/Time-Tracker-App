import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title } from 'native-base';

export default class HeaderTitle extends Component {
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
