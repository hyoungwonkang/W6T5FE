import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';
import { actionCreators as imageActions } from './image';

import { produce } from 'immer';
import moment from 'moment';

//액션타입
const SET_POST = 'SET_POST'; //가져온 게시물을 넣어주는 애
const ADD_POST = 'ADD_POST';

//액션생성
const setPost = createAction(SET_POST, (posts) => ({ posts }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//초기값
const initialState = {
  list: [],
  // paging: { star: null, next: null, size: 3 },
};
const initialPost = {
  date: moment().format('YYYY-MM-DD kk:mm:ss'),
  image: '이미지2',
  content: '리액트',
};

//미들웨어
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios.get('http://52.78.194.238/api/postGet').then((res) => {
      console.log(res.data);
      let _posts = [];
      res.data.posts.forEach((posts) => {
        _posts.push({ id: posts.id, ...posts });
      });
      dispatch(setPost(_posts));
    });
  };
};

const getOnePostDB = (id) => {
  return async function (dispatch, getState, { history }) {
    await axios.get(`http://52.78.194.238/api/detail/${id}`).then((res) => {
      console.log(res.data);
      let post = res.data.posts;
      dispatch(setPost([post]));
    });
  };
};

const addPostDB = (content = '') => {
  return function (dispatch, getState, { history }) {
    const _post = {
      ...initialPost,
      content: content,
      date: moment().format('YYYY-MM-DD kk:mm:ss'),
    };
    console.log(_post);
    axios
      .post('http://52.78.194.238/api/postWrite')
      .then((doc) => {
        dispatch(addPost(_post));
        history.replace('/main');

        // dispatch(imageActions.setPreview(null));
      })
      .catch((err) => {
        window.alert('포스트 작성에 문제가 있습니다.');
        console.log('게시물 작성이 실패했습니다.', err);
      });
  };
};

//리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        draft.list = action.payload.posts;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostDB,
  getOnePostDB,
  addPostDB,
};

export { actionCreators };
