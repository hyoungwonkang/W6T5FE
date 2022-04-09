import React from 'react';

// import { storage } from './firebase';

import { Button } from '../core';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as imageActions } from '../../redux/modules/image';

const Upload = (props) => {
  //업로딩한 상태면 버튼 눌러도 안먹히게 하기
  const is_uploading = useSelector((state) => state.image.uploading);
  const dispatch = useDispatch();

  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e); //여기에서 이벤트는 change가 든 이벤트
    console.log(e.target); //e.target은 인풋 자체.
    console.log(e.target.files[0]);

    console.log(fileInput.current.files[0]); // 인풋에 ref에 파일 잘 올라오는지 확인함

    const reader = new FileReader(); //FileRedaer라는 객체 만듬
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file); //readAsdataURL의 소괄호 안에 파일 넣으면 읽을 수 있음

    // 업로드할 파일 읽기가 끝나면 발생하는 이벤트를 핸들할 수 있는 것
    // preview 셋팅하게 넣어줌
    reader.onloadend = () => {
      console.log(reader.result); //파일의 내용물이 어떤지 확인
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  //   const uploadFB = () => {
  //     let image = fileInput.current.files[0];
  //     const _upload = storage.ref(`images/${image.name}`).put(image); //firebase 문법 .put()

  //     _upload.then((snapshot) => {
  //       // 이미지 링크 받는곳
  //       console.log(snapshot);

  //       snapshot.ref.getDownloadURL().then((url) => {
  //         console.log(url);
  //       });
  //     });
  //   };

  return (
    <React.Fragment>
      <input
        type='file'
        onChange={selectFile}
        ref={fileInput}
        disabled={is_uploading} //is_uploading이 진행중이면 disabled란 속성으로 버튼 못 쓰게 만듬
      />
      <Button>업로드하기</Button>
    </React.Fragment>
  );
};

export default Upload;
