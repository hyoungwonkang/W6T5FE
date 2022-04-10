import produce from 'immer';
import { handleActions } from 'redux-actions';
import { createAction } from 'redux-actions';

// actions
const SET_USER = 'GET_USER';

// action creators
const getUser = createAction(SET_USER, (user) => ({ user }));

// initailState
const initailState = {
  list: {},
  user: null,
};

// middleware actions
const signup = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {};
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initailState
);

const actionCreators = {
  getUser,
};

export { actionCreators };
