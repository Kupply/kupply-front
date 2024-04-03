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
import TextFieldBox, { StateOptions } from "../../assets/OldTextFieldBox";
import { sendEmail } from "../../utils/SignUpFunctions";



export function SignUp0Page(){
  const [ID, setID] = useState<string>('');
  const [IDstate, setIDState] = useState<StateOptions>('default');
  const email = sessionStorage.getItem('email') || '';
  
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    //버튼 클릭 시 고려대 이메일인지 검사하고 맞다면 pass, 틀리면 alert를 내보낸다.
    const IDPattern = /.+@korea\.ac\.kr$/;
    if (IDPattern.test(ID)) {
      //페이지 이동 전 email을 보낼 것을 요청하고, 에러가 발생하면 alert를 띄운다.
      const url = 'https://api.kupply.devkor.club/auth/sendEmail'; // 만든 API 주소로 바뀌어야 함.
      try {
        // await axios.post(url, { email: ID });
        await client.post('/auth/sendEmail', { email: ID });

        //sessionStorage에 입력받은 email을 저장한 후 다음 페이지로 넘어간다.
        window.sessionStorage.setItem('email', ID);
        navigate('/join');
      } catch (err: any) {
        //이 코드는 이메일이 이미 인증된, 즉 겹치는 경우를 처리한다.
        alert(err.response.data.error.message);
        if (err.response.data.error.message === '이미 회원가입이 완료된 이메일 입니다. 로그인해주세요.') {
          navigate('/login');
        }
      }
    } else {
      alert('형식에 맞는 이메일이 아닙니다.');
    }
  };

  return (
    <SignUpPageWrapper step={1} stepInfo="고려대학생 인증하기">
      <ContentsList>
          <ContentsWrapper>
            <UserInputText userInfoType="kuEmail"/>
            <TextFieldBox
              placeholder="고려대학교 이메일 주소"
              value={ID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setID(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  console.log('This is the onKeyDown');
                  handleButtonClick();
                }
              }}
              state={IDstate}
              setState={setIDState}
              setValue={setID}
            />
          </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button03 state={IDstate === 'filled' ? 'pressed' : 'disabled'} onClick={handleButtonClick} style={{width: '100%'}}>
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