import React from "react";
import { Grid, Text, Image } from "../ui";
import { Button } from "../core";

const CommentList = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, insert_dt, contents } =
    props;
  return (
    <Grid is_flex>
      <Grid width="auto" center>
        <Image shape="circle" border="2px solid #dddddd" />
        <Text>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 0px 0px 15px">
        <Text margin="0px 10px 0px 5px">{contents}</Text>
        <Text>{insert_dt}</Text>
      </Grid>
      <Button width="auto" padding="8px" margin="0px 3px">
        M
      </Button>
      <Button width="auto" padding="8px" margin="0px 3px">
        D
      </Button>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile:
    "https://visla.kr/wp/wp-content/uploads/2015/03/The-Simpsons-Illustrated-in-Streetwear-05.jpg",
  user_name: "yoonji",
  user_id: "uooh",
  post_id: 1,
  contents: "멋있어요! 모자 어디서 사셨어요??",
  insert_dt: "2022-04-09 09:00:00",
};
