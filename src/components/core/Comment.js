import React from "react";
import { Input, Button } from "./index";
import { Grid } from "../ui";

import { actionCreators as commentActions } from "../../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";

const Comment = (props) => {
  const dispatch = useDispatch();

  const [comment, setCommentText] = React.useState();
  const { postId } = props;
  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const user = useSelector((state) => state.user);
  const userId = user.userInfo.userId;

  const write = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      history.replace("/login");
      return;
    }
    dispatch(commentActions.addCommentDB(userId, postId, comment));
    setCommentText("");
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
