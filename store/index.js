import {
	createStore,
	combineReducers
} from "redux";

import { 
	infoReducer
} from "./ducks/info";

import {
	todoReducer
} from "./ducks/todos";

const reducer = combineReducers({
	info: infoReducer,
	todos: todoReducer
});

const store = createStore(reducer);

export default store;