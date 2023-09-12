import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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

/*
 수정해야할 사항 목록
 1. 타이머 위치
 */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  padding-bottom: 48px;
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
  margin-top: 159.24px;
  margin-bottom: 171px;
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

export default function SignUp1Page() {
  const navigate = useNavigate();

  // progressBar 관련
  const steps = [1, 2, 3, 4, 5];
  const [currentStep, setCurrentStep] = useState<number>(1); // 회원가입 1 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  // verificationBox 관련
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [num3, setNum3] = useState<string>('');
  const [num4, setNum4] = useState<string>('');
  const [num5, setNum5] = useState<string>('');
  const [num6, setNum6] = useState<string>('');
  const [nextButton, setNextButton] = useState<boolean>(false);

  // verificationBox 관련
  useEffect(() => {
    if (!!num1 && !!num2 && !!num3 && !!num4 && !!num6 && !!num6) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [num1, num2, num3, num4, num5, num6]);

  const handleNext = () => {
    navigate('/signUp2');
  };

  // modal 관련
  const [currentModal, setCurrentModal] = useState<number>(100); // 임의 값으로 초기화
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // small modal 관련
  const onClickToggleSmallModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(0);
    console.log(isOpenModal);
  }, [isOpenModal]);
  // large modal 관련
  const onClickToggleLargeModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(1); // 현재 모달창 (step) 초기화
    console.log(isOpenModal); // 디버그 목적
  }, [isOpenModal]);

  // modal 2 - 3 email value 전달 관련
  const [email, setEmail] = useState<string>('');
  const [emailState, setEmailState] = useState<StateOptions>('default');

  return (
    <Wrapper>
      {(() => {
        switch (currentModal) {
          case 0:
            return (
              <SignUpSmall
                currentModal={currentModal}
                isOpenModal={isOpenModal}
                setCurrentModal={setCurrentModal}
                setOpenModal={setOpenModal}
                onClickModal={onClickToggleSmallModal}
              />
            );

          case 1:
            return (
              <SignUpLarge1
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
          환영합니다
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <MultiStepProgressBar steps={steps} currentStep={currentStep} complete={complete} />
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
            <div>
              <Typography size="largeText" color="#D85888">
                <Timer setTime={3} currentModal={currentModal}></Timer>
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
