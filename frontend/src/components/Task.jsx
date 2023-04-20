const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed']

const Task = props => {
  return (
    <div className="task">
      <div>
        <h4>{props.task.title}</h4>
        <select value={props.task.status} onChange={onStatusChange}>
          {TASK_STATUSES?.map(status=>(<option value={status} key={status}>{status}</option>))}
        </select>
      </div>
      <hr />
      <p>{props.task.description}</p>
    </div>
  )

  function onStatusChange(e) {
    props.onStatusChange(props.task.id, e.target.value)
  }
}

export default Task;
