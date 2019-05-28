import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import Form from '../components/Form';
import Navbar from '../components/Navbar';

import { BACKEND_URL } from '../utils/const';

const SignupForm = (props) => {
  const onSignupClicked = async (email, name, password) => {
    let res;
    try {
      res = await axios.post(`${BACKEND_URL}/users`, {
        name,
        password,
        email
      });
    }
    catch (error) {
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }
    const { data } = res;

    if (data.user) {
      props.enqueueSnackbar('Please confirm yourself in the email', { variant: 'info' });
      Router.push('/login');
    }
  };

  return (
    <React.Fragment>
      <Navbar isLogin={false} />
      <Form onSubmit={onSignupClicked} isLogin={false} />
    </React.Fragment>
  );
};

export default withSnackbar(SignupForm);
