import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as imageActions } from "./image";

import { produce } from "immer";
import moment from "moment";

//액션타입
const SET_POST = "SET_POST"; //가져온 게시물을 넣어주는 애
const ADD_POST = "ADD_POST";

//액션생성
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

//초기값
const initialState = {
  list: [],
  paging: { star: null, next: null, size: 3 },
};
const initialPost = {
  image: "",
  content: "",
  date: moment().format("YYYY-MM-DD kk:mm:ss"),
};

//미들웨어
const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .orderBy("date", "desc")
      .get()
      .then((docs) => {
        let post_list = [];
        docs.forEach((doc) => {
          console.log(doc.id, doc.data());
          let post = {
            id: doc.id,
            user_info: {
              user_name: doc.data().user_name,
              user_profile: doc.data().user_profile,
              user_id: doc.data().user_id,
            },
            image_url: doc.data().image_url,
            contents: doc.data().contents,
            comment_count: doc.data().comment_count,
            insert_dt: doc.data().insert_dt,
          };
          post_list.push(post);
        });
        console.log(post_list);
        dispatch(setPost(post_list));
      });
  };
};

const addPostDB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD kk:mm:ss"),
    };

    const _image = getState().image.preview;
    console.log(_image);
    console.log(typeof _image);
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
        draft.list = action.payload.post_list;
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
  addPostDB,
};

export { actionCreators };
