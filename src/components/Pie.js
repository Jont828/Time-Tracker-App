import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SVGText } from 'react-native-svg';

import moment from 'moment';

export default class Pie extends React.PureComponent {

	constructor(props) {
		super(props);


	}


	draw(data, total) {
		const Labels = ({ slices, height, width }) => {
			return slices.map((slice, index) => {
				const { labelCentroid, pieCentroid, data } = slice;
				const percentage = data.amount / total * 100;
				return (
					<SVGText
						key={index}
						x={pieCentroid[ 0 ]}
						y={pieCentroid[ 1 ]}
						fill={'white'}
						textAnchor={'middle'}
						alignmentBaseline={'middle'}
						fontSize={12 + Math.floor(6 * data.amount / total)}
						stroke={'black'}
						strokeWidth={0.2}
					>
						{percentage.toFixed(0) + '%'}
					</SVGText>
				)
			})
		}

		return (
			<PieChart
				style={{ height: '50%' }}
				valueAccessor={({ item }) => item.amount}
				data={data}
				spacing={0}
				innerRadius={'25%'}
				outerRadius={'100%'}
			>
				<Labels/>
			</PieChart>
		)
	}

	render() {

		console.log("Got", this.props.date);
		if(moment(this.props.date).format('YYYY-MM-DD') in this.props.dailyTotals) {

			let dailyTotalsObject = this.props.dailyTotals[moment(this.props.date).format('YYYY-MM-DD')];
			let dailyTotalsData = [];
			let total = 0;
			for(let key in dailyTotalsObject) {
				total += dailyTotalsObject[key];
				let colorIndex = this.props.labels.indexOf(key);
				dailyTotalsData.push(
					{
						key: key,
						amount: dailyTotalsObject[key],
						svg: { fill: this.props.colors[colorIndex % this.props.colors.length]}
					}
				);
			}

			// let data = this.props.data[moment(this.props.date).format('YYYY-MM-DD')].map( (item, index) => {
			// 	return (
			// 		{
			// 			key: index,
			// 			label: item.label,
			// 			amount: item.time,
			// 			svg: { fill: this.colors[index % 10] }
			// 		}
			// 	)
			// });

			// console.log("dailyTotalsObject =", dailyTotalsObject);
			// console.log("Data = ",dailyTotalsData);
			return this.draw(dailyTotalsData, total);
		} else {
			console.log("No data, took else");
			// return <Text>You haven't entered any data for today!</Text>;
			return (
				this.draw(
					[{
						key: "No data!",
						amount: 1,
						svg: { fill: '#999999' }
					}],
				1)
			)
		}
		// console.log(moment().format('YYYY-MM-DD'));

		// const data = Object.keys(this.props.dailyTotals).map( (key, index) => {
		//
		// 	// this.props.dailyTotals[0].map(  )
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
