import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

import { Grid_, Text } from '../components/ui';
import { Comment, CommentList, Post } from '../components/core';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
      <Container component='main' maxWidth='xs'>
        <Grid_>
          <Grid>
            {post && (
              <Post {...post} is_me={post.userId === user.userInfo.userId} />
            )}
            <Text bold>{post.title}</Text>
            <Grid_
              scroll
              height='150px'
              border='1px solid lightgrey'
              margin='10px 0px'
              padding='5px 10px'
            >
              <Text>{post?.content}</Text>
            </Grid_>
          </Grid>
          <Grid>
            <Comment postId={id} />
          </Grid>
        </Grid_>
      </Container>
      <Grid>
        <CommentList postId={id} />
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
