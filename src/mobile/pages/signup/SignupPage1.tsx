import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { verificationCodeState, nextButtonState, currentModalState, isOpenModalState, sendNumState } from "../../../store/atom";
import { useEffect, useCallback } from "react";
import { sendEmail } from "../../../utils/SignUpFunctions";
import client from "../../../utils/HttpClient";
import { SignUpPageWrapper } from "../../components/signup/SignUpPageWrapper";
import styled from "styled-components";
import Typography from "../../../assets/Typography";
import Timer from "../../../components/signUp/Timer";
import { CodeVerification } from "../../components/signup/VerificationForm";
import VerificationButton from "../../components/signup/VerificationButton";
import Button03 from "../../assets/buttons/Button03";
import Button04 from "../../assets/buttons/Button04";
import { ModalHandle } from "../../components/signup/ModalHandle";

export default function SignUpPage1(){
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

  return(
    <>
    <ModalHandle
      setBlank={setBlank} 
      onClickToggleLargeModal={onClickToggleLargeModal} 
      onClickToggleSmallModal={onClickToggleSmallModal}
    />
    <SignUpPageWrapper step={1} stepInfo="고려대 학생 인증하기">
      <MessageContent>
        <Typography size="16px" bold="700">인증번호가 전송되었습니다.</Typography>
        <Typography size="12px" bold="500" style={{lineHeight: '16px', wordBreak: 'break-all'}}>고려대학교 이메일 주소로 발송된 인증번호 여섯 자리를 입력해주세요.</Typography>
      </MessageContent>
      <ContentsList>
        <div>
          <Typography size="16px" color="#D85888" bold="700">
            <Timer
              setTime={3}
              onTimerExpired={() => {navigate('/')}}
            />
          </Typography>
        </div>
        <CodeVerification/>
        <VerificationButton 
        onSetBlank={setBlank} 
        onClickToggleLargeModal={onClickToggleLargeModal} 
        onClickToggleSmallModal={onClickToggleSmallModal}/>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 state="disabled" style={{width:'25.582%'}}/>
        <Button03
          state={nextButton ? 'default' : 'disabled'}
          onClick={handleNext}
          style={{width:'74.418%'}}
        />
      </ButtonsWrapper>
    </SignUpPageWrapper>
    </>
  )
}

const MessageContent = styled.div`
gap: 11px;
margin-top: 43px;
display: flex;
flex-direction: column;
align-items: center;
width: 181px;
text-align: center;
margin-bottom: 19px;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  // 이거 핸드폰 height 따라 달라져야 해서 padding으로 박을 지를 고민중 
  // vh로 박아야 할 가능성이 클듯
  margin-top: 100px;
  gap: 8px;
  width: 100%;
`;