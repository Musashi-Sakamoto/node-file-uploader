import React, { useState, useEffect } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';
import axios from 'axios';

const Index = (props) => {
  const [err, setError] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res;
      try {
        res = await axios.get('http://localhost:3000/api/v1/posts', {
          headers: {
            Authorization: `Bearer ${props.token}`
          }
        });
      }
      catch (error) {
        if (error.response.status === 401) {
          Router.push('/login');
          return;
        }
        setError(error.response.data.error.message);
        return;
      }
      const { data } = res;
      console.log(data.posts);
    };
    fetchData();
  }, [posts, props.token]);

  return (
    <div>
      <p>Hello Next.js</p>
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
