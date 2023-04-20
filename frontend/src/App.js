import { connect } from 'react-redux';
import { createTask, editTask } from './action';
import TaskPage from './components/TaskPage'
import './App.scss';

const App = ({tasks, dispatch}) => {
  function onCreateTask({title, description}) {
    dispatch(createTask({title, description}))
  }
  function onStatusChange(id, status) {
    dispatch(editTask(id, {status}))
  }

  return (
    <main>
      <TaskPage tasks={tasks} onCreateTask={onCreateTask} onStatusChange={onStatusChange} />
    </main>
  )
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App)
