import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import TextFieldBox, { StateOptions } from '../../../assets/OldTextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import SubmitButton from '../../../assets/buttons/OldSubmitButton';
import ModalLarge from '../../base/ModalLarge';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';
import { ImgCtrlButton, ImgDelButton } from '../../../assets/myboardpage/ImgCtrlButton';
import DropDown from '../../../assets/dropdown/DropDown';
import TextArea from '../../../assets/TextArea';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import LabelButton from '../../../assets/buttons/LabelButton';
import ToolTip04 from '../../../assets/toolTips/ToolTip04';
import { majorAllList } from '../../../common/MajorAll';
import { majorTargetList } from '../../../common/MajorTarget';
import client from '../../../utils/HttpClient';
import NicknameCheckButton from '../../../assets/progressIndicator/Loader';
import { useNavigate } from 'react-router-dom';
import Icon02 from '../../../assets/icons/Icon02';
import Button01 from '../../../assets/buttons/Button01';
import Typography from '../../../assets/Typography';
import HeaderBar from './HeaderBar';
import MoveButton from './MoveButton';
import { useRecoilState } from 'recoil';
import { editModalState } from '../../../store/atom';

/*
남은 개발
1. 프로필 사진 변경 - 버튼화
2. 인포 메세지 (헬프 메세지) 버튼화
3. 텍스트필드 입력값 유효성 조건 만족여부에 따른 아이콘 변화
*/

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  isApplied: boolean;
}

