import styled from 'styled-components';
import MobileProgressBar from '../../../assets/progressIndicator/ProgressBar01';

interface NotSubmittedHeaderProps {
  currentStep: number;
}

export default function NotSubmittedHeader(props: NotSubmittedHeaderProps) {
  const { currentStep } = props;

  return (
    <Wrapper>
      <ProgressBarWrapper>
        <MobileProgressBar numberOfSteps={3} currentStep={currentStep} complete={true} />
        <StepWrappper>
          <ProgressBarTitle>STEP 1</ProgressBarTitle>
          <ProgressBarTitle>STEP 2</ProgressBarTitle>
          <ProgressBarTitle>STEP 3</ProgressBarTitle>
        </StepWrappper>
      </ProgressBarWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  //flex-direction: column;
  align-items: center;
  margin-top: 5.28vw;

  border: 1px solid black;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepWrappper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 77.78vw;
`;

const ProgressBarTitle = styled.text`
  color: var(--Secondary, #e57c90);
  text-align: center;
  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;
