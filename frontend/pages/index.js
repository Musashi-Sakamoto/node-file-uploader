import React, { useState, useEffect, useContext } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import { Store } from '../utils/Store';

const styles = () => ({
  root: {
    width: 360,
    margin: 'auto'
  },
  primary: {
    textAlign: 'center'
  },
  secondary: {
    textAlign: 'center'
  }
});

const Index = (props) => {
  console.log(useContext(Store));

  const { state, dispatch } = useContext(Store);

  const { token, classes } = props;
  const [err, setError] = useState('');

  const fetchData = async () => {
    let res;
    try {
      res = await axios.get('http://localhost:3000/api/v1/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    catch (error) {
      if (error.response.status === 401) {
        Router.push('/login');
        return;
      }
      setError(error.response.data.error.message);
    }

    return dispatch({
      type: 'FETCH_DATA',
      payload: res.data.posts
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <List className={classes.root}>
          {state.posts.map((post, i) => (
              <React.Fragment key={i}>
                <ListItem>
                    <ListItemText classes={{
                      primary: classes.primary,
                      secondary: classes.secondary
                    }} primary={post.title} secondary={post.description}/>
                </ListItem>
                <Divider />
              </React.Fragment>

          ))}
      </List>
      {err && (
        <p>{err}</p>
      )}
    </div>
  );
};

Index.getInitialProps = (ctx) => {
  const { token } = cookies(ctx);
  if (ctx.req && !token) {
    ctx.res.writeHead(302, {
      Location: '/login'
    });
    ctx.res.end();
    return;
  }
  if (!token) {
    Router.push('/login');
  }
  return { token };
};

export default withStyles(styles)(Index);
