import axios from "axios";

export const INFO_FETCH_START = "INFO_FETCH_START";
export const INFO_FETCH_END = "INFO_FETCH_END";
export const INFO_FETCH_ERROR = "INFO_FETCH_ERROR";
export const INFO_CHANGE_COUNTRY = "INFO_CHANGE_COUNTRY";
export const INFO_CHANGE_YEAR = "INFO_CHANGE_YEAR";

const middleValue = (data, year, val) => {
	let total = 0;

	data.forEach(i => {
		if (i.date.split('.')[1] == year) 
				total++;
	});

	total = total === 0? 1: total;

	const result = val * 100 / total;

	return parseInt(result);
};

const getColor = (function () {
	const defaultColor = "#f4097f"
	const colorValues = {
		earthquake: "green",
		water: "blue",
		fire: "red" 
	};

	return (name) => colorValues[name] || defaultColor;
}());
export function infoReducer (state = {
	fetching: false,
	data: [],
	error: null,
	yAxis: [],
	xAxis: [],
	graphData: [],
	countries: [],
	lastYearData: 0,
	currentYear: (new Date()).getFullYear()
}, {payload, type}) {
	switch(type) {
		case INFO_FETCH_START:
			return {
				...state
			};
		case INFO_FETCH_END:{
				const years = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018];
				const ns = [0,1,2,3,4,5,6,7,8,9];
				// data example: [0,0,3,4,0...]
				// Column is the year, element is the n's
				const data = {};
				const countries = [];
				let lastYearData = 0;
				payload.forEach(item => {

					const year = (item.date.split(".")[1] || "2012");

					if (typeof data[item.country] === 'undefined')
					{
						data[item.country] = {};
						countries.push(item.country);
					}

					if (typeof data[item.country][item.type] === "undefined")
					{
						data[item.country][item.type] = {};
					}

					if (typeof data[item.country][item.type][item.subtype] === "undefined")
					{
						data[item.country][item.type][item.subtype] = {
							color: getColor(item.subtype),
							data: [0,0,0,0,0,0,0,0,0,0]
						};
					}

					if (typeof data[item.country][item.type][item.subtype]['data'][years.indexOf(+year)] === "undefined")
					{
						data[item.country][item.type][item.subtype]['data'][years.indexOf(+year)] = 1;
					}
					else 
					{
						data[item.country][item.type][item.subtype]['data'][years.indexOf(+year)]++;
					}
				});

				payload.forEach(i => {
					if (i.country === countries[0] && i.date.split(".")[1] == state.currentYear) {
						lastYearData++;
					}
				});

				return {
					...state,
					fetching: false,
					data: payload,
					yAxis: ns,
					xAxis: years,
					graphData: data,
					countries,
					currentCountry: countries[0], 
					lastYearData,
					middleValue: middleValue(payload, state.currentYear, lastYearData)
				};
			}
		case INFO_FETCH_ERROR:{
				return {
					...state,
					error: payload
				};
			}
		case INFO_CHANGE_COUNTRY: {
			let lastYearData = 0;
			state.data.forEach(i => {
				if (i.country === payload && i.date.split(".")[1] == state.currentYear) {
					lastYearData++;
				}
			})
			return {
				...state,
				currentCountry: payload,
				lastYearData,
				middleValue: middleValue(state.data, state.currentYear, lastYearData)
			}
		}
		case INFO_CHANGE_YEAR: {
			let lastYearData = 0;

			state.data.forEach(i => {
				if (i.country === state.currentCountry && i.date.split(".")[1] == payload)
					lastYearData++;
			});

			return {
				...state,
				currentYear: payload,
				lastYearData: lastYearData,
				middleValue: middleValue(state.data, payload, lastYearData)		
			}
		}
		default:
			return state;
	}
}

export const fetchStart = () => ({type: INFO_FETCH_START});
export const fetchEnd = (payload) => ({type: INFO_FETCH_END, payload});
export const fetchError = (payload) => ({type: INFO_FETCH_START, payload});