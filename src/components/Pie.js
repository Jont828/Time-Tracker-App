import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';

import moment from 'moment';

export default class Pie extends React.PureComponent {

	constructor(props) {
		super(props);

		this.colors = [
			"#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
			"#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
		];
	}


	draw(data) {
		const Labels = ({ slices, height, width }) => {
			return slices.map((slice, index) => {
				const { labelCentroid, pieCentroid, data } = slice;
				return (
					<SVGText
						key={index}
						x={pieCentroid[ 0 ]}
						y={pieCentroid[ 1 ]}
						fill={'white'}
						textAnchor={'middle'}
						alignmentBaseline={'middle'}
						fontSize={18}
						stroke={'black'}
						strokeWidth={0.2}
					>
						{data.amount}
					</SVGText>
				)
			})
		}

		return (
			<PieChart
				style={{ height: '40%' }}
				valueAccessor={({ item }) => item.amount}
				data={data}
				spacing={0}
				innerRadius={'40%'}
				outerRadius={'100%'}
			>
				<Labels/>
			</PieChart>
		)
	}

	render() {

		if(moment(this.props.date).format('YYYY/MM/DD') in this.props.data) {
			let data = this.props.data[moment(this.props.date).format('YYYY/MM/DD')].map( (item, index) => {
				return (
					{
						key: index,
						amount: item.time / 1000,
						svg: { fill: this.colors[index] }
					}
				)
			});

			return this.draw(data);
		} else {
			console.log("No data");
			return <Text>You haven't entered any data for today!</Text>;
		}
		// console.log(moment().format('YYYY/MM/DD'));

		// const data = Object.keys(this.props.data).map( (key, index) => {
		//
		// 	// this.props.data[0].map(  )
		//
		// })

		// const data = [
		// 	{
		// 		key: 1,
		// 		amount: 50,
		// 		svg: { fill: '#600080' },
		// 	},
		// 	{
		// 		key: 2,
		// 		amount: 50,
		// 		svg: { fill: '#9900cc' }
		// 	},
		// 	{
		// 		key: 3,
		// 		amount: 40,
		// 		svg: { fill: '#c61aff' }
		// 	},
		// 	{
		// 		key: 4,
		// 		amount: 95,
		// 		svg: { fill: '#d966ff' }
		// 	},
		// 	{
		// 		key: 5,
		// 		amount: 35,
		// 		svg: { fill: '#ecb3ff' }
		// 	}
		// ]
	}

}
