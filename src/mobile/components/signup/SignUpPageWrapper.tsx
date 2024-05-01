import { ReactNode, useState } from "react";
import styled from "styled-components";
import MobileProgressBar from "../../assets/progressIndicator/ProgressBar01";
import Typography from "../../../assets/Typography";

interface SignUpPageWrapperProps {
  step: number;
  stepInfo: string;
  children?: ReactNode;
}

export const SignUpPageWrapper:
  React.FC<SignUpPageWrapperProps> = ({ step, stepInfo, children }) => {

  const [currentStep, setCurrentStep] = useState<number>(step);
  const [complete, setComplete] = useState<boolean>(currentStep === 5 ? true : false);

  return (
    <Wrapper>
      <TempHeader></TempHeader>
      {/* <CloseButton>
          <img src={process.env.PUBLIC_URL + 'designImage/icon/icon_02.svg'} alt="Close Button" />
        </CloseButton> */}
      <ContentsTitleWrapper>
        <StepIndicator>
          <Typography color="#D85888" size="10px" bold="400">
            Step {currentStep}
          </Typography>
        </StepIndicator>
        <div style={{display: 'inline-block'}}>
          <Typography size="14px" bold="700">{stepInfo}</Typography>
        </div>
      </ContentsTitleWrapper>
      <MobileProgressBar numberOfSteps={5} currentStep={step} complete={step === 5}/>
      <FormWrapper>
        {children}
      </FormWrapper>
    </Wrapper>
  )
  }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: auto;
  padding-bottom: 5vw;
  background-color: #FFF;

  // // 이 아래는 첫번째 페이지에 대해서만 
  // opacity: 0.7;
  // background: radial-gradient(48.78% 48.78% at 50% 52.3%, rgba(232, 88, 136, 0.15) 0%, rgba(255, 175, 189, 0.05) 100%);

  // //filter: blur(75px);

`;

const TempHeader = styled.div`
height: 43px;
`;
// Wrapper내에서의 align은 나중에 생각
const CloseButton = styled.button`
display: flex;
width: 13.002px;
height: 13.002px;
flex-shrink: 0;
cursor: pointer;
position: absolute;
left: 16px;
top: 36px;
`;

const ContentsTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const StepIndicator = styled.div`
display: flex;
width: 45px;
height: 21px;
//padding: 4px 8px;
justify-content: center;
align-items: center;
gap: 4px;
flex-shrink: 0;
border-radius: 20px;
border: 0.522px solid #D85888;
background: rgba(255, 255, 255, 0.30);
`;

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
