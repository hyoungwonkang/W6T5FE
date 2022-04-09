import React from "react";
import { Input, Button } from "./index";
import { Grid } from "../ui";

import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useDispatch } from "react-redux";

const Comment = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState();

  const { post_id } = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  };
  const write = () => {
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText(""); //작성후 텍스트를 제거해줌
  };
  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글을 입력해주세요."
          _onChange={onChange}
          value={comment_text}
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
