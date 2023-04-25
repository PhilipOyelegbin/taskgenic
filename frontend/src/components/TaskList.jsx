import { useEffect, useReducer } from "react"
import { getReducer, initialState } from "../reducers/getReducer"
import { deleteReducer } from "../reducers/deleteReducer";

const TASK_STATUSES = ['Pending', 'In Progress', 'Completed']

const TaskList = () => {
  const [state, dispatch] = useReducer(getReducer, initialState);
  const [deleteState = state , deleteDispatch = dispatch] = useReducer(deleteReducer, initialState);

  function onStatusChange(e) {
    onStatusChange(state.tasks.id, e.target.value)
  }

  const handleDeleteTask = async () => {
    try {
      // await axios.delete(process.env.REACT_APP_API_URL, id)
      deleteDispatch({type: "DELETE_TASK_SUCCESSFUL", payload: deleteState.tasks.title})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(resp => resp.json())
      .then(data => dispatch({type: "SUCCESSFUL", payload: data}))
      .catch(error => dispatch({type: "REJECTED"}))
  }, [])

  return (
    <article className="task-lists">
      {state.loading ? <p>Loading data...</p> : state.error && <p>{state.error}</p>}
      <div className="task-list">
        {!state.tasks.length < 1 && state.tasks?.map(task => (
          <div className="task" key={task._id}>
            <div>
              <h4>{task.title}</h4>
              <select value={task.status} onChange={onStatusChange}>
                {TASK_STATUSES?.map(status=>(<option value={status} key={status}>{status}</option>))}
              </select>
            </div>
            <hr />
            <p>{task.description}</p>
            <span onClick={handleDeleteTask} className="btn">Delete</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default TaskList