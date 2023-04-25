const initialState = {loading: true, tasks: {}, error: ""}

function postReducer(state, action) {
    switch (action.type) {
        case "POST_TASK_SUCCESSFUL":
            return {
                loading: false,
                tasks: [
                    ...state,
                    action.payload
                ],
                error: ""
            }
        case "POST_TASK_REJECTED":
            return {
                loading: false,
                tasks: {},
                error: "Failed"
            }
        default:
            return state
    }
}
export {postReducer, initialState}