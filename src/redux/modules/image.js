import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// import { storage } from "../../shared/firebase";

const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image: '',
  uploading: false,
  preview: null,
};

// //미들웨어
// const uploadImageFB = (image) => {
//   return function (dispatch, getState, { history }) {
//     dispatch(uploading(true));
//     const _upload = storage.ref(`images/${image.name}`).put(image);
//     _upload.then((snapshot) => {
//       console.log(snapshot);
//       snapshot.ref.getDownloadURL().then((url) => {
//         console.log(url);
//         dispatch(uploadImage(url));
//       });
//     });
//   };
// };

//리듀서
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image = action.payload.image;
        draft.uploading = false;
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
  setPreview,
};

export { actionCreators };
