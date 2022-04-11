import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import Home from "../pages/Home";
import Main from "../pages/Main";
import Write from "../pages/Write";
import Detail from "../pages/Detail";

import { Header } from "../components/core";
import { Grid } from "../components/ui";

function App() {
  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/main" exact component={Main} />
          <Route path="/postWrite/:1" exact component={Write} />
          <Route path="/detail/:1" exact component={Detail} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
