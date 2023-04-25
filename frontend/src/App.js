import { useReducer } from 'react';
import TaskPage from './components/TaskPage';
import './App.scss';
import { initialState, themeReducer } from './reducers/themeReducer';

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const handleThemeToggle = () => {
    if(state === true) {
      dispatch({type: "LIGHT", payload: (prev=>!prev)})
    } else {
      dispatch({type: "DARK", payload: (prev=>!prev)})
    }
  }

  const renderTaskPage = () => (
    <section className='page-content'>
      <TaskPage handleThemeToggle={handleThemeToggle}/>
    </section>
  )

  return (
    <main>
      <section className={`${!state ? "hero-bg-light" : "hero-bg-dark" }`}></section>
      {renderTaskPage()}
    </main>
  )
}

export default App