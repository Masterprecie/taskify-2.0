
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

const EditTaskModal = ({ showModal, onClose, task, onSave }) => {
	const [editedTitle, setEditedTitle] = useState('');
	const [editedDescription, setEditedDescription] = useState('');
	const [editedDueDate, setEditedDueDate] = useState('');

	// Set the initial values when the task prop changes
	useEffect(() => {
		setEditedTitle(task.title || ''); // Use an empty string as a fallback
		setEditedDescription(task.description || ''); // Use an empty string as a fallback
		setEditedDueDate(task.dueDate || ''); // Use an empty string as a fallback
	}, [task]);

	const handleSave = () => {
		onSave(task.id, editedTitle, editedDescription, editedDueDate);
	};

	return (
		showModal && (
			<div className="fixed inset-0 flex items-center justify-center z-50 text-center px-6">
				<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
					<div className="modal-content p-4">
						<h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
						<input
							type="text"
							value={editedTitle}
							onChange={(e) => setEditedTitle(e.target.value)}
							className="w-full border rounded p-2 mb-2"
						/>
						<textarea
							value={editedDescription}
							onChange={(e) => setEditedDescription(e.target.value)}
							className="w-full border rounded p-2 mb-4"
						/>
						<input
							type="date"
							value={editedDueDate}
							onChange={(e) => setEditedDueDate(e.target.value)}
							className="w-full border rounded p-2 mb-4"
						/>
						<button className="bg-blue-500 text-white rounded px-4 py-2 mr-2 hover:bg-blue-600" onClick={handleSave}>Save</button>
						<button className="bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400" onClick={onClose}>Cancel</button>
					</div>
				</div>
			</div>
		)
	);
};

EditTaskModal.propTypes = {
	showModal: PropTypes.bool.isRequired, // Example prop validation for a boolean prop
	onClose: PropTypes.func.isRequired, // Example prop validation for a function prop
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		description: PropTypes.string,
		dueDate: PropTypes.string,
	}).isRequired, // Example prop validation for an object prop
	onSave: PropTypes.func.isRequired, // Example prop validation for a function prop
};

export default EditTaskModal;
