import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import TextField from '@material-ui/core/TextField';
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
    expect(wrapper.find('TextField').length).toBe(2);
    expect(wrapper.find('button').text()).toBe('Login');
  });

  it('サインアップボタン表示', () => {
    const wrapper = mount(<SnackbarProvider><Form isLogin={false} /></SnackbarProvider>);
    expect(wrapper.find('TextField').length).toBe(3);
    expect(wrapper.find('button').text()).toBe('Signup');
  });

  it('テキストを入力するとボタンをクリックした時にコールバック呼び出しされる', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<SnackbarProvider><Form isLogin onSubmit={onSubmit} /></SnackbarProvider>);
    wrapper.find(TextField).first().find('input').simulate('change', {
      target: {
        value: 'username'
      }
    });
    wrapper.find(TextField).at(1).find('input').simulate('change', {
      target: {
        value: 'password'
      }
    });
    wrapper.find('button').simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('テキストを入力しないとボタンをクリックした時にコールバック呼び出しされない', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<SnackbarProvider><Form isLogin onSubmit={onSubmit} /></SnackbarProvider>);
    wrapper.find('button').simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
