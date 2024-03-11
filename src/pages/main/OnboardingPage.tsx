import styled from 'styled-components';

import Carousel from '../../components/onboarding/Carousel';
import Join1 from '../../components/onboarding/Join1';
import Preview from '../../components/onboarding/Preview';
import Join2 from '../../components/onboarding/Join2';
import KupplyImage from '../../components/onboarding/KupplyImage';
import Banner from '../../components/onboarding/Banner';
import Feature from '../../components/onboarding/Feature';

function OnboardingPage() {
  return (
    <MainWrapper>
      <Carousel />
      <Join1 />
      <Preview />
      <Feature />
      <Banner />
      <KupplyImage />
      <Join2 />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default OnboardingPage;
