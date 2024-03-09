const initialState = {
    isAuthenticated: false,
    user: null,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case 'REGISTER_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                token: action.payload.token
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: action.payload
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null
            };
        default:
            return state;
    }
};

export default authReducer;
