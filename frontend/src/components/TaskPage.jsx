import { useState } from 'react';
import TaskList from './TaskList';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed']

const TaskPage = (props) => {
  const [toggleNewCardForm, setToggleNewCardForm] = useState(false)
  const [newCardForm, setNewCardForm] = useState(
    {title: '', description: '',}
  );

  function onCreateTask(e) {
    e.preventDefault()
    props.onCreateTask({
      title: newCardForm.title,
      description: newCardForm.description,
    })
    resetForm()
  }

  function resetForm() {
    setNewCardForm({title: '', description: ''});
    setToggleNewCardForm(false)
  }

  function onInputChange(e) {
    setNewCardForm({...newCardForm, [e.target.name]: e.target.value})
  }

  function renderTaskLists() {
    const { tasks } = props
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status)
      return (
        <TaskList key={status} status={status} tasks={statusTasks} onStatusChange={props.onStatusChange}/>
      )
    })
  }

  return (
    <div className="task-list">
      <div className='toggle-btn-container'>
        <button className="toggle-btn toggle-btn-default" onClick={()=>setToggleNewCardForm(prev=>!prev)}>+ New task</button>
      </div>
      {toggleNewCardForm && (
        <form className="task-list-form" onSubmit={onCreateTask}>
          <input type="text" name='title' value={newCardForm.title} onChange={onInputChange} minLength="5" maxLength="50"placeholder="title" required/>
          <input type="text" name='description' value={newCardForm.description} onChange={onInputChange} minLength="50" maxLength="150" placeholder="description" required/>
          <button type="submit" disabled={newCardForm.title === "" || newCardForm.description === ""}>Save</button>
        </form>
      )}
      <div className="task-lists">{renderTaskLists()}</div>
    </div>
  )
}

export default TaskPage