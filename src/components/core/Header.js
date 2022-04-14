import React from 'react';

import { Grid_, Image, Text } from '../ui';
import { Button0 } from '../core';

import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import HomeIcon from '@mui/icons-material/Home';

import { history } from '../../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const logout = () => {
    dispatch(userActions.logoutM());
  };
  return (
    <React.Fragment>
      <Grid_ bg='white' fix is_flex padding='4px 16px'>
        <Button
          variant='h6'
          noWrap
          component='div'
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          onClick={() => {
            history.push('/');
          }}
        >
          {' '}
          <HomeIcon />
        </Button>
        <Button
          variant='h6'
          noWrap
          component='div'
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          onClick={() => {
            history.push('/main');
          }}
        >
          CODI
        </Button>
        {is_login ? (
          <Button
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={logout}
          >
            LOGOUT
          </Button>
        ) : (
          <Button
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={() => {
              history.push('/login');
            }}
          >
            LOGIN
          </Button>
        )}
      </Grid_>
    </React.Fragment>
  );
};

export default Header;
