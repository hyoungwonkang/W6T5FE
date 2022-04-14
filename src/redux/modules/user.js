import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// initailState
const initialState = {
  userInfo: {
    userId: "",
    userName: "",
  },
  is_login: false,
};

// middleware actions
const signupM = (formData) => {
  return async (dispatch, getState, { history }) => {
    // console.log(userId, userName, password, pwConfirm, userProfile, gender);
    let userInfo = {
      formData,
    };
    console.log(userInfo);
    console.log("회원 가입 중입니다.");

    await axios({
      method: "post",
      url: "http://52.78.194.238/api/signup",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(getUser(userInfo));
        window.alert("회원가입이 완료되었습니다.");
        history.replace("/login");
      })
      .catch((error) => {
        console.log(error, "회원가입에 실패했습니다.");
      });
  };
};

const loginM = (userId, password) => {
  return (dispatch, getState, { history }) => {
    axios
      .post("http://52.78.194.238/api/login", {
        userId: userId,
        password: password,
      })
      .then((res) => {
        console.log(res, "로그인 중입니다.");
        localStorage.setItem("token", res.data.token);
        console.log("로그인 성공!");
        alert("로그인 성공!");
        history.replace("/home");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디와 비밀번호가 일치하지 않습니다.");
      });
  };
};
// 로그인 체크를 해서 새로고침하면 데이터가 날아가버리는 리덕스에 다시 데이터를 집어 넣는다.
const loginCheckM = () => {
  return (dispatch, getState, { history }) => {
    axios
      .post("http://52.78.194.238/api/loginInfo", {
        //localStorage에 있는 토큰을 get함
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res);
        dispatch(
          setUser({
            userId: res.data.userInfo.userId,
            userName: res.data.userInfo.userName,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const logoutM = () => {
  return (dispatch, getState, { history }) => {
    console.log("로그아웃 되었습니다!");
    localStorage.removeItem("token");
    dispatch(logOut());
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

//action creator export
const actionCreators = {
  signupM,
  loginM,
  loginCheckM,
  getUser,
  logoutM,
};

export { actionCreators };
