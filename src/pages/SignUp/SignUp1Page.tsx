import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Typography from '../../assets/Typography';
import MultiStepProgressBar from '../../assets/MultiStepProgressBar';
import NextButton from '../../assets/buttons/NextButton';
import PrevButton from '../../assets/buttons/PrevButton';
import Timer from '../../components/Timer';
import VerificationBox from '../../assets/VerificationBox';
import TextFieldBox, { StateOptions } from '../../assets/TextFieldBox';
import SignUpSmall from './modals/SignUpSmall';
import SignUpLarge1 from './modals/SignUpLarge1';
import SignUpLarge2 from './modals/SignUpLarge2';
import SignUpLarge3 from './modals/SignUpLarge3';
import client from '../../utils/httpClient';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 2560px;
  height: 1153px;
  background-color: #fcfafb;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 25px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 816px;
  height: 850px;
  padding: 42px 94px 78px 94px;
  padding-left: 94px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  margin-top: 25px;
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
  gap: 8px;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 109px; // 159.24px;
  margin-bottom: 121px; //171px;
`;

// 푸터 버튼과 동일 에셋이라고 한다.
const TextButton = styled.button`
  transition: 0.25s ease-in-out;
  display: flex;
  gap: 4.97px;
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  text-decoration-line: underline;

  cursor: pointer;

  &:hover {
    color: black;
  }

  // 도형 아이콘 색깔 변경 고려
  &:hover svg g path {
    stroke: black;
  }
