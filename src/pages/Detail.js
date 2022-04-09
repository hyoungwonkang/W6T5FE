import React from "react";
import { Grid, Image, Text } from "../components/ui";
import { Button } from "../components/core";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";

import { Comment, CommentList } from "../components/core";

const Detail = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid>
          <Grid>
            <Grid>
              <Image shape="circle" border="2px solid #dddddd" />
              <Text>yoonji</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle"></Image>
            </Grid>
          </Grid>
          <Grid>
            <Text textAlign="right">2022-04-04 21:00:00</Text>
            <Text>안녕하세요! 모자랑 니트베스트 코디해봤어요🤟</Text>
          </Grid>
        </Grid>
        <Grid>
          <Button
            padding="8px"
            width="auto"
            margin="0px 3px"
            _onClick={(e) => {}}
          >
            수정
          </Button>
          <Comment />
          <CommentList />
          <CommentList />
          <CommentList />
          <CommentList />
          <CommentList />
          <CommentList />
          <CommentList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
