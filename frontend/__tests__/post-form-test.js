import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import TextField from '@material-ui/core/TextField';
import { SnackbarProvider } from 'notistack';
import PostForm from '../components/PostForm';

describe('post form', () => {
  let shallow;
  let mount;
  beforeEach(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('新規作成の時の表示', () => {
    const wrapper = mount(<SnackbarProvider><PostForm editedPost={null} isOpen /></SnackbarProvider>);
    expect(wrapper.find('Dialog').find('Button').at(2).text()).toBe('Post');
  });

  it('編集の時の表示', () => {
    const mockPost = {
      id: 1,
      title: 'title',
      description: 'description'
    };
    const wrapper = mount(<SnackbarProvider><PostForm editedPost={mockPost} isOpen /></SnackbarProvider>);
    expect(wrapper.find('Dialog').find('Button').at(2).text()).toBe('Edit');
  });

  it('開く処理', () => {
    const wrapper = mount(<SnackbarProvider><PostForm editedPost={null} isOpen /></SnackbarProvider>);
    expect(wrapper.find('Dialog').find('Portal').exists()).toBe(true);
  });

  it('閉じる処理', () => {
    const onClose = jest.fn();
    const wrapper = mount(<SnackbarProvider><PostForm editedPost={null} onClose={onClose} isOpen /></SnackbarProvider>);
    wrapper.find('Dialog').find('Button').first().simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('テキストフィールドが埋まっている時はcallbackが呼び出される', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<SnackbarProvider><PostForm onSubmit={onSubmit} isOpen={true} /></SnackbarProvider>);
    wrapper.find('TextField').first().find('input').simulate('change', {
      target: {
        value: 'title'
      }
    });
    wrapper.find('TextField').at(1).find('textarea').simulate('change', {
      target: {
        value: 'description'
      }
    });
    wrapper.find('Button').at(2).simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('テキストを入力しないとボタンをクリックした時にコールバック呼び出しされない', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<SnackbarProvider><PostForm onSubmit={onSubmit} isOpen={true} /></SnackbarProvider>);
    wrapper.find('Button').at(2).simulate('click');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // it('プレビュー画像表示', () => {
  //   const onSubmit = jest.fn();
  //   const wrapper = mount(<SnackbarProvider><Form isLogin onSubmit={onSubmit} /></SnackbarProvider>);
  //   wrapper.find(TextField).first().find('input').simulate('change', {
  //     target: {
  //       value: 'username'
  //     }
  //   });
  //   wrapper.find(TextField).at(1).find('input').simulate('change', {
  //     target: {
  //       value: 'password'
  //     }
  //   });
  //   wrapper.find('button').simulate('click');
  //   expect(onSubmit).toHaveBeenCalled();
  // });
});
