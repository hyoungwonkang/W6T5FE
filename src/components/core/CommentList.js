import React from 'react';
import { Grid_, Text, Image } from '../ui';
import { Button_ } from '../core';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../../redux/modules/comment';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const { postId } = props;

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(postId));
  }, [postId]);

  if (!comment_list[postId] || !postId) {
    return null;
  }
  // console.log(comment_list);
  return (
    <React.Fragment>
      <Grid_ padding='16px'>
        {comment_list[postId].map((c, i) => {
          return <CommentItem key={c + i} {...c} />;
        })}
      </Grid_>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  postId: null,
};

export default CommentList;

const CommentItem = (props) => {
  const { userName, date, comment, userProfile, userId } = props;
  const user = useSelector((state) => state.user.userInfo);
  const mycomment = user.userId === userId ? true : false;
  const dispatch = useDispatch();
  return (
    <Grid container>
      <Grid>
        <Image shape='circle' border='2px solid #dddddd' src_01={userProfile} />
      </Grid>
      <Grid>
        <Text>{userName}</Text>
      </Grid>
      <Grid xs>
        <Text margin='0px 10px 0px 5px'>{comment}</Text>
      </Grid>
      <Grid>
        <Text>{date}</Text>
      </Grid>
      {mycomment === true && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('댓글을 삭제하시겠어요?') === true) {
              dispatch(commentActions.deleteCommentDB(props.commentId));
              window.location.reload();
            }
          }}
        >
          <DeleteIcon />
        </Button>
      )}
    </Grid>
  );
};

CommentItem.defaultProps = {
  userProfile: '',
  userName: '',
  userId: '',
  postId: '',
  comment: '',
  date: '',
  image: '',
};
