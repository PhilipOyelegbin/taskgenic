import { useReducer } from 'react';
import TaskPage from './components/TaskPage';
import './App.scss';
import { initialState, themeReducer } from './reducers/themeReducer';

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const handleThemeToggle = () => {
    if(state === true) {
      dispatch({type: "LIGHT", payload: false})
    } else {
      dispatch({type: "DARK", payload: true})
    }
  }

  !state ? document.getElementById("theme").classList.add("dark-theme") : document.getElementById("theme").classList.remove("dark-theme");

  const renderTaskPage = () => (
    <section className='page-content'>
      <TaskPage theme={state} handleThemeToggle={handleThemeToggle}/>
    </section>
  )

  return (
    <main>
      <section className={`${state ? "hero-bg-light" : "hero-bg-dark" }`}></section>
      {renderTaskPage()}
    </main>
  )
}

export default App