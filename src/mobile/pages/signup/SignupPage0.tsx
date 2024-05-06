import React, { useState } from "react";
import { SignUpPageWrapper } from "../../components/signup/SignUpPageWrapper";
import styled from "styled-components";
import Typography from "../../../assets/Typography";
import Input01, { StateOptions } from "../../assets/field/Input01";
import { useNavigate } from "react-router-dom";
import client from "../../../utils/HttpClient";
import Button05 from "../../assets/buttons/Button05";
import Card01 from "../../assets/cards/Card01";
import Card02 from "../../assets/cards/Card02";
import { Card0301, Card0302, Card0303 } from "../../assets/cards/Card03";
import Card05 from "../../assets/cards/Card05";

export default function SignUpPage0(){
  const [ID, setID] = useState('');
  const [IDState, setIDState] = useState<StateOptions>('default');
  const email = sessionStorage.getItem('email') || '';
  
  // email의 유효성을 check하는게 필요하다 
  // IDState에 대한 처리를 여기서 

  const navigate = useNavigate();

  // 여기도 UserInput으로 바꿀지 고민중이다 

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
  // CTA아직 안 만들어져서 빼고 만듦
  return (
    <SignUpPageWrapper step={1} stepInfo="고려대 학생 인증하기">
      <MessageContent>
        <Typography size="5.56vw" bold="700">환영합니다!</Typography>
        <Typography size="3.33vw" bold="500" style={{lineHeight: '4.44vw', wordBreak: 'break-all'}}>회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.</Typography>
      </MessageContent>
      <ContentsList>
        <ContentsWrapper>
          <div>
          <Typography size="3.33vw" bold="700">고려대학교 이메일</Typography>
          <Typography size="3.33vw" bold="400">을 입력해주세요.</Typography>
          </div>
          <Input01 
            style={{width: '100%'}}
            setState={setIDState}
            setValue={setID}
            state={IDState}
            value={ID}
            placeholder="OOOO@korea.ac.kr"
            errorMessage="유효하지 않은 이메일 주소입니다"
            isCheckDuplicated={false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setID(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                console.log('This is the onKeyDown');
                handleButtonClick();
              }
            }}
          />
        </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button05
          state={IDState === 'filled' ? 'pressed' : 'default'} 
          onClick={handleButtonClick} 
          style={{width: '100%'}}
        >
          인증메일 받기
        </Button05>
      </ButtonsWrapper>
    </SignUpPageWrapper>
  )
}

const MessageContent = styled.div`
gap: 3.05vw;
margin-top: 11.944vw;
display: flex;
flex-direction: column;
align-items: center;
width: 50.278vw;
text-align: center;
margin-bottom: 11.944vw;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.823vw; //35px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
  width: 91.11vw;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  // 이거 핸드폰 height 따라 달라져야 해서 padding으로 박을 지를 고민중 
  // vh로 박아야 할 가능성이 클듯
  margin-top: 63.33vw;
  width: 100%;
`;