import styled from 'styled-components';

import Join1 from '../components/onboarding/Join1';
import Preview from '../components/onboarding/Preview';
import Contents from '../components/onboarding/Contents';
import Banner from '../components/onboarding/Banner';
import Join2 from '../components/onboarding/Join2';
import Header from '../assets/base/Header';
import Footer from '../assets/base/Footer';

function OnboardingMobile() {
  return (
    <MainWrapper>
      <Join1 />
      <Preview />
      <Contents />
      <Banner />
      <Join2 />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default OnboardingMobile;
