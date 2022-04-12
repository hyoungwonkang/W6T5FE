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
              src_01={props.userProfile}
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
  userName: "",
  userProfile: "",
  image: "",
  content: "",
  date: "",
  is_me: false,
};

export default Post;
