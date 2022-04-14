import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { actionCreators as postActions } from '../redux/modules/post';
import Container from '@mui/material/Container';

import { Grid_, Text } from '../components/ui';
import { Button0, Post } from '../components/core';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Main = (props) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.list);
  const user = useSelector((state) => state.user.userInfo);

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);

  return (
    <React.Fragment>
      {/* 상단 업로드 및 유저네임 */}
      {user.userId && (
        <Grid_ margin='120px 0px 0px 0px' right>
          <Button
            onClick={() => {
              history.push('/postWrite');
            }}
          >
            Upload
          </Button>
          <Text display='inline-block'>{user.userName}님 안녕하세요</Text>
        </Grid_>
      )}
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {posts.map((v, i) => {
            if (v.userId === user.userId) {
              return (
                <Grid
                  key={(v, i)}
                  is_flex
                  margin='0px 10px'
                  onClick={() => {
                    history.push(`/detail/${v.id}`);
                  }}
                >
                  <Post {...v} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  key={(v, i)}
                  is_flex
                  margin='0px 10px'
                  onClick={() => {
                    history.push(`/detail/${v.id}`);
                  }}
                >
                  <Post {...v} />
                </Grid>
              );
            }
          })}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Main;
