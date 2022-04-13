import React from "react";
import { Grid, Text } from "../ui";
import { Button } from "./index";

import { history } from "../../redux/configureStore";

const Header = (props) => {
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
          <Button
            text="로그인"
            _onClick={() => {
              history.push("/login");
            }}
            padding="10px 20px"
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
