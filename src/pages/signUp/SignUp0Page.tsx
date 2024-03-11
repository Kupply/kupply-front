import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserInput } from "../../components/signUp/UserInput";
import { UserInputText } from "../../components/signUp/UserInputText";
import Button03 from "../../assets/buttons/Button03";
import { useCallback, useEffect, useState } from "react";
import { useSignUp0Verification } from "../../utils/SignUpFunctions";
import axios from "axios";
import client from "../../utils/HttpClient";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atom";


export function SignUp0Page(){

  // 형식에 맞는 이메일이 입력되면 인증메일 받기 버튼이 켜지도록 
  const {complete, idVerified} = useSignUp0Verification();
  const ID = useRecoilValue(userState('kuEmail'));
  const [next, setNext] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    const IDPattern = /.+@korea\.ac\.kr$/;

    // onKeyDown에서 complete가 아직 update가 안된 상태라 || 뒤에 추가 
    if(complete || IDPattern.test(ID.info)){
      const url = 'https://api.kupply.devkor.club/auth/sendEmail';
      try {
        //await axios.post(url, { email: ID.info });
        //await client.post('/auth/sendEmail', { email: ID.info });

        //sessionStorage에 입력받은 kuEmail을 저장한 후 다음 페이지로 넘어간다.
        setNext(true);
        Promise.resolve().then(() => {
          navigate('/signup1');
        });
      } catch(err:any){
        //이 코드는 이메일이 이미 인증된, 즉 겹치는 경우를 처리한다.
        alert(err.response.data.error.message);
        if (err.response.data.error.message === '이미 회원가입이 완료된 이메일 입니다. 로그인해주세요.') {
          navigate('./login');
        }
      }
    }else{
      alert('형식에 맞는 이메일이 아닙니다.');
    }
  }

  return (
    <SignUpPageWrapper step={1} stepInfo="고려대학생 인증하기">
      <ContentsList>
          <ContentsWrapper>
            <UserInputText userInfoType="kuEmail"/>
            <UserInput userInfoType="kuEmail" toNext={next} onCustomFunction={handleNext}/>
          </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button03 state={complete? 'pressed' : 'disabled'} onClick={handleNext} style={{width: '100%'}}>
          인증메일 받기 
        </Button03>
      </ButtonsWrapper>
    </SignUpPageWrapper>
  )
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.823vw; //35px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.417vw; //8px;
  margin-top: 5.21vw; //100px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.9375vw;
  margin-top: 18.073vw; //347px;
  width: 100%;
`;