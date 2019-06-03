import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { SnackbarProvider } from 'notistack';
import Form from '../components/Form';

describe('form', () => {
  let shallow;
  let mount;
  beforeEach(() => {
    shallow = createShallow();
    mount = createMount();
  });
  it('ログインボタン表示', () => {
    const wrapper = mount(<SnackbarProvider><Form isLogin /></SnackbarProvider>);
    expect(wrapper.children().find('TextField').length).toBe(2);
    expect(wrapper.children().find('button').text()).toBe('Login');
  });

  it('サインアップボタン表示', () => {
    const wrapper = mount(<SnackbarProvider><Form isLogin={false} /></SnackbarProvider>);
    expect(wrapper.children().find('TextField').length).toBe(3);
    expect(wrapper.children().find('button').text()).toBe('Signup');
  });
});
