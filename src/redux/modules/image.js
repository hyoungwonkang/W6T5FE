import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// import { storage } from "../../shared/firebase";

const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const SET_PREVIEW = 'SET_PREVIEW';
const UPLOAD_PROFILE = 'UPLOAD_PROFILE';

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const uploadProfile = createAction(UPLOAD_PROFILE, (userProfile) => ({
  userProfile,
}));

const initialState = {
  image: '',
  uploading: false,
  preview: null,
  userProfile: '',
};

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
    [UPLOAD_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.userProfile = action.payload.userProfile;
        draft.uploading = false;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  setPreview,
};

export { actionCreators };
