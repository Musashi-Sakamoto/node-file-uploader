import React, { useState, useEffect, useContext } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
import { withSnackbar } from 'notistack';
import axios from '../utils/wrappedAxios';

import { Store } from '../utils/Store';
import Navbar from '../components/Navbar';
import PostForm from '../components/PostForm';
import AlertDialog from '../components/AlertDialog';
import PostCell from '../components/PostCell';

import { BACKEND_URL } from '../utils/const';

const styles = theme => ({
  root: {
    position: 'relative'
  },
  list: {
    marginTop: 64,
    width: 400,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 320
    }
  },
  fab: {
    position: 'fixed',
    top: 'auto',
    left: 'auto',
    right: 50,
    bottom: 50,
    [theme.breakpoints.down('sm')]: {
      right: 10,
      bottom: 10
    }
  },
  pagerContainer: {
    display: 'block',
    width: 280,
    margin: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center'
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
  const { state, dispatch } = useContext(Store);

  const { token, classes } = props;
  const [isOpen, setOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    let res;
    try {
      res = await axios.get(`${BACKEND_URL}/posts`, {
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
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }

    return dispatch({
      type: 'FETCH_DATA',
      payload: res.data.posts
    });
  };

  const updateData = post => () => {
    setSelectedPost(post);
    setOpen(true);
  };

  const editData = async (title, description, file) => {
    let res;
    try {
      res = await axios.put(`${BACKEND_URL}/posts/${selectedPost.id}`, { title, description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (file) {
        const form = new FormData();
        form.append('image', file, selectedPost.id);
        await axios.post(`${BACKEND_URL}/images`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
    }
    catch (error) {
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }
    props.enqueueSnackbar(`${title} has been updated!`, { variant: 'success' });
    setOpen(false);
    setSelectedPost(null);
    fetchData();
  };

  const deleteModal = post => () => {
    setSelectedPost(post);
    setDeleteOpen(true);
  };

  const deleteData = async () => {
    let res;
    setDeleteOpen(false);
    try {
      res = await axios.delete(`${BACKEND_URL}/posts/${selectedPost.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    catch (error) {
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }
    props.enqueueSnackbar(`${selectedPost.title} has been deleted!`, { variant: 'success' });
    setSelectedPost(null);
    fetchData();
  };

  const postData = async (title, description, file) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/posts`, { title, description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (file) {
        const form = new FormData();
        form.append('image', file, res.data.post.id);
        await axios.post(`${BACKEND_URL}/images`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
    }
    catch (error) {
      props.enqueueSnackbar(error.response.data.error.message, { variant: 'error' });
      return;
    }
    props.enqueueSnackbar(`${title} has been created!`, { variant: 'success' });
    setOpen(false);
    fetchData();
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setSelectedPost(null);
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
      <AlertDialog deletedPost={selectedPost} isOpen={isDeleteOpen} onClose={handleDeleteClose} onSubmit={deleteData} />

      <List className={classes.list}>
          {state.posts.map((post, i) => (
              <PostCell key={i} post={post} onDelete={deleteModal} onEdit={updateData} />
          ))}
      </List>

      <Fab color='primary' className={classes.fab} onClick={() => setOpen(true)}>
          <AddIcon />
      </Fab>
      {state.count > 20 && (
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

export default withSnackbar(withStyles(styles)(Index));
