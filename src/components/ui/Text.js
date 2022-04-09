import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, bold, color, size, margin } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
  };

  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#67686a",
  size: "14px",
  margin: "0px",
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${(props) => props.margin};
`;

export default Text;
