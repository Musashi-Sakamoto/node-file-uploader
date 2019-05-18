import React, { useState } from 'react';
import cookies from 'next-cookies';
import Router from 'next/router';

const Index = () => (
    <div>
        <p>Hello Next.js</p>
    </div>
);

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
  return token;
};

export default Index;
