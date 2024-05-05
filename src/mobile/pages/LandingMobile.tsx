import styled from 'styled-components';

import ApplyTable from '../components/landing/ApplyTable';
import GoToApply from '../components/landing/GoToApply';
import Header from '../assets/base/Header';
import FAQ from '../components/landing/FAQ';
import Footer from '../assets/base/Footer';

function LandingMobile() {
  const currentDate = new Date();
  const startDate = new Date('2024-05-10');
  const endDate = new Date('2024-05-17');
  const isDateInRange = currentDate >= startDate && currentDate <= endDate;

  return (
    <MainWrapper>
      <GoToApply />
      {isDateInRange && <ApplyTable />}
      <FAQ />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default LandingMobile;
