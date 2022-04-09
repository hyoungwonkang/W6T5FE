import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

import { storage } from '../../shared/firebase';

const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: '',
  uploading: false, //처음에는 false로 받아옵니다
  preview: null, //preview가 없으면 null로 시작
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true)); //위에 적용했던 false를 이제 업로딩시작하기 때문에 true로 바꿈
    const _upload = storage.ref(`images/${image.name}`).put(image); //firebase 문법 .put()

    _upload.then((snapshot) => {
      // 이미지 링크 받는곳
      console.log(snapshot);
      // dispatch(uploading(false));  //여기에서 업로딩은 끝이 났습니다.
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
        console.log(url);
      });
    });
  };
};
// draft가져오는 구간까지는 복붙해도 됩니다.
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        //이미지 url 고치기
        draft.image_url = action.payload.image_url;
        draft.uploading = false; // uploadImageFB에서 업로딩을 끝내는 dispatch를 여기다 써서 두번 dispatch 안하게 합니다.
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators };
