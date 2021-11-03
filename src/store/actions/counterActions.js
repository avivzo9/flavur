export function changeCounter(bool) {
    return async dispatch => {
        const action = bool ? { type: 'INC_COUNTER' } : { type: 'DEC_COUNTER' }
        dispatch(action)
    }
}