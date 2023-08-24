import React, { useState } from "react";
import styled, { css } from "styled-components";
import NextButton from "./NextButton";

/*
[ 컴포넌트 이식 방법 ]
(예시) 
*/

export interface StepProps {
  isActive: boolean;
  isComplete: boolean;
  stepType: "active" | "inactive" | "complete";
}

export interface MultiStepProgressBarProps {
  steps: Array<number>;
  currentStep: number;
  complete: boolean;
  handleNext: Function;
  handlePrev: Function;
}

// 막대바 디자인
const StepItem = styled.div<StepProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;

  &:not(:first-child):before {
    content: "";
    background: ${(props) =>
      props.stepType === "inactive" ? "#fcecee" : "#e57c90"};
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
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: relative;
  border-radius: 50%;

  ${(props) =>
    props.stepType === "active" &&
    css`
      background-color: #e57c90;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 1.25rem;
        height: 1.25rem;
        background-color: white;
        border-radius: 50%;
        z-index: -1;
      }
    `}

  ${(props) =>
    props.stepType === "inactive" &&
    css`
      background-color: #fcecee;
    `}

  ${(props) =>
    props.stepType === "complete" &&
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
  display: flex;
  justify-content: space-between;
`;

export default function MultiStepProgressBar(props: MultiStepProgressBarProps) {
  const { steps = "[1, 2, 3, 4, 5]", complete = "false", ...rest } = props;

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

  return (
    <>
      <ProgressBarContainer>
        {props.steps.map((step, i) => (
          <StepItem
            key={i}
            isActive={props.currentStep === i + 1}
            isComplete={i + 1 < props.currentStep || props.complete}
            stepType={
              props.currentStep === i + 1
                ? "active"
                : props.currentStep < i + 1
                ? "inactive"
                : "complete"
            }
          >
            <Step
              isActive={props.currentStep === i + 1}
              isComplete={i + 1 < props.currentStep || props.complete}
              stepType={
                props.currentStep === i + 1
                  ? "active"
                  : props.currentStep < i + 1
                  ? "inactive"
                  : "complete"
              }
            >
              {props.currentStep > i + 1 ? (
                <img src="../../design_image/fi_check.svg" alt="ERROR" />
              ) : null}
            </Step>
          </StepItem>
        ))}
      </ProgressBarContainer>
    </>
  );
}

/* 

{!props.complete && props.PrevButton};
{!props.complete && props.NextButton};
    

{!complete && (
        <NextButton onClick={handleNext}>
          {currentStep === steps.length ? "FINISH" : "NEXT"}
        </NextButton>
      )}

*/
