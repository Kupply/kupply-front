import styled from 'styled-components';

import Carousel from '../../components/onboarding/Carousel';
import Join1 from '../../components/onboarding/Join1';
import Cards from '../../components/onboarding/Cards';
import Join2 from '../../components/onboarding/Join2';
import KupplyImage from '../../components/onboarding/KupplyImage';
import Banner from '../../components/onboarding/Banner';
import Preview from '../../components/onboarding/Preview';
import LandingMobile from '../../mobile/pages/LandingMobile';
import OnboardingMobile from '../../mobile/pages/OnboardingMobile';

function OnboardingPage() {
  return (
    <MainWrapper>
      <OnboardingMobile />
      <LandingMobile />
      <Carousel />
      <Join1 />
      <Cards />
      <Preview />
      <Banner />
      <KupplyImage />
      <Join2 />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export default OnboardingPage;