export default function EditModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal, isApplied } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);

  // 각 버튼의 isClicked 값을 관리하기 위한 변수 선언
  const [headerButtonStates, setHeaderButtonStates] = useState<{
    basicMajor: boolean;
    interestMajor: boolean;
    currentGPA: boolean;
    desiredSemester: boolean;
  }>({
    basicMajor: true,
    interestMajor: false,
    currentGPA: false,
    desiredSemester: false,
  });

  const handleHeaderButtonClick = (buttonName: string) => {
    setHeaderButtonStates((prevState) => {
      const newState = {
        basicMajor: false,
        interestMajor: false,
        currentGPA: false,
        desiredSemester: false,
      };
      newState[buttonName as keyof typeof prevState] = true;
      return newState;
    });
  };

  // 닉네임 중복 체크
  type StateOptions = 'default' | 'hover' | 'focused' | 'typing' | 'filled' | 'error' | 'loading' | 'password';

  type NicknameCheckStateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

  type errorMessageType = {
    passwordErrorMessage: string;
    nicknameErrorMessage: string;
  };
  const [nickname, setNickname] = useState<string>(localStorage.getItem('nickname') || '고대빵');
  const [nicknameState, setNicknameState] = useState<StateOptions>('filled');
  const [nicknameCheck, setNicknameCheckState] = useState<NicknameCheckStateOptions>('filled');
  const [currentNickname, setCurrentNickname] = useState('');
  const [errorMessages, setErrorMessages] = useState<errorMessageType>({
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
  });

  // 각 input들의 값을 state를 사용하여 관리
  const [stdID, setStdID] = useState<string>(localStorage.getItem('studentId') || '');
  const [stdIDState, setStdIDState] = useState<StateOptions>('filled');
  const [firstMajor, setFirstMajor] = useState<string>(localStorage.getItem('firstMajor') || '');
  const [hopeMajor1, setHopeMajor1] = useState<string>(localStorage.getItem('hopeMajor1') || '');
  const [hopeMajor2, setHopeMajor2] = useState<string>(localStorage.getItem('hopeMajor2') || '');
  const [GPA1, setGPA1] = useState<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(localStorage.getItem('curGPA')?.charAt(3) || '');
  const [hopeSemester1, setHopeSemester1] = useState<string>(localStorage.getItem('hopeSemester')?.charAt(2) || '');
  const [hopeSemester2, setHopeSemester2] = useState<string>(localStorage.getItem('hopeSemester')?.charAt(3) || '');
  const [hopeSemester3, setHopeSemester3] = useState<string>(localStorage.getItem('hopeSemester')?.charAt(5) || '');
  const [userProfilePic, setUserProfilePic] = useState<string>(
    localStorage.getItem('userProfilePic') || 'rectProfile1',
  );
  const [userProfileLink, setUserProfileLink] = useState<string>(localStorage.getItem('userProfileLink') || '');
  const [isGpaChanged, setIsGpaChanged] = useState<boolean>(false);
  const originNickname = useRef<string>(localStorage.getItem('nickname'));
  const originstdId = useRef<string>(localStorage.getItem('studentId'));
  const originFirstMajor = useRef<string>(localStorage.getItem('firstMajor'));
  const originHopeMajor1 = useRef<string>(localStorage.getItem('hopeMajor1'));
  const originHopeMajor2 = useRef<string>(localStorage.getItem('hopeMajor2'));
  const originGPA1 = useRef<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const originGPA2 = useRef<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const originGPA3 = useRef<string>(localStorage.getItem('curGPA')?.charAt(3) || '');
  const originHopeSemester1 = useRef<string>(localStorage.getItem('hopeSemester')?.charAt(2) || '');
  const originHopeSemester2 = useRef<string>(localStorage.getItem('hopeSemester')?.charAt(3) || '');
  const originHopeSemester3 = useRef<string>(localStorage.getItem('hopeSemester')?.charAt(5) || '');
  const originUserProfilePic = useRef<string>(localStorage.getItem('userProfilePic'));

  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    if (originGPA1.current !== GPA1 || originGPA2.current !== GPA2 || originGPA3.current !== GPA3) {
      setIsGpaChanged(true);
    } else {
      setIsGpaChanged(false);
    }
  }, [GPA1, GPA2, GPA3]);

  useEffect(() => {
    if (parseFloat(`${GPA1}.${GPA2}${GPA3}`) > 4.5) {
      setGPA1('4');
      setGPA2('5');
      setGPA3('0');
      if (lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [GPA1, GPA2, GPA3]);

  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdIDState === 'filled') {
      if (!passwordCheck.test(stdID)) setStdIDState('error');
      else setStdIDState('filled');
    }
  }, [stdID, stdIDState]);

  const onClickSubmit = async () => {
    let updateData = {};

    if (originNickname.current !== nickname) {
      updateData = { ...updateData, newNickname: nickname };
    }
    if (originstdId.current !== stdID) {
      updateData = { ...updateData, newStudentId: stdID };
    }
    if (originFirstMajor.current !== firstMajor) {
      updateData = { ...updateData, newFirstMajor: firstMajor };
    }
    if (originHopeMajor1.current !== hopeMajor1) {
      updateData = { ...updateData, newHopeMajor1: hopeMajor1 };
    }
    if (originHopeMajor2.current !== hopeMajor2) {
      updateData = { ...updateData, newHopeMajor2: hopeMajor2 };
    }
    if (originGPA1.current !== GPA1 || originGPA2.current !== GPA2 || originGPA3.current !== GPA3) {
      const newGpa = parseFloat(GPA1 + '.' + GPA2 + GPA3);
      const oldGpa = parseFloat(originGPA1.current + '.' + originGPA2.current + originGPA3.current);

      if (Math.abs(oldGpa - newGpa) >= 1.5) {
        alert('비정상적인 학점 변경이 감지되었습니다. 이메일로 문의바랍니다.');
        navigate('/myboard');
      } else {
        updateData = { ...updateData, newCurGPA: newGpa };
      }
    }
    if (
      originHopeSemester1.current !== hopeSemester1 ||
      originHopeSemester2.current !== hopeSemester2 ||
      originHopeSemester3.current !== hopeSemester3
    ) {
      const newHopeSemester = '20' + hopeSemester1 + hopeSemester2 + '-' + hopeSemester3;
      const year = +(hopeSemester1 + hopeSemester2);
      const semester = +hopeSemester3;
      if(year <= 23 || (semester !== 1 && semester !==2)){
        alert('유효한 학기를 입력해주세요!');
      }
      else updateData = { ...updateData, newHopeSemester: newHopeSemester };
    }
    if (originUserProfilePic.current !== userProfilePic) {
      updateData = { ...updateData, newProfilePic: userProfilePic };
    }

    if (Object.keys(updateData).length !== 0) {
      try {
        // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
        await client.post('/user/updateMe', updateData);

        window.location.reload(); // 페이지 새로고침.
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 고려대학교 전체 학과 리스트
  const majorAll = majorAllList;
  const majorTarget = [...majorTargetList];
  majorTarget.unshift({ value1: '희망 없음', value2: '희망 없음' });

  const [currentModal, setCurrentModal] = useRecoilState(editModalState);
  
  useEffect(() => {
    if ((nickname.length === 1 || nickname.length > 7) && nicknameState !== 'focused') {
      setNicknameState('error');
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '닉네임은 2자 이상 7자 이하여야 해요.',
      });
    } else if (nicknameCheck === 'error' && nicknameState !== 'focused') {
      setNicknameState('error');
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '중복되는 닉네임이에요!',
      });
    } else if (nicknameCheck !== 'filled') {
      if (!(nicknameState === 'default' || nicknameState === 'focused' || nicknameState === 'hover')) {
        setNicknameState('error');
        setErrorMessages({
          ...errorMessages,
          nicknameErrorMessage: '닉네임 중복 검사를 완료해 주세요.',
        });
      }
    }
  }, [nicknameState]);

  //nickname이 바뀌면 중복 확인 검사 결과도 처음으로 돌아가야 함.
  useEffect(() => {
    setNicknameCheckState('default');
  }, [nickname]);

  useEffect(() => {
    // 로그인한 유저 정보 localStorage에
    const getMe = async () => {
      try {
        // const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
        const APIresponse = await client.get('/user/getMe');
        const userInfo = APIresponse.data.data.user;
        setCurrentNickname(userInfo.nickname);
      } catch (err) {
        console.log(err);
      }
    };
    getMe();
  }, []);

  // nickname이 현재 닉네임과 같다면 중복 검사 스킵
  useEffect(() => {
    if (currentNickname === nickname) {
      setNicknameCheckState('filled');
    }
  });

  //중복 체크의 결과에 따라 nicknameState가 바뀐다.
  useEffect(() => {
    if (nicknameCheck === 'filled') setNicknameState('filled');
    else if (nicknameCheck === 'error') {
      setNicknameState('error');
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '중복되는 닉네임이에요!',
      });
    }
  }, [nicknameCheck]);

  return (
    <Main>
      {(isOpenModal && isSubmitted && isGpaChanged &&
        <ModalLarge onClickToggleModal={onClickModal}>
          <CloseButton
            onClick={() => {
              setOpenModal(!isOpenModal);
            }}
          >
            <Icon02/>
          </CloseButton>
          <AlertWrapper>
          <AlertIconExclamation width="5.885vw" height="5.885vw" />
            <Typography size="1.25vw" bold="700" style={{ marginTop: '1.302vw' }}>
              변경한 학점을 저장하시겠습니까?
            </Typography>
            <Typography size="0.9375vw" bold="500" style={{ marginTop: '1.25vw', lineHeight: '136.111%' }}>
              수정을 저장하면 이번 이중전공 지원 시즌 동안
              <br />단 한 번의 학점 수정 기회가 남아요.
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1.146vw', marginTop: '4.167vw' }}>
              <Button01
                variant="outline"
                size="medium"
                onClick={() => {
                  setIsSubmitted(false);
                }}
              >
                취소
              </Button01>
              <Button01
                variant="solid"
                size="medium"
                onClick={() => {
                  setOpenModal(!isOpenModal);
                  setIsSubmitted(true);
                  onClickSubmit();
                }}
              >
                확인
              </Button01>
            </div>
          </AlertWrapper>
        </ModalLarge>
      )}
      {(
        <ModalLarge onClickToggleModal={onClickModal}>
          <HeaderWrapper>
            <CloseButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              <Icon02/>
            </CloseButton>
            <Typography size="1.042vw" bold="700" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '2.083vw' }}>
            프로필 정보 수정하기
          </Typography>
          <div style={{ height: '2.083vw' }}></div>
          <HeaderBar/>
      </HeaderWrapper>

      {currentModal === 0 && ( // '나의 기본전공' 버튼 클릭 시
            <ContentsWrapper
            style={{
              marginBottom: '5.260vw',
            }}
          >
            <SubContentsWrapper>
              <ContentsTitle>프로필 사진 변경하기</ContentsTitle>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1.042vw' }}>
                <CurrentImg
                  src={
                    userProfilePic === 'customProfile'
                      ? userProfileLink
                      : `designImage/character/rectProfile/${userProfilePic}.png`
                  }
                  alt="current profile"
                />
                <div>
                  <CandidateImgsWrapper>
                    {Array.from({ length: 4 }, (_, index) => (
                      <CandidateImg
                        src={`designImage/character/rectProfile/RectProfile${index+1}.png`}
                        alt={`candidate profile ${index+1}`}
                        onClick={() => setUserProfilePic(`rectProfile${index+1}`)}
                      />
                    ))}
                  </CandidateImgsWrapper>
                  <div style={{ gap: '0.260vw', marginTop: '2.708vw' }}></div>
                  <div style={{ marginLeft: '4.427vw', marginTop: '-1.458vw' }}></div>
                </div>
              </div>
            </SubContentsWrapper>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
                <SubContentsWrapper>
                  <ContentsTitle>닉네임 변경하기</ContentsTitle>
                  <div style={{position: 'relative'}}>
                  <TextFieldBox
                    value={nickname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNickname(e.target.value);
                    }}
                    state={nicknameState}
                    setState={setNicknameState}
                    setValue={setNickname}
                    errorMessage={errorMessages.nicknameErrorMessage}
                  ></TextFieldBox>
                  {nickname === '' || nicknameState === 'filled' ? (
                    <></>
                  ) : (
                    <NicknameCheckButtonWrapper>
                      <NicknameCheckButton
                        nickname={nickname}
                        state={nicknameCheck}
                        setState={setNicknameCheckState}
                      ></NicknameCheckButton>
                    </NicknameCheckButtonWrapper>
                  )}
                  </div>
                </SubContentsWrapper>
                <SubContentsWrapper>
                  <ContentsTitle>학번 변경하기</ContentsTitle>
                  <TextFieldBox
                    value={stdID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setStdID(e.target.value);
                    }}
                    state={stdIDState}
                    setState={setStdIDState}
                    setValue={setStdID}
                  ></TextFieldBox>
                </SubContentsWrapper>
                <SubContentsWrapper>
                  <ContentsTitle>본전공 변경하기</ContentsTitle>
                  <DropDown
                    title="전공선택" // 수정필요
                    optionList={majorAll}
                    value={firstMajor}
                    setValue={setFirstMajor}
                  ></DropDown>
                </SubContentsWrapper>
              </div>
              <MoveButton
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                onClickSubmit={onClickSubmit}
                isApplied={isApplied}
                setIsSubmitted={setIsSubmitted}
                style={{marginTop: '1.042vw'}}
              />
            </ContentsWrapper>
          )}
          {currentModal === 1 && ( // '관심전공' 버튼 클릭 시
            <ContentsWrapper2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
                <SubContentsWrapper>
                  <ContentsTitle>희망 관심전공 변경하기</ContentsTitle>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.667vw' }}>
                    <DropDown
                      title="1지망 전공 선택"
                      optionList={majorTarget.filter(
                        (el) => el.value1 !== '희망 없음' && el.value1 !== firstMajor && el.value1 !== hopeMajor2,
                      )}
                      value={hopeMajor1}
                      setValue={setHopeMajor1}
                    ></DropDown>
                    <DropDown
                      title="2지망 전공 선택"
                      optionList={majorTarget.filter((el) => el.value1 !== firstMajor && el.value1 !== hopeMajor1)}
                      value={hopeMajor2}
                      setValue={setHopeMajor2}
                    ></DropDown>
                  </div>
                </SubContentsWrapper>
              </div>
              <MoveButton
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                onClickSubmit={onClickSubmit}
                isApplied={isApplied}
                setIsSubmitted={setIsSubmitted}
                style={{marginTop: '9.740vw'}}
              />
            </ContentsWrapper2>
          )}
          {currentModal === 2 && ( // '현재 내 학점' 버튼 클릭 시
            <ContentsWrapper2>
              <SubContentsWrapper>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.3vw' }}>
                  <ContentsTitle>나의 지원학점 변경하기</ContentsTitle>
                  <ToolTip04 />
                </div>
                <VerifiBoxWrapper>
                  <TextArea name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={GPA1 !== ''} />
                  <div style={{ marginTop: '3.125vw', height: '0.208vw', width: '0.208vw' }}>
                    <img src="designImage/myBoard/Ellipse 981.svg" height="100%" width="100%" />
                  </div>
                  <TextArea name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={GPA2 !== ''} />
                  <TextArea
                    name="gpa-3"
                    value={GPA3}
                    setValue={setGPA3}
                    isEntered={GPA3 !== ''}
                    setRef={setLastBoxRef}
                  />
                </VerifiBoxWrapper>
              </SubContentsWrapper>
              <MoveButton
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                onClickSubmit={onClickSubmit}
                isApplied={isApplied}
                setIsSubmitted={setIsSubmitted}
              />
            </ContentsWrapper2>
          )}
          {currentModal === 3 && ( // '희망 진입학기' 버튼 클릭 시
            <ContentsWrapper2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
                <SubContentsWrapper>
                  <ContentsTitle>희망 이중 지원학기 변경하기</ContentsTitle>
                  <VerifiBoxWrapper>
                    <VerifiBoxWrapper>
                      <TextArea
                        name="semester-1"
                        value={hopeSemester1}
                        setValue={setHopeSemester1}
                        isEntered={true}
                      ></TextArea>
                      <TextArea
                        name="semester-2"
                        value={hopeSemester2}
                        setValue={setHopeSemester2}
                        isEntered={true}
                      ></TextArea>
                      <Typography size="0.833vw" bold="500" style={{ marginTop: '3.021vw' }}>년도</Typography>
                      <TextArea
                        name="semester-3"
                        value={hopeSemester3}
                        setValue={setHopeSemester3}
                        isEntered={true}
                      ></TextArea>
                      <Typography size="0.833vw" bold="500" style={{ marginTop: '3.021vw' }}>학기</Typography>
                    </VerifiBoxWrapper>
                  </VerifiBoxWrapper>
                </SubContentsWrapper>
              </div>
              <MoveButton
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                onClickSubmit={onClickSubmit}
                isApplied={isApplied}
                setIsSubmitted={setIsSubmitted}
              />
            </ContentsWrapper2>
          )}
        </ModalLarge>
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 1px; // 버튼 안눌림 이슈 수정
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //width: 814px;
  width: 120%;
  //height: 134px;
  height: 6.979vw;
  flex-shrink: 0;
  background-color: #fcfafb;
  border-bottom: 1px solid var(--DF_Grey-2, #dfdfdf);
  //margin-top: -16px;
  margin-top: -0.833vw;
`;

const CloseButton = styled.button`
  display: flex;
  //width: 60px; 
  width: 3.125vw;
  //height: 60px;
  height: 3.125vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  //top: 32px;
  top: 1.667vw;
  //right: 40px;
  right: 2.083vw;
  cursor: pointer;
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //width: 628px;
  width: 32.708vw;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;

const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //margin-top: 40px;
  margin-top: 2.083vw;
`;


const MoveButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //width: 628px;
  width: 32.708vw;
  //gap: 18px;
  gap: 0.9375vw;
  //margin-top: 280px;
  margin-top: 14.583vw;
`;

const ContentsWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  //width: 628px;
  width: 32.708vw;
  //align-items: left;
  //margin-left: auto;
  //margin-right: auto;
  //margin-top: 58px;
  margin-top: 3.021vw;
  //gap: 35px;
  //height: 796px;
  height: 41.458vw;
  overflow: auto;
  overflow-x: hidden;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //width: 628px;
  width: 32.708vw;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  //margin-top: 58px;
  margin-top: 3.021vw;
  //gap: 35px;
  gap: 1.823vw;
`;

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 9px;
  gap: 0.469vw;
`;

const ContentsTitle = styled.text`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  //font-size: 18px;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  opacity: 0.8;
`;

const CurrentImg = styled.img`
  //width: 153px;
  width: 7.969vw;
  //height: 153px;
  height: 7.969vw;
  object-fit: cover;
`;

const CandidateImg = styled.img`
  //width: 74px;
  width: 3.854vw;
  //height: 74px;
  height: 3.854vw;
  object-fit: cover;
  cursor: pointer;
`;

const CandidateImgsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  //gap: 14px;
  gap: 0.729vw;
`;

const NicknameCheckButtonWrapper = styled.div`
  position: absolute;
  top: 1.15vw; //20.2px;
  left: 25.3vw; //490px;
  z-index: 2;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 0.6771vw;
`;


