import { useState } from 'react';
import TaskPage from './components/TaskPage';
import './App.scss';

function App() {
  const [toggleTheme, setToggleTheme] = useState(false);

  const renderTaskPage = () => (
    <section className='page-content'>
      <TaskPage setToggleTheme={()=>setToggleTheme(prev=>!prev)}/>
    </section>
  )

  return (
    <main>
      <section className={`${!toggleTheme ? "hero-bg-light" : "hero-bg-dark" }`}></section>
      {renderTaskPage()}
    </main>
  )
}

export default App