import React from 'react';

import { Grid, Image, Text } from '../ui';
import { Button } from '../core';

import { history } from '../../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const userInfo = useSelector((state) => state.user.user);

  const logout = () => {
    dispatch(userActions.logoutM());
  };

  return (
    <React.Fragment>
      <Grid is_flex padding='4px 16px'>
        <Button
          text='로고'
          _onClick={() => {
            history.push('/home');
          }}
        ></Button>
        <Button
          text='코디추천'
          _onClick={() => {
            history.push('/main');
          }}
        ></Button>
        {is_login ? (
          <Button text='로그아웃' _onClick={logout}></Button>
        ) : (
          <Button
            text='로그인'
            _onClick={() => {
              history.push('/login');
            }}
          ></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Header;
