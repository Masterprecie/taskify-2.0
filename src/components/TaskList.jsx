import { useState } from 'react';
import { useTaskContext } from '../context/UseContext';
import TaskAddedModal from './TaskAddedModal';
import EditTaskModal from './EditTaskModal';
import taskImg from '../assets/taskImg.png'
import AddTaskModal from './AddTaskModal';


const TaskList = () => {
	const { tasks, dispatch } = useTaskContext();
	const [editingTask, setEditingTask] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);


	const handleEditTask = (task) => {
		setEditingTask(task);
	};
	function formatDueDate(dueDate) {
		const date = new Date(dueDate);
		const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
		return date.toLocaleDateString(undefined, options);
	}
	const handleSaveTask = (taskId, editedTitle, editedDescription, editedDueDate) => {
		dispatch({
			type: 'EDIT_TASK',
			payload: { id: taskId, title: editedTitle, description: editedDescription, dueDate: editedDueDate },
		});
		setEditingTask(null);
	};

	const handleDeleteTask = (id) => {
		dispatch({ type: 'DELETE_TASK', payload: id });
	};

	const handleClearAllTasks = () => {
		if (window.confirm('Are you sure you want to clear all tasks?')) {
			dispatch({ type: 'CLEAR_ALL_TASKS' });
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setShowSuccessModal(false);
	};
	return (
		<div className='relative px-10'>
			<div className='fixed right-5 bottom-10'>
				<button className="bg-blue-500  text-4xl text-white font-bold rounded-full md:px-10 md:py-8 px-6 py-4 hover:bg-blue-600" onClick={() => setShowModal(true)}>+</button>
			</div>
			<TaskAddedModal
				showModal={showSuccessModal}
				onClose={closeModal}
			/>
			<AddTaskModal
				showModal={showModal}
				onClose={() => setShowModal(false)}
				onAddTask={(title, description, dueDate) => {
					const id = new Date().getTime().toString();
					dispatch({
						type: 'ADD_TASK',
						payload: { id, title, description, dueDate },
					});
					setShowSuccessModal(true);
				}}
			/>

			{tasks.length === 0 ? (
				<div className='text-center '>
					<p className="text-lg mt-4 ">No task added yet. Please Click on the button at your bottom right to add a task</p>
					<div className='text-center flex justify-center'>
						<img src={taskImg} alt="taskImg" className='md:w-[40%]' />
					</div>
				</div>
			) : (
				<div className='md:grid grid-cols-4 gap-5 mt-5'>
					{tasks.map((task) => (
						<div key={task.id} className="bg-gray-100 p-4 mb-2 rounded text-center">
							<div>
								<h3 className="text-xl font-semibold">{task.title}</h3>
								<p className="text-gray-700 md:overflow-auto overflow-scroll">{task.description}</p>
								<p className="text-gray-500">Due Date: {formatDueDate(task.dueDate)}</p>
							</div>
							<button className="bg-green-500 text-white rounded px-2 py-1 mr-2 hover:bg-green-600" onClick={() => handleEditTask(task)}>Edit</button>
							<button className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600" onClick={() => handleDeleteTask(task.id)}>Delete</button>
						</div>
					))}
				</div>
			)}

			<EditTaskModal
				showModal={!!editingTask}
				onClose={() => setEditingTask(null)}
				task={editingTask || { id: '', title: '', description: '' }}
				onSave={handleSaveTask}
			/>
			<div className='text-center'>

				{tasks.length > 0 && (
					<button onClick={handleClearAllTasks} className="bg-red-500 text-white rounded px-4 py-2 my-2 hover:bg-red-600">Clear All Tasks</button>
				)}
			</div>

		</div>
	);
};

export default TaskList;
