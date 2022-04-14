import React from "react";
import { Grid, Text } from "../ui";
import { Button } from "./index";

import { history } from "../../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const logout = () => {
    dispatch(userActions.logoutM());
  };

  return (
    <React.Fragment>
      <Grid is_flex padding="0px 0px 20px 0px ">
        <Grid width="auto">
          <Button
            no_bg
            _onClick={() => {
              history.push("/");
            }}
          >
            <Text size="24px" bold>
              추천해주옷
            </Text>
          </Button>
        </Grid>
        <Grid width="auto">
          <Button
            no_bg
            _onClick={() => {
              history.push("/main");
            }}
          >
            <Text size="24px" bold>
              코디
            </Text>
          </Button>
        </Grid>
        <Grid width="auto">
          {is_login ? (
            <Button text="로그아웃" _onClick={logout}></Button>
          ) : (
            <Button
              text="로그인"
              _onClick={() => {
                history.push("/login");
              }}
            ></Button>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
