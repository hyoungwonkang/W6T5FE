import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Text } from "../components/ui";
import { Comment, CommentList, Post } from "../components/core";

const Detail = (props) => {
  const id = props.match.params.id;

  const post_list = useSelector((store) => store.post.list);
  const post_index = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_index];

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostDB(id));
  }, []);

  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid>
          <Post {...post} />
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
