import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'react-jss';
import AppStyled, { App } from './index';
import Profile from '../Profile';
import Comments from '../Comments';
import theme from '../../theme';
import { loadData } from '../../dataSources';
jest.mock('../../dataSources');

const source = {
  profile: {
    imgSrc: './harvey-specter.jpg',
    name: 'Harvey Specter',
    city: 'New York',
    country: 'USA',
    likes: 121,
    following: 723,
    followers: 4433,
  },
  commentList: [],
};
loadData.mockImplementation(() => source);

const mockAlert = jest.fn();
window.alert = mockAlert;

const dateNowMock = 1487076708000;
let dateNowSpy;

describe('<App />', () => {
  test('mounting without crash', async () => {
    const wrapper = await mount(
      <ThemeProvider theme={theme}>
        <AppStyled classes={{}} />
      </ThemeProvider>,
    );
    expect(wrapper.find('svg').length).toBe(20);
  });
});

describe('<App /> shallow', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App classes={{}} />);
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => dateNowMock);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  test('props of <Profile /> component', () => {
    const profile = wrapper.find(Profile);
    expect(profile.length).toBe(1);
    expect(profile.prop('data')).toEqual(source.profile);
    expect(profile.prop('isFollowed')).toEqual(false);
    expect(profile.prop('isLiked')).toEqual(false);
  });
  test('<Comments /> component', () => {
    const comments = wrapper.find(Comments);
    expect(comments.length).toBe(1);
    expect(comments.prop('list')).toEqual(source.commentList);
    expect(comments.prop('isHidden')).toEqual(false);
  });
  test('state after componentDidMount', () => {
    expect(wrapper.state()).toEqual({
      profile: source.profile,
      commentList: source.commentList,
      isFollowed: false,
      isLiked: false,
      isLoadingData: false,
      isLoadingFont: true,
      commentsHidden: false,
    });
  });
  test('handleFollow() method', () => {
    wrapper.instance().handleFollow();
    expect(wrapper.state('isFollowed')).toBe(true);
    expect(wrapper.state('profile').followers).toBe(
      source.profile.followers + 1,
    );
    wrapper.instance().handleFollow();
    expect(wrapper.state('isFollowed')).toBe(false);
    expect(wrapper.state('profile').followers).toBe(source.profile.followers);
  });
  test('handleLike() method', () => {
    wrapper.instance().handleLike();
    expect(wrapper.state('isLiked')).toBe(true);
    expect(wrapper.state('profile').likes).toBe(source.profile.likes + 1);
    wrapper.instance().handleLike();
    expect(wrapper.state('isLiked')).toBe(false);
    expect(wrapper.state('profile').likes).toBe(source.profile.likes);
  });
  test('handleShare() method', () => {
    wrapper.instance().handleShare();
    expect(mockAlert).toHaveBeenCalledTimes(1);
  });
  test('handleCommentsHide() method', () => {
    wrapper.instance().handleCommentsHide();
    expect(wrapper.state('commentsHidden')).toBe(true);
    wrapper.instance().handleCommentsHide();
    expect(wrapper.state('commentsHidden')).toBe(false);
  });
  test('handleAddComment() method', () => {
    const initCommentList = wrapper.state('commentList');
    wrapper.instance().handleAddComment({ comment: 'Something' });
    const commentList = wrapper.state('commentList');
    expect(initCommentList.length + 1).toBe(commentList.length);
    expect(commentList[commentList.length - 1]).toEqual({
      author: 'Mike Ross',
      imgSrc: './harvey-specter.jpg',
      pubTimestamp: dateNowMock,
      content: 'Something',
    });
    expect(dateNowSpy).toHaveBeenCalledTimes(1);
  });
});
