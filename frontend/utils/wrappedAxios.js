import axios from 'axios';
import cookies from 'js-cookie';
import _ from 'lodash';

axios.interceptors.response.use(response => response, (err) => {
  if (err.response.status === 401) {
    cookies.remove('token');
    return Promise.reject(_.set(err, 'response.data', {
      error: {
        message: 'Token expired! You have to login again'
      }
    }));
  }
  if (!_.has(err, 'response.data')) {
    return Promise.reject(_.set(err, 'response.data', {
      error: {
        message: 'Network Error'
      }
    }));
  }
  return Promise.reject(err);
});

export default axios;
