import {
	createStore,
	combineReducers
} from "redux";

import { 
	infoReducer
} from "./ducks/info";

import { 
	newsReducer
} from "./ducks/news";

import {
	todoReducer
} from "./ducks/todos";

const reducer = combineReducers({
	info: infoReducer,
	todos: todoReducer,
	news: newsReducer
});

const store = createStore(reducer);

export default store;