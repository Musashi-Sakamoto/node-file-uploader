import React from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import Form from '../components/Form';
import Navbar from '../components/Navbar';

const LoginForm = (props) => {
  const onLoginClicked = async (username, password) => {
    let res;
    try {
      res = await axios.post('http://localhost:3000/api/v1/login', {
        username,
        password
      });
    }
    catch (error) {
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }
    const { data } = res;

    if (data.token) {
      cookie.set('token', data.token);
      Router.push('/');
    }
  };

  return (
    <React.Fragment>
      <Navbar isLogin />
      <Form onSubmit={onLoginClicked} isLogin />
    </React.Fragment>
  );
};

export default withSnackbar(LoginForm);
