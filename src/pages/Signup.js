import React from 'react';

import { Grid, Text } from '../components/ui';
import { Button, Input } from '../components/core';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { idCheck } from '../shared/Rule';

const Signup = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pwConfirm, setpwConfirm] = React.useState('');
  const [gender, setGender] = React.useState(true);

  const changeCheck = () => {
    setGender((check: boolean) => !check);
  };

  const signup = (e) => {
    e.preventDefault();

    if (userId === '' || password === '' || userName === '') {
      window.alert('아이디, 패스워드, 닉네임을 모두 입력해주세요!');
      return;
    }

    if (!idCheck(userId)) {
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

    dispatch(
      userActions.signupM(userId, userName, password, pwConfirm, gender)
    );
  };

  return (
    <React.Fragment>
      <Grid padding='16px'>
        <Text size='32px' bold>
          회원가입
        </Text>
        <Grid is_flex padding='16px 0px'>
          <Input
            label='아이디'
            placeholder='아이디를 입력해주세요.'
            _onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <Button>중복확인</Button>
        </Grid>
        <Grid padding='16px 0px'>
          <Input
            label='닉네임'
            placeholder='닉네임을 입력해주세요.'
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>
        <Grid padding='16px 0px'>
          <Input
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요.'
            type='password'
            _onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid padding='16px 0px'>
          <Input
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력해주세요.'
            type='password'
            _onChange={(e) => {
              setpwConfirm(e.target.value);
            }}
          />
        </Grid>
        <Grid>
          {gender && <Text>성별</Text>}
          <button onClick={changeCheck}>Change!</button>
        </Grid>

        <Button text='회원가입하기' _onClick={signup.profile}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
