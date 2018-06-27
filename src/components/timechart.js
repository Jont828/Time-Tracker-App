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

export default class TimeChart extends Component {

	constructor(props) {
		super(props);

		this._value = this._value.bind(this);
		this._label = this._label.bind(this);
	}

	_value(item) { return item.time; }

	_label(item) { return item.label; }

	_createPieChart(index) {

		var arcs = d3.shape.pie()
				.value(this._value)
				(this.props.data);

		// var hightlightedArc = d3.shape.arc()
		// 	.outerRadius(this.props.pieWidth/2 + 10)
		// 	.padAngle(.05)
		// 	.innerRadius(30);

		var arc = d3.shape.arc()
			.outerRadius(this.props.pieWidth/2)
			.padAngle(.05)
			.innerRadius(30);

		var arcData = arcs[index];
		var path = arc(arcData);
		// var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);

		 return {
			 path,
			 color: "#2ca02c",
		 };
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



		return (
			// <Surface width={1000} height={1000}>
			// 	<Group x={250} y={250}>
			// 		 <Shape
			// 				d={"M-68.9646319937036,-29.476762610114324A75,75,0,0,1,-49.345310456503256,-56.48044206582762L-20.635195356782273,-21.775874553905552A30,30,0,0,0,-27.086713440010442,-12.896121704557451Z"}
			// 				stroke={"#2ca02c"}	// green line
			// 				strokeWidth={3}
			// 				/>
			// 	</Group>
			// </Surface>
			<Surface width={1000} height={1000}>
				<Group x={250} y={250}>
					{
						 // pieChart has all the svg paths calculated in step 2)
						 arcs.map( (item, index) =>
							(<Shape
								key={'pie_shape_' + index}
								fill={"#2ca02c"}
								stroke={"#2ca02c"}
								d={
									d3.shape.arc()
									.outerRadius(this.props.pieWidth/2)
									.padAngle(.05)
									.innerRadius(30)
									  (item)
								}
								/>))
					}
				</Group>
			</Surface>
		);
	}

}
