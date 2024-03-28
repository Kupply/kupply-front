import React from "react";
import { SignUpPageWrapper } from "../../components/signup/SignUpPageWrapper";
import styled from "styled-components";
import Typography from "../../../assets/Typography";
import { useNavigate } from "react-router-dom";
import { UserInput } from "../../components/signup/UserInput";
import { useState } from "react";
import { useSignUp2Verification } from "../../../utils/SignUpFunctions";

export default function SignUpPage2(){
  const [next, setNext] = useState(false);
  const navigate = useNavigate();
  const {complete} = useSignUp2Verification();

  const handleNext = () => {
    setNext(true);
    Promise.resolve().then(() => {
      navigate('/signup3');
    });
  };

  const handlePrev = () => {
    navigate('/signUp1');
  };
    return (
      <SignUpPageWrapper step={2} stepInfo="사용자 기본 정보 입력하기">
        <div style={{marginBottom: '61px'}}></div>
        <ContentsList>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="700">이름</Typography>
            <Typography size="12px" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="name" toNext={next}/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="700">고려대학교 학번</Typography>
            <Typography size="12px" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="studentId" toNext={next}/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="700">본전공(1전공)</Typography>
            <Typography size="12px" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="firstMajor" toNext={next}/>
          </ContentsWrapper>
        </ContentsList>
  
      </SignUpPageWrapper>
  )
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 328px;
`;