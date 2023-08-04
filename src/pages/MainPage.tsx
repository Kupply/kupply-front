import React from "react";
import styled from "styled-components";
import JoinMForm from "../components/JoinMForm";
import Carousel from "../components/Carousel";
import Header from "../assets/Header";
import TextFieldBox from "../assets/TextFieldBox";
import VerificationBox from "../assets/VerificationBox";
import NextButton from "../assets/NextButton";
import Step4Button from "../assets/Step4Button";
import Typography from "../assets/Typography";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 900px;
  background: white;
`;

/* width 및 height 등 세부 픽셀 값 피그마와 상이함 주의 
(피그마 숫자대로 넣으면,화면이 원하는 그림으로 나오지 않음) */
const JoinMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 192px;
  justify-content: center;
  align-items: center;
  background: white;
`;

const ContainerMainText = styled.h3`
  color: #2c323a;
  text-align: center;
  font-family: Pretendard;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 0;
  margin-bottom: 12px;
`;

const ContainerSubText = styled.text`
  color: #2c323a;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 34px;
`;

function MainPage() {
  return (
    <Wrapper>
      <Carousel />
      <JoinMainContainer>
        <ContainerMainText>
          당신이 찾고 있던 이중전공에 대한 모든 정보가 바로 이곳에!
        </ContainerMainText>
        <ContainerSubText>
          간단한 이메일 주소 입력으로 실시간 이중전공 지원현황과 간편한 학점
          비교 등, 쿠플라이만의 다양한 서비스를 이용해보세요.
        </ContainerSubText>
        <JoinMForm onClick={() => {}} />
      </JoinMainContainer>
    </Wrapper>
  );
}

export default MainPage;
