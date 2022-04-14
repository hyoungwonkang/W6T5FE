import React from 'react';
import axios from 'axios';

import { Grid_, Text } from '../components/ui';
import { Button0, Input, Upload } from '../components/core';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as imageActions } from '../redux/modules/image';

import { Check } from '../shared/Rule';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Signup = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pwConfirm, setpwConfirm] = React.useState('');
  const [userProfile, setUserProfile] = React.useState('');
  // const [gender, setGender] = React.useState(true);
  const [gender, setGender] = React.useState('');
  const [idDup, setIdDup] = React.useState(false);

  //성별 체크 함수
  const changeGender = (e) => {
    setGender(e.target.value);
  };

  //프로필 사진 함수
  const fileInput = React.useRef(null);
  const is_uploading = useSelector((state) => state.image.uploading);

  //프로필 사진 선택하기
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file); //파일 내용을 읽어올 수 있음
    reader.onloadend = () => {
      // 읽기가 끝나면 실행
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const idCheckAPI = (userId) => {
    axios
      .post('http://52.78.194.238/api/idCheck', {
        userId: userId,
      })
      .then((res) => {
        console.log(res);

        setIdDup(true);
        alert('사용가능한 아이디 입니다.');
      })
      .catch((err) => {
        alert('이미 사용하고 있는 아이디 입니다');
        console.log(err);
      });
  };

  //회원가입
  const signup = (e) => {
    e.preventDefault();

    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert('프로필사진을 등록해주세요.');
      return;
    }

    const file = fileInput.current.files[0];
    console.log(file);

    const formData = new FormData();

    formData.append('userId', userId);
    formData.append('password', password);
    formData.append('pwConfirm', pwConfirm);
    formData.append('userName', userName);
    formData.append('gender', gender);
    formData.append('userProfile', file);

    console.log('formData', formData);

    if (userId === '' || password === '' || userName === '') {
      window.alert('아이디, 패스워드, 닉네임을 모두 입력해주세요!');
      return;
    }
    if (idDup === false) {
      alert('아이디 중복확인을 해주세요.');
      return false;
    }
    if (!Check(userId)) {
      window.alert('아이디 형식이 맞지 않습니다!');
      return;
    }
    if (password !== pwConfirm) {
      window.alert('패스워드와 패스워드 확인이 일치하지 않습니다!');
      return;
    }
    console.log(
      userId,
      password,
      userName,
      gender,
      '의 회원가입 요청을 dispatch 했습니다.'
    );
    //formData 말고 다른 데이터는 디스패치에서 쓰면 안됨
    return dispatch(userActions.signupM(formData));
  };

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            회원가입
          </Typography>
          {/* 프로필 사진 올리기 */}
          <input
            type='file'
            onChange={selectFile}
            ref={fileInput}
            disabled={is_uploading}
            style={{ marginTop: '20px' }}
          />
          <Grid_ is_flex>
            <TextField
              margin='normal'
              label='아이디'
              required
              fullWidth
              autoFocus
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />

            <Button
              sx={{ mt: 1 }}
              variant='contained'
              onClick={() => {
                if (!Check(userId)) {
                  alert('부적절한 아이디 입니다.');
                  return false;
                }
                idCheckAPI(userId);
              }}
            >
              중복확인
            </Button>
          </Grid_>
          <TextField
            margin='normal'
            label='닉네임'
            required
            fullWidth
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />

          <TextField
            margin='normal'
            label='비밀번호'
            required
            fullWidth
            type='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <TextField
            margin='normal'
            label='비밀번호 확인'
            required
            fullWidth
            type='password'
            onChange={(e) => {
              setpwConfirm(e.target.value);
            }}
          />

          {/* 성별 */}

          <FormControl margin='normal'>
            <FormLabel email='demo-row-radio-buttons-group-label'>
              성별을 선택하세요
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={gender}
              onChange={changeGender}
            >
              <FormControlLabel value='male' control={<Radio />} label='남자' />
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='여자'
              />
            </RadioGroup>
          </FormControl>

          {/* 회원가입버튼 */}
          <Button
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 3 }}
            onClick={signup}
          >
            회원가입하기
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Signup;
