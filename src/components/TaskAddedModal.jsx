import PropTypes from 'prop-types'
import check from '../assets/check.jpg'

const TaskAddedModal = ({ showModal, onClose }) => {
	return (
		showModal && (
			<div className="fixed inset-0 flex items-center justify-center z-50 px-6">
				<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
				<div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
					<div className="modal-content p-4 text-center">
						<div className='flex justify-center'>
							<img src={check} alt="check" className='w-[30%]' />
						</div>
						<h2 className="text-2xl font-semibold mb-4">Task Added Successfully</h2>
						<button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600" onClick={onClose}>Close</button>
					</div>
				</div>
			</div>
		)
	);
};
TaskAddedModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}
export default TaskAddedModal;
