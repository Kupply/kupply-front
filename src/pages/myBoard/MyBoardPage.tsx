import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProfileBox from '../../components/myBoard/ProfileBox';
import MajorBox from '../../components/myBoard/MajorBox';
import { Application, MockApply } from '../../components/myBoard/LiveApplicantStatus';
import ThreeYear from '../../components/myBoard/ThreeYearIndicator';
import QuartileIndicator from '../../components/myBoard/QuartileIndicator';

const MyBoardPage = () => {
  const [scrollY, setScrollY] = useState(0);

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
      <div style={{ position: 'absolute', top: '62.02px', left: '4.98vw' }}>
        <ProfileBox />
      </div>
      <MainWrapper>
        <div style={{ position: 'absolute', top: '128px', left: '27.34vw' }}>
          <MajorBox />
        </div>
        <LiveWrapper>
          <Application />
          <div style={{ marginTop: '24px' }} />
          <MockApply />
        </LiveWrapper>
        <div style={{ position: 'absolute', top: '128px', left: '62.29vw' }}>
          <ThreeYear />
        </div>
        <div style={{ position: 'absolute', top: '505px', left: '27.34vw' }}>
          <QuartileIndicator />
        </div>
      </MainWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // position: relative;
  // justify-content: center;
  width: 100vw;
  height: 2036px;

  // display: grid;
  // grid-template-columns: auto auto;
  // gap: 112px;

  flex-shrink: 0;
  background: #fefafb;
  // background: black;

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
  top: 128px;
  left: 44.8vw;
`;

export default MyBoardPage;
