import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import TextField from '@material-ui/core/TextField';
import { SnackbarProvider } from 'notistack';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  let shallow;
  let mount;
  beforeEach(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('ログイン画面', () => {
    const wrapper = mount(<SnackbarProvider><Navbar isLogin /></SnackbarProvider>);
    expect(wrapper.find('Button').first().text()).toBe('Signup');
  });

  it('サインアップ画面', () => {
    const wrapper = mount(<SnackbarProvider><Navbar isLogin={false} /></SnackbarProvider>);
    expect(wrapper.find('Button').first().text()).toBe('Login');
  });

  it('ログイン状態', () => {
    const wrapper = mount(<SnackbarProvider><Navbar isLoggedIn /></SnackbarProvider>);
    expect(wrapper.find('Button').first().text()).toBe('Logout');
  });

  it('ログアウトボタン押下', () => {
    const wrapper = mount(<SnackbarProvider><Navbar isLoggedIn /></SnackbarProvider>);
    expect(wrapper.find('Button').first().text()).toBe('Logout');
  });
});
