import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import NextButton from './buttons/NextButton';

export interface StepProps {
  isActive: boolean;
  isComplete: boolean;
  stepType: 'active' | 'inactive' | 'complete';
}

export interface MultiStepProgressBarProps {
  numberOfSteps: number;
  // steps: Array<number>;
  currentStep: number;
  complete: boolean;
}

export default function MultiStepProgressBar(props: MultiStepProgressBarProps) {
  const { numberOfSteps = 5, currentStep, complete = false, ...rest } = props;

  return (
    <div style={{ width: '976.8px', height: '30px' }}>
      <ProgressBarContainer>
        {Array.from({ length: numberOfSteps }).map((_, i) => (
          <StepItem
            key={i}
            isActive={currentStep === i + 1}
            isComplete={i + 1 < currentStep || complete}
            stepType={currentStep === i + 1 ? 'active' : currentStep < i + 1 ? 'inactive' : 'complete'}
          >
            <Step
              isActive={currentStep === i + 1}
              isComplete={i + 1 < currentStep || complete}
              stepType={currentStep === i + 1 ? 'active' : currentStep < i + 1 ? 'inactive' : 'complete'}
            >
              {currentStep > i + 1 ? <img src="../../design_image/fi_check.svg" alt="ERROR" /> : null}
            </Step>
          </StepItem>
        ))}
      </ProgressBarContainer>
    </div>
  );
}

// 막대바 디자인
const StepItem = styled.div<StepProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 100%;

  &:not(:first-child):before {
    content: '';
    background: ${(props) => (props.stepType === 'inactive' ? '#fcecee' : '#e57c90')};
    position: absolute;
    width: 100%;
    height: 4px;
    right: 50%;
    top: 33.3333%;
    transform: translateY(100%);
  }
`;

// 원(step) 디자인
const Step = styled.div<StepProps>`
  width: 1.875rem; // 16xp = 1rem 기준
  height: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: relative;
  border-radius: 50%;

  ${(props) =>
    props.stepType === 'active' &&
    css`
      background-color: #e57c90;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: 50%;
        height: 50%;
        background-color: white;
        border-radius: 50%;
        z-index: 2;
      }
    `}

  ${(props) =>
    props.stepType === 'inactive' &&
    css`
      background-color: #fcecee;
    `}

  ${(props) =>
    props.stepType === 'complete' &&
    css`
      background-color: #e57c90;
      position: relative;

      img {
        width: 55%;
        height: 55%;
        object-fit: contain;
        z-index: 1;
      }
    `}
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

/* 
10/09 프롭스 처리
{props.steps.map((step, i) => (
          <StepItem
            key={i}
            isActive={props.currentStep === i + 1}
            isComplete={i + 1 < props.currentStep || props.complete}
            stepType={props.currentStep === i + 1 ? 'active' : props.currentStep < i + 1 ? 'inactive' : 'complete'}
          >
            <Step
              isActive={props.currentStep === i + 1}
              isComplete={i + 1 < props.currentStep || props.complete}
              stepType={props.currentStep === i + 1 ? 'active' : props.currentStep < i + 1 ? 'inactive' : 'complete'}
            >
              {props.currentStep > i + 1 ? <img src="../../design_image/fi_check.svg" alt="ERROR" /> : null}
            </Step>
          </StepItem>
        ))}
*/

/* 
  (컴포넌트 재사용성 제고를 위해 모두 프롭스 처리)

  const steps = [1, 2, 3, 4, 5];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [complete, setComplete] = useState<boolean>(false);

  const handleNext = () => {
    if (currentStep === steps.length) {
      setComplete(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep === steps.length) {
      // 마지막 단계
      setComplete(false);
    }
    if (currentStep !== steps[0]) {
      // 첫 단계일 때는 미동작
      setCurrentStep((prev) => prev - 1);
    }
  };
*/

/* 

{!props.complete && props.PrevButton};
{!props.complete && props.NextButton};
    

{!complete && (
        <NextButton onClick={handleNext}>
          {currentStep === steps.length ? "FINISH" : "NEXT"}
        </NextButton>
      )}

*/
