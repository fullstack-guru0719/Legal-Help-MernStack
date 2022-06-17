import { loginActions } from '../actions';

const initialState = {
    success: false,
    error: '',
    questions: []
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case loginActions.LOGIN_SUCCESS:
            {
                return {
                    ...state,
                    success: true,
                    error: []
                };
            }
        case loginActions.LOGIN_ERROR:
            {
                return {
                    ...state,
                    success: false,
                    error: action.payload[0]
                };
            }

        case loginActions.ADD_QUESTION:
            {
                return {
                    ...state,
                    questions: state.questions.concat(action.payload)
                }
            }
        case loginActions.REMOVE_QUESTION:
            {
                return {
                    ...state,
                    questions: []
                }
            }
        default:
            {
                return state
            }
    }
};

export default login;