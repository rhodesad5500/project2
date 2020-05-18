export const Action = Object.freeze({
    LoadTasks: 'LoadTasks',

});

export function loadTasks(tasks) {
    return {
    type: Action.LoadTasks,
    payload: tasks,
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
                    dispatch(loadTasks(data.tasks));
                }
            })
            .catch(e => console.error(e));
    };
}