import {Action} from "./actions";

const initialState = {
    isWaiting: false,
    tasks : [],
};



function reducer(state = initialState, action) {
    switch(action.type) {
        case Action.LoadTasks:
            return {
                ...state,
                tasks: action.payload,
            };
        case Action.FinishAddingTask:
            return {
                ...state,
                tasks: [{...action.payload, isEditing: true}, ...state.tasks],
            };
        case Action.LeaveEditMode:
        return {
             ...state,
            tasks: state.tasks.map(task => {
                if(task.id === action.payload.id){
                    return {...task, isEditing: undefined};
                }
                else{
                    return task;
                }
            
            }),
        };
        case Action.FinishSavingTask:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if(task.id === action.payload.id){
                        return action.payload;
                    }
                    else{
                        return task;
                    }
            
             }),
         };
         case Action.FinishDeletingTask:
            return {
                ...state,
               tasks: state.tasks.filter(task => task.id !== action.payload.id)
         };
        case Action.EnterEditMode:
        return {
             ...state,
            tasks: state.tasks.map(task => {
                if(task.id === action.payload.id){
                    return {...task, isEditing: true};
                }
                else{
                    return task;
                }
            
            }),
        };
        default:
            return state;
    }
}

export default reducer;