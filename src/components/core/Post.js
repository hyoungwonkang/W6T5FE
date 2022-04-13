import React from "react";
import { history } from "../../redux/configureStore";
import { actionCreators as postActions } from "../../redux/modules/post";
import { useDispatch } from "react-redux";

import { Grid, Text, Image } from "../ui";
import { Button } from "./index";

const Post = (props) => {
  const dispatch = useDispatch();
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
            {props.is_me && (
              <Button
                padding="8px"
                width="auto"
                margin="0px 3px"
                _onClick={(e) => {}}
              >
                수정
              </Button>
            )}
            {props.is_me && (
              <Button
                padding="8px"
                width="auto"
                margin="0px 3px"
                _onClick={(e) => {}}
              >
                삭제
              </Button>
            )}
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
