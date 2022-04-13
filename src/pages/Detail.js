import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Text } from "../components/ui";
import { Comment, CommentList, Post } from "../components/core";

const Detail = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const post = useSelector((store) => store.post.detail);
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(postActions.getOnePostDB(id));
  }, []);

  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid>
          {post && (
            <Post {...post} is_me={post.userId === user.userInfo.userId} />
          )}
          <Grid
            scroll
            height="150px"
            border="1px solid lightgrey"
            margin="10px 0px"
            padding="5px 10px"
          >
            <Text>{post?.content}</Text>
          </Grid>
        </Grid>
        <Grid>
          <Comment postId={id} />
          <CommentList postId={id} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
