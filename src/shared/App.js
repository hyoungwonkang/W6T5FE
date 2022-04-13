import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import Write from "../pages/Write";
import Detail from "../pages/Detail";

import { Header } from "../components/core";
import { Grid } from "../components/ui";

function App() {
  const dispatch = useDispatch();

  // const token = getCookie('is_login');

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userActions.loginCheckM());
    }
    console.log("로그인 상태 유지!");
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/main" exact component={Main} />
          <Route path="/postWrite" exact component={Write} />
          <Route path="/detail/:id" exact component={Detail} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
