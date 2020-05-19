import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingTask} from './actions';

export function Task(props) {
    const task = props.task;
    const dispatch = useDispatch();
    const [due, setDue] = useState(task.due);
    const [info, setInfo] = useState(task.task);


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
    }

    if(task.isEditing){
        return (
            <div className="task-container">
                <div className="task">
                    <div className="due-date">
                       <input type="date" value={due} onChange ={e =>
                        setDue(e.target.value)}/>
                       <button onClick={onSave}>Save</button>
                       <button onClick={onCancel}>Cancel</button>
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
                <div className="task">
                    <div className="due-date">
                        {task.due}
                    </div>
                    <button onClick={onEdit}>edit</button>
                    <div className="task-info">
                        {task.task}
                    </div>
                </div>
            </div>
        );
    }
}