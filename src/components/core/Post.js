import React from "react";
import { Grid, Text, Image } from "../ui";
import { Button } from "./index";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image
              shape="circle"
              border="2px solid #dddddd"
              src_01={props.src}
            />
            <Text size="18px">{props.userName}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text textAlign="right">{props.date}</Text>
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
          <Image shape="rectangle" src_02={props.image}></Image>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  userName: "윤지",
  userProfile:
    "https://image.msscdn.net/images/style/detail/26197/detail_26197_1_500.jpg",
  image:
    "https://image.msscdn.net/images/prd_img/20210522/1962786/detail_1962786_1_500.jpg",
  content:
    "안녕하세요! 모자랑 니트베스트 코디해봤어요🤟 코디할 바지 추천받아요~~~",
  date: "5시간 전",
  is_me: false,
};

export default Post;
