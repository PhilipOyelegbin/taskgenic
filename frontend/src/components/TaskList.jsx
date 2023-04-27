import { useEffect, useReducer, useState } from "react"
import { initialState, taskReducer } from "../reducers/taskReducer";
import axios from "axios";

const TASK_STATUSES = ['Pending', 'In Progress', 'Completed']

const TaskList = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const [newStatus, setNewStatus] = useState("Pending");

  const onStatusChange = async (e) => {
    setNewStatus({[e.target.name]: e.target.value})
  }

  const handleGetTask = async () => {
    try {
      const resp = await axios.get(process.env.REACT_APP_API_URL)
      dispatch({type: "GET_TASK", payload: resp.data})
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateTask = async (_id) => {
    try {
      const resp = await axios.patch(`${process.env.REACT_APP_API_URL+"/"+_id}`, newStatus)
      console.log(resp.data);
      dispatch({type: "UPDATE_TASK", payload: resp.data})
      handleGetTask()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTask = async (_id) => {
    try {
      const resp = await axios.delete(`${process.env.REACT_APP_API_URL+"/"+_id}`)
      dispatch({type: "DELETE_TASK", payload: resp.data})
      handleGetTask()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetTask();
  }, [])

  return (
    <article className="task-lists">
      <div className="task-list">
        {state?.length > 0 && state?.map(task => (
          <div className="task" key={task._id}>
            <div>
              <h4>{task.title}</h4>
              <select name="status" id="status" value={task.status} onChange={onStatusChange}>
                {TASK_STATUSES?.map(status=>(<option value={status} key={status} onClick={() => handleUpdateTask(task._id)}>{status}</option>))}
              </select>
            </div>
            <hr />
            <p>{task.description}</p>
            <span onClick={() => handleDeleteTask(task._id)} className="btn">Delete</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default TaskList