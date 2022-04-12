import React from "react";
import { Grid, Text, Image } from "../ui";
import { Button } from "../core";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const { postId } = props;

  React.useEffect(() => {
    if (!comment_list[postId]) {
      dispatch(commentActions.getCommentDB(postId));
    }
  }, []);

  if (!comment_list[postId] || !postId) {
    return null;
  }
  // console.log(comment_list);
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[postId].map((c, i) => {
          return <CommentItem key={i} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  postId: null,
};

export default CommentList;

const CommentItem = (props) => {
  const { userName, date, comment } = props;
  return (
    <Grid is_flex>
      <Grid width="auto" center>
        <Image
          shape="circle"
          border="2px solid #dddddd"
          src_01={props.userProfile}
        />
        <Text>{userName}</Text>
      </Grid>
      <Grid is_flex margin="0px 0px 0px 15px">
        <Text margin="0px 10px 0px 5px">{comment}</Text>
        <Text>{date}</Text>
      </Grid>
      <Button width="auto" padding="8px" margin="0px 3px">
        M
      </Button>
      <Button width="auto" padding="8px" margin="0px 3px">
        D
      </Button>
    </Grid>
  );
};

CommentItem.defaultProps = {
  userProfile: "",
  userName: "",
  userId: "",
  postId: "",
  comment: "",
  date: "",
};
