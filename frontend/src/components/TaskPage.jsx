import { useReducer, useState } from 'react';
import { initialState, postReducer } from '../reducers/postReducer';
import axios from 'axios';
import TaskList from './TaskList';

const TaskPage = ({setToggleTheme}) => {
  const [dispatch] = useReducer(postReducer, initialState);

  const [newCardForm, setNewCardForm] = useState(
    {title: '', description: '', status: "Pending"}
  );

  function onInputChange(e) {
    setNewCardForm({...newCardForm, [e.target.name]: e.target.value})
  };

  const handlePostTask = async (e) => {
    e.preventDefault()
    try {
      const resp = await axios.post(process.env.REACT_APP_API_URL, newCardForm)
      dispatch({type: "POST_TASK_SUCCESSFUL", payload: resp.data})
      setNewCardForm({title: '', description: ''})
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <section className="task-list">
      <div className='page-header'>
        <h1>Taskgenics</h1>
        <button className="toggle-btn toggle-btn-default" onClick={setToggleTheme()}>Theme</button>
      </div>

      <form className="task-list-form" onSubmit={handlePostTask}>
        <input type="text" name='title' value={newCardForm.title} onChange={onInputChange} minLength="5" maxLength="50"placeholder="title" required/>
        <input type="text" name='description' value={newCardForm.description} onChange={onInputChange} placeholder="description" required/>
        <select name="status" id="status" onChange={onInputChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" disabled={newCardForm.title === "" || newCardForm.description === ""}>Save</button>
      </form>

      <TaskList/>
    </section>
  )
}

export default TaskPage