const SET_SOCKET = "SET_SOCKET"
const REMOVE_SOCKET = "REMOVE_SOCKET"
const SET_ROOM = "SET_ROOM"
const REMOVE_ROOM = "REMOVE_ROOM"

const setSocket = (socket) => ({ type: SET_SOCKET, payload: socket })
const setRoom = (id) => ({ type: SET_ROOM, payload: id })

export default {
    SET_SOCKET,
    REMOVE_SOCKET,
    SET_ROOM,
    REMOVE_ROOM,

    setSocket,
    setRoom
}
