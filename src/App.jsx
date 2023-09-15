
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="w-full">
      <div className='text-center py-4 px-5'>
        <h1 className='text-3xl font-bold'>Taskify</h1>
        <p className="text-center font-semibold text-xl text-gray-900 mb-4">Welcome to your task management app. Start organizing your tasks now!</p>
      </div>
      <TaskList />
    </div>
  );
}

export default App;
