import React from "react";
import { Grid, Text } from "../components/ui";
import { Input, Button } from "../components/core";

import { history } from "../redux/configureStore";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    console.log(userId);

    if (userId === "" || password === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    dispatch(userActions.loginM(userId, password));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid is_flex padding="4px 16px">
          <Button
            text="로그인하기"
            _onClick={() => {
              login();
              // history.push('/home');
            }}
          ></Button>

          <Button
            text="회원가입"
            _onClick={() => {
              history.push("/signup");
            }}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
