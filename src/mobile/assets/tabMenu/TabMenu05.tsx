import React from 'react';
import styled from 'styled-components';

type Rank = '01' | '02' | '03' | '04';

interface myStageData {
  majorName: string;
  recruitNum: number;
  applyNum: number;
  rank: number;
}

function calculateRank(myPercentile: number): Rank {
  if (myPercentile <= 25) {
    return '01';
  } else if (myPercentile <= 50) {
    return '02';
  } else if (myPercentile <= 75) {
    return '03';
  } else {
    return '04';
  }
}

const MobileTabMenu05: React.FC<myStageData> = (data) => {
  let { majorName, recruitNum, applyNum, rank: rankNum } = data;
  const hopeMajor2 = localStorage.getItem('hopeMajor2') || '';
  if (hopeMajor2 === majorName) {
    applyNum++;
  }
  let myPercentile = (rankNum / applyNum) * 100;
  if (rankNum === applyNum && rankNum === 1) {
    myPercentile = 1;
  }
  // FIXME: applyNum 0일때?
  let rank: Rank = calculateRank(myPercentile); // 4단계 중 현재 위치

  switch (rank) {
    case '01':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox1 src="../../designImage/tabMenu/tabmenu_type_05_mobile_1.webp" />
          </Wrapper>
        </MainWrapper>
      );

    case '02':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox1 src="../../designImage/tabMenu/tabmenu_type_05_mobile_2.webp" />
          </Wrapper>
        </MainWrapper>
      );

    case '03':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox1 src="../../designImage/tabMenu/tabmenu_type_05_mobile_3.webp" />
          </Wrapper>
        </MainWrapper>
      );

    case '04':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox1 src="../../designImage/tabMenu/tabmenu_type_05_mobile_4.webp" />
          </Wrapper>
        </MainWrapper>
      );

    default:
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox1 src="../../designImage/tabMenu/tabmenu_type_05_mobile_1.webp" />
          </Wrapper>
        </MainWrapper>
      );
  }
};

const MainWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StageBox1 = styled.img`
  width: 82.22vw;
  flex-shrink: 0;
`;

export default MobileTabMenu05;
