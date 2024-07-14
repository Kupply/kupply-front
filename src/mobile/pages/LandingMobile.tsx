import { useState } from 'react';
import styled from 'styled-components';

import FAQ from '../components/landing/FAQ';
import MobileHeader from '../assets/base/Header';
import MobileFooter from '../assets/base/Footer';
import GoToApply from '../components/landing/GoToApply';
import ApplyTable from '../components/landing/ApplyTable';
import { isDateInRange, isPeriodPassed } from '../../common/ApplicationPeriod';

function LandingMobile() {
  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

  return (
    <MainWrapper>
      <MobileHeader logined={isLogined} setLogin={setisLogined} />
      <GoToApply />
      {/* {(isDateInRange || isPeriodPassed) && <ApplyTable />} */}
      <ApplyTable />
      {isDateInRange ? null : <BlurBox />}
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
  top: 68%;
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
