import Task from './Task';

const TaskList = props => {
  return (
    <article className="task-list">
      <h3>{props.status}</h3>
      {props.tasks.map(task => {
        return (
          <Task key={task.id} task={task} onStatusChange={props.onStatusChange} />
        )} 
      )}
    </article>
  )
}

export default TaskList