import React, { useEffect, useState, useCallback } from "react";
import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
import { sendEmail } from "../../utils/SignUpFunctions";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CodeVerification } from "../../components/signUp/VerificationForm";
import Typography from "../../assets/Typography";
import Timer from "../../components/signUp/Timer";
import { ModalHandle } from "../../components/signUp/ModalHandle";
import { emailAtom, nextButtonState, verificationCodeState, currentModalState, isOpenModalState, sendNumState  } from '../../store/atom'; 
import { useRecoilState, useRecoilValue } from "recoil";
import Button03 from "../../assets/buttons/Button03";
import Button04 from "../../assets/buttons/Button04";
import VerificationButton from "../../components/signUp/VerificationButton";
import axios from "axios";
import client from "../../utils/HttpClient";


export function SignUp1Page(){
  const navigate = useNavigate();
  // signup에서 가져오는 
  const email = sessionStorage.getItem('email') || '';
  console.log('email', email);
  const [codeNum, setCodeNum] = useRecoilState(verificationCodeState);
  const {num1, num2, num3, num4, num5, num6} = codeNum;
  const [nextButton, setNextButton] = useRecoilState(nextButtonState);

  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);
  const [isOpenModal, setOpenModal] = useRecoilState(isOpenModalState);
  const [sendNum, setSendNum] = useRecoilState(sendNumState);

  useEffect(() => {
    if (!sessionStorage.getItem('email')) navigate('/');
    async function sendFirst(email: string) {
      const result = await sendEmail(email);

      if (!result) {
        navigate('/login');
      }
    }
    sendFirst(email);
  }, []);

  const setBlank = () => {
    setCodeNum({
      num1: '',
      num2: '',
      num3: '',
      num4: '',
      num5: '',
      num6: ''
    })
  }
  
  const handleNext = async () => {
    const entireCode = num1 + num2 + num3 + num4 + num5 + num6;
    console.log(entireCode, 'entireCode');
    const url = 'https://api.kupply.devkor.club/auth/certifyEmail'; // 만든 API 주소로 바뀌어야 함.
    try {
      //await axios.post(url, { email: email, code: entireCode });
      console.log(email, entireCode, 'signup1');
      await client.post('/auth/certifyEmail', { email: email, code: entireCode }).then();

      navigate('/signup2');
    } catch (err: any) {
      //에러 메시지 등 다른 처리 필요
      alert(err.response.data.error.message);
    }
  };

  const onClickToggleSmallModal = useCallback(async () => {
    setOpenModal(!isOpenModal);
    setCurrentModal(0);
    console.log(isOpenModal);
    //setState가 마지막에 실행되므로, 첫 번째 재전송 시엔 email 값이 빈 문자열이 된다.
    if (!isOpenModal) {
      setSendNum(sendNum + 1);
      console.log('this is from the onClickToggleSmallModal', sendNum);
      const email = sessionStorage.getItem('email') || '';
      console.log('this is from the onClickToggleSmallModal testing email', email);
      await sendEmail(email);
    }
    setBlank();
  }, [isOpenModal]);

  console.log('isOpenModal', isOpenModal, 'currentModal', currentModal);

  // large modal 관련
  const onClickToggleLargeModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(1); // 현재 모달창 (step) 초기화
    console.log(isOpenModal); // 디버그 목적
  }, [isOpenModal]);

  return (
    <>
    <ModalHandle 
      setBlank={setBlank} 
      onClickToggleLargeModal={onClickToggleLargeModal} 
      onClickToggleSmallModal={onClickToggleSmallModal}
    />
    <SignUpPageWrapper step={1} stepInfo="고려대학생 인증하기">
      
      <ContentsList>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ContentsWrapper>
              <Typography size="0.9375vw" bold="700">
                인증번호가 전송되었습니다.
              </Typography>
              <Typography size="0.833vw" bold="500">
                고려대학교 이메일 주소로 발송된 인증번호 여섯자리를 입력해주세요.
              </Typography>
            </ContentsWrapper>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              <Typography size="1.25vw" color="#D85888" bold="700">
                <Timer
                  setTime={3}
                  onTimerExpired={() => {navigate('/')}}
                />
              </Typography>
            </div>
        </div>
        <CodeVerification />
      </ContentsList>
      <VerificationButton 
        onSetBlank={setBlank} 
        onClickToggleLargeModal={onClickToggleLargeModal} 
        onClickToggleSmallModal={onClickToggleSmallModal}/>
      <ButtonsWrapper>
        <Button04 style={{width:'25.582%'}} state="disabled"/>
        <Button03 state={nextButton ? 'pressed' : 'disabled'} onClick={handleNext} style={{width:'74.418%'}}/>
        {/* VerificationForm에서 자동으로 넘어갈 수 있게 설정해서 onClick일단 빼둠*/}
      </ButtonsWrapper>
    </SignUpPageWrapper>
    </>
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
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.9375vw;
`;






