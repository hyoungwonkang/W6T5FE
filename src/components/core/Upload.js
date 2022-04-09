import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../../redux/modules/image";

const Upload = (props) => {
  const fileInput = React.useRef(null);
  const selectFile = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);

    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file); //파일 내용을 읽어올 수 있음

    reader.onloadend = () => {
      //읽기가 끝나면 실행
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const dispatch = useDispatch();
  const is_uploading = useSelector((state) => state.image.uploading);
  // console.log(is_uploading);
  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <React.Fragment>
      <input
        type="file"
        onChange={selectFile}
        ref={fileInput}
        disabled={is_uploading}
        style={{ marginTop: "20px" }}
      />
      {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
    </React.Fragment>
  );
};

export default Upload;
