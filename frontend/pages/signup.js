import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Form from '../components/Form';

const SignupForm = () => {
  const [err, setError] = useState('');

  const onSignupClicked = async (name, password) => {
    let res;
    try {
      res = await axios.post('http://localhost:3000/api/v1/users', {
        name,
        password
      });
    }
    catch (error) {
      setError(error.response.data.error.message);
      return;
    }
    const { data } = res;

    if (data.user) {
      setError('');
      Router.push('/login');
    }
  };

  return (
    <React.Fragment>
    <Link href="/login">
        Login
    </Link>
      <Form onSubmit={onSignupClicked} isLogin={false} />
      {err && (
        <p>{err}</p>
      )}
    </React.Fragment>
  );
};

export default SignupForm;
