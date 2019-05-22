import React, { useState, useEffect, useContext } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';

import { Store } from '../utils/Store';
import Navbar from '../components/Navbar';
import PostForm from '../components/PostForm';

const styles = () => ({
  root: {
    position: 'relative'
  },
  list: {
    marginTop: 64,
    width: 400,
    margin: 'auto'
  },
  textRoot: {
    width: 240
  },
  primary: {
    textAlign: 'center'
  },
  secondary: {
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  fab: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: 400,
    bottom: 50
  },
  delete: {
    height: 40,
    width: 40
  },
  edit: {
    marginLeft: 20,
    height: 40,
    width: 40
  },
  pagerContainer: {
    display: 'block',
    width: 280,
    margin: 'auto',
    paddingLeft: 15,
    paddingRight: 15
  },
  pager: {
    display: 'inline-block',
    textAlign: 'center',
    width: 30
  },
  pagerLink: {
    outline: 'none'
  },
  previous: {
    display: 'inline-block',
    textAlign: 'center',
    width: 30
  },
  previousLink: {
    outline: 'none'
  },
  nextLink: {
    outline: 'none'
  },
  next: {
    textAlign: 'center',
    width: 30,
    display: 'inline-block'
  },
  disable: {
    color: 'gray'
  },
  active: {
    color: 'white',
    backgroundColor: 'black'
  },
  activeLink: {
    outline: 'none'
  }
});

const Index = (props) => {
  console.log(useContext(Store));

  const { state, dispatch } = useContext(Store);

  const { token, classes } = props;
  const [err, setError] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    let res;
    try {
      res = await axios.get('http://localhost:3000/api/v1/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: 20,
          offset
        }
      });
      setPageCount(Math.ceil(res.data.posts.count / 20));
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
      payload: res.data.posts.rows
    });
  };

  const updateData = post => () => {
    setSelectedPost(post);
    setOpen(true);
  };

  const editData = async (title, description) => {
    let res;
    try {
      res = await axios.put(`http://localhost:3000/api/v1/posts/${selectedPost.id}`, { title, description }, {
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
    setOpen(false);
    fetchData();
  };

  const deleteData = id => async () => {
    let res;
    try {
      res = await axios.delete(`http://localhost:3000/api/v1/posts/${id}`, {
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
    fetchData();
  };

  const postData = async (title, description) => {
    let res;
    try {
      res = await axios.post('http://localhost:3000/api/v1/posts', { title, description }, {
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
    setOpen(false);
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handlePageClick = (data) => {
    const { selected } = data;
    const num = Math.ceil(selected * 20);
    setOffset(num);
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  return (
    <div className={classes.root}>
      <Navbar isLoggedIn token={token}/>

      <PostForm editedPost={selectedPost} isOpen={isOpen} onClose={handleClose} onSubmit={selectedPost ? editData : postData} />

      <List className={classes.list}>
          {state.posts.map((post, i) => (
              <React.Fragment key={i}>
                <ListItem>
                    <ListItemText classes={{
                      root: classes.textRoot,
                      primary: classes.primary,
                      secondary: classes.secondary
                    }} primary={post.title} secondary={post.description}/>
                    <Fab className={classes.delete} size='small' onClick={deleteData(post.id)}>
                      <DeleteIcon />
                    </Fab>
                    <Fab className={classes.edit} size='small' onClick={updateData(post)}>
                      <EditIcon />
                    </Fab>
                </ListItem>
                <Divider />
              </React.Fragment>
          ))}
      </List>

      <Fab className={classes.fab} onClick={() => setOpen(true)}>
          <AddIcon />
      </Fab>
      <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={classes.pagerContainer}
          pageClassName={classes.pager}
          pageLinkClassName={classes.pagerLink}
          previousClassName={classes.previous}
          previousLinkClassName={classes.previousLink}
          nextLinkClassName={classes.nextLink}
          nextClassName={classes.next}
          activeClassName={classes.active}
          activeLinkClassName={classes.activeLink}
          disabledClassName={classes.disable}
        />

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
