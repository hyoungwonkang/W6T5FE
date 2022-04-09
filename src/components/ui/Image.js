import styled from 'styled-components';
import React from 'react';

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };
  if (shape === 'circle') {
    return (
      <ImageCircle {...styles}></ImageCircle> //styles 들어가는것 이해 안됩니다.
    );
  }

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: 'circle',
  src: 'https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137',
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) =>
    props.size}px; // size를 개별로 주기 귀찮으니 --size를 이용합니다.
  width: var(--size);
  height: var(--size);
  background-image: url(' ${(props) => props.src}');
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url(' ${(props) => props.src}');
  background-size: cover;
`;
const ImageCircle = styled.div`
  --size: ${(props) =>
    props.size}px; // size를 개별로 주기 귀찮으니 --size를 이용합니다.
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url(' ${(props) => props.src}');
  background-size: cover;
  margin: 4px;
`;

export default Image;
