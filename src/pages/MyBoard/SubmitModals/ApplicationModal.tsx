import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import NextButton from '../../../assets/buttons/NextButton';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import DropDown from '../../../assets/dropdown/dropDown';
import VerificationBox from '../../../assets/VerificationBox';
import MultiStepProgressBar from '../../../assets/MultiStepProgressBar';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import LabelButton from '../../../assets/buttons/LabelButton';
import MockApplicationButton from '../../../assets/myboardpage/MockApplication';
import AlertIconCheck from '../../../assets/icons/AlertIconCheck';
import FirstReAppliedButton from '../../../assets/myboardpage/FirstReAppliedButton';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

/*
  모달창 고유번호
  0 : STEP 1 기존 정보 확인하기
  1 : STEP 2 지원 학기 입력하기
  2 : STEP 3 자기소개서 첨부하기
  3 : 모의지원 제출 확인
  4 : 모의지원 완료 안내
  */

export default function ApplicationModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;
  const [currentModal, setCurrentModal] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(false);

  const [candidateState, setCandidateState] = useState<'default' | 'clicked' | 'unactive'>('default');
  const [passerState, setPasserState] = useState<'default' | 'clicked' | 'unactive'>('default');

  const handleButtonClick = (buttonState: string) => {
    if (buttonState === 'candidate' && candidateState !== 'clicked') {
      setCandidateState('clicked');
      setPasserState('unactive');
    } else if (buttonState === 'passer' && passerState !== 'clicked') {
      setPasserState('clicked');
      setCandidateState('unactive');
    }
  };

  const handleNext = () => {
    if (currentModal < 4) {
      setCurrentModal(currentModal + 1);
    }
  };

  const handlePrev = () => {
    if (currentModal > 0) {
      setCurrentModal(currentModal - 1);
    }
  };

  const [GPA1, setGPA1] = useState<string>(sessionStorage.getItem('GPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(sessionStorage.getItem('GPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(sessionStorage.getItem('GPA')?.charAt(3) || '');
  const [stdID, setStdID] = useState<string>(sessionStorage.getItem('studentId') || '');

  const [currentSemester1, setCurrentSemester1] = useState<string>(
    sessionStorage.getItem('currentSemester')?.charAt(0) || '',
  );
  const [currentSemester2, setCurrentSemester2] = useState<string>(
    sessionStorage.getItem('currentSemester')?.charAt(2) || '',
  );

  const [stdIDState, setStdIDState] = useState<StateOptions>('default');

  useEffect(() => {
    const isValidGPA = GPA1 !== '' && GPA2 !== '' && GPA3 !== '';
    const isValidStdID = stdID.length === 10;

    if (isValidGPA && isValidStdID) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [GPA1, GPA2, GPA3, stdID]);

  useEffect(() => {
    if (!!currentSemester1 && !!currentSemester2) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [currentSemester1, currentSemester2]);

  return (
    <Main>
      {isOpenModal && // 모달 오픈
        (isSubmitted ? ( // 프로그래스바가 있는 창과 없는 창 구분 (모달번호 0, 1, 2,  vs. 3, 4)
          <ModalLarge onClickToggleModal={onClickModal}>
            <CloseButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.2071 23.2071C38.5976 22.8166 38.5976 22.1834 38.2071 21.7929C37.8166 21.4024 37.1834 21.4024 36.7929 21.7929L30 28.5858L23.2071 21.7929C22.8166 21.4024 22.1834 21.4024 21.7929 21.7929C21.4024 22.1834 21.4024 22.8166 21.7929 23.2071L28.5858 30L21.7929 36.7929C21.4024 37.1834 21.4024 37.8166 21.7929 38.2071C22.1834 38.5976 22.8166 38.5976 23.2071 38.2071L30 31.4142L36.7929 38.2071C37.1834 38.5976 37.8166 38.5976 38.2071 38.2071C38.5976 37.8166 38.5976 37.1834 38.2071 36.7929L31.4142 30L38.2071 23.2071Z"
                  fill="#141414"
                />
              </svg>
            </CloseButton>
            {currentModal === 3 ? ( // 모달 3 vs. 모달 4
              <AlertWrapper>
                <AlertIconExclamation width="113px" height="113px" />
                <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
                  모의지원을 완료 하시겠습니까?
                </Typography>
                <Typography size="mediumText" bold="500" style={{ marginTop: '10px', lineHeight: '136.111%' }}>
                  모의지원을 완료한 후에는 철회가 불가능합니다.
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '22px',
                    marginTop: '50px',
                  }}
                >
                  <LabelButton buttonType="secondary" size="medium" style={{ width: '627.232px', height: '68px' }}>
                    취소하기
                  </LabelButton>
                  <MockApplicationButton
                    onClick={() => {
                      setCurrentModal(4); // 다음 창으로 이동
                    }}
                    style={{ width: '627.232px', height: '68px', fontSize: '20px' }}
                    // 글자 디자인 수정 필요
                  >
                    모의지원 완료하기
                  </MockApplicationButton>
                </div>
              </AlertWrapper>
            ) : (
              <AlertWrapper>
                <AlertIconCheck width="113px" height="113px" />
                <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
                  모의지원이 완료되었습니다.
                </Typography>
                <Typography size="mediumText" bold="500" style={{ marginTop: '10px', lineHeight: '136.111%' }}>
                  고대빵 님의 이중전공 합격을 기원합니다.
                </Typography>
                <SubmitButton
                  onClick={() => {
                    setOpenModal(!isOpenModal);
                  }}
                  style={{ marginTop: '107px' }}
                >
                  확인
                </SubmitButton>
              </AlertWrapper>
            )}
          </ModalLarge>
        ) : (
          <ModalLarge onClickToggleModal={onClickModal}>
            <CloseButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.2071 23.2071C38.5976 22.8166 38.5976 22.1834 38.2071 21.7929C37.8166 21.4024 37.1834 21.4024 36.7929 21.7929L30 28.5858L23.2071 21.7929C22.8166 21.4024 22.1834 21.4024 21.7929 21.7929C21.4024 22.1834 21.4024 22.8166 21.7929 23.2071L28.5858 30L21.7929 36.7929C21.4024 37.1834 21.4024 37.8166 21.7929 38.2071C22.1834 38.5976 22.8166 38.5976 23.2071 38.2071L30 31.4142L36.7929 38.2071C37.1834 38.5976 37.8166 38.5976 38.2071 38.2071C38.5976 37.8166 38.5976 37.1834 38.2071 36.7929L31.4142 30L38.2071 23.2071Z"
                  fill="#141414"
                />
              </svg>
            </CloseButton>
            <ModalTiteWrapper>
              <Typography size="largeText">실지원 정보 확인하기</Typography>
              <Typography size="mediumText" style={{ lineHeight: ' 136.111% ' }}>
                실제 이중전공 지원 시 입력한 정보와 달라진 정보를 수정해주세요.
              </Typography>
            </ModalTiteWrapper>
            {currentModal === 0 && ( // 기존 정보 확인하기 단계
              <div>
                <ProgressBarWrapper>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={1} complete={true} />
                  <ProgressBarTtitle style={{ paddingLeft: '135px' }}>
                    <Typography
                      size="mediumText"
                      style={{ color: '#E57C90', lineHeight: '136.111%', textAlign: 'left' }}
                    >
                      STEP1
                      <br />
                      기존 정보 확인하기
                    </Typography>
                  </ProgressBarTtitle>
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{
                        position: 'absolute',
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        lineHeight: '136.111%',
                        top: '185px',
                        left: '377px',
                        textAlign: 'center',
                      }}
                    >
                      STEP2
                    </Typography>
                  </ProgressBarTtitle>
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{
                        position: 'absolute',
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        lineHeight: '136.111%',
                        top: '185px',
                        left: '705px',
                        textAlign: 'right',
                      }}
                    >
                      STEP3
                    </Typography>
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
                <div style={{ position: 'absolute', top: 0, left: -1 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="814" height="232" viewBox="0 0 814 232" fill="none">
                    <path
                      d="M0.5 20C0.5 9.23045 9.23045 0.5 20 0.5H794C804.77 0.5 813.5 9.23045 813.5 20V231.5H0.5V20Z"
                      stroke="#DFDFDF"
                    />
                  </svg>
                </div>
                <div style={{ display: 'flex' }}>
                  <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                    학점
                  </Typography>
                  <Typography size="mediumText">을 입력해주세요.</Typography>
                </div>
                <VerifiBoxWrapper>
                  <VerificationBox name="gpa-1" value={GPA1} setValue={setGPA1} />
                  <div style={{ marginTop: 60 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                      <circle cx="1" cy="1" r="1" fill="#141414" />
                    </svg>
                  </div>
                  <VerificationBox name="gpa-2" value={GPA2} setValue={setGPA2} />
                  <VerificationBox name="gpa-3" value={GPA3} setValue={setGPA3} />
                </VerifiBoxWrapper>
                <div style={{ display: 'flex' }}>
                  <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                    고려대학교 학번
                  </Typography>
                  <Typography size="mediumText">을 입력해주세요.</Typography>
                </div>
                <TextFieldBox
                  placeholder="학번 10자리"
                  value={stdID}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setStdID(e.target.value);
                  }}
                  state={stdIDState}
                  setState={setStdIDState}
                  setValue={setStdID}
                  helpMessage="학번 10자리"
                  errorMessage="학번이 10자리 숫자가 아닙니다."
                ></TextFieldBox>
                <ButtonsWrapper>
                  <PrevButton active={false} onClick={handlePrev} />
                  <NextButton active={nextButton} onClick={handleNext} />
                </ButtonsWrapper>
              </div>
            )}
            {currentModal === 1 && ( // 지원학기 입력하기 단계
              <div>
                <ProgressBarWrapper>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={2} complete={true} />
                  <ProgressBarTtitle style={{ paddingLeft: '135px' }}>
                    <Typography
                      size="mediumText"
                      style={{ color: 'var(--DF_Grey-2, #DFDFDF)', lineHeight: '136.111%', textAlign: 'left' }}
                    >
                      STEP1
                    </Typography>
                  </ProgressBarTtitle>
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{
                        position: 'absolute',
                        color: '#E57C90',
                        lineHeight: '136.111%',
                        top: '185px',
                        left: '338px',
                        textAlign: 'center',
                      }}
                    >
                      STEP2
                      <br />
                      지원학기 입력하기
                    </Typography>
                  </ProgressBarTtitle>
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{
                        position: 'absolute',
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        lineHeight: '136.111%',
                        top: '185px',
                        left: '705px',
                        textAlign: 'right',
                      }}
                    >
                      STEP3
                    </Typography>
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="814" height="232" viewBox="0 0 814 232" fill="none">
                    <path
                      d="M0.5 20C0.5 9.23045 9.23045 0.5 20 0.5H794C804.77 0.5 813.5 9.23045 813.5 20V231.5H0.5V20Z"
                      stroke="#DFDFDF"
                    />
                  </svg>
                </div>
                <div style={{ display: 'flex' }}>
                  <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                    재학 중인 학년/학기
                  </Typography>
                  <Typography size="mediumText">를 입력해주세요.</Typography>
                </div>
                <VerifiBoxWrapper>
                  <VerificationBox name="currentSemester-1" value={currentSemester2} setValue={setCurrentSemester1} />
                  <div style={{ marginTop: 60 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                      <path d="M0 1H14" stroke="#B9B9B9" />
                    </svg>
                  </div>
                  <VerificationBox name="currentSemester-2" value={currentSemester2} setValue={setCurrentSemester2} />
                </VerifiBoxWrapper>
                <div style={{ display: 'flex' }}>
                  <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                    과거 동일 학과를 지원
                  </Typography>
                  <Typography size="mediumText">했던 경험이 있나요?</Typography>
                </div>
                <FirstReAppliedButton
                  state={candidateState}
                  double={false}
                  onClick={() => handleButtonClick('candidate')}
                ></FirstReAppliedButton>
                <FirstReAppliedButton
                  state={passerState}
                  double={true}
                  onClick={() => handleButtonClick('passer')}
                ></FirstReAppliedButton>
                <ButtonsWrapper>
                  <PrevButton active={true} onClick={handlePrev} />
                  <NextButton active={nextButton} onClick={handleNext} />
                </ButtonsWrapper>
              </div>
            )}
            {currentModal === 2 && ( // 자기소개서 첨부하기 단계
              <div>
                <ProgressBarWrapper>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={3} complete={true} />
                  <ProgressBarTtitle style={{ paddingLeft: '135px' }}>
                    <Typography
                      size="mediumText"
                      style={{ color: 'var(--DF_Grey-2, #DFDFDF)', lineHeight: '136.111%', textAlign: 'left' }}
                    >
                      STEP1
                    </Typography>
                  </ProgressBarTtitle>
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{
                        position: 'absolute',
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        lineHeight: '136.111%',
                        top: '185px',
                        left: '377px',
                        textAlign: 'center',
                      }}
                    >
                      STEP2
                    </Typography>
                  </ProgressBarTtitle>
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{
                        position: 'absolute',
                        color: '#E57C90',
                        lineHeight: '136.111%',
                        top: '185px',
                        left: '615px',
                        textAlign: 'right',
                      }}
                    >
                      STEP3
                      <br />
                      자기소개서 첨부하기
                    </Typography>
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="814" height="232" viewBox="0 0 814 232" fill="none">
                    <path
                      d="M0.5 20C0.5 9.23045 9.23045 0.5 20 0.5H794C804.77 0.5 813.5 9.23045 813.5 20V231.5H0.5V20Z"
                      stroke="#DFDFDF"
                    />
                  </svg>
                </div>
              </div>
            )}
          </ModalLarge>
        ))}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 20; // Modal.tsx 와 상이한 stacking context
`;

const CloseButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 32px;
  right: 40px;
  cursor: pointer;
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 628px;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;

const ModalTiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 55px;
  margin-bottom: 18px;
`;

const ProgressBarTtitle = styled.text`
  color: #e57c90;
  text-align: left;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 136.111%;
  margin-top: 8px;
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 13px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 34px;
`;
