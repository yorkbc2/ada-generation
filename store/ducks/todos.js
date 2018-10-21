import data from "./data/data";
export function todoReducer (state = {
	data: data,
	currentCategory: 'nature',
	filterType: "ALL"
}, {type, payload}) {
	switch(type) {
		case "TODO_CHANGE_CATEGORY":
			return {
				...state,
				currentCategory: payload
			}
		case "ADD_CHECK": {
			const newState = {...state};

			newState.data[state.currentCategory].todos.push({text: payload, completed: false});
			
			return newState;
		}
		case "TOGGLE_TODO": {
			const newState = {...state};

			newState.data[state.currentCategory].todos[payload].completed = !newState.data[state.currentCategory].todos[payload].completed;

			return newState;
		}
	}
	return state;
}