// actions/auth.js

const api = require('../utils/api');
const { setAlert } = require('./alert');
const { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } = require('./types');

// Load User
const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
// Register User
const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/users', formData);
    console.log('API Response:', res);  // Log the response object

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    // Log the entire error response
    console.error('Error:', err);

    // Extract error message safely
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert('An unknown error occurred', 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};


// Login User
const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  try {
    const res = await api.post('/api/auth', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
const logout = () => ({ type: LOGOUT });

module.exports = {
  loadUser,
  register,
  login,
  logout
};
