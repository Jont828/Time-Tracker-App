import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';

const datas = [
	'Simon Mignolet',
	'Nathaniel Clyne',
	'Dejan Lovren',
	'Mama Sakho',
	'Alberto Moreno',
	'Emre Can',
	'Joe Allen',
	'Phil Coutinho',
];


export default class NativeBaseSwipeableList extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			basic: true,
			listViewData: datas,
		};
	}
	deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].props.closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({ listViewData: newData });
	}


	render() {
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
			<Container>
				<Content>
					<List
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={data =>
							<ListItem>
								<Text> {data} </Text>
							</ListItem>}
						renderLeftHiddenRow={data =>
							<Button full onPress={() => alert(data)}>
								<Icon active name="information-circle" />
							</Button>}
						renderRightHiddenRow={(data, secId, rowId, rowMap) =>
							<Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
								<Icon active name="trash" />
							</Button>}
						leftOpenValue={75}
						rightOpenValue={-75}
					/>
					<View style={styles.addButtonWrapper}>
						<Button transparent style={styles.addButton} onPress={() => alert(data)}>
							<Icon style={styles.addButtonText} active name="add" />
						</Button>
					</View>
				</Content>

			</Container>
		);
	}
}

const styles = StyleSheet.create({
	addButtonWrapper: {
		flex: 1,
		flexDirection: 'column',
	},
	addButton     : {
		alignSelf       : 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	addButtonText : {
		color     : '#007aff',
		alignSelf : 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		fontSize: 40,
	},
});
