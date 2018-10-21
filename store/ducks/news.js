import axios from "axios";

export const FETCH_NEWS_START = "FETCH_NEWS_START";
export const FETCH_NEWS_END = "FETCH_NEWS_END";
export const FETCH_NEWS_ERROR = "FETCH_NEWS_ERROR";

export const FETCHING_START ="FETCHING_START";

export const NEWS_CHANGE_COUNTRY = "NEWS_CHANGE_COUNTRY";
export const NEWS_CHANGE_YEAR = "NEWS_CHANGE_YEAR";

export function newsReducer (state = {
	fetching: false,
	data: [],
	currentYear: 2018,
	currentCountry: ""
}, {type, payload}) {
	switch(type) {
		case FETCHING_START: {
			return {
				...state,
				fetching: true
			}
		}
		case FETCH_NEWS_START:
			return {
				...state,
				fetching: true,
				currentYear: payload.year,
				currentCountry: payload.country
			}
		case FETCH_NEWS_END:
			return {
				...state,
				fetching: false,
				data: payload
			}
		case NEWS_CHANGE_YEAR:
			return {
				...state,
				currentYear: payload
			};
		case NEWS_CHANGE_COUNTRY:
			return {
				...state,
				currentCountry: payload
			};
		default:
			return state;
	}
}

export const getNews = (c, y) => {
	return axios.get("https://ada-inserter.herokuapp.com/api/news?country=" + c + "&year=" + y);
};

export const fetchNews = (d,c,y) => {
	d({type: FETCH_NEWS_START, payload: {country: c, year: y}});
	getNews(c,y)
		.then(response => {
			d({type: FETCH_NEWS_END, payload: response.data.data})
		});
};	