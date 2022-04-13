import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

import { produce } from 'immer';
import moment from 'moment';

//액션타입
const GET_POST = 'GET_POST'; //가져온 게시물을 넣어주는 애
const GETONE_POST = 'GETONE_POST';
const ADD_POST = 'ADD_POST';

//액션생성
const getPost = createAction(GET_POST, (posts) => ({ posts }));
const getOnePost = createAction(GETONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//초기값
const initialState = {
  list: [],
  detail: [],
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
    await axios
      // .orderBy("date", "desc")
      .get('http://52.78.194.238/api/postGet')
      .then((res) => {
        console.log(res.data);
        let _posts = [];
        res.data.posts.forEach((posts) => {
          _posts.push({ id: posts.id, ...posts });
        });
        dispatch(getPost(_posts));
        console.log('확인');
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const getOnePostDB = (id) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`http://52.78.194.238/api/detail/${id}`)
      .then((res) => {
        console.log(res.data);
        let post = res.data.detail;
        console.log(post);
        dispatch(getOnePost(post));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addPostDB = (formData) => {
  return async function (dispatch, getState, { history }) {
    let _post = {
      ...initialPost,
      formData,
      date: moment().format('YYYY-MM-DD kk:mm:ss'),
    };
    console.log(_post);
    await axios({
      method: 'post',
      url: 'http://52.78.194.238/api/postWrite',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(addPost(_post));
        // dispatch(imageActions.setPreview(null));

        history.push('/main');
      })
      .catch((error) => {
        window.alert('포스트 작성에 문제가 있습니다.');
        console.log('게시물 작성이 실패했습니다.', error);
      });
  };
};

//리듀서
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
        draft.list = action.payload.posts;
      }),
    [GETONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.post;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getOnePost,
  addPost,
  getPostDB,
  getOnePostDB,
  addPostDB,
};

export { actionCreators };
