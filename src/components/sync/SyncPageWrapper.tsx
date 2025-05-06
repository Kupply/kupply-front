import React from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

import Typography from '../../assets/Typography';
import MultiStepProgressBar from '../../assets/progressIndicator/ProgressBar';

interface SyncPageWrapperProps {
  step: number;
  stepInfo: string;
  children?: ReactNode;
}

export const SyncPageWrapper: React.FC<SyncPageWrapperProps> = ({ step, stepInfo, children }) => {
  const [currentStep, setCurrentStep] = useState<number>(step);
  const [complete, setComplete] = useState<boolean>(currentStep === 3 ? true : false);

  return (
    <Wrapper>
      <TitleWrapper>
        {currentStep !== 3 ? (
          <>
            <Typography size="1.98vw" bold="700" style={{ lineHeight: '131.579%' }}>
              환영합니다!
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', marginTop: '0.5vw' }}>
              <Typography size="0.9375vw" bold="500" style={{ opacity: '0.8', marginTop: '0.2604vw' }}>
                간단한 인증을 통해
              </Typography>
              <img
                src={process.env.PUBLIC_URL + `/designImage/login/tigerEmoji.png`}
                alt="tigerEmoji"
                style={{ height: '1.5vw' }}
              />
              <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8', marginTop: '0.2604vw' }}>
                고파스 아이디와 쿠플라이 아이디
              </Typography>
              <Typography size="0.9375vw" bold="500" style={{ opacity: '0.8', marginTop: '0.2604vw' }}>
                를 연동하세요.
              </Typography>
            </div>
          </>
        ) : (
          <>
            <Typography size="1.98vw" bold="700" style={{ lineHeight: '131.579%' }}>
              거의 다왔습니다!
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', marginTop: '0.5vw' }}>
              <Typography size="0.9375vw" bold="500" style={{ opacity: '0.8', marginTop: '0.2604vw' }}>
                약관을 확인하고
              </Typography>
              <img
                src={process.env.PUBLIC_URL + `/designImage/login/tigerEmoji.png`}
                alt="tigerEmoji"
                style={{ height: '1.5vw' }}
              />
              <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8', marginTop: '0.2604vw' }}>
                고파스 아이디와 쿠플라이 아이디
              </Typography>
              <Typography size="0.9375vw" bold="500" style={{ opacity: '0.8', marginTop: '0.2604vw' }}>
                를 연동하세요.
              </Typography>
            </div>
          </>
        )}
      </TitleWrapper>
      <MultiStepProgressBar numberOfSteps={3} currentStep={currentStep} complete={complete} />
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step {currentStep}</StepIndicator>
          <div>
            <Typography size="1.25vw" bold="700">
              {stepInfo}
            </Typography>
          </div>
          {currentStep === 3 ? (
            <>
              <HeaderBar>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 630 2" fill="none">
                  <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
                </svg>
              </HeaderBar>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 630 2" fill="none">
                <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
              </svg>
            </>
          )}
        </ContentsTitleWrapper>
        {children}
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  //height: 1153px;
  height: auto;
  padding-bottom: 5vw;
  max-width: 2560px;
  background-color: #fcfafb;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5625vw; //30px;
  padding-bottom: 1.302vw; //25px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 42.5vw;
  //height: 1000px;
  height: auto;
  padding: 2.188vw 4.896vw 10vw 4.896vw; // 42px 94px 78px 94px
  border-radius: 0.521vw; //10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  margin-top: 1.302vw; //25px;
`;
const StepIndicator = styled.div`
  display: inline-flex;
  padding: 0.417vw 0.9375vw; //8px 18px
  justify-content: center;
  margin-bottom: 0.885vw; //17px;
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
  margin-bottom: 2.604vw; //50px;
`;

const HeaderBar = styled.svg`
  width: 100%;
  //max-width: 628px;
  margin-top: 0.625vw; //12px;
  margin-bottom: 0px;
`;
