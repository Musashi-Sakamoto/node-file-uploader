import React, { useState, useEffect } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';
import axios from 'axios';

const Index = (props) => {
  const { token } = props;
  const [err, setError] = useState('');
  const [posts, setPosts] = useState([]);

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

    setPosts(res.data.posts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>{posts.length}</p>
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

export default Index;
