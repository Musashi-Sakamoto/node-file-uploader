import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClicked = () => {
    console.log('====================================');
    console.log('login clicked');
    console.log('====================================');
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
      </div>
  );
};

export default LoginForm;
