import React from 'react';
import { Route } from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';
import { getCookie } from './Cookie';

import { Grid, Image } from '../components/ui';
import { Header } from '../components/core';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';

function App() {
  const dispatch = useDispatch();

  const token = getCookie('is_login');

  React.useEffect(() => {
    if (token) {
      dispatch(userActions.loginCheckM());
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Grid is_flex padding='4px 16px'>
        <Grid padding='4px 16px'>
          <Grid padding='0px 16px' bg={'#EFF6FF'}>
            <Grid></Grid>
          </Grid>
        </Grid>
      </Grid>

      <ConnectedRouter history={history}>
        <Route path='/home'>
          <Image shape='rectangle'></Image>
        </Route>
        <Route path='/main' exact component={Main} />
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
