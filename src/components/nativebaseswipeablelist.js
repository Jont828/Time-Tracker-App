import React, { Component } from 'react';
import { ListView, StyleSheet, View, Alert, AlertIOS, } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';

export var labelList = [
	'Lecture',
	'Homework',
	'Commuting',
	'Eating',
	'Internet',
	'Coding projects',
	'Office hours',
	'Club meetings',
	'Gym',
];


export default class NativeBaseSwipeableList extends Component {
	constructor(props) {
		super(props);

		console.log('In list:', this.props.labels);

		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
	}

	createPrompt(promptTitle, onPressOkayFunction, rowId) {
		// console.log("Props are", this.props);
		// console.log("Going to add to list", this.props.labels);
		AlertIOS.prompt(
			promptTitle,
			'Name here:',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text    : 'OK',
					onPress : (name) =>	{ onPressOkayFunction(name, rowId) }
				}
			],
			'plain-text',
			''
		);
		// console.log("Added to list:", this.props.labels);
	}

	addRow() {
		this.createPrompt("Add Item", this.props.handleAddLabel, {/* Omitting rowId because we don't need it to append */} );
	}

	renameRow(secId, rowId, rowMap) {
		console.log(secId, rowId, this.props.labels[rowId]);

		this.createPrompt("Rename Item", this.props.handleRenameLabel, rowId);
		rowMap[`${secId}${rowId}`].props.closeRow(); // Closes/unswipes row on the list
	}

	deleteRow(secId, rowId, rowMap) {
		// Closes/unswipes row on the list. Must close before deleting
    	rowMap[`${secId}${rowId}`].props.closeRow();
		this.props.handleDeleteLabel(rowId);
	}

	render() {
		return (
			<Container style={styles.container}>
				<Content style={styles.content}>
					<View style={styles.list}>
						<List
							dataSource={this.ds.cloneWithRows(this.props.labels)}
							renderRow={data =>
								<ListItem style={styles.listItem}>
									<View style={styles.listDataWrapper}>
										<Text style={styles.itemText}> {data} </Text>
									</View>
								</ListItem>}
							renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
								<Button full onPress={_ => this.renameRow(secId, rowId, rowMap)}>
									<Icon active name="information-circle" />
								</Button>}
							renderRightHiddenRow={(data, secId, rowId, rowMap) =>
								<Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
									<Icon active name="trash" />
								</Button>}
							leftOpenValue={75}
							rightOpenValue={-75}

							closeOnRowBeginSwipe

						/>
					</View>
					<View style={{flex: 1}}>
						<View style={styles.addButtonWrapper}>
							<Button full transparent style={styles.addButton} onPress={() => this.addRow()}>
								<Icon style={styles.addButtonText} active name="add" />
							</Button>
						</View>
					</View>
				</Content>

			</Container>
		);
	}
}

const styles = StyleSheet.create({
	listItem : {
		// height: 40
	},
	listDataWrapper: {
		marginLeft: 15
	},
	addButtonWrapper: {
		flex: 1,
		backgroundColor: '#EFEFF4',
		flexDirection: 'row'
	},
	addButton     : {
		alignSelf       : 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		// backgroundColor: '#000',
		height: 50,
	},
	addButtonText : {
		color     : '#007aff',
		alignSelf : 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		fontSize: 40,
	},
	list: {
		backgroundColor: '#fff'
	},
	content: {
		backgroundColor: '#EFEFF4'
	},
});
