import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, View, Left, Body, Right, Title, List, ListItem } from 'native-base';

import { FooterTabNav, HeaderTitle, DynamicList, NativeBaseSwipeableList } from '../components/index.js';


export default class Labels extends Component {

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <Container>
                <HeaderTitle text="Labels" />

                <NativeBaseSwipeableList {...this.props.screenProps} />

                <Footer>
                    <FooterTabNav active="Labels" navigation={this.props.navigation}/>
                </Footer>
            </Container>
        );
    }
}
