import React, {useEffect} from 'react';
import './App.css';
import {Task} from './Task';
import {useSelector, useDispatch} from 'react-redux';
import {loadDue, startAddingTask} from './actions';


const initialDate = new Date();
const year = initialDate.getFullYear();
const month = initialDate.getMonth() + 2;
const day = initialDate.getDate();
const date = year + "-" + month + "-" + day;

function App() {

  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadDue(date));
  }, [dispatch]);

  const onAdd = () => {
    dispatch(startAddingTask(date));
  }


  return (
    <div className="task-root">
      <h2>To-Do List</h2>
      <button onClick={onAdd} className="new-button">New Task</button>
      {tasks.map(task => <Task key = {task.id} task = {task} />)}
    </div>
  );
}

export default App;
