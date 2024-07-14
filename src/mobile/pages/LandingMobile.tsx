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
      {(isDateInRange || isPeriodPassed) && <ApplyTable />}
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

export default LandingMobile;
