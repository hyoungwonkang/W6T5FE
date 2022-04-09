import React from "react";
import { Text, Grid } from "../ui";
import styled from "styled-components";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElTextarea
          value={value}
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }
  return (
    <Grid>
      {label && <Text margin="0px">{label}</Text>}
      {is_submit ? (
        <ElementInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      ) : (
        <ElementInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
        />
      )}
    </Grid>
  );
};
Input.defaultProps = {
  multiLine: false,
  label: false,
  type: "텍스트",
  placeholder: "텍스트를 입력해주세요.",
  value: "",
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {}, //콜백함수,부모가 input의 변한값을 가지고 리덕스에 그때그때 저장하고 싶어서.
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElementInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;
export default Input;
