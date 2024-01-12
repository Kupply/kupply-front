import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '../../assets/OldTypography';
import MultiStepProgressBar from '../../assets/MultiStepProgressBar';
import TextFieldBox from '../../assets/OldTextFieldBox';
import NextButton from '../../assets/buttons/OldNextButton';
import PrevButton from '../../assets/buttons/PrevButton';
import Step4Button from '../../components/Step4Button';
import VerificationBox from '../../assets/VerificationBox';
import DropDown from '../../assets/dropdown/dropDown';
import { majorAllList } from '../../common/majorAll';
import { majorTargetList } from '../../common/majorTarget';

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
  gap: 9px;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 34px;
`;

const AliasButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 70px;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 13px;
`;

export function SignUp4Page() {
  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const [currentStep, setCurrentStep] = useState<number>(4); // 회원가입 2 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  const [candidateState, setCandidateState] = useState<'default' | 'clicked' | 'unactive'>('default');
  const [passerState, setPasserState] = useState<'default' | 'clicked' | 'unactive'>('default');
  const [nextPathState, setNextPathState] = useState<string>('');

  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  useEffect(() => {
    if (!sessionStorage.getItem('nickname')) navigate('/');
    else sessionStorage.removeItem('role');
  }, []);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = (nextPath: string) => {
    //role을 sessionStorage에 적고, 다음 단계로 보낸다.
    if (candidateState === 'clicked') sessionStorage.setItem('role', 'candidate');
    else if (passerState === 'clicked') sessionStorage.setItem('role', 'passer');
    navigate(nextPath);
  };

  const handlePrev = () => {
    navigate('/signUp3');
  };

  const handleButtonClick = (buttonState: string) => {
    if (buttonState === 'candidate' && candidateState !== 'clicked') {
      setCandidateState('clicked');
      setPasserState('unactive');
      setNextPathState('/signUp4-candidate');
    } else if (buttonState === 'passer' && passerState !== 'clicked') {
      setPasserState('clicked');
      setCandidateState('unactive');
      setNextPathState('/signUp4-passer');
    }
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          환영합니다!
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <div style={{ width: '976.8px', height: '30px' }}>
        <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete} />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 4</StepIndicator>
          <Typography size="largeText">마이보드 프로필 생성하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                쿠플라이에서 원하는 서비스를 선택해주세요.
              </Typography>
            </div>
            <Step4Button
              state={candidateState}
              double={false}
              onClick={() => handleButtonClick('candidate')}
            ></Step4Button>
            <Step4Button state={passerState} double={true} onClick={() => handleButtonClick('passer')}></Step4Button>
          </ContentsWrapper>
        </ContentsList>
        <AliasButtonsWrapper>
          <PrevButton onClick={handlePrev} />
          <NextButton
            active={candidateState === 'clicked' || passerState === 'clicked'}
            onClick={() => handleNext(nextPathState)}
          />
        </AliasButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}

const optionList = majorTargetList;

export function SignUp4PageCandidate() {
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const [currentStep, setCurrentStep] = useState<number>(4); // 회원가입 2 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  const [hopeMajor1, setHopeMajor1] = useState<string>('');
  const [hopeMajor2, setHopeMajor2] = useState<string>('');
  const [GPA1, setGPA1] = useState<string>(sessionStorage.getItem('GPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(sessionStorage.getItem('GPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(sessionStorage.getItem('GPA')?.charAt(3) || '');
  const [hopeSemester1, setHopeSemester1] = useState<string>(sessionStorage.getItem('hopeSemester')?.charAt(2) || '');
  const [hopeSemester2, setHopeSemester2] = useState<string>(sessionStorage.getItem('hopeSemester')?.charAt(3) || '');
  const [hopeSemester3, setHopeSemester3] = useState<string>(sessionStorage.getItem('hopeSemester')?.charAt(5) || '');
  const [nextButton, setNextButton] = useState<boolean>(false);

  useEffect(() => {
    if (parseFloat(`${GPA1}.${GPA2}${GPA3}`) > 4.5) {
      setGPA1('4');
      setGPA2('5');
      setGPA3('0');
      if (lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [GPA1, GPA2, GPA3, lastBoxRef]);
  /*
  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  useEffect(() => {
    if (!sessionStorage.getItem('role')) navigate('/');
    sessionStorage.removeItem('secondMajor');
    sessionStorage.removeItem('passedGPA');
    sessionStorage.removeItem('passSemester');
  }, []);*/

  useEffect(() => {
    if (
      !!hopeMajor1 &&
      !!hopeMajor2 &&
      !!GPA1 &&
      !!GPA2 &&
      !!GPA3 &&
      !!hopeSemester1 &&
      !!hopeSemester2 &&
      !!hopeSemester3
    ) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [hopeMajor1, hopeMajor2, GPA1, GPA2, GPA3, hopeSemester1, hopeSemester2, hopeSemester3]);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    const GPA = +(GPA1 + '.' + GPA2 + GPA3);
    const semesterYear = +(hopeSemester1 + hopeSemester2);

    if (GPA > 4.5) {
      alert('유효한 학점을 입력해주세요.');
    } else if (
      !(hopeSemester3 === '1' || hopeSemester3 === '2') ||
      semesterYear < 23 ||
      (semesterYear === 23 && hopeSemester3 === '1')
    ) {
      alert('유효한 희망 학기를 입력해주세요.');
    } else {
      sessionStorage.setItem('hopeMajor1', hopeMajor1);
      sessionStorage.setItem('hopeMajor2', hopeMajor2);
      sessionStorage.setItem('GPA', GPA1 + '.' + GPA2 + GPA3);
      sessionStorage.setItem('hopeSemester', '20' + hopeSemester1 + hopeSemester2 + '-' + hopeSemester3);
      navigate('/signup5');
    }
  };

  const handlePrev = () => {
    navigate('/signUp4');
  };

  // 2지망 '희망없음' 구현 목적
  const updatedMajorTargetList = [...majorTargetList];
  updatedMajorTargetList.unshift({ value1: '희망 없음', value2: '희망 없음' });

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          환영합니다!
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <div style={{ width: '976.8px', height: '30px' }}>
        <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete} />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 4</StepIndicator>
          <Typography size="largeText">마이보드 프로필 생성하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText">희망하는&nbsp;</Typography>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                이중전공
              </Typography>
              <Typography size="mediumText">을 선택해주세요.</Typography>
            </div>
            <DropDown
              title="1지망 이중전공 선택"
              optionList={optionList.filter(
                (el) => el.value1 !== hopeMajor2 && el.value1 !== sessionStorage.getItem('firstMajor'),
              )}
              value={hopeMajor1}
              setValue={setHopeMajor1}
            />
            <DropDown
              title="2지망 이중전공 선택"
              optionList={updatedMajorTargetList.filter(
                (el) => el.value1 !== hopeMajor1 && el.value1 !== sessionStorage.getItem('firstMajor'),
              )}
              value={hopeMajor2}
              setValue={setHopeMajor2}
            />
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText">현재&nbsp;</Typography>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                학점
              </Typography>
              <Typography size="mediumText">을 소수점 두 자리까지 기입해주세요.</Typography>
            </div>
            <VerifiBoxWrapper>
              <VerificationBox name="gpa-1" value={GPA1} setValue={setGPA1} />
              <div style={{ marginTop: 60 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="none">
                  <circle cx="1" cy="1" r="1" fill="#141414" />
                </svg>
              </div>
              <VerificationBox name="gpa-2" value={GPA2} setValue={setGPA2} />
              <VerificationBox name="gpa-3" value={GPA3} setValue={setGPA3} setRef={setLastBoxRef} />
            </VerifiBoxWrapper>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                희망 이중 지원학기
              </Typography>
              <Typography size="mediumText">를 입력해주세요.</Typography>
            </div>
            <VerifiBoxWrapper>
              <VerificationBox name="semester-1" value={hopeSemester1} setValue={setHopeSemester1}></VerificationBox>
              <VerificationBox name="semester-2" value={hopeSemester2} setValue={setHopeSemester2}></VerificationBox>
              <Typography size={'normalText'} style={{ marginTop: '58px' }}>
                년도
              </Typography>
              <VerificationBox name="semester-3" value={hopeSemester3} setValue={setHopeSemester3}></VerificationBox>
              <Typography size={'normalText'} style={{ marginTop: '58px' }}>
                학기
              </Typography>
            </VerifiBoxWrapper>
          </ContentsWrapper>
        </ContentsList>
        <ButtonsWrapper>
          <PrevButton onClick={handlePrev} />
          <NextButton active={nextButton} onClick={handleNext} />
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}

export function SignUp4PagePasser() {
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const [currentStep, setCurrentStep] = useState<number>(4); // 회원가입 2 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  const [doubleMajor, setDoubleMajor] = useState<string>('');
  const [GPA1, setGPA1] = useState<string>(sessionStorage.getItem('passedGPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(sessionStorage.getItem('passedGPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(sessionStorage.getItem('passedGPA')?.charAt(3) || '');
  const [passSemester1, setPassSemester1] = useState<string>(sessionStorage.getItem('passSemester')?.charAt(2) || '');
  const [passSemester2, setPassSemester2] = useState<string>(sessionStorage.getItem('passSemester')?.charAt(3) || '');
  const [passSemester3, setPassSemester3] = useState<string>(sessionStorage.getItem('passSemester')?.charAt(5) || '');
  const [nextButton, setNextButton] = useState<boolean>(false);

  /*
  //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
  useEffect(() => {
    if (!sessionStorage.getItem('role')) navigate('/');
  }, []);*/
  useEffect(() => {
    if (!!doubleMajor && !!GPA1 && !!GPA2 && !!GPA3 && !!passSemester1 && !!passSemester2 && !!passSemester3) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [doubleMajor, GPA1, GPA2, GPA3, passSemester1, passSemester2, passSemester3]);

  useEffect(() => {
    if (parseFloat(`${GPA1}.${GPA2}${GPA3}`) > 4.5) {
      setGPA1('4');
      setGPA2('5');
      setGPA3('0');
      if (lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [GPA1, GPA2, GPA3]);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    const GPA = +(GPA1 + '.' + GPA2 + GPA3);
    const semesterYear = +(passSemester1 + passSemester2);

    if (GPA > 4.5) {
      alert('유효한 학점을 입력해주세요.');
    } else if (
      !(passSemester3 === '1' || passSemester3 === '2') ||
      semesterYear > 23 ||
      (semesterYear === 23 && passSemester3 === '2')
    ) {
      alert('유효한 진입 학기를 입력해주세요.');
    } else {
      sessionStorage.setItem('secondMajor', doubleMajor);
      sessionStorage.setItem('passedGPA', GPA1 + '.' + GPA2 + GPA3);
      sessionStorage.setItem('passSemester', '20' + passSemester1 + passSemester2 + '-' + passSemester3);
      navigate('/signup5');
    }
  };

  const handlePrev = () => {
    navigate('/signUp4');
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          환영합니다
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>

      <div style={{ width: '976.8px', height: '30px' }}>
        <MultiStepProgressBar numberOfSteps={5} currentStep={currentStep} complete={complete} />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 4</StepIndicator>
          <Typography size="largeText">마이보드 프로필 생성하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                진입한 이중전공
              </Typography>
              <Typography size="mediumText">을 선택해주세요.</Typography>
            </div>
            <DropDown
              title="진입 이중전공 선택"
              optionList={optionList}
              value={doubleMajor}
              setValue={setDoubleMajor}
            />
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                지원 당시의 학점
              </Typography>
              <Typography size="mediumText">을 소수점 두 자리까지 기입해주세요.</Typography>
            </div>
            <VerifiBoxWrapper>
              <VerificationBox name="gpa-1" value={GPA1} setValue={setGPA1} />
              <div style={{ marginTop: 60 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="none">
                  <circle cx="1" cy="1" r="1" fill="#141414" />
                </svg>
              </div>
              <VerificationBox name="gpa-2" value={GPA2} setValue={setGPA2} />
              <VerificationBox name="gpa-3" value={GPA3} setValue={setGPA3} ref={lastBoxRef} />
            </VerifiBoxWrapper>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: 'flex' }}>
              <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                이중전공 진입 학기
              </Typography>
              <Typography size="mediumText">를 입력해주세요.</Typography>
            </div>
            <VerifiBoxWrapper>
              <VerificationBox name="semester-1" value={passSemester1} setValue={setPassSemester1}></VerificationBox>
              <VerificationBox name="semester-2" value={passSemester2} setValue={setPassSemester2}></VerificationBox>
              <Typography size={'normalText'} style={{ marginTop: '58px' }}>
                년도
              </Typography>
              <VerificationBox name="semester-3" value={passSemester3} setValue={setPassSemester3}></VerificationBox>
              <Typography size={'normalText'} style={{ marginTop: '58px' }}>
                학기
              </Typography>
            </VerifiBoxWrapper>
          </ContentsWrapper>
        </ContentsList>
        <ButtonsWrapper>
          <PrevButton onClick={handlePrev} />
          <NextButton active={nextButton} onClick={handleNext} />
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}
