import { combineReducers } from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';
import socket from './socket.reducer';
import message from './message.reducer';

const rootReducer = combineReducers({
    user,
    login,
    register,
    socket,
    message,
});

export default rootReducer;