import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
      <GlobalStyles />
      <ProfileWrapper>
        <ProfileBox />
      </ProfileWrapper>

      <MainWrapper>
        <InterestMajorBox>
          <InterestMajorButton onView={onViewMajor === 1} onClick={onClickInterest1} style={{ zIndex: 2 }} />
          <InterestMajorButton onView={onViewMajor === 2} onClick={onClickInterest2} style={{ zIndex: 2 }}>
            2지망
          </InterestMajorButton>
        </InterestMajorBox>
        <div style={{ position: 'relative', display: 'flex', gap: '1.25vw' }}>
          <MajorBox />
          <LiveWrapper>
            <Application />
            <div style={{ marginTop: '0.35vw' }}></div>
            <MockApply />
          </LiveWrapper>
          <ThreeYear />
        </div>
        <QuartileIndicator />
        <div style={{ position: 'relative', display: 'flex', gap: '1.25vw' }}>
          <PieChart />
          <Scatter />
        </div>
      </MainWrapper>
    </Wrapper>
  );
};

const GlobalStyles = createGlobalStyle` // 가로 스크롤 숨기기
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 100vw;
  max-width: 1920px;
  //min-height: 200vh;
  max-height: 200vh;

  flex-shrink: 0;
  background: #fefafb;
  //background: black;

  background-image: url('designImage/myBoard/MyBoardBackground.png');
  background-size: 100vw 1027px;
  background-repeat: no-repeat;
  background-position: 0px;

  padding-bottom: 165px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 6.77vw;
`;

const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  //margin-top: 62.02px;
  margin-left: 5.83vw;
  gap: 1.25vw;
`;

const LiveWrapper = styled.div`
  position: relative;
  row-gap: 0.34vw;
`;

const InterestMajorBox = styled.div`
  display: flex;
  margin-top: 58px;
  gap: 0.9375vw;
`;

export default MyBoardPage;
