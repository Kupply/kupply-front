import React, { useState } from 'react';
import styled from 'styled-components';

import MyStageChart from '../../assets/tabMenu/TabMenu05';

// backgroudn svg 적용 X

const QuartileIndicator = () => {
  const [myStageData, setMyStageData] = useState([
    {
      majorName: '',
      recruitNum: 0,
      applyNum: 0,
      rank: 0,
    },
    {
      majorName: '',
      recruitNum: 0,
      applyNum: 0,
      rank: 0,
    },
  ]);
  return (
    <Wrapper>
      <TitleBox>
        <TitleText>내 학점 위치 파악하기</TitleText>
        <Information src="designImage/myBoard/InformationCircle.svg" alt="information" />
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="57vw" height="0.1vw" viewBox="0 0 1096 2" fill="none">
        <path d="M0.883301 1L1095.12 1" stroke="#DFDFDF" />
      </StyleSvg>
      <ChartBox>{/* <MyStageChart {...myStageData[0]} /> */}</ChartBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 57.08vw;
  height: 12.4vw;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
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

const ChartBox = styled.div`
  position: absolute;
  display: flex;
  top: 5.46vw;
  left: 2.08vw;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.042vw;
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

export default QuartileIndicator;
