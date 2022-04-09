import React from "react";
import { Grid, Image, Text } from "../components/ui";
import { Button, Input, Upload } from "../components/core";

import { useSelector } from "react-redux";

const Write = (props) => {
  const preview = useSelector((state) => state.image.preview);

  return (
    <React.Fragment>
      <Grid padding="16px 10px">
        <Text size="20px" bold width="auto">
          게시물 작성
        </Text>
        <Upload></Upload>
      </Grid>
      <Grid>
        <Grid padding="16px 10px">
          <Text size="20px" bold>
            미리보기
          </Text>
        </Grid>
        <Image
          shape="rectangle"
          src_02={
            preview
              ? preview
              : "https://ssr-releases-cdn.paperlesspost.com/_next/static/images/MobileMediaPoster-553a691ac40df070a04c82b601a117ec.jpg"
          }
        />
      </Grid>
      <Grid padding="16px">
        <Input multiLine rows label="게시글 내용" />
      </Grid>
      <Grid padding="16px">
        <Button text="작성하기"></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Write;
