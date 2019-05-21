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
    marginTop: 64,
    paddingTop: 100
  },
  formContainer: {
    margin: 'auto'
  },
  TextField: {
    display: 'block'
  },
  button: {
    marginTop: 20
  }
});

const Form = ({ classes, onSubmit, isLogin }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');

  const onSubmitClicked = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      setError('Username or Password should not be blank');
      return;
    }
    onSubmit(username, password);
  };

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
            <Button classes={{ root: classes.button }} onClick={onSubmitClicked}>{isLogin ? 'Login' : 'Signup'}</Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(Form);
