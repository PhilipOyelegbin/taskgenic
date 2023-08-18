import { useEffect, useReducer, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import { initialState, taskReducer } from "../reducers/taskReducer";

const TASK_STATUSES = ['Pending', 'In Progress', 'Completed']

const TaskList = ({handleGetTask, state}) => {
  const [, dispatch] = useReducer(taskReducer, initialState);

  const [newStatus, setNewStatus] = useState("");
  const [statusId, setStatusId] = useState("");
  const [hasChanged, setHasChanged] = useState(false)

  const onStatusChange = async(e) => {
    setNewStatus({[e.target.name]: e.target.value})
    setHasChanged(true)
  }

  const handleDeleteTask = async(_id) => {
    try {
      const resp = await axios.delete(`${process.env.REACT_APP_API_URL+"/"+_id}`)
      dispatch({type: "DELETE_TASK", payload: resp.data})
      toast.success("Task deleted successfully")
      handleGetTask()
    } catch (error) {
      error && toast.error("Unable to delete task")
    }
  }

  useEffect(() => {
    if(hasChanged) {
      try {
        const resp = axios.patch(`${process.env.REACT_APP_API_URL+"/"+statusId}`, newStatus)
        dispatch({type: "UPDATE_TASK", payload: resp.data})
        toast.success("Task updated successfully")
      } catch (error) {
        error && toast.error("Unable to update task")
      }
    }
    handleGetTask()
    setHasChanged(false)
  }, [hasChanged, newStatus, statusId, handleGetTask])

  return (
    <article className="task-container">
      {state?.todo?.length > 0 && state?.todo?.map(task => (
        <div className="task" key={task._id}>
          <div>
            <h4>{task.title}</h4>
            <select name="status" id="status" value={task.status} onChange={onStatusChange} onClick={() => setStatusId(task._id)}>
              {TASK_STATUSES?.map(status => (<option value={status} key={status}>{status}</option>))}
            </select>
          </div>
          <hr />
          <p>{task.description}</p>
          <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </article>
  )
}

export default TaskList