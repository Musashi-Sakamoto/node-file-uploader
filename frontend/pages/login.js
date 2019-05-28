import React, { useEffect } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import Form from '../components/Form';
import Navbar from '../components/Navbar';

import { BACKEND_URL } from '../utils/const';

const LoginForm = (props) => {
  const onLoginClicked = async (username, password) => {
    let res;
    try {
      res = await axios.post(`${BACKEND_URL}/login`, {
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

  useEffect(() => {
    if (props.confirmation) {
      props.enqueueSnackbar('User confirmed!', { variant: 'success' });
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar isLogin />
      <Form onSubmit={onLoginClicked} isLogin />
    </React.Fragment>
  );
};

LoginForm.getInitialProps = (ctx) => {
  if (ctx.req) {
    const { confirmation } = ctx.query;
    return { confirmation };
  }
  return {};
};

export default withSnackbar(LoginForm);
