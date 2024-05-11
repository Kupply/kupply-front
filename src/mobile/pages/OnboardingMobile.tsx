import styled from 'styled-components';
import { useState } from 'react';

import Join1 from '../components/onboarding/Join1';
import Preview from '../components/onboarding/Preview';
import Contents from '../components/onboarding/Contents';
import Banner from '../components/onboarding/Banner';
import Join2 from '../components/onboarding/Join2';
import MobileHeader from '../assets/base/Header';
import MobileFooter from '../assets/base/Footer';

function OnboardingMobile() {
  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

  return (
    <MainWrapper>
      <MobileHeader logined={isLogined} setLogin={setisLogined} />
      <Join1 />
      <Preview />
      <Contents />
      <Banner />
      <Join2 />
      <MobileFooter />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 23.33vw;
  overflow-x: hidden;
`;

export default OnboardingMobile;
