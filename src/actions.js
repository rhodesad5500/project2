export const Action = Object.freeze({
    LoadTasks: 'LoadTasks',
    FinishAddingTask: 'FinishAddingTask',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingTask: 'FinishSavingTask',
    FinishDeletingTask: 'FinishDeletingTask',

});

export function loadTasks(tasks) {
    return {
    type: Action.LoadTasks,
    payload: tasks,
    };
}

export function finishAddingTask(task) {
    return {
    type: Action.FinishAddingTask,
    payload: task,
    };
}

export function finishSavingTask(task) {
    return {
    type: Action.FinishSavingTask,
    payload: task,
    };
}

export function finishDeletingTask(task) {
    return {
    type: Action.FinishDeletingTask,
    payload: task,
    };
}

export function enterEditMode(task) {
    return {
    type: Action.EnterEditMode,
    payload: task,
    };
}

export function leaveEditMode(task) {
    return {
    type: Action.LeaveEditMode,
    payload: task,
    };
}


function checkForErrors(response) {
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = 'https://todo-api.duckdns.org:8442';

export function loadDue(date) {
    return dispatch => {
        fetch(`${host}/tasks/${date}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    console.log(data);
                    dispatch(loadTasks(data.tasks));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startAddingTask(date) {
    const task = {due: date, task: ''};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }

    return dispatch => {
        fetch(`${host}/tasks/`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    task.id = data.id;
                    dispatch(finishAddingTask(task));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startSavingTask(task) {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }

    return dispatch => {
        fetch(`${host}/tasks/${task.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    dispatch(finishSavingTask(task));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startDeletingTask(task) {
    const options = {
        method: 'DELETE',
        
    };

    return dispatch => {
        fetch(`${host}/tasks/${task.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    dispatch(finishDeletingTask(task));
                }
            })
            .catch(e => console.error(e));
    };
}