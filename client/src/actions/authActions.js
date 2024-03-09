import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/register', userData);
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
    }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/login', userData);
        if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('token', token);
            dispatch({ type: 'LOGIN_SUCCESS' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error;
            if (errorMessage === 'User not found') {
                dispatch({ type: 'LOGIN_FAILURE', payload: { email: 'User not found' } });
            } else if (errorMessage === 'Invalid password') {
                dispatch({ type: 'LOGIN_FAILURE', payload: { password: 'Invalid password' } });
            }
        }
    }
};