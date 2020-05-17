import React from 'react';

export function Task(props) {
    const task = props.task;


    return(
        <div className="task-container">
            <div className="task">
                <div className="due-date">
                    {task.due}
                </div>
                <div className="task-info">
                    {task.task}
                </div>
            </div>
        </div>
    )
}