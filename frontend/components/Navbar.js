import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  button: {
    marginTop: 20
  }
};

const Navbar = (props) => {
  const { classes, isLogin } = props;
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Diary
          </Typography>
            <Link href={isLogin ? '/signup' : '/login'}>
                <Button classes={{ root: classes.button }} color="inherit">
                    {isLogin ? 'Signup' : 'Login'}
                </Button>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Navbar);
