import React from "react";
import { Grid, Image, Text } from "../components/ui";
import { Button } from "../components/core";

import { Comment, CommentList } from "../components/core";

const Detail = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid>
          <Grid>
            <Grid is_flex>
              <Grid is_flex width="auto">
                <Image shape="circle" border="2px solid #dddddd" />
                <Text size="18px">yoonji</Text>
              </Grid>
              <Grid is_flex width="auto">
                <Text textAlign="right">2022-04-04 21:00:00</Text>
                <Button
                  padding="8px"
                  width="auto"
                  margin="0px 3px"
                  _onClick={(e) => {}}
                >
                  수정
                </Button>
                <Button
                  padding="8px"
                  width="auto"
                  margin="0px 3px"
                  _onClick={(e) => {}}
                >
                  삭제
                </Button>
              </Grid>
            </Grid>
            <Grid>
              <Image shape="rectangle"></Image>
            </Grid>
          </Grid>
          <Grid
            scroll
            height="150px"
            border="1px solid lightgrey"
            margin="10px 0px"
            padding="5px 10px"
          >
            <Text>
              안녕하세요! 모자랑 니트베스트 코디해봤어요🤟 코디할 바지
              추천받아요~~~
            </Text>
          </Grid>
        </Grid>
        <Grid>
          <Comment postId={1} />
          <CommentList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Detail;
