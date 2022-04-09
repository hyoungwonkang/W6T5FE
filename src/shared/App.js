import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Detail from "../pages/Detail";

import { Header } from "../components/core";
import { Grid } from "../components/ui";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/detail" exact component={Detail} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
