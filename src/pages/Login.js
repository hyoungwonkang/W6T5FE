import React from 'react';
import { Grid_, Text } from '../components/ui';
import { Input, Button0 } from '../components/core';

import { history } from '../redux/configureStore';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = (props) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = () => {
    console.log(userId);

    if (userId === '' || password === '') {
      window.alert('아이디 혹은 비밀번호가 공란입니다! 입력해주세요!');
      return;
    }
    dispatch(userActions.loginM(userId, password));
  };

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            로그인
          </Typography>

          <TextField
            margin='normal'
            label='아이디'
            fullWidth
            autoFocus
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />

          <TextField
            margin='normal'
            label='비밀번호'
            fullWidth
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => {
              login();
              // history.push('/home');
            }}
          >
            로그인
          </Button>

          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 3 }}
            onClick={() => {
              history.push('/signup');
            }}
          >
            회원가입
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
