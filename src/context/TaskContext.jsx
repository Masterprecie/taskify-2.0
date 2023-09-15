

import React, { useReducer, useEffect } from 'react';
import { taskReducer } from '../utils/taskReducer';
import PropTypes from 'prop-types'

const TaskContext = React.createContext();

export const TaskProvider = ({ children }) => {
	const [tasks, dispatch] = useReducer(taskReducer, [], () => {
		const storedTasks = localStorage.getItem('tasks');
		return storedTasks ? JSON.parse(storedTasks) : [];
	});

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<TaskContext.Provider value={{ tasks, dispatch }}>
			{children}
		</TaskContext.Provider>
	);


};
TaskProvider.propTypes = {
	children: PropTypes.node.isRequired
}

export default TaskContext