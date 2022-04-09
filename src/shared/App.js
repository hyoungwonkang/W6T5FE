import React from 'react';
import { Route } from 'react-router-dom';

import { Button, Jumbotron, Container } from 'react-bootstrap';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import { Grid } from '../components/ui';

import Main from '../pages/Main';

function App() {
  return (
    <React.Fragment>
      <Jumbotron fluid>
        <Container>
          <h1>Fluid jumbotron</h1>
          <p>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </Container>
      </Jumbotron>
      <Grid>
        <ConnectedRouter history={history}>
          <Route path='/main' exact component={Main} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
