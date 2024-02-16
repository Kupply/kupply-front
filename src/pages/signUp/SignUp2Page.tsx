import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
import styled from "styled-components";
import { UserInput } from "../../components/signUp/UserInput";
import Button04 from "../../assets/buttons/Button04";
import Button03 from "../../assets/buttons/Button03";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignUp2Validation } from "../../utils/SignUpFunctions";
import { UserInputText } from "../../components/signUp/UserInputText";

export default function SignUp2Page(){

  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const {complete} = useSignUp2Validation();
  
  const handleNext = () => {
    setNext(true);
    navigate('/signup3');
  };

  const handlePrev = () => {
    navigate('/signUp1');
  };

  return (
    <SignUpPageWrapper step={2} stepInfo="사용자 기본 정보 입력하기"> 
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="name"/>
          <UserInput userInfoType="name" toNext={next}/>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="studentId"/>
          <UserInput userInfoType="studentId" toNext={next}/>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="firstMajor"/>
          <UserInput userInfoType="firstMajor" toNext={next}/>
        </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} />
        <Button03 state={complete? 'pressed' : 'disabled'} onClick={handleNext}/>
      </ButtonsWrapper>
    </SignUpPageWrapper>
  )
}

const ContentsList = styled.div`
display: flex;
flex-direction: column;
gap: 35px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 34px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 9px;
`;