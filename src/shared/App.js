import React from 'react';

//Library
import { Route, useHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { Grid, Image } from '../components/ui';
import { Header } from '../components/core';

//import components
import Login from '../pages/Login';
import Main from '../pages/Main';
import Signup from '../pages/Signup';

function App() {
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