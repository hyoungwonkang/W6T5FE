import { produce } from 'immer';
import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';

import { setCookie } from '../../shared/Cookie';
import { setToken } from '../../shared/token';
// import Request from '../../shared/Request';

// actions
// const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, () => ({}));
// const logOut = createAction(LOG_OUT, () => ({}));

// initailState
const initialState = {
  userInfo: {
    userId: '',
    userName: '',
  },
  isLogin: false,
};

// middleware actions
const signupM = (userId, userName, password, pwConfirm, gender) => {
  return (dispatch, getState, { history }) => {
    console.log(userId, password, pwConfirm, userName);
    const userInfo = {
      userId: userId,
      password: password,
      userName: userName,
      pwConfirm: pwConfirm,
      gender: gender,
      // email: 'eve.holt@reqres.in',
      // password: 'pistol',
    };
    console.log('회원 가입 중입니다.');
    // await Request

    axios
      .post('http://52.78.194.238/api/signup', userInfo)
      // .post('https://reqres.in/api/register', userInfo)
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
    const data = {
      userId: userId,
      password: password,
      // email: 'eve.holt@reqres.in',
      // password: 'cityslicka',
    };
    console.log('로그인 중입니다.');

    axios
      .post('http://52.78.194.238/api/login', data)
      .then((res) => {
        console.log(res);
        const token_res = res.headers.authorization;
        setToken(token_res);

        return token_res;
        // if (res.data.token) {
        //   localStorage.setItem('token', res.data.token);
        // localStorage.setItem('name', res.data.userID);

        // window.alert('로그인이 되었습니다.');
        // window.location.replace('/home');
        // console.log('로그인이 되었어요');
        // }
      })
      .then((token_res) => {
        axios({
          method: 'post',
          url: 'http://52.78.194.238/islogin',
          headers: {
            /* "content-type": "applicaton/json;charset=UTF-8", 
            "accept": "application/json",  */
            Authorization: `${token_res}`,
          },
        })
          .then((res) => {
            dispatch(
              setUser({
                userId: res.data.userId,
                userName: res.data.userName,
              })
            );
          })
          .catch((err) => {
            console.log(err);
            window.alert('아이디와 비밀번호가 일치하지 않습니다.');
          });
        // window.location.replace('/home')
      });
  };
};

// export const authApi = {
//   signupM: (id, pwd, user_name) =>
//     instance.post('api/register', {
//       id: id,
//       pwd: pwd,
//       user_name: user_name,
//     }),
// };

//reducer
export default handleActions(
  {
    // [LOG_IN]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.user = action.payload.user;
    //     console.log('action.payload.user', action.payload.user);
    //   }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie('is_login', 'success');
        draft.userInfo = action.payload.user;
        draft.isLogin = true;
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
