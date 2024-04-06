import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

export interface MobileTabMenuButtonProps {
  children?: React.ReactNode;
}

const MobileTabMenu02 = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleChoiceClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <Container>
      <ChoiceArea onClick={() => handleChoiceClick(1)}>
        <InnerText isClicked={selectedIndex === 1}>1지망</InnerText>
      </ChoiceArea>
      <ChoiceArea onClick={() => handleChoiceClick(2)}>
        <InnerText isClicked={selectedIndex === 2}>2지망</InnerText>
      </ChoiceArea>
      <Bar isClicked={selectedIndex === 1} left />
      <Bar isClicked={selectedIndex === 2} right />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 45px;
  background: #fff;
`;

const ChoiceArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InnerText = styled.div<{ isClicked: boolean }>`
  opacity: ${({ isClicked }) => (isClicked ? '1' : '0.6')};
  font-family: Pretendard;
  font-size: 3.61vw;
  font-weight: 700;
  color: #141414;
`;

const Bar = styled.div<{ isClicked: boolean; left?: boolean; right?: boolean }>`
  display: ${({ isClicked }) => (isClicked ? 'block' : 'none')};
  position: absolute;
  bottom: 0;
  height: 4px;
  width: 50vw;
  background-color: #d85888;
  left: ${({ left }) => (left ? '0' : 'auto')};
  right: ${({ right }) => (right ? '0' : 'auto')};
`;

export default MobileTabMenu02;
