import React from 'react';
import { history } from '../../redux/configureStore';
import { actionCreators as postActions } from '../../redux/modules/post';
import { useDispatch } from 'react-redux';

import { Grid_, Text, Image } from '../ui';
import { Button_ } from './index';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

const Post = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Grid_>
        <Grid_ is_flex>
          <Grid_ is_flex width='auto'>
            <Image
              shape='circle'
              border='2px solid #dddddd'
              src_01={props.userProfile}
            />
            <Text size='18px'>{props.userName}</Text>
          </Grid_>
          <Grid_ is_flex width='auto'>
            <Text textAlign='right'>{props.date}</Text>
            {props.is_me && (
              <Button
                width='auto'
                // margin='0px 0px'
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/postWrite/${props.id}`);
                }}
              >
                <EditIcon />
              </Button>
            )}
            {props.is_me && (
              <Button
                width='auto'
                // margin='0px 0px'
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('게시물을 삭제하시겠어요?') === true) {
                    dispatch(postActions.deletePostDB(props.id));
                    window.location.reload();
                  }
                }}
              >
                <DeleteIcon />
              </Button>
            )}
          </Grid_>
        </Grid_>
        <Grid_>
          <Image shape='rectangle' src_02={props.image}></Image>
        </Grid_>
      </Grid_>
    </React.Fragment>
  );
};

Post.defaultProps = {
  userName: '',
  userProfile: '',
  image: '',
  content: '',
  date: '',
  is_me: false,
};

export default Post;
