import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = () => ({
  container: {
    display: 'flex',
    paddingTop: 100
  },
  formContainer: {
    margin: 'auto'
  },
  TextField: {
    display: 'block'
  }
});

const LoginForm = (props) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');

  const onLoginClicked = async () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
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
      cookie.set('token', data.token);
      Router.push('/');
    }
  };

  const { classes } = props;

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
           <TextField
           className={classes.TextField}
           label="username"
            value={username}
            onChange={e => setUserName(e.target.value)}
            placeholder="User Name"
            type="text"
            name="username"
            required />
           <TextField
            className={classes.TextField}
           label="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            name="password"
            required />
            <Button onClick={onLoginClicked}>Submit</Button>
            {err && (
              <p>{err}</p>
            )}
      </div>
    </div>
  );
};

export default withStyles(styles)(LoginForm);
