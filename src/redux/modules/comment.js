import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

import { produce } from 'immer';
import moment from 'moment';

const SET_COMMENT = 'SET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

const setComment = createAction(SET_COMMENT, (postId, comment_list) => ({
  postId,
  comment_list,
}));
const addComment = createAction(
  ADD_COMMENT,
  (userId, postId, comment, userProfile) => ({
    userId,
    postId,
    comment,
    userProfile,
  })
);
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId,
}));

const initialState = {
  list: {},
  comment_list: [],
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

const addCommentDB = (userId, postId, comment, userProfile) => {
  return async function (dispatch, getState, { history }) {
    let _comment = {
      userId: userId,
      postId: postId,
      comment: comment,
      userProfile: userProfile,
    };
    console.log(_comment);
    await axios
      .post(
        `http://52.78.194.238/api/comment/${postId}`,
        { ..._comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        dispatch(addComment(userId, postId, comment, userProfile));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deleteCommentDB = (id) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .delete(`http://52.78.194.238/api/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        dispatch(deleteComment(id));
      })
      .catch((err) => {
        window.alert('댓글 삭제가 실패했습니다.');
        console.log('댓글 삭제 실패', err);
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
        draft.comment_list.unshift(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.commentId;
      }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  deleteComment,
  getCommentDB,
  addCommentDB,
  deleteCommentDB,
};

export { actionCreators };
