const INITIAL_STATE = {
    counter: 0
}

export function counterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'INC_COUNTER':
            return {
                ...state,
                counetr: counetr + 1
            }
        case 'DEC_COUNTER':
            return {
                ...state,
                counetr: counetr - 1
            }
        default:
            return state
    }
}