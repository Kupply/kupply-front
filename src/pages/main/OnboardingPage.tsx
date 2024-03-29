import styled from 'styled-components';

import Carousel from '../../components/onboarding/Carousel';
import Join1 from '../../components/onboarding/Join1';
import Cards from '../../components/onboarding/Cards';
import Join2 from '../../components/onboarding/Join2';
import KupplyImage from '../../components/onboarding/KupplyImage';
import Banner from '../../components/onboarding/Banner';
import Preview from '../../components/onboarding/Preview';
import CTA02 from '../../mobile/assets/CTAs/CTA02';

function OnboardingPage() {
  return (
    <MainWrapper>
      <CTA02 size="large" state="disabled">
        나도 모의지원 하러가기!
      </CTA02>
      <CTA02 size="large">나도 모의지원 하러가기!</CTA02>
      <CTA02></CTA02>
      <CTA02 state="disabled"></CTA02>
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
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default OnboardingPage;
