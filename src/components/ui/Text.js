import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { bold, color, size, children } = props;
  const styles = { bold: bold, color: color, size: size };
  return (
    <P {...styles}>
      {' '}
      {/*어떤게 들어가 있나 미리 끼얹어준다*/}
      {children}
    </P>
  );
};
//최소한의 정보 보내줌
Text.defaultProps = {
  children: null,
  bold: false,
  color: '#222831',
  size: '14px',
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : '400')};
`;
export default Text;
