import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Text } from "../components/ui";
import { Button, Post } from "../components/core";

const Main = (props) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.list);

  React.useEffect(() => {
    if (posts.length < 2) {
      dispatch(postActions.getPostDB());
      return;
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
            history.push("/postWrite/:id");
          }}
        >
          Upload
        </Button>
        <Text display="inline-block">⚪⚪⚪님 안녕하세요</Text>
      </Grid>
      {posts.map((v, i) => {
        return (
          // <Grid is_flex margin="50px 0px 0px 0px" key={(v, i)}>
          <Grid
            key={(v, i)}
            is_flex
            margin="0px 10px"
            _onClick={() => {
              history.push(`/detail/${v.id}`);
            }}
          >
            <Post {...v} />
          </Grid>
          // </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Main;
