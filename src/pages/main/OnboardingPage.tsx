import styled from 'styled-components';

import Carousel from '../../components/onboarding/Carousel';
import Join1 from '../../components/onboarding/Join1';
import Preview from '../../components/onboarding/Preview';

function OnboardingPage() {
  return (
    <MainWrapper>
      <Carousel />
      <Join1 />
      <Preview />
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
