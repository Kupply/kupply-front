import React, { useState } from 'react';
import styled from 'styled-components';

import MobileTabMenu05 from '../../assets/tabMenu/TabMenu05';

const MobileQuartileIndicator = ({
  onViewMajor,
  myStageData,
  isApplied,
}: {
  onViewMajor: any;
  myStageData: any;
  isApplied: boolean;
}) => {
  let myPercentile = (myStageData.rank / myStageData.applyNum) * 100;
  if (myStageData.rank === myStageData.applyNum && myStageData.rank === 1) {
    myPercentile = 1;
  }

  return (
    <>
      {isApplied === false ? (
        <></>
      ) : (
        <Wrapper>
          <TitleBox>
            <Icon src="designImage/mobile/myboard/QuartileIcon.svg" alt="Icon" />
            <TitleText>내 학점 위치 파악하기</TitleText>
          </TitleBox>

          <BodyBox>
            <ChartBox>
              <MobileTabMenu05 {...myStageData} />
            </ChartBox>
            <BodyBodyBox>
              <ContentBox>
                <ContentText>고대빵님의 경영학과 이중 지원 시 지원안정도 점수는,</ContentText>
              </ContentBox>
              <PercentBox>
                <NumText>{myPercentile.toFixed(2)}</NumText>
                <PercentText>%</PercentText>
              </PercentBox>
            </BodyBodyBox>
            <Text4>설문조사를 통해 제공되는 자체 통계로 실제 통계와 상이할 수 있습니다.</Text4>
          </BodyBox>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 91.11vw;
  height: 64.44vw;

  margin-top: 16.67vw;
`;

const BodyBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  width: 91.11vw;
  height: 47.78vw;
  border-radius: 2.78vw;
  border: 0.45px solid #eee;
  //opacity: 0.6;
  background: #fff;

  margin-top: 3.61vw;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;

  gap: 1.67vw;
  margin-bottom: 1.94vw;
`;

const ChartBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  margin-top: 3.61vw;
`;

const BodyBodyBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 81.66vw;
  top: 33.33vw;
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  width: 51.94vw;
`;

const PercentBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  gap: 0.83vw;
`;

const Text4 = styled.div`
  position: absolute;
  top: 52.78vw;
  left: 4.44vw;

  color: #a8a8a8;

  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

///////////////// Text /////////////////
const TitleText = styled.text`
  color: #141414;

  /* mob_body_Bold */
  font-family: Pretendard;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
`;

const ContentText = styled.text`
  color: #141414;

  /* mob_detail_Medium */
  font-family: Pretendard;
  font-size: 3.89vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
`;

const NumText = styled.text`
  color: #d85888;

  /* mob_head1_bold */
  font-family: Pretendard;
  font-size: 8.33vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 36px */
`;

const PercentText = styled.text`
  color: rgba(67, 67, 67, 0.8);

  /* mob_head1_bold */
  font-family: Pretendard;
  font-size: 8.33vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 36px */
`;

///////////////// image /////////////////

const Icon = styled.img`
  position: relative;
  display: flex;

  width: 4.44vw;
  height: 4.44vw;
`;

export default MobileQuartileIndicator;
