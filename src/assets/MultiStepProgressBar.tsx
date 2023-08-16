import React, { useState } from "react";
import styled, { css } from "styled-components";
import NextButton from "./NextButton";

interface StepProps {
  isActive: boolean;
  isComplete: boolean;
  stepType: "active" | "inactive" | "complete";
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

function MultiStepProgressBar() {
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

  return (
    <>
      <ProgressBarContainer>
        {steps.map((step, i) => (
          <StepItem
            key={i}
            isActive={currentStep === i + 1}
            isComplete={i + 1 < currentStep || complete}
            stepType={
              currentStep === i + 1
                ? "active"
                : currentStep < i + 1
                ? "inactive"
                : "complete"
            }
          >
            <Step
              isActive={currentStep === i + 1}
              isComplete={i + 1 < currentStep || complete}
              stepType={
                currentStep === i + 1
                  ? "active"
                  : currentStep < i + 1
                  ? "inactive"
                  : "complete"
              }
            >
              {currentStep > i + 1 ? (
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

페이지에 따라 버튼과 프로그래스바 위치가 상이하기 때문에, 버튼 코드는 주석 처리하였습니다.
버튼 클릭에 따른 프로그래스 바 동작을 보고 싶다면, 주석을 해제해주세요.

{!complete && (
        <NextButton onClick={handleNext}>
          {currentStep === steps.length ? "FINISH" : "NEXT"}
        </NextButton>
      )}

*/

export default MultiStepProgressBar;
