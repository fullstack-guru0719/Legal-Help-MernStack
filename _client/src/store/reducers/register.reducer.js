import { registerActions } from '../actions';

const initialState = {
    success: false,
    error: ''
};

const register = function (state = initialState, action) {
    switch (action.type) {
        case registerActions.REGISTER_SUCCESS:
            {
                return {
                    ...initialState,
                    success: true,
                    error: ''
                };
            }
        case registerActions.REGISTER_ERROR:
            {
                return {
                    success: false,
                    error: action.payload[0]
                };
            }
        default:
            {
                return state
            }
    }
};

export default register;