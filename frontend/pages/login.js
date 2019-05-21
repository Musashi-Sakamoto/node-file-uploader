import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import Form from '../components/Form';
import Navbar from '../components/Navbar';

const LoginForm = () => {
  const [err, setError] = useState('');

  const onLoginClicked = async (username, password) => {
    let res;
    try {
      res = await axios.post('http://localhost:3000/api/v1/login', {
        username,
        password
      });
    }
    catch (error) {
      setError(error.response.data.error.message);
      return;
    }
    const { data } = res;

    if (data.token) {
      setError('');
      cookie.set('token', data.token);
      Router.push('/');
    }
  };

  return (
    <React.Fragment>
      <Navbar isLogin />
      <Form onSubmit={onLoginClicked} isLogin />
      {err && (
        <p>{err}</p>
      )}
    </React.Fragment>
  );
};

export default LoginForm;
