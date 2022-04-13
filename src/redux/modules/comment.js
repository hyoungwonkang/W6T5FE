import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

import { produce } from 'immer';
import moment from 'moment';

const SET_COMMENT = 'SET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';

const LOADING = 'LOADING';

const setComment = createAction(SET_COMMENT, (postId, comment_list) => ({
  postId,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}));

// const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

//미들웨어
const getCommentDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`http://52.78.194.238/api/comment/${postId}`)
      .then((res) => {
        let comment_list = [];
        res.data.comment.forEach((comments) => {
          comment_list.push({ ...comments });
        });
        dispatch(setComment(postId, comment_list));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addCommentDB = (postId, comment) => {
  return async function (dispatch, getState, { history }) {
    let comment = await axios
      .post(`http://52.78.194.238/api/comment/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        dispatch(addComment(postId, res.comment));
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//리듀서
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  getCommentDB,
  addCommentDB,
};

export { actionCreators };
