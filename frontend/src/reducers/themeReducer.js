const initialState = true

function themeReducer(state, action) {
    switch (action.type) {
        case "LIGHT":
            return action.payload
        case "DARK":
            return action.payload
        default:
            return state
    }
}
export {themeReducer, initialState}