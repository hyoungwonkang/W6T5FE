import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    no_bg,
    padding,
    float,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    float: float,
  };

  if (no_bg) {
    return (
      <React.Fragment>
        <ButtonDefault onClick={_onClick}>
          {text ? text : children}
        </ButtonDefault>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  text: false,
  is_float: false,
  no_bg: false,
  _onClick: () => {},
  width: "100%",
  margin: "0px",
  padding: "12px 0px",
  float: false,
};

const ElButton = styled.button`
  width: 100%;
  background-color: #4f6ac1;
  color: #ffffff;
  padding: ${(props) => props.padding};
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  float: ${(props) => props.float};
`;

const FloatButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 16px;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: none;
  border-radius: 50%;
  font-size: 36px;
  font-weight: bold;
  background-color: #4f6ac1;
  color: white;
`;

const ButtonDefault = styled.button`
  padding: 0px;
  border: none;
  box-sizing: border-box;
  background-color: #fff;
`;

export default Button;
