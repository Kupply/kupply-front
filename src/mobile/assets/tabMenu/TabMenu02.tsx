import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { MajorOptionsKR as MajorOptions } from '../../../mappings/MajorTypes';

export interface MobileTabMenuButtonProps {
  children?: React.ReactNode;
}

const MobileTabMenu02_1 = ({
  onViewMajor,
  onViewChange,
}: {
  onViewMajor: number;
  onViewChange: (index: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(onViewMajor);

  const handleChoiceClick = (index: number) => {
    setSelectedIndex(index);
    onViewChange(index);
  };

  useEffect(() => {
    setSelectedIndex(onViewMajor);
  }, [onViewMajor]);

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

const MobileTabMenu02_2 = ({
  onViewMajor,
  onViewChange,
}: {
  onViewMajor: number;
  onViewChange: (index: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(onViewMajor);

  useEffect(() => {
    setSelectedIndex(onViewMajor);
  }, [onViewMajor]);

  return (
    <Container>
      <ChoiceArea>
        <InnerText isClicked={selectedIndex === 1}>1지망</InnerText>
      </ChoiceArea>
      <ChoiceArea>
        <InnerText2>2지망</InnerText2>
      </ChoiceArea>
      <Bar21 />
      <Bar22 />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 12.5vw;
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

const InnerText2 = styled.div`
  opacity: 0.6;
  font-family: Pretendard;
  font-size: 3.61vw;
  font-weight: 700;
  color: #b9b9b9;
`;

const Bar = styled.div<{ isClicked: boolean; left?: boolean; right?: boolean }>`
  display: ${({ isClicked }) => (isClicked ? 'block' : 'none')};
  position: absolute;
  bottom: 0;
  height: 1.11vw;
  width: 50vw;
  background-color: #d85888;
  left: ${({ left }) => (left ? '0' : 'auto')};
  right: ${({ right }) => (right ? '0' : 'auto')};
`;

const Bar21 = styled.div`
  position: absolute;
  bottom: 0;
  height: 1.11vw;
  width: 50vw;
  background-color: #d85888;
`;

const Bar22 = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1.11vw;
  width: 50vw;
  background: var(--A8_Grey-4, #a8a8a8);
`;

export { MobileTabMenu02_1, MobileTabMenu02_2 };
