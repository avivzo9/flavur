export function incrementeCounter() {
    return async dispatch => {
        const action = { type: 'INC_COUNTER' }
        dispatch(action)
    }
}
export function decrementeCounter() {
    return async dispatch => {
        const action = { type: 'DEC_COUNTER' }
        dispatch(action)
    }
}