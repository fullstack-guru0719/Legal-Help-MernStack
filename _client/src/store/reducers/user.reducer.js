import { userActions } from '../actions';

const initialState = {
    role: 'guest',
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com'
};

const user = function(state = initialState, action) {
    switch (action.type) {
        case userActions.SET_USER_DATA: {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case userActions.REMOVE_USER_DATA: {
            return {
                ...initialState
            };
        }
        case userActions.USER_LOGGED_OUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
};

export default user;
