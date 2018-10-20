export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const addTodo = payload => ({type: ADD_TODO, payload});
export const toggleTodo = payload => ({type: TOGGLE_TODO, payload});
export const removeTodo = payload => ({type: REMOVE_TODO, payload});

export function todoReducer (state={
	todos: [
		{ content: "Todo example", completed: false }
	]
}, {type, payload}) {
	switch(type) {
		case ADD_TODO:
			return {
				...state,
				todos: [
					...state.todos,
					{
						content: payload,
						completed: false
					}
				]
			}
		case TOGGLE_TODO:
			const todos = {...state.todos};
			todos[payload].completed = !todos[payload].completed;
			return {
				...state,
				todos
			}
		default: 	
			return state;
	}
}