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
	'Misc',
];


export default class NativeBaseSwipeableList extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			basic: true,
			listViewData: labelList,
		};
	}
	deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].props.closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({ listViewData: newData });
		labelList = newData;
	}

	createPrompt(title, onPressFunction, secId, rowId, rowMap) {

		AlertIOS.prompt(
			title,
			'Name here:',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text    : 'OK',
					onPress : (name) => onPressFunction(name, secId, rowId, rowMap)
				}
			],
			'plain-text',
			''
		);
	}

	addRow() {
		this.createPrompt("Add Item",
		 	(name) => {
				const newData = [...this.state.listViewData];
				newData.splice(newData.length, 0, name);
				this.setState({ listViewData: newData });
				labelList = newData;
			},
			{/* Omitting secId, rowId, rowMap */}
		);
	}

	renameRow(secId, rowId, rowMap) {
		this.createPrompt("Rename Item",
			(name, secId, rowId, rowMap) => {
				const newData = [...this.state.listViewData];
				newData.splice(rowId, 1, name);
				this.setState({ listViewData: newData });
			},
		secId, rowId, rowMap);
	}

	render() {
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
			<Container style={styles.container}>
				<Content style={styles.content}>
					<View style={styles.list}>
						<List
							dataSource={this.ds.cloneWithRows(this.state.listViewData)}
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
