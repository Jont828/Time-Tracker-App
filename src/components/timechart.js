import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ART,
	LayoutAnimation,
	Dimensions,
	TouchableWithoutFeedback,
} from 'react-native';

const {
	Surface,
	Group,
	Rectangle,
	Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
	scale,
	shape,
};

import {
	scaleBand,
	scaleLinear
} from 'd3-scale';

import AnimShape from './AnimShape.js';

export default class TimeChart extends Component {

	constructor(props) {
		super(props);

		this.state = { highlightedIndex: 0 };

		this._createPieChart = this._createPieChart.bind(this);
		this._value = this._value.bind(this);
		this._label = this._label.bind(this);
		this._getcolor = this._getcolor.bind(this);
		this._onPieItemSelected = this._onPieItemSelected.bind(this);

		this.colors = [
			"#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
			"#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
		];
	}

	_value(item) { return item.time; }

	_label(item) { return item.label; }

	_getcolor(index) { return this.colors[index % this.colors.length]; }

	_createPieChart(index) {

		var arcs = d3.shape.pie()
				.value(this._value)
				(this.props.data);

		var hightlightedArc = d3.shape.arc()
			.outerRadius(this.props.pieWidth/2 + 10)
			.padAngle(.05)
			.innerRadius(40);

		var arc = d3.shape.arc()
			.outerRadius(this.props.pieWidth/2)
			.padAngle(.05)
			.innerRadius(50);

		var arcData = arcs[index];
		var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);


		 return {
			 path,
			 color: this._getcolor(index),
		 };
	}

	_onPieItemSelected(index) {
		this.setState({...this.state, highlightedIndex: index});
		// this.props.onItemSelected(index);
	}

	render() {

		var arcs = d3.shape.pie()
	        .value(this._value)
	        (this.props.data);
		// var path = d3.shape.arc()
	    //   .outerRadius(this.props.pieWidth/2)  // Radius of the pie
	    //   .padAngle(.05)    // Angle between sections
	    //   .innerRadius(30)  // Inner radius: to create a donut or pie
	    //   (arcs[i]);

		const margin = 25;
		// const x = this.props.pieWidth / 2 + margin;
		// const y = this.props.pieHeight / 2 + margin;

		const x = (this.props.pieWidth + margin) / 2;
		const y = (this.props.pieHeight + margin) / 2;

		var total = 0;
		for(let item of this.props.data) {
			total += this._value(item);
		}

		return (
			<View style={styles.wrapper}>
			{/* <View width={this.props.width} height={this.props.height}> */}
				{/* <Surface > */}
				<View style={styles.surfaceWrapper}>
					<Surface width={this.props.pieWidth + margin} height={this.props.pieHeight + margin}>
						<Group x={x} y={y}>
						{/* <Group x={x} y={y}> */}
							{
								this.props.data.map( (item, index) =>
									(<AnimShape
										key={'pie_shape_' + index}
										color={this._getcolor(index)}
										d={ () => this._createPieChart(index)}
									/>)
								)
							}
						</Group>
					</Surface>
				</View>
				<View style={styles.textWrapper}>
				{/* <View style={{position: 'absolute', top:margin, left: 2*margin + this.props.pieWidth}}> */}
					{
						this.props.data.map( (item, index) =>
						{
							var fontWeight = this.state.highlightedIndex == index ? 'bold' : 'normal';
							const percentage = this._value(item) / total * 100;
							return (
								<TouchableWithoutFeedback key={index} onPress={() => this._onPieItemSelected(index)}>
									<View>
										<Text style={[styles.label, {color: this._getcolor(index), fontWeight: fontWeight}]} >
											{this._label(item)}: {percentage.toFixed(1)}%
										</Text>
									</View>
								</TouchableWithoutFeedback>
							);
						})
					}
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		flexWrap: 'wrap',

		flexDirection: 'row',
		justifyContent: 'space-evenly',
		// justifyContent: 'space-between',

		marginTop: '5%',
		// marginLeft: '7%',
		// marginRight: '7%',
		borderColor: '#000',
		borderWidth: 5
	},
	surfaceWrapper: {
		borderColor: 'orange',
		borderWidth: 5,
		alignSelf: 'center',
		// flex: 1,
		// flexDirection: 'row',
	},
	textWrapper: {
		borderColor: 'red',
		borderWidth: 5,
		alignSelf: 'center',
		// flex: 1,
		// flexDirection: 'row',
	},
	container: {
		margin: 20,
	},
	label: {
		fontSize: 20,
		marginTop: 5,
		fontWeight: 'normal',
	}
});
