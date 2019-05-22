import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import Form from '../components/Form';
import Navbar from '../components/Navbar';

const SignupForm = (props) => {
  const onSignupClicked = async (name, password) => {
    let res;
    try {
      res = await axios.post('http://localhost:3000/api/v1/users', {
        name,
        password
      });
    }
    catch (error) {
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }
    const { data } = res;

    if (data.user) {
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
