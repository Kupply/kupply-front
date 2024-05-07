import React from 'react';
import styled from 'styled-components';

import MobileHalfPie from '../../assets/graph/HalfPie';
import MobilePie from '../../assets/graph/Pie';

const MobilePieChart = ({
  onViewMajor,
  curData,
  isApplied,
}: {
  onViewMajor: any;
  curData: any;
  isApplied: boolean;
}) => {
  return (
    <>
      {isApplied === false ? (
        <></>
      ) : (
        <Wrapper>
          <TitleBox>
            <Icon src="designImage/mobile/myboard/Chart.svg" alt="Icon" />
            <TitleText>지원자 정보 살펴보기</TitleText>
          </TitleBox>

          <Body1>
            <PieBox>
              <MobilePie onViewMajor={onViewMajor} curData={curData} />
            </PieBox>
          </Body1>

          <Body2>
            <HalfPieBox>
              <MobileHalfPie onViewMajor={onViewMajor} curData={curData} />
            </HalfPieBox>
          </Body2>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  position: relative;

  width: 91.11vw;
  height: auto;
  margin-top: 16.67vw;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;

  gap: 1.67vw;
  margin-bottom: 1.94vw;
`;

const Body1 = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 91.11vw;
  height: 72.5vw;

  fill: #f8f8f8;
  border-radius: 2.78vw;
  border: 1px solid var(--box_stroke, #a8a8a8);
  box-shadow: 0px 4px 200px 0px rgba(20, 20, 20, 0.05);

  margin-top: 4.72vw;
`;

const Body2 = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 91.11vw;
  height: 60.28vw;

  fill: #f8f8f8;
  border-radius: 2.78vw;
  border: 1px solid var(--box_stroke, #a8a8a8);
  box-shadow: 0px 4px 200px 0px rgba(20, 20, 20, 0.05);

  margin-top: 5.56vw;
`;

const PieBox = styled.div`
  position: relative;
  display: flex;
`;

const HalfPieBox = styled.div`
  position: relative;
  display: flex;
`;

///////////////// text /////////////////
const TitleText = styled.text`
  color: #141414;

  /* mob_body_Bold */
  font-family: Pretendard;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
`;

///////////////// image /////////////////
const Icon = styled.img`
  position: relative;
  display: flex;

  width: 4.44vw;
  height: 4.44vw;
`;

export default MobilePieChart;
