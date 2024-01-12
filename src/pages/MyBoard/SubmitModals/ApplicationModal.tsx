import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import TextFieldBox, { StateOptions } from '../../../assets/OldTextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import NextButton from '../../../assets/buttons/OldNextButton';
import SubmitButton from '../../../assets/buttons/OldSubmitButton';
import Typography from '../../../assets/OldTypography';
import ModalLarge from '../../../components/base/ModalLarge';
import DropDown from '../../../assets/dropdown/dropDown';
import VerificationBox from '../../../assets/VerificationBox';
import MultiStepProgressBar from '../../../assets/MultiStepProgressBar';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import LabelButton from '../../../assets/buttons/LabelButton';
import MockApplicationButton from '../../../assets/myboardpage/MockApplication';
import AlertIconCheck from '../../../assets/icons/AlertIconCheck';
import FirstReAppliedButton from '../../../assets/myboardpage/FirstReAppliedButton';
// import UploadButton from '../../../assets/myboardpage/UploadButton';
import CompleteMockApplicationButton from '../../../assets/myboardpage/CompleteMockApplication';
import { TypeFlags } from 'typescript';
import client from '../../../utils/httpClient';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

/* 파일 업로드 */
export interface UploadButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function UploadButton(props: UploadButtonProps) {
    const { children = '첨부 파일 업로드', ...rest } = props;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = e.target.files;
      if (newFiles && newFiles.length > 0) {
        const newFile = newFiles[0];
        setSelectedFile(newFile);
      }
    };

    return (
      <div style={{ position: 'relative' }}>
        {selectedFile! ? (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              style={{ display: 'flex', justifyContent: 'center', marginTop: '63px', marginLeft: '279px' }}
            >
              <path
                d="M40.8346 5.83398H17.5013C15.9542 5.83398 14.4705 6.44857 13.3765 7.54253C12.2826 8.63649 11.668 10.1202 11.668 11.6673V58.334C11.668 59.8811 12.2826 61.3648 13.3765 62.4588C14.4705 63.5527 15.9542 64.1673 17.5013 64.1673H52.5013C54.0484 64.1673 55.5321 63.5527 56.6261 62.4588C57.7201 61.3648 58.3346 59.8811 58.3346 58.334V23.334L40.8346 5.83398Z"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M35 52.5V35" stroke="#E57C90" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path
                d="M26.25 43.75H43.75"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40.832 5.83398V23.334H58.332"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Typography
              size="mediumText"
              style={{
                display: 'flex',
                color: '#E57C90',
                marginTop: '5px',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedFile.name}
            </Typography>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="92"
              height="70"
              viewBox="0 0 92 70"
              fill="none"
              style={{ display: 'flex', justifyContent: 'center', marginTop: '37px', marginLeft: '268px' }}
            >
              <path
                d="M61.3698 49L46.0365 35L30.7031 49"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M46.0391 35V66.5"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M78.2 57.3649C87.4767 52.7449 90.9267 42.1049 85.8667 33.6349C82.4934 27.9999 76.0534 24.4999 69.0384 24.4999H64.2084C59.9534 9.51995 43.24 0.524947 26.8334 4.40995C10.4267 8.29495 0.575035 23.5549 4.83004 38.4999C6.0567 42.7699 8.3567 46.7249 11.5384 50.0499"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M61.3698 49L46.0365 35L30.7031 49"
                stroke="#E57C90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <Typography
              size="mediumText"
              style={{
                display: 'flex',
                color: '#E57C90',
                marginTop: '17px',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              학업계획서를 첨부해주세요 (선택)
            </Typography>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                top: '130px',
                left: '231px',
              }}
            />
          </div>
        )}
      </div>
    );
  }

  const { isOpenModal, setOpenModal, onClickModal } = props;
  const [currentModal, setCurrentModal] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [nextButton1, setNextButton1] = useState<boolean>(false);
  const [nextButton2, setNextButton2] = useState<boolean>(false);

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

  const [GPA1, setGPA1] = useState<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(localStorage.getItem('curGPA')?.charAt(3) || '');
  const [stdID, setStdID] = useState<string>(localStorage.getItem('studentId') || '');
  const [name, setName] = useState<string>(localStorage.getItem('name') || '');
  const [hopeMajor1, setHopeMajor1] = useState<string>(localStorage.getItem('hopeMajor1') || '');
  const [hopeMajor2, setHopeMajor2] = useState<string>(localStorage.getItem('hopeMajor2') || '');
  const [currentSemester1, setCurrentSemester1] = useState<string>(
    localStorage.getItem('currentSemester')?.charAt(0) || '',
  );
  const [currentSemester2, setCurrentSemester2] = useState<string>(
    localStorage.getItem('currentSemester')?.charAt(2) || '',
  );

  const [stdIDState, setStdIDState] = useState<StateOptions>('filled');
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  useEffect(() => {
    const isValidGPA = GPA1 !== '' && GPA2 !== '' && GPA3 !== '';
    const isValidStdID = stdID.length === 10;

    if (isValidGPA && isValidStdID) {
      setNextButton1(true);
    } else {
      setNextButton1(false);
    }
  }, [GPA1, GPA2, GPA3, stdID]);

  useEffect(() => {
    if (parseFloat(`${GPA1}.${GPA2}${GPA3}`) > 4.5) {
      setGPA1('4');
      setGPA2('5');
      setGPA3('0');
      if (lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [GPA1, GPA2, GPA3]);

  useEffect(() => {
    if (
      !!currentSemester1 &&
      +currentSemester1 > 1 &&
      !!currentSemester2 &&
      (candidateState === 'clicked' || passerState === 'clicked')
    ) {
      setNextButton2(true);
    } else {
      setNextButton2(false);
    }
  }, [currentSemester1, currentSemester2, candidateState, passerState]);

  const submitApplication = async () => {
    try {
      const applyData = {
        applyMajor1: hopeMajor1,
        applyMajor2: hopeMajor2,
        applyGPA: parseFloat(GPA1 + '.' + GPA2 + GPA3),
        applyTimes: candidateState === 'clicked' ? 'First' : 'Reapply',
        applyGrade: currentSemester1 + '-' + currentSemester2,
      };
      await client.post('/dashboard', applyData);

      if (selectedFile) {
        const formData = new FormData();
        formData.append('document', selectedFile);

        await client.post('/user/resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------------------------------------------------------------------------------------------

  return (
    <Main>
      {isOpenModal &&
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
              <AlertWrapper style={{ marginTop: '180px' }}>
                <AlertIconExclamation width="113px" height="113px" />
                <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
                  모의지원을 완료 하시겠습니까?
                </Typography>
                <Typography size="mediumText" bold="500" style={{ marginTop: '10px', lineHeight: '136.111%' }}>
                  지원을 완료한 후에는 철회 및 (남은 모의지원 기간 동안) 개인정보 수정이 불가능합니다.
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '22px',
                    marginTop: '50px',
                  }}
                >
                  <LabelButton
                    buttonType="secondary"
                    size="medium"
                    style={{ width: '627.232px', height: '68px' }}
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    <Typography size="bodyText" style={{ fontWeight: 500, lineHeight: '100%', color: '#D85888' }}>
                      취소하기
                    </Typography>
                  </LabelButton>
                  <MockApplicationButton
                    onClick={() => {
                      setCurrentModal(4); // 다음 창으로 이동
                      submitApplication();
                    }}
                    style={{ width: '627.232px', height: '68px' }}
                    // 글자 디자인 수정 필요
                  >
                    <Typography size="bodyText" style={{ fontWeight: 600, lineHeight: '80%', color: '#FFF' }}>
                      모의지원 완료하기
                    </Typography>
                  </MockApplicationButton>
                </div>
              </AlertWrapper>
            ) : (
              <AlertWrapper style={{ marginTop: '180px' }}>
                <AlertIconCheck width="113px" height="113px" />
                <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
                  모의지원이 완료되었습니다.
                </Typography>
                <Typography size="mediumText" bold="500" style={{ marginTop: '10px', lineHeight: '136.111%' }}>
                  {name} 님의 이중전공 합격을 기원합니다.
                </Typography>
                <SubmitButton
                  onClick={() => {
                    setOpenModal(!isOpenModal);
                    window.location.reload();
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
              <Typography size="largeText" style={{ position: 'absolute', top: '55px', left: '308px' }}>
                지원 정보 확인하기
              </Typography>
              <Typography
                size="mediumText"
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  color: 'rgba(20, 20, 20, 0.80)',
                  lineHeight: ' 136.111% ',
                }}
              >
                실제 이중전공 지원과 동일한 정보를 입력해주세요.
              </Typography>
            </ModalTiteWrapper>
            {currentModal === 0 && ( // 기존 정보 확인하기 단계
              <>
                <ProgressBarWrapper style={{ position: 'absolute', top: '120px', left: '-82.5px' }}>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={1} complete={true} />
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{ color: '#E57C90', textAlign: 'left', paddingLeft: '135px', lineHeight: '136.111%' }}
                    >
                      STEP1
                      <br />
                      기존 정보 확인하기
                    </Typography>
                    <Typography
                      size="mediumText"
                      style={{
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        textAlign: 'center',
                        marginTop: '-49px',
                        lineHeight: '136.111%',
                      }}
                    >
                      STEP2
                    </Typography>
                    <Typography
                      size="mediumText"
                      style={{
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        textAlign: 'right',
                        marginTop: '-23px',
                        marginRight: '130px',
                        lineHeight: '136.111%',
                      }}
                    >
                      STEP3
                    </Typography>
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
                <DividingLine />
                <ContentsWrapper>
                  <div style={{ position: 'absolute', top: '268px', left: '93px' }}>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                        학점
                      </Typography>
                      <Typography size="mediumText">을 입력해주세요.</Typography>
                    </div>
                    <VerifiBoxWrapper>
                      <VerificationBox name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={GPA1 !== ''} />
                      <div style={{ marginTop: 60 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                          <circle cx="1" cy="1" r="1" fill="#141414" />
                        </svg>
                      </div>
                      <VerificationBox name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={GPA2 !== ''} />
                      <VerificationBox
                        name="gpa-3"
                        value={GPA3}
                        setValue={setGPA3}
                        isEntered={GPA3 !== ''}
                        setRef={setLastBoxRef}
                      />
                    </VerifiBoxWrapper>
                  </div>
                  <div style={{ position: 'absolute', top: '412px', left: '93px' }}>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
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
                  </div>
                  <ButtonsWrapper style={{ position: 'absolute', left: '93px', top: '500px' }}>
                    <PrevButton active={false} onClick={handlePrev} />
                    <NextButton active={nextButton1} onClick={handleNext} />
                  </ButtonsWrapper>
                </ContentsWrapper>
              </>
            )}
            {currentModal === 1 && ( // 지원학기 입력하기 단계
              <>
                <ProgressBarWrapper style={{ position: 'absolute', top: '136px', left: '-82.5px' }}>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={2} complete={true} />
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{ color: '#E57C90', textAlign: 'left', paddingLeft: '135px', lineHeight: '136.111%' }}
                    >
                      STEP1
                    </Typography>
                    <Typography
                      size="mediumText"
                      style={{
                        color: '#E57C90',
                        textAlign: 'center',
                        marginTop: '-23px',
                        lineHeight: '136.111%',
                      }}
                    >
                      STEP2
                      <br />
                      지원학기 입력하기
                    </Typography>
                    <Typography
                      size="mediumText"
                      style={{
                        color: 'var(--DF_Grey-2, #DFDFDF)',
                        textAlign: 'right',
                        marginTop: '-49px',
                        marginRight: '130px',
                        lineHeight: '136.111%',
                      }}
                    >
                      STEP3
                    </Typography>
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
                <DividingLine />
                <ContentsWrapper>
                  <div style={{ position: 'absolute', top: '268px', left: '93px' }}>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                        재학 중인 학년/학기
                      </Typography>
                      <Typography size="mediumText">를 입력해주세요.</Typography>
                    </div>
                    <VerifiBoxWrapper>
                      <VerificationBox
                        name="currentSemester-1"
                        value={currentSemester1}
                        setValue={setCurrentSemester1}
                      />
                      <div style={{ marginTop: '30px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                          <path d="M0 1H14" stroke="#B9B9B9" />
                        </svg>
                      </div>
                      <VerificationBox
                        name="currentSemester-2"
                        value={currentSemester2}
                        setValue={setCurrentSemester2}
                      />
                    </VerifiBoxWrapper>
                  </div>
                  <div style={{ position: 'absolute', top: '412px', left: '93px' }}>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <Typography size="mediumText" bold="700" style={{ opacity: '0.8' }}>
                        과거 동일 학과를 지원
                      </Typography>
                      <Typography size="mediumText">했던 경험이 있나요?</Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <FirstReAppliedButton
                        state={candidateState}
                        double={false}
                        onClick={() => handleButtonClick('candidate')}
                      ></FirstReAppliedButton>
                      <FirstReAppliedButton
                        style={{ marginLeft: '34px' }}
                        state={passerState}
                        double={true}
                        onClick={() => handleButtonClick('passer')}
                      ></FirstReAppliedButton>
                    </div>
                  </div>
                  <ButtonsWrapper style={{ position: 'absolute', left: '93px', top: '500px' }}>
                    <PrevButton active={true} onClick={handlePrev} />
                    <NextButton active={nextButton2} onClick={handleNext} />
                  </ButtonsWrapper>
                </ContentsWrapper>
              </>
            )}
            {currentModal === 2 && ( // 자기소개서 첨부하기 단계
              <>
                <ProgressBarWrapper style={{ position: 'absolute', top: '136px', left: '-82.5px' }}>
                  <MultiStepProgressBar numberOfSteps={3} currentStep={3} complete={true} />
                  <ProgressBarTtitle>
                    <Typography
                      size="mediumText"
                      style={{ color: '#E57C90', textAlign: 'left', paddingLeft: '135px', lineHeight: '136.111%' }}
                    >
                      STEP1
                    </Typography>
                    <Typography
                      size="mediumText"
                      style={{
                        color: '#E57C90',
                        textAlign: 'center',
                        marginTop: '-23px',
                        lineHeight: '136.111%',
                      }}
                    >
                      STEP2
                    </Typography>
                    <Typography
                      size="mediumText"
                      style={{
                        color: '#E57C90',
                        textAlign: 'right',
                        marginTop: '-25px',
                        marginRight: '130px',
                        lineHeight: '136.111%',
                      }}
                    >
                      STEP3
                      <br />
                      학업계획서 첨부하기
                    </Typography>
                  </ProgressBarTtitle>
                </ProgressBarWrapper>
                <DividingLine />
                <ContentsWrapper>
                  <SubContentsWrapper>
                    <div style={{ position: 'absolute', left: '93px', top: '268px' }}>
                      <Typography
                        size="mediumText"
                        style={{ color: 'var(--Main-Black, #141414)', opacity: 0.8, fontWeight: '700' }}
                      >
                        학업계획서 첨부하기
                      </Typography>
                      <Typography
                        size="mediumText"
                        style={{
                          color: 'var(--A8_Grey-4, #A8A8A8)',
                          opacity: 0.8,
                          marginLeft: '150px',
                          marginTop: '-18px',
                        }}
                      >
                        (선택)
                      </Typography>
                    </div>
                    <div style={{ position: 'absolute', left: '93px', top: '296px' }}>
                      <UploadBox>
                        <UploadButton isClicked={true} style={{ position: 'absolute', top: '165px', left: '231px' }} />
                      </UploadBox>
                    </div>
                  </SubContentsWrapper>
                </ContentsWrapper>
                <div style={{ position: 'absolute', top: '640px', left: 0 }}>
                  <CompleteMockApplicationButton
                    active={true}
                    onClick={() => {
                      setCurrentModal(3);
                      setIsSubmitted(true);
                    }}
                  />
                </div>
              </>
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
  overflow-y: scroll;
  z-index: 1005;
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
  height: 796px;
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
  // width: 814px;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 13px;
  //margin-bottom: 48px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 130px;
  //padding-left: 93px;
  width: 630px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 796px;
`;

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: auto;
  padding-top: 36.5px;
`;

const DividingLine = styled.div`
  width: 860px;
  height: 1px;
  background: #dfdfdf;
  position: absolute;
  left: 0px;
  top: 232px;
`;

const UploadBox = styled.div`
  width: 628px;
  height: 238px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px dashed #e57c90;
  background: var(--White, #fff);
`;
