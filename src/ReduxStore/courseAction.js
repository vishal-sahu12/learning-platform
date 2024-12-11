import axios from 'axios';

export const fetchCourses = () => async (dispatch) => {
    dispatch({ type: 'FETCH_COURSES_REQUEST' });
    try {
        const { data } = await axios.get('/api/student/courses');
        dispatch({ type: 'FETCH_COURSES_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_COURSES_FAILURE', payload: error.response.data.message });
    }
};
