import React from "react";
import { useState } from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import Typography from "../../assets/Typography";
import MultiStepProgressBar from "../../assets/progressIndicator/ProgressBar";

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
      <TitleWrapper>
        <Typography size="1.98vw" bold="700" style={{ lineHeight: '131.579%' }}>환영합니다!</Typography>
        <Typography size="0.9375vw" bold="500" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete}/>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step {currentStep}</StepIndicator>
          <div>
          <Typography size="1.25vw" bold="700">{stepInfo}</Typography>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32.81vw" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
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
  max-width: 2560px;
  height: 1153px;
  background-color: #fcfafb;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 25px;
`;
const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width:  42.5vw; //816px
  height: 850px;
  padding: 42px 4.895vw 78px 4.895vw;
  padding-left: 4.895vw;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  margin-top: 25px;
`;

const StepIndicator = styled.div`
  display: inline-flex;
  padding: 8px 0.9375vw;
  justify-content: center;
  margin-bottom: 17px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid #d85888;
  background: rgba(255, 255, 255, 0.3);
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

