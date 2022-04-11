import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Text } from "../components/ui";
import { Button, Post } from "../components/core";

const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    if (post_list.length < 2) {
      //getOnePostFB로 호출해서 이미 한개가 존재하니까
      dispatch(postActions.getPostDB());
    }
  }, []);
  return (
    <React.Fragment>
      <Grid right>
        <Button
          width="auto"
          margin="15px 5px"
          padding="10px 20px"
          _onClick={() => {
            history.push("/postWrite/1");
          }}
        >
          Upload
        </Button>
        <Text display="inline-block">⚪⚪⚪님 안녕하세요</Text>
      </Grid>
      {post_list.map((v, i) => {
        return (
          <Grid is_flex margin="50px 0px 0px 0px">
            <Grid
              margin="0px 10px"
              _onClick={() => {
                history.push("/detail/1");
              }}
            >
              <Post />
            </Grid>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Main;
