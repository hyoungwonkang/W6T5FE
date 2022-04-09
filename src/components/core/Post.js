import React from 'react';

import { Button } from '../core';
import { Image, Text } from '../ui';

const Post = (props) => {
  return (
    <React.Fragment>
      <Image shape='circle' src={props.src} />
      <Text bold>luke</Text>
    </React.Fragment>
  );
};

export default Post;
