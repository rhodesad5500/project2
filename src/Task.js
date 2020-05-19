import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingTask, startDeletingTask} from './actions';

export function Task(props) {
    const task = props.task;
    const dispatch = useDispatch();
    const [due, setDue] = useState(task.due);
    const [info, setInfo] = useState(task.task);
    //code for coloring text appropriately based on due date (RED for task due within next 3 days, YELLOW for next week, GREEN for everything else)
    const today = new Date();
    const dueDay = new Date(task.due.split('T')[0]);
    const thisWeek = new Date(dueDay.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisFewDays = new Date(dueDay.getTime() - 3 * 24 * 60 * 60 * 1000);
    let taskClass = "task";
    
    if(today > thisFewDays)
    {
        taskClass = "task-red";
    }
    else if(today > thisWeek)
    {
        taskClass = "task-yell";
    }
   

    const onEdit = () => {
        dispatch(enterEditMode(task));
    }

    const onCancel = () => {
        dispatch(leaveEditMode(task));
    }

    const onSave = () => {
        dispatch(startSavingTask({
            id: task.id,
            due,
            task: info,
        }));
    };

    const onDelete = () => {
        dispatch(startDeletingTask(task));
    }

    if(task.isEditing){
        return (
            <div className="task-container">
                <div className={taskClass}>
                    <div className="due-date">
                       <input type="date" value={due} onChange ={e =>
                        setDue(e.target.value)}/>
                       <button onClick={onSave} className="save-button">Save</button>
                       <button onClick={onCancel} className="cancel-button">Cancel</button>
                       <button onClick={onDelete} className="delete-button">Delete</button>
                    </div>
                    <div className="task-info">
                        <textarea value={info} onChange ={e =>
                        setInfo(e.target.value)}/>
                    </div>
                </div>
            </div>  
        )
    }
    else{
        return(
            <div className="task-container">
                <div className={taskClass}>
                    <div className="due-date">
                        Due: {task.due.split('T')[0]}
                    </div>
                    <button onClick={onEdit} className="edit-button">Edit</button>
                    <div className="task-info">
                        {task.task}
                    </div>
                </div>
            </div>
        );
    }
}