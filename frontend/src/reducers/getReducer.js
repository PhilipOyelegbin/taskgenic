const initialState = {loading: true, tasks: {}, error: ""}

function getReducer(state, action) {
    switch (action.type) {
        case "SUCCESSFUL":
            return {
                loading: false,
                tasks: action.payload,
                error: ""
            }
        case "REJECTED":
            return {
                loading: false,
                tasks: {},
                error: "Failed"
            }
        default:
            return state
    }
}
export {getReducer, initialState}