import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Typography from "../../assets/Typography";
import MultiStepProgressBar from "../../assets/MultiStepProgressBar";
import TextFieldBox from "../../assets/TextFieldBox";
import NextButton from "../../assets/NextButton";
import PrevButton from "../../assets/PrevButton";

/*
[ 참고 사항 - TextFieldBox State Option ]
  default /  hover /  focused /  typing /  filled /  error /  loading /  password
  자세한 사항: TextFieldBox.tsx 
};
*/

/* 
[ 추후 수정 사항  - 오윤진이 기억해두려고 작성한 내용]
1. Input 입력 수행도에 따라 NextButton 의 상태 props 통해 지정 필요 
2. Input 입력 서버로 전송
3. handleNext handlePrev 함수 수정
4. ProgressBar 크기 수정
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
  padding-bottom: 25px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 816px;
  height: 850px;
  padding: 67px 94px 78px 94px;
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

export default function SignUp2Page() {
  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const steps = [1, 2, 3, 4, 5];
  const [currentStep, setCurrentStep] = useState<number>(2); // 회원가입 2 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    navigate("/signUp3");
  };

  const handlePrev = () => {
    navigate("/signUp1");
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
      <div style={{ width: "976.8px", height: "30px" }}>
        <MultiStepProgressBar
          steps={steps}
          currentStep={currentStep}
          complete={complete}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 2</StepIndicator>
          <Typography size="largeText">사용자 기본 정보 입력하기</Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="2"
            viewBox="0 0 630 2"
            fill="none"
          >
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <ContentsWrapper>
            <div style={{ display: "flex" }}>
              <Typography
                size="mediumText"
                bold="700"
                style={{ opacity: "0.8" }}
              >
                이름
              </Typography>
              <Typography size="mediumText">을 입력해주세요.</Typography>
            </div>
            <TextFieldBox>홍길동</TextFieldBox>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: "flex" }}>
              <Typography
                size="mediumText"
                bold="700"
                style={{ opacity: "0.8" }}
              >
                고려대학교 학번
              </Typography>
              <Typography size="mediumText">을 입력해주세요.</Typography>
            </div>
            <TextFieldBox>학번 10자리</TextFieldBox>
          </ContentsWrapper>
        </ContentsList>
        <ButtonsWrapper>
          <PrevButton />
          <NextButton />
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}
