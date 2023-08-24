import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Typography from "../../assets/Typography";
import MultiStepProgressBar from "../../assets/MultiStepProgressBar";
import TextFieldBox from "../../assets/TextFieldBox";
import NextButton from "../../assets/NextButton";
import PrevButton from "../../assets/PrevButton";

/*
주의1) 1, 5 페이지는 (첫 단계, 마지막 단계 페이지는) 이벤트 함수에 신경써서 구현 
주의2) 5페이지는 스크롤바 애니메이션 구현
*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  padding-bottom: 48px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 816px;
  height: 850px;
  padding: 42px 94px 78px 94px;
  padding-left: 94px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
`;

const StepIndicator = styled.div`
  display: inline-flex;
  padding: 8px 18px;
  justify-content: center;
  margin-bottom: 17px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid #d85888;
  background: rgba(255, 255, 255, 0.3);
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
`;

export default function SignUp5Page() {
  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const steps = [1, 2, 3, 4, 5];
  const [currentStep, setCurrentStep] = useState<number>(5); // 회원가입 5 단계 페이지
  const [complete, setComplete] = useState<boolean>(true);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    navigate("/signUp4"); // 수정 필요
  };

  const handlePrev = () => {
    navigate("/signUp4");
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: "131.579%" }}>
          환영합니다
        </Typography>
        <Typography
          size="mediumText"
          style={{ opacity: "0.8", marginTop: "5px" }}
        >
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <MultiStepProgressBar
        steps={steps}
        currentStep={currentStep}
        complete={complete}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <FormWrapper></FormWrapper>
    </Wrapper>
  );
}
