import React from 'react';
import '../index.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch } from 'react-redux';

import { Grid_, GlobalStyle } from '../components/ui';
import { Header } from '../components/core';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Main from '../pages/Main';
import Write from '../pages/Write';
import Detail from '../pages/Detail';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.loginCheckM());
    }
    console.log('로그인 상태 유지!');
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Grid_>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/main' exact component={Main} />
          <Route path='/postWrite' exact component={Write} />
          <Route path='/postWrite/:id' exact component={Write} />
          <Route path='/detail/:id' exact component={Detail} />
        </ConnectedRouter>
      </Grid_>
    </React.Fragment>
  );
}

export default App;
