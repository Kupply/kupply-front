import styled from 'styled-components';
import { useState } from 'react';

import ApplyTable from '../components/landing/ApplyTable';
import GoToApply from '../components/landing/GoToApply';
import FAQ from '../components/landing/FAQ';
import Footer from '../assets/base/Footer';
import MobileHeader from '../assets/base/Header';
import MobileFooter from '../assets/base/Footer';

function LandingMobile() {
  const currentDate = new Date();
  const startDate = new Date('2024-05-10');
  const endDate = new Date('2024-05-17');
  const isDateInRange = currentDate >= startDate && currentDate <= endDate;

  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  const [selected, setSelected] = useState(0);

  return (
    <MainWrapper>
      <MobileHeader logined={isLogined} setLogin={setisLogined} setSelected={setSelected} />
      <GoToApply />
      {isDateInRange && <ApplyTable />}
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
