import React from "react";
import { Grid, Image, Text } from "../components/ui";
import { Button, Input } from "../components/core";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const Write = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const posts = useSelector((state) => state.post.list);
  const users = useSelector((state) => state.user.userInfo);
  const userId = users.userId;
  const userName = users.userName;
  const preview = useSelector((state) => state.image.preview);

  //수정 조건
  const postId = props.match.params.id;
  const is_edit = postId ? true : false;
  let _post = is_edit ? posts.find((p) => p.id === postId) : null;

  //게시물 불러오기
  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("게시물 정보가 없습니다.");
      history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image));
    } else {
      dispatch(imageActions.setPreview(null));
    }
  }, []);

  //이미지파일 업로드
  const fileInput = React.useRef(null);
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };
  const is_uploading = useSelector((state) => state.image.uploading);

  //제목,내용 값
  const [title, setTitle] = React.useState(_post ? _post.title : "");
  const [content, setContent] = React.useState(_post ? _post.content : "");
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  //작성 버튼
  const addPost = () => {
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("게시물을 모두 작성해주세요.");
      return;
    }

    const file = fileInput.current.files[0];

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("title", title);
    formData.append("image", file);
    formData.append("content", content);

    return dispatch(postActions.addPostDB(formData));
  };

  //수정 버튼
  const editPost = () => {
    const file = fileInput.current.files[0];

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("title", title);
    formData.append("image", file);
    formData.append("content", content);
    return dispatch(postActions.editPostDB(postId, formData));
  };

  return (
    <React.Fragment>
      <Grid padding="16px 10px">
        <Text size="20px" bold width="auto">
          {is_edit ? "게시물 수정" : "게시물 작성"}
        </Text>
        <input
          type="file"
          onChange={selectFile}
          ref={fileInput}
          disabled={is_uploading}
          style={{ marginTop: "20px" }}
        />
      </Grid>
      <Grid>
        <Grid padding="16px 10px">
          <Text size="20px" bold>
            미리보기
          </Text>
        </Grid>
        <Image
          shape="rectangle"
          src_02={preview ? preview : "https://ifh.cc/g/g0oyvr.png"}
        />
      </Grid>
      <Grid padding="16px">
        <Input
          value={title}
          _onChange={changeTitle}
          multiLine
          rows
          label="제목"
        />
      </Grid>
      <Grid padding="16px">
        <Input
          value={content}
          _onChange={changeContent}
          multiLine
          rows
          label="내용"
        />
      </Grid>
      <Grid padding="16px">
        {is_edit ? (
          <Button _onClick={editPost} text="수정하기"></Button>
        ) : (
          <Button _onClick={addPost} text="작성하기"></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Write;
