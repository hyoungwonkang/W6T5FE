import React from 'react';

import { Grid, Image, Text } from '../ui';
import { Button } from '../core';

import { history } from '../../redux/configureStore';

const Header = (props) => {
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

        <Button
          text='로그인'
          _onClick={() => {
            history.push('/login');
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
