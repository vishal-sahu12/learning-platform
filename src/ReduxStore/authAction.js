import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
        const { data } = await axios.post('/api/auth/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token: data.token } });
        localStorage.setItem('token', data.token); // Persist token
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};
