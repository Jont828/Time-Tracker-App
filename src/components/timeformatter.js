import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TimeFormatter(milliseconds, verbose) {

	if(verbose && milliseconds < 1000) {
		return "< 1s";
	}

	var hours = Math.floor(milliseconds / 3600000);
	let rem = milliseconds % 3600000;
	hours = hours.toString();

	let minutes = Math.floor(rem / 60000);
	rem = rem % 60000;
	minutes = minutes.toString();

	let seconds = Math.floor(rem / 1000);
	seconds = seconds.toString();
	rem = rem % 1000;

	let centiseconds = Math.floor(rem / 10);
	centiseconds = centiseconds.toString();

	let str = '';
	if(verbose) {
		if(hours > 0)
			str +=  hours + 'h ';
		if(minutes > 0)
			str += minutes + 'm ';
		if(seconds > 0)
			str += seconds + 's';

	} else {
		str = hours.padStart(2, "0") + ':' + minutes.padStart(2, "0") + ':' + seconds.padStart(2, "0");
	}

	return str;
}
