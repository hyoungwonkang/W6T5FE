import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore, storage } from '../../shared/firebase';
import 'moment';
import moment from 'moment';
import image from './image';

import { actionCreators as imgaeActions } from './image';

const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const LOADING = 'LOADING';
const DELETE = 'DELETE';

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const deletePost = createAction(DELETE, (post_id) => ({ post_id }));

const initailState = {
  list: [],
  //페이징
  paging: { start: null, next: null, size: 3 },
  //가지고 오는 중인지 알기위한 것
  is_loading: false,
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: 'hyoung1',
  //   user_profile: 'https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137',
  // },
  image_url: 'https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137',
  contents: '',
  comment_cnt: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

const getOnePostFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if (!_post) {
          return;
        }

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        dispatch(setPost([post], { start: null, next: null, size: 3 }));
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  //혹시라도 값이 안들어오면 튕겨내려 post_id에 null값 줍니다.
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log('게시물 정보가 없어요');
      return;
    }
    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    console.log(_post);

    const postDB = firestore.collection('post');

    //같은 경우면 새로 이미지 업로드를 하지 않은 경우
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace('/');
        });
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, 'data_url');
      //이미지 업로드 잘 되는지 확인
      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            //url은 안쪽에서만 쓸 수 있으니 then을 씀. 체인을 엮어준다고 함.
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace('/');
              });
          })
          .catch((err) => {
            window.alert('앗! 이미지 업로드에 문제가 있어요!');
            console.log('앗! 이미지 업로드에 문제가 있어요!', err);
          });
      });
    }
  };
};

const addPostFB = (contents = '') => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post'); //파이어스토어에서 postDB를 선택할거야
    const _user = getState().user.user; //스토어에있는 정보 가져오기

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      //추가해야하는 정보들
      ...initialPost,
      contents: contents,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    };

    const _image = getState().image.preview;
    console.log(_image);
    console.log(typeof _image);

    //파이어베이스 파일 업로드 문법 purString사용
    //여러개를 넣어도 중복된 파일명이 안생기게 하려고 user_id와 시간을 엮어서('_'나':'로) 파일명 만듦
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, 'data_url');
    //이미지 업로드 잘 되는지 확인
    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          //url은 안쪽에서만 쓸 수 있으니 then을 씀. 체인을 엮어준다고 함.
          return url;
        })
        .then((url) => {
          postDB
            //만들어진 정보 들어오고 then에 추가 정보 들어온다
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              //파이어스토어와 리덕스의 파일의 모양새를 맞춰야 한다.
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              history.replace('/');
              //업로드가 잘 끝났으니 imageActions의 setPreview를 null로 바꿔줌
              dispatch(imgaeActions.setPreview(null));
            })
            .catch((err) => {
              window.alert('앗! 포스트 작성에 문제가 있어요!');
              console.log('post 작성에 실패했어요!', err);
            });
          //파이어스토어에 넣다가, 이미지 업로드하다 오류 나는것 방지
        })
        .catch((err) => {
          window.alert('앗! 이미지 업로드에 문제가 있어요!');
          console.log('앗! 이미지 업로드에 문제가 있어요!', err);
        });
    });
  };
};

const getPostFB = (start = null, size = 3) => {
  //파라미터를 안 쓰는 이유는 당장에 가져올 것이 전부 다 이기때문에 공란으로 비워둡니다.
  return function (dispatch, getState, { history }) {
    //next 데이터가 없는데 페이징 하면 안되니 getState로 paging데이터를 가지고 옴
    // 그 후 조건문으로 돌림
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection('post');

    //작성일자 기준으로 orderyBy
    //페이징보다 한 개 더 가져오는 이유는 다음 페이지로 넘어가게 하기 위해
    let query = postDB.orderBy('insert_dt', 'desc');

    if (start) {
      query = query.startAt(start); //start가 있으면 쿼리에 startAt 한다
    }

    // .then부터 리덕스에 밀어 넣어줌
    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        //페이징의 구체적인 정보
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };
        docs.forEach((doc) => {
          //데이터 모양을 맞춰주자!
          let _post = doc.data();

          // ['comment_cnt', 'contents', ..]
          let post = Object.keys(_post).reduce(
            //Object의 키즈 사용
            (acc, cur) => {
              if (cur.indexOf('user_') !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);
        });

        //post_list에 들어간 size+1개의 포스트 중 하나는 지워야 하므로
        post_list.pop();

        dispatch(setPost(post_list, paging));
      });

    return;
  };
};

export const deletePostFB = (post_id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    postDB
      .doc(post_id)
      .delete()
      .then(() => {
        history.replace('/');
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//immer 쓸때 불변성 유지
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = action.payload.post_list;
        //위의 처음 디폴트 값이 아닌 추가로드버튼으로 push해줘야 함
        draft.list.push(...action.payload.post_list);

        // post_id가 같은 중복 항목을 제거합시다! :)
        draft.list = draft.list.reduce((acc, cur) => {
          // findIndex로 누산값(cur)에 현재값이 이미 들어있나 확인해요!
          // 있으면? 덮어쓰고, 없으면? 넣어주기!
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        // paging이 있을 때만 넣기
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
          //LOADING의 함수여도 loading이 끝났으므로 써줘야 한다.
        }
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        // 스프레드 문법 쓰는게 if 쓰는것보다 덜 귀찮음.
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post }; // ...(스프레드문법)은 들어오게 하는것
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.id !== action.payload.post_id); // ...(스프레드문법)은 들어오게 하는것
      }),
  },
  initailState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  editPost,
  editPostFB,
  deletePostFB,
  getOnePostFB,
};

export { actionCreators };
