'use strict';
import React, {Component} from 'react';
import {
    View, Text, Alert, AlertIOS, ListView, ListViewDataSource, StyleSheet,
    TouchableOpacity, InteractionManager, RefreshControl, Animated, Platform, Dimensions,
    TouchableHighlight,
} from 'react-native';

{/*import Icon from 'react-native-vector-icons/Ionicons';*/}
import md5 from 'md5';

import data from './data.json';

import { Header, Left, Body, Right, Title, Button, Icon } from 'native-base';


import Swipeable from 'react-native-swipeable';

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
	<TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,

];

const window = Dimensions.get('window');

class DynamicListRow extends Component {

    // these values will need to be fixed either within the component or sent through props
    _defaultHeightValue = 50;
    _defaultTransition  = 500;

    state = {
        _rowHeight  : new Animated.Value(this._defaultHeightValue),
        _rowOpacity : new Animated.Value(0)
    };

    componentDidMount() {
        Animated.timing(this.state._rowOpacity, {
            toValue  : 1,
            duration : this._defaultTransition
        }).start()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.remove) {
            this.onRemoving(nextProps.onRemoving);
        } else {
            this.resetHeight()
        }
    }

    onRemoving(callback) {
        Animated.timing(this.state._rowHeight, {
            toValue  : 0,
            duration : this._defaultTransition
        }).start(callback);
    }

    resetHeight() {
        Animated.timing(this.state._rowHeight, {
            toValue  : this._defaultHeightValue,
            duration : 0
        }).start();
    }

    render() {
        return (
            <Animated.View
                style={{height: this.state._rowHeight, opacity: this.state._rowOpacity}}>
                {this.props.children}
            </Animated.View>
        );
    }
}

export default class DynamicList extends Component {

    /**
     * Default state values
     * */
    state = {
        loading     : true,
        dataSource  : new ListView.DataSource({
            rowHasChanged : (row1, row2) => true
        }),
        refreshing  : false,
        rowToDelete : null
    };

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._loadData()
        });
    }

    _loadData(refresh) {
        refresh && this.setState({
            refreshing : true
        });

        this.dataLoadSuccess({data : data});
    }

    dataLoadSuccess(result) {

        this._data = result.data;

        let ds = this.state.dataSource.cloneWithRows(this._data);

        this.setState({
            loading     : false,
            refreshing  : false,
            rowToDelete : -1,
            dataSource  : ds
        });
    }


    render() {
        return (
            <View style={styles.container}>

                <ListView
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._loadData.bind(this, true)}
                        tintColor="#00AEC7"
                        title="Loading..."
                        titleColor="#00AEC7"
                        colors={['#FFF', '#FFF', '#FFF']}
                        progressBackgroundColor="#00AEC7"

                      />
                    }
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />

                <View style={styles.addButtonWrapper}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={()=> this._addItemPressed()}
                    >
                        <Icon name="add" style={styles.addButtonText}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }



    _renderRow(rowData, sectionID, rowID) {
        return (
            <DynamicListRow
                remove={rowData.id === this.state.rowToDelete}
                onRemoving={this._onAfterRemovingElement.bind(this)}
            >
                {/*<View style={styles.rowStyle}>

                    <View style={styles.contact}>
                        <Text style={[styles.name]}>{rowData.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.deleteWrapper} onPress={() => this._deleteItem(rowData.id)}>
                        <Icon name='md-remove-circle' style={styles.deleteIcon}/>
                    </TouchableOpacity>
                </View>*/}
                <View style={styles.rowStyle}>
                    <Swipeable rightButtons={
                        [
                        <Button full danger style={styles.deleteWrapper} onPress={_ => this._deleteItem(rowData.id)}>
                            <Icon active name="trash" style={styles.deleteIcon} />
                        </Button>
                        ]
                    }>
                        <View style={styles.contact}>
                            <Text style={[styles.name]}>{rowData.name}</Text>
                        </View>
                    </Swipeable>
                </View>
            </DynamicListRow>
        );
    }

    _addItemPressed() {

        AlertIOS.prompt(
            'Add Item',
            'Name here:',
            [
                {
                    text    : 'OK',
                    onPress : (name) => {
                        this._addItem(name);
                    }
                }
            ],
            'plain-text',
            ''
        );
    }

    _addItem(name) {
        this._data.push({
            id    : md5(name + Math.random()),
            name  : name,
            phone : 'XX-XXX-XXX-XXXX'
        });
        this.setState({
            rowToDelete : -1,
            dataSource  : this.state.dataSource.cloneWithRows(this._data)
        });
    }

    componentWillUpdate(nexProps, nexState) {
        if (nexState.rowToDelete !== null) {
            this._data = this._data.filter((item) => {
                if (item.id !== nexState.rowToDelete) {
                    return item;
                }
            });
        }
    }

    _deleteItem(id) {
        this.setState({
            rowToDelete : id
        });
    }

    _onAfterRemovingElement() {
        this.setState({
            rowToDelete : null,
            dataSource  : this.state.dataSource.cloneWithRows(this._data)
        });
    }

}

const styles = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : '#fff'
    },
    noData    : {
        color     : '#000',
        fontSize  : 18,
        alignSelf : 'center',
        top       : 200
    },

    addButtonWrapper: {
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
    },
    addButton     : {
        backgroundColor : '#fff',
        width           : '100%',
        alignSelf       : 'center',
        height          : 50,
    },
    addButtonText : {
        flex: 1,
        color     : '#007aff',
        alignSelf : 'center',
        justifyContent: 'center',
        lineHeight: 50,
        fontSize: 40,
    },

    rowStyle : {
        backgroundColor   : '#FFF',
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
        height: 50,
    },

    rowIcon : {
        width            : 30,
        alignSelf        : 'flex-start',
        marginHorizontal : 10,
        fontSize         : 24
    },

    name    : {
        color    : '#212121',
        fontSize : 18,
        lineHeight: 50,
    },
    contact : {
        // width     : window.width - 100,
        // alignSelf : 'center',
        marginLeft: 10,
    },

    deleteWrapper : {
        width: 1000,
        alignSelf       : 'flex-start',
        height: 50,
    },
    deleteIcon    : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 15,
    }
});
