import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');

  const onLoginClicked = async () => {
    if (username.trim().length === 0 && password.trim().length === 0) {
      setError('Username or Password should not be blank');
      return;
    }
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
      localStorage.setItem('token', data.token);
      Router.push('/');
    }
  };

  return (
      <div>
           <input
            value={username}
            onChange={e => setUserName(e.target.value)}
            placeholder="User Name"
            type="text"
            name="username"
            required />
           <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            required />
            <button onClick={onLoginClicked}>Submit</button>
            {err && (
              <p>{err}</p>
            )}
      </div>
  );
};

export default LoginForm;
