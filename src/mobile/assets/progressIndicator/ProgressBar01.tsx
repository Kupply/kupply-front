import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface StepProps {
  isActive: boolean;
  isComplete: boolean;
  stepType: 'active' | 'inactive' | 'complete';
}

export interface MobileProgressBarProps {
  numberOfSteps: number;
  currentStep: number;
  complete: boolean;
}

export default function MobileProgressBar(props: MobileProgressBarProps) {
  const { numberOfSteps = 5, currentStep, complete = false, ...rest } = props;

  return (
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
            {currentStep > i + 1 ? <img src="../../designImage/FiCheck.svg" alt="ERROR" /> : null}
          </Step>
        </StepItem>
      ))}
    </ProgressBarContainer>
  );
}

// 막대바 디자인
const StepItem = styled.div<StepProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 100%;

  &:not(:first-child):before {
    content: '';
    background: ${(props) => (props.stepType === 'inactive' ? '#fcecee' : '#e57c90')};
    position: absolute;
    width: 100%;
    height: 4px;
    right: 50%;
    top: 20%;
    transform: translateY(100%);
  }
`;

// 원(step) 디자인
const Step = styled.div<StepProps>`
  width: 3.33vw;
  height: 3.33vw;
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
  width: 90vw;
  height: auto;
  display: flex;
  position: relative;
  justify-content: space-between;
`;
