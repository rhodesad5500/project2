import React from 'react';
import './App.css';
import {Task} from './Task';

const tasks = [
  {id: 3, due: '2020-05-20', task: "Finish up project 2 for CS268."},
  {id: 2, due: '2020-05-30', task: "Sit poolside and sip on a drink with a little umbrella in it."},
  {id: 1, due: '2020-09-04', task: "Start another year of school."}
];


function App() {
  return (
    <div className="task-root">
      {tasks.map(task => <Task task = {task} />)}
    </div>
  );
}

export default App;
