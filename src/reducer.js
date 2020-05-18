import { Action } from "./actions";

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
            }
        default:
            return state;
    }
}

export default reducer;