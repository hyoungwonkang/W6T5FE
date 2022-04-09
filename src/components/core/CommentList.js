import React from "react";
import { Grid, Text, Image } from "../ui";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentList = (props) => {
  const dispatch = useDispatch();
  //   const comment_list = useSelector((state) => state.comment.list);
  //   const { post_id } = props;
  //   console.log();

  //   React.useEffect(() => {
  //     if (!comment_list[post_id]) {
  //       dispatch(commentActions.getCommentFB(post_id));
  //     }
  //   }, []);

  //   if (!comment_list[post_id] || !post_id) {
  //     return null;
  //   }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
      </Grid>
    </React.Fragment>
  );
};

// CommentList.defaultProps = {
//   post_id: null,
// };

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, insert_dt, contents } =
    props;
  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" border="2px solid #dddddd" />
        <Text>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 0px 0px 15px">
        <Text>{contents}</Text>
      </Grid>
    </Grid>
  );
};
//commentList가 어차피 export해줘서 안해도 된다.

CommentItem.defaultProps = {
  user_profile:
    "https://visla.kr/wp/wp-content/uploads/2015/03/The-Simpsons-Illustrated-in-Streetwear-05.jpg",
  user_name: "yoonji",
  user_id: "uooh",
  post_id: 1,
  contents: "멋있어요! 모자 어디서 사셨어요??",
  insert_dt: "2022-04-09 09:00:00",
};
