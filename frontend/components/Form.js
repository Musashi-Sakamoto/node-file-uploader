import React, { useState } from 'react';
import { withSnackbar } from 'notistack';
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

const Form = ({
  classes, onSubmit, isLogin, enqueueSnackbar
}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitClicked = () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      enqueueSnackbar('Username or Password should not be blank', { variant: 'error' });
      return;
    }
    if (!isLogin && email.trim().length === 0) {
      enqueueSnackbar('email should not be blank', { variant: 'error' });
      return;
    }
    if (isLogin) {
      onSubmit(username, password);
    }
    else {
      onSubmit(email, username, password);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
          {!isLogin && (
            <TextField
            className={classes.TextField}
            label="email"
             value={email}
             onChange={e => setEmail(e.target.value)}
             placeholder="email"
             type="text"
             name="email"
             required />
          )}
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

export default withSnackbar(withStyles(styles)(Form));
