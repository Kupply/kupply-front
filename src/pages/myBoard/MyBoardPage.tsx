import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import ProfileBox from '../../components/myBoard/ProfileBox';
import MajorBox from '../../components/myBoard/MajorBox';
import { Application, MockApply } from '../../components/myBoard/LiveApplicantStatus';
import ThreeYear from '../../components/myBoard/ThreeYearIndicator';
import QuartileIndicator from '../../components/myBoard/QuartileIndicator';
import PieChart from '../../components/myBoard/Graph/PieChart';
import Scatter from '../../components/myBoard/Graph/Scatter';

import InterestMajorButton from '../../assets/myboardpage/InterestMajorButton'; // 1지망 2지망 선택 버튼

const MyBoardPage = () => {
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // (1): 1지망 (2): 2지망
  const onClickInterest1 = useCallback(() => {
    setOnViewMajor(1);
    console.log('1지망 선택');
  }, [onViewMajor]);

  const onClickInterest2 = useCallback(() => {
    setOnViewMajor(2);
    console.log('2지망 선택');
  }, [onViewMajor]);

  const [scrollY, setScrollY] = useState(0); // 배경 이미지 + 프로필 박스 화면 따라오기

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper style={{ backgroundPosition: `0 ${scrollY - 200}px` }}>
      <InterestMajorBox>
        <InterestMajorButton onView={onViewMajor === 1} onClick={onClickInterest1} style={{ zIndex: 2 }} />
        <InterestMajorButton onView={onViewMajor === 2} onClick={onClickInterest2} style={{ zIndex: 2 }}>
          2지망
        </InterestMajorButton>
      </InterestMajorBox>

      <div style={{ position: 'absolute', top: '62.02px', left: '4.98vw' }}>
        <ProfileBox />
      </div>

      <MainWrapper>
        <div style={{ position: 'absolute', top: '224px', left: '27.3vw' }}>
          <MajorBox />
        </div>
        <LiveWrapper>
          <Application />
          <div style={{ marginTop: '24px' }} />
          <MockApply />
        </LiveWrapper>
        <div style={{ position: 'absolute', top: '224px', left: '62.29vw' }}>
          <ThreeYear />
        </div>
        <div style={{ position: 'absolute', top: '601px', left: '27.3vw' }}>
          <QuartileIndicator />
        </div>
        <div style={{ position: 'absolute', top: '877px', left: '27.3vw' }}>
          <PieChart />
        </div>
        <div style={{ position: 'absolute', top: '877px', left: '56.46vw' }}>
          <Scatter />
        </div>
      </MainWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // position: relative;
  // justify-content: center;
  width: 100vw;
  height: 1678px;

  // display: grid;
  // grid-template-columns: auto auto;
  // gap: 112px;

  flex-shrink: 0;
  background: #fefafb;
  //background: black;

  background-image: url('designImage/myBoard/MyBoardBackground.png');
  background-size: 100vw 1027px;
  background-repeat: no-repeat;
  background-position: 0px;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 1481px;
  flex-shrink: 0;

  margin-top: 128px;
`;

const LiveWrapper = styled.div`
  position: absolute;
  top: 224px;
  left: 44.8vw;
`;

const InterestMajorBox = styled.div`
  position: absolute;
  display: flex;
  top: 154px;
  left: 27.3vw;

  gap: 0.9375vw;
`;

export default MyBoardPage;
