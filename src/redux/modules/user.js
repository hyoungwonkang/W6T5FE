import axios from 'axios';
import { produce } from 'immer';
import { createAction, handleActions } from 'redux-actions';

import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';
// import Request from '../../shared/Request';

// actions
// const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
// const logOut = createAction(LOG_OUT, () => ({}));

// initailState
const initialState = {
  userInfo: {
    userId: '',
    userName: '',
  },
  is_login: false,
};

// middleware actions
const signupM = (userId, userName, password, pwConfirm, gender) => {
  return (dispatch, getState, { history }) => {
    console.log(userId, userName, password, pwConfirm, gender);
    const userInfo = {
      userId: userId,
      userName: userName,
      password: password,
      pwConfirm: pwConfirm,
      gender: gender,
      // email: 'eve.holt@reqres.in',
      // password: 'pistol',
    };
    console.log('회원 가입 중입니다.');
    // await Request

    axios
      .post('http://52.78.194.238/api/signup', userInfo)
      .then((res) => {
        console.log(res);
        window.alert('회원가입이 완료되었습니다.');
        history.replace('/login');
      })
      .catch((error) => {
        console.log(error, '회원가입에 실패했습니다.');
      });
  };
};

const loginM = (userId, password) => {
  return (dispatch, getState, { history }) => {
    axios
      .post('http://52.78.194.238/api/login', {
        userId: userId,
        password: password,
      })
      .then((res) => {
        console.log(res, '로그인 중입니다.');
        dispatch(
          setUser({
            userId: res.data.userId,
            userName: res.data.userName,
          })
        );
        const accessToken = res.data.token;
        console.log(accessToken);
        // console.log(accessToken.userId);
        //쿠키에 토큰 저장
        setCookie('is_login', `${accessToken}`);
        // document.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        window.alert('아이디와 비밀번호가 일치하지 않습니다.');
      });
  };
};

const loginCheckDB = () => {
  return (dispatch, getState, { history }) => {
    const token = getCookie('is_login');
    console.log(token);
    axios({
      method: 'post',
      url: 'http://13.125.249.241/user/check',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(
          setUser({
            userId: res.data.userId,
            userName: res.data.userName,
          })
        );
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };
};
//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.user;
        draft.is_login = true;
      }),

    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  signupM,
  setUser,
  getUser,
  loginM,
  // logIn,
};

export { actionCreators };
