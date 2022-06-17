import { socketActions } from '../actions'

const initialState = {
    socket: null,
    roomId: null
}

export default function socketReducer(state = initialState, action) {
    switch (action.type) {
        case socketActions.SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            }

        case socketActions.REMOVE_SOCKET:
            return {
                ...state,
                socket: null
            }

        case socketActions.SET_ROOM:
            return {
                ...state,
                roomId: action.payload
            }
        case socketActions.REMOVE_ROOM:
            return {
                ...state,
                roomId: null
            }
        default:
            return state
    }
}