const initialState = {loading: true, tasks: {}, error: ""}

function deleteReducer(state, action) {
    switch (action.type) {
        case "DELETE_TASK_SUCCESSFUL":
            return {
                loading: false,
                tasks: state?.filter(data => data.title !== action.payload),
                error: ""
            }
        case "DELETE_TASK_REJECTED":
            return {
                loading: false,
                tasks: {},
                error: "Failed"
            }
        default:
            return state
    }
}
export {deleteReducer, initialState}

// const taskReducer = async(state, action) => {
//     switch (action.type) {
//         case "UPDATE_TASK":
//             return [
//                 ...state,
//                 action.payload
//             ];
//         default:
//             return state;
//     }
// }