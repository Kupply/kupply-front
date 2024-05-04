import styled from 'styled-components';

import ApplyTable from '../components/landing/ApplyTable';
import GoToApply from '../components/landing/GoToApply';
import Header from '../assets/base/Header';
import FAQ from '../components/landing/FAQ';
import Footer from '../assets/base/Footer';

function LandingMobile() {
  return (
    <MainWrapper>
      <Header />
      <GoToApply />
      <ApplyTable />
      <FAQ />
      <Footer />
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
