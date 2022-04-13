import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    is_flex,
    width,
    height,
    padding,
    margin,
    border,
    bg,
    center,
    right,
    scroll,
    _onClick,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    border: border,
    bg: bg,
    center: center,
    scroll: scroll,
    right: right,
  };

  return (
    <GridBox {...styles} onClick={_onClick}>
      {children}
    </GridBox>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  border: false,
  bg: false,
  center: false,
  right: false,
  scroll: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items:center; justify-content:space-between;`
      : ""}
  ${(props) => (props.center ? `text-align:center;` : "")}
  ${(props) => (props.right ? `text-align:right;` : "")}
  ${(props) => (props.scroll ? `overflow-y:scroll;` : "")}
`;

export default Grid;
