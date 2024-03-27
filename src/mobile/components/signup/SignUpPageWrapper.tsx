import { ReactNode, useState } from "react";
import styled from "styled-components";


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
      <CloseButton>
        <img src={process.env.PUBLIC_URL + 'designImage/icon/icon_02.svg'} alt="Close Button" />
      </CloseButton>
      <ContentsTitleWrapper>
        <StepIndicator>Step {currentStep}</StepIndicator>
        <div>
        <Typography size="1.25vw" bold="700">{stepInfo}</Typography>
        </div>
      </ContentsTitleWrapper>
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
`;

// Wrapper내에서의 align은 나중에 생각
const CloseButton = styled.button`
display: flex;
width: 13.002px;
height: 13.002px;
flex-shrink: 0;
justify-content: center;
align-items: center;
cursor: pointer;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 2.604vw; //50px;
`;
