const initialState = {}

function taskReducer(state, action) {
    switch (action.type) {
        case "GET_TASK":
            return action.payload;
        case "POST_TASK":
            return action.payload;
        case "UPDATE_TASK":
            return action.payload;
        case "DELETE_TASK":
            return state?.filter(data => data._id !== action.payload);
        default:
            return state
    }
}
export {taskReducer, initialState}