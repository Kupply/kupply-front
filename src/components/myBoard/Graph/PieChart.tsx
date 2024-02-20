import React from 'react';
import styled from 'styled-components';

import Pie from '../../../assets/Graph/Pie';
import HalfPie from '../../../assets/Graph/HalfPie';

const PieChart = () => {
  return (
    <Wrapper>
      <TitleBox>
        <TitleText>지원자 정보 살펴보기</TitleText>
        <Information src="designImage/myBoard/InformationCircle.svg" alt="information" />
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="27.81vw" height="0.1vw" viewBox="0 0 534 2" fill="none">
        <path d="M-0.00195312 1H534.002" stroke="#DFDFDF" />
      </StyleSvg>
      <PieBox>
        <Pie />
      </PieBox>
      <StyleSvg2 xmlns="http://www.w3.org/2000/svg" width="27.81vw" height="0.1vw" viewBox="0 0 534 2" fill="none">
        <path d="M-0.00195312 1H534.002" stroke="#DFDFDF" />
      </StyleSvg2>
      <HalfPieBox>
        <HalfPie />
      </HalfPieBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 27.92vw;
  height: 40.75vw;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  fill: var(--, radial-gradient(230.3% 140.56% at 0% 1.23%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%));
  stroke-width: 1px;
  stroke: #dfdfdf;
  backdrop-filter: blur(12px);
`;

const TitleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.08vw;
  top: 1.28vw;
  gap: 0.47vw;
`;

const PieBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.13vw;
  top: 6.67vw;
`;

const HalfPieBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.13vw;
  top: 26.47vw;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

///////////////// image /////////////////

const Information = styled.img`
  display: flex;
  width: 1.042vw;
  height: 0.98vw;

  flex-shrink: 0;
`;

const StyleSvg = styled.svg`
  position: absolute;
  top: 3.54vw;
`;

const StyleSvg2 = styled.svg`
  position: absolute;
  top: 23.57vw;
`;

export default PieChart;
