import React from 'react';
import { Input, Button_ } from './index';
import { Grid_ } from '../ui';

import { actionCreators as commentActions } from '../../redux/modules/comment';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

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
      alert('로그인이 필요합니다.');
      history.replace('/login');
      return;
    }
    dispatch(commentActions.addCommentDB(userId, postId, comment));
    window.location.reload();
    setCommentText('');
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextField
          margin='normal'
          label='댓글을 적어주세요'
          fullWidth
          onChange={onChange}
          value={comment}
          onSubmit={write}
          is_submit
        />
        <Grid item>
          <Button sx={{ mt: 1 }} variant='contained' onClick={write}>
            작성
          </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Comment;
