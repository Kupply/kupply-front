import React from "react";
import { SignUpPageWrapper } from "../../components/signup/SignUpPageWrapper";
import styled from "styled-components";
import Typography from "../../../assets/Typography";
import { useNavigate } from "react-router-dom";
import { UserInput } from "../../components/signup/UserInput";
import { useState } from "react";
import { useSignUp2Verification } from "../../../utils/SignUpFunctions";
import Button03 from "../../assets/buttons/Button03";
import Button04 from "../../assets/buttons/Button04";

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

  // button asset아직 준비가 안되서 안함
    return (
      <SignUpPageWrapper step={2} stepInfo="사용자 기본 정보 입력하기">
        <div style={{marginBottom: '16.94vw'}}></div>
        <ContentsList>
          <ContentsWrapper>
            <div>
            <Typography size="3.33vw" bold="700">이름</Typography>
            <Typography size="3.33vw" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="name" toNext={next}/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="3.33vw" bold="700">고려대학교 학번</Typography>
            <Typography size="3.33vw" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="studentId" toNext={next}/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="3.33vw" bold="700">본전공(1전공)</Typography>
            <Typography size="3.33vw" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="firstMajor" toNext={next}/>
          </ContentsWrapper>
        </ContentsList>
        <ButtonsWrapper>
          <Button04 onClick={handlePrev} style={{width:'25.582%'}}/>
          <Button03 state={complete? 'default' : 'disabled'} onClick={handleNext} style={{width: '74.418%'}}/>
        </ButtonsWrapper>
      </SignUpPageWrapper>
  )
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.556vw; /* 20px */
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw; /* 9px */
  width: 91.111vw; /* 328px */
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 27.778vw; /* 100px */
  gap: 2.222vw; /* 8px */
  width: 100%;
`;
