import React, {useEffect} from 'react';
import './App.css';
import {Task} from './Task';
import {useSelector, useDispatch} from 'react-redux';
import {loadTasks, loadDue} from './actions';


function App() {

  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadDue("2020-05-20"));
  }, [dispatch]);


  return (
    <div className="task-root">

      {tasks.map(task => <Task key = {task.id} task = {task} />)}
    </div>
  );
}

export default App;
