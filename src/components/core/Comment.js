import React from "react";
import { Input, Button } from "./index";
import { Grid } from "../ui";

import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useDispatch } from "react-redux";

const Comment = (props) => {
  const dispatch = useDispatch();
  const [comment, setCommentText] = React.useState();

  const { postId } = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  };
  const write = () => {
    dispatch(commentActions.addCommentDB(postId, comment));
    setCommentText(""); //작성후 텍스트를 제거해줌
  };
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글을 입력해주세요."
          _onChange={onChange}
          value={comment}
          onSubmit={write}
          is_submit
        />
        <Button
          width="50px"
          margin="0px 0px 0px 10px"
          _onClick={write}
          text="작성"
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Comment;
