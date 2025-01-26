import { useState, useEffect } from 'react';
import styled from 'styled-components';

import FAQ from '../components/landing/FAQ';
import MobileHeader from '../assets/base/Header';
import MobileFooter from '../assets/base/Footer';
import GoToApply from '../components/landing/GoToApply';
import ApplyTable from '../components/landing/ApplyTable';
import { isDateInRange } from '../../common/ApplicationPeriod';
import Typography from '../../assets/Typography';

function LandingMobile() {
  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

  // 회원의 모의지원 여부에 따라 테이블 블러 여부를 결정한다.
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'false');
    }
  }, []);

  return (
    <MainWrapper>
      <MobileHeader logined={isLogined} setLogin={setisLogined} />
      <GoToApply />
      {/* {(isDateInRange || isPeriodPassed) && <ApplyTable />} */}
      <ApplyTable />
      {isDateInRange ? (
        !isApplied ? null : (
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
              모의지원 후 열람 가능합니다.
            </Typography>
          </BlurBox>
        )
      ) : (
        <BlurBox />
      )}
      {/* 임시로 Blur 안 쓰게
      {isDateInRange ? (
        !isApplied ? null : (
          <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
            모의지원 후 열람 가능합니다.
          </Typography>
        )
      ) : null} */}
      <FAQ />
      <MobileFooter />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 23.33vw;
`;

const BlurBox = styled.div`
  width: 100vw;
  height: 82vw;
  top: 116vw; //68%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.44vw;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1.67vw);
  position: absolute;
  bottom: 0;
  -webkit-backdrop-filter: blur(1.67vw);
`;

export default LandingMobile;