`;
export const sendEmail = async (email: string) => {
  const url = 'https://api.kupply.devkor.club/auth/sendEmail'; // 만든 API 주소로 바뀌어야 함.
  try {
    await axios.post(url, { email: email });
    // await client.post('/auth/sendEmail', { email: email });
    return true;
  } catch (e: any) {
    //이 코드는 이메일이 이미 인증된, 즉 겹치는 경우를 처리한다.
    alert(e.response.data.error.message);
    console.log(e);
    return false;
  }
};

export default function SignUp1Page() {
  //navigate 관련 코드. emailID가 안 왔으면 정상 경로가 아니므로 메인 페이지로 보낸다.
  const navigate = useNavigate();

  // progressBar 관련
  const [currentStep, setCurrentStep] = useState<number>(1); // 회원가입 1 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  // verificationBox 관련
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [num3, setNum3] = useState<string>('');
  const [num4, setNum4] = useState<string>('');
  const [num5, setNum5] = useState<string>('');
  const [num6, setNum6] = useState<string>('');
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(false);

  const setBlank = () => {
    setNum1('');
    setNum2('');
    setNum3('');
    setNum4('');
    setNum5('');
    setNum6('');
  };

  // verificationBox 관련
  useEffect(() => {
    if (!!num1 && !!num2 && !!num3 && !!num4 && !!num6 && !!num6) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [num1, num2, num3, num4, num5, num6]);

  // modal 관련
  const [currentModal, setCurrentModal] = useState<number>(100); // 임의 값으로 초기화
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // modal 2 - 3 email value 전달 관련
  const [email, setEmail] = useState<string>(sessionStorage.getItem('email') || '');
  const [emailState, setEmailState] = useState<StateOptions>(sessionStorage.getItem('email') ? 'filled' : 'default');
  //sendNum이 바뀌거나 isOpenModal이 0, 3이 되면 timer 초기화
  const [sendNum, setSendNum] = useState<number>(0);

  // emailID를 받지 않은 상태라면 main으로 보내고, 아니라면 email을 받은 값으로 설정한다.
  useEffect(() => {
    // /if (!sessionStorage.getItem('email')) navigate('/');
    async function sendFirst(email: string) {
      const result = await sendEmail(email);

      if (!result) {
        navigate('/login');
      }
    }

    sendFirst(email);
  }, []);

  // small modal 관련
  const onClickToggleSmallModal = useCallback(async () => {
    setOpenModal(!isOpenModal);
    setCurrentModal(0);
    console.log(isOpenModal);
    //setState가 마지막에 실행되므로, 첫 번째 재전송 시엔 email 값이 빈 문자열이 된다.
    if (!isOpenModal) {
      setSendNum(sendNum + 1);
      await sendEmail(email);
    }
    setBlank();
  }, [isOpenModal]);

  // large modal 관련
  const onClickToggleLargeModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(1); // 현재 모달창 (step) 초기화
    console.log(isOpenModal); // 디버그 목적
  }, [isOpenModal]);

  //버튼 클릭 시 API에 요청하여 번호가 맞는지 인증하고, 맞을 시에만 다음 페이지로 간다.
  const handleNext = async () => {
    const entireCode = num1 + num2 + num3 + num4 + num5 + num6;
    const url = 'https://api.kupply.devkor.club/auth/certifyEmail'; // 만든 API 주소로 바뀌어야 함.
    try {
      await axios.post(url, { email: email, code: entireCode });
      // await client.post('/auth/certifyEmail', { email: email, code: entireCode }).then();

      navigate('/signup2');
    } catch (err: any) {
      //에러 메시지 등 다른 처리 필요
      alert(err.response.data.error.message);
    }
  };

  // 타이머 시간 초과시 처리 목적
  const [timerExpired, setTimerExpired] = useState<boolean>(false);

  const handleTimerExpired = () => {
    setTimerExpired(true);
    navigate('/');
  };

  return (
    <Wrapper>
      {(() => {
        switch (currentModal) {
          case 0:
            return (
              <div style={{ background: 'red', width: '100%', zIndex: 20 }}>
                <SignUpSmall
                  currentModal={currentModal}
                  isOpenModal={isOpenModal}
                  setCurrentModal={setCurrentModal}
                  setOpenModal={setOpenModal}
                  onClickModal={onClickToggleSmallModal}
                />
              </div>
            );

          case 1:
            return (
              <SignUpLarge1
                email={email}
                setBlank={setBlank}
                currentModal={currentModal}
                isOpenModal={isOpenModal}
                setCurrentModal={setCurrentModal}
                setOpenModal={setOpenModal}
                onClickModal={onClickToggleLargeModal}
              />
            );
          case 2:
            return (
              <SignUpLarge2
                currentModal={currentModal}
                isOpenModal={isOpenModal}
                setCurrentModal={setCurrentModal}
                setOpenModal={setOpenModal}
                onClickModal={onClickToggleLargeModal}
                email={email}
                emailState={emailState}
                setEmail={setEmail}
                setEmailState={setEmailState}
                setBlank={setBlank}
              />
            );

          case 3:
            // setTimerTime(3);
            return (
              <SignUpLarge3
                currentModal={currentModal}
                isOpenModal={isOpenModal}
                setCurrentModal={setCurrentModal}
                setOpenModal={setOpenModal}
                onClickModal={onClickToggleLargeModal}
                email={email}
              />
            );

          default:
            return null;
        }
      })()}
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          환영합니다!
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete} />
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 1</StepIndicator>
          <Typography size="largeText">고려대학생 인증하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ContentsWrapper>
              <Typography size="mediumText" bold="700">
                인증번호가 전송되었습니다.
              </Typography>
              <Typography size="normalText">
                고려대학교 이메일 주소로 발송된 인증번호 여섯자리를 입력해주세요.
              </Typography>
            </ContentsWrapper>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
              <Typography size="largeText" color="#D85888">
                <Timer
                  setTime={3}
                  sendNum={sendNum}
                  currentModal={currentModal}
                  onTimerExpired={handleTimerExpired}
                ></Timer>
              </Typography>
            </div>
          </div>
          <VerifiBoxWrapper>
            <VerificationBox name="pin-1" value={num1} setValue={setNum1}></VerificationBox>
            <VerificationBox name="pin-2" value={num2} setValue={setNum2}></VerificationBox>
            <VerificationBox name="pin-3" value={num3} setValue={setNum3}></VerificationBox>
            <VerificationBox name="pin-4" value={num4} setValue={setNum4}></VerificationBox>
            <VerificationBox name="pin-5" value={num5} setValue={setNum5}></VerificationBox>
            <VerificationBox name="pin-6" value={num6} setValue={setNum6}></VerificationBox>
          </VerifiBoxWrapper>
        </ContentsList>
        <SubContentsWrapper>
          <TextButton onClick={onClickToggleSmallModal}>
            <div style={{ gap: '4.97px', display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <g opacity="0.8" clip-path="url(#clip0_1466_5915)">
                  <path
                    d="M13.3269 2.31445V5.78668H9.85034"
                    stroke="#D85888"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.8725 8.68063C11.4959 9.74539 10.7829 10.6591 9.84113 11.2839C8.89933 11.9088 7.77969 12.211 6.65093 12.1451C5.52218 12.0791 4.44546 11.6486 3.58304 10.9183C2.72061 10.188 2.1192 9.19754 1.86943 8.09617C1.61966 6.9948 1.73507 5.84219 2.19826 4.81203C2.66145 3.78187 3.44732 2.92997 4.43747 2.3847C5.42761 1.83943 6.56837 1.63034 7.68785 1.78893C8.80733 1.94752 9.84488 2.4652 10.6441 3.26396L13.3269 5.78711"
                    stroke="#D85888"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1466_5915">
                    <rect width="13.9064" height="13.8889" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              인증번호 다시받기
            </div>
          </TextButton>
          <TextButton onClick={onClickToggleLargeModal}>아직 인증번호를 받지 못하셨나요?</TextButton>
        </SubContentsWrapper>
        <ButtonsWrapper>
          <PrevButton active={false} />
          <NextButton active={nextButton} onClick={handleNext} />
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}
