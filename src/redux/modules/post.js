import axios from 'axios';
import { produce } from 'immer';
import moment from 'moment';

import { createAction, handleActions } from 'redux-actions';
import { createAction as imageActions } from '../../redux/modules/image';

//액션타입
const GET_POST = 'GET_POST';
const GETONE_POST = 'GETONE_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

//액션생성
const getPost = createAction(GET_POST, (posts) => ({ posts }));
const getOnePost = createAction(GETONE_POST, (post) => ({ post }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({
  postId,
}));

//초기값
const initialState = {
  list: [],
  detail: [],
};
const initialPost = {
  date: moment().format('YYYY-MM-DD kk:mm:ss'),
  image: '',
  content: '',
};

//미들웨어
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios
      // .orderBy("date", "desc")
      .get('http://52.78.194.238/api/postGet')
      .then((res) => {
        let _posts = [];
        res.data.posts.forEach((posts) => {
          _posts.push({ id: posts.id, ...posts });
        });
        dispatch(getPost(_posts));
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
        let post = res.data.detail;
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
    };
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
        dispatch(addPost(_post));

        history.push('/main');
      })
      .catch((error) => {
        window.alert('게시물 작성에 문제가 있습니다.');
        console.log('게시물 작성이 실패했습니다.', error);
      });
  };
};

const editPostDB = (postId, formData) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
      console.log('게시물 정보를 찾을 수 없어요.');
      return;
    }
    const _image = getState().image.preview;

    const _post_index = getState().post.list.findIndex(
      (p) => p.postId === postId
    );
    const _post = getState().post.list[_post_index];
    let post = {
      ..._post,
      formData,
    };

    await axios({
      method: 'post',
      url: `http://52.78.194.238/api/postEdit/${postId}`,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(editPost(post));
        history.push('/main');
      })
      .catch((error) => {
        window.alert('이미지,제목,내용 수정이 필요합니다.');
        console.log('게시물 수정이 실패했습니다.', error);
      });
  };
};

const deletePostDB = (id) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .delete(`http://52.78.194.238/api/detail/${id}`)
      .then((res) => {
        dispatch(deletePost(id));
      })
      .catch((err) => {
        window.alert('게시물 삭제가 실패했습니다.');
        console.log('게시물 삭제 실패', err);
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
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex((p) => p.id === action.payload.postId);
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((v) => v.id !== action.payload.postId);
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getOnePost,
  addPost,
  editPost,
  deletePost,
  getPostDB,
  getOnePostDB,
  addPostDB,
  editPostDB,
  deletePostDB,
};

export { actionCreators };
