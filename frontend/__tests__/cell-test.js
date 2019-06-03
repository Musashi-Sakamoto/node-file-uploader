import React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Cell from '../components/PostCell';

describe('Post Cell', () => {
  let shallow;
  let mount;
  beforeEach(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('セルにポストが上手く表示されているか', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const mockPost = {
      id: 1,
      title: 'title',
      description: 'description'
    };
    const wrapper = mount(<Cell post={mockPost} onDelete={onDelete} onEdit={onEdit} />);
    expect(wrapper.find('ListItemText').find('Typography').first().text()).toBe(mockPost.title);
    wrapper.find('ListItem').first().simulate('click');
    expect(wrapper.find('Collapse').find('Typography').first().text()).toBe(mockPost.description);
  });

  it('セルに写真が上手く表示されているか', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const mockPost = {
      id: 1,
      title: 'title',
      description: 'description',
      presignedUrl: `${__dirname}/assets/test.jpeg`,
      mediaType: 'image'
    };
    const wrapper = mount(<Cell post={mockPost} onDelete={onDelete} onEdit={onEdit} />);
    wrapper.find('ListItem').first().simulate('click');
    expect(wrapper.find('img').length).toBe(1);
  });

  it('セルにビデオが上手く表示されているか', () => {
    const spy = jest
      .spyOn(window.HTMLMediaElement.prototype, 'load')
      .mockImplementation(() => {});
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const mockPost = {
      id: 1,
      title: 'title',
      description: 'description',
      presignedUrl: `${__dirname}/assets/test.mp4`,
      mediaType: 'video'
    };
    const wrapper = mount(<Cell post={mockPost} onDelete={onDelete} onEdit={onEdit} />);
    wrapper.find('ListItem').first().simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('ReactPlayer').length).toBe(1);
    spy.mockRestore();
  });

  it('セルボタンを押した時にコールバックが呼ばれているか', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const mockPost = {
      id: 1,
      title: 'title',
      description: 'description'
    };
    const wrapper = mount(<Cell onDelete={onDelete} onEdit={onEdit} post={mockPost} />);
    wrapper.find('Fab').first().simulate('click');
    expect(onDelete).toHaveBeenCalled();
    wrapper.find('Fab').at(1).simulate('click');
    expect(onEdit).toHaveBeenCalled();
  });
});
