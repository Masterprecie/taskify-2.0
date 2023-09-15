import { useState } from 'react';
import PropTypes from 'prop-types'

const AddTaskModal = ({ showModal, onClose, onAddTask }) => {
	const [newTask, setNewTask] = useState('');
	const [newTaskDescription, setNewTaskDescription] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [showSubmitError, setShowSubmitError] = useState(false);

	const handleAddTask = () => {
		if (newTask.trim() === '' || newTaskDescription.trim() === '' || dueDate.trim() === '') {
			setShowSubmitError(true);
			return;
		}

		onAddTask(newTask, newTaskDescription, dueDate);
		setNewTask('');
		setNewTaskDescription('');
		setDueDate('');
		setShowSubmitError(false);
		onClose();
	};

	return (
		showModal && (
			<div className="fixed inset-0 flex items-center justify-center z-50 text-center px-6">
				<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
					<div className="modal-content p-4">
						<h2 className="text-2xl font-semibold mb-4">Add Task</h2>
						<input
							type="text"
							placeholder="Task title"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
							className="w-full border rounded p-2 mb-2"
						/>
						<textarea
							placeholder="Task description"
							value={newTaskDescription}
							onChange={(e) => setNewTaskDescription(e.target.value)}
							className="w-full border rounded p-2 mb-2"
						/>
						<input
							type="date"
							placeholder="Due date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="w-full border rounded p-2 mb-4"
						/>
						{showSubmitError && (
							<p className="text-red-600 mb-2">Please fill in both title and description fields.</p>
						)}
						<div className='flex justify-center gap-4'>
							<div>
								<button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600" onClick={handleAddTask}>Add</button>
							</div>
							<div>
								<button className="bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400" onClick={onClose}>Cancel</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

AddTaskModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onAddTask: PropTypes.func.isRequired,
}

export default AddTaskModal;
