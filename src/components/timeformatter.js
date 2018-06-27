import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TimeFormatter(milliseconds) {

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

	return hours.padStart(2, "0") + ':' + minutes.padStart(2, "0") + ':' + seconds.padStart(2, "0");
}
