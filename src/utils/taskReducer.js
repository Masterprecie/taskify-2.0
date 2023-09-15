
export const taskReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TASK': {
			return [...state, action.payload];
		}
		case 'EDIT_TASK': {
			const updatedState = state.map((task) =>
				task.id === action.payload.id ? action.payload : task
			);
			return updatedState;
		}
		case 'DELETE_TASK': {
			return state.filter((task) => task.id !== action.payload);
		}
		case 'CLEAR_ALL_TASKS': {
			return [];
		}
		default:
			return state;
	}
};
