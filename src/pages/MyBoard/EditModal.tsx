import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import TextFieldBox, { StateOptions } from '../../assets/TextFieldBox';
import PrevButton from '../../assets/buttons/PrevButton';
import SubmitButton from '../../assets/buttons/SubmitButton';
import Typography from '../../assets/Typography';
import ModalLarge from '../../components/base/ModalLarge';
import EditModalHeaderButton from '../../assets/myboardpage/EditModalHeaderButton';
import ImgCtrlButton from '../../assets/myboardpage/ImgCtrlButton';
import DropDown from '../../assets/dropdown/dropDown';
import VerificationBox from '../../assets/VerificationBox';
import AlertIconExclamation from '../../assets/icons/AlertIconExclamation';
import LabelButton from '../../assets/buttons/LabelButton';
import { ModalHelpMessage } from '../../assets/myboardpage/HellpMessage';
import { MajorList } from '../../components/base/MajorList';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

/* 
  모달 헤더버튼 구분
  0: 나의 기본정보
  1: 관심 전공
  2: 현재 내 학점
  3: 희망 진입학기
  */

export default function EditModal(props: ModalProps) {
  ///// 1. 모달창 구현

  const { isOpenModal, setOpenModal, onClickModal } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  ///// 2. 모달 내 입력/선택되는 정보 관리

  // 각 버튼의 isClicked 값 관리 목적
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

  // 각 input들의 값을 state를 사용하여 관리
  const [nickname, setNickname] = useState<string>(sessionStorage.getItem('nickname') || '');
  const [nicknameState, setNicknameState] = useState<StateOptions>('filled');
  const [stdID, setStdID] = useState<string>(sessionStorage.getItem('studentId') || '');
  const [stdIDState, setStdIDState] = useState<StateOptions>('filled');
  const [firstMajor, setFirstMajor] = useState<string>(sessionStorage.getItem('firstMajor') || '');
  const [hopeMajor1, setHopeMajor1] = useState<string>(sessionStorage.getItem('hopeMajor1') || '');
  const [hopeMajor2, setHopeMajor2] = useState<string>(sessionStorage.getItem('hopeMajor2') || '');
  const [GPA1, setGPA1] = useState<string>(sessionStorage.getItem('curGPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(sessionStorage.getItem('curGPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(sessionStorage.getItem('curGPA')?.charAt(3) || '');
  const [hopeSemester1, setHopeSemester1] = useState<string>(sessionStorage.getItem('hopeSemester')?.charAt(2) || '');
  const [hopeSemester2, setHopeSemester2] = useState<string>(sessionStorage.getItem('hopeSemester')?.charAt(3) || '');
  const [hopeSemester3, setHopeSemester3] = useState<string>(sessionStorage.getItem('hopeSemester')?.charAt(5) || '');
  const [userProfilePic, setUserProfilePic] = useState<string>(
    sessionStorage.getItem('userProfilePic') || 'rectProfile1',
  );
  const [userProfileLink, setUserProfileLink] = useState<string>(sessionStorage.getItem('userProfileLink') || '');

  const [isGpaChanged, setIsGpaChanged] = useState<boolean>(false);

  const originNickname = useRef<string>(sessionStorage.getItem('nickname'));
  const originstdId = useRef<string>(sessionStorage.getItem('studentId'));
  const originFirstMajor = useRef<string>(sessionStorage.getItem('firstMajor'));
  const originHopeMajor1 = useRef<string>(sessionStorage.getItem('hopeMajor1'));
  const originHopeMajor2 = useRef<string>(sessionStorage.getItem('hopeMajor2'));
  const originGPA1 = useRef<string>(sessionStorage.getItem('curGPA')?.charAt(0) || '');
  const originGPA2 = useRef<string>(sessionStorage.getItem('curGPA')?.charAt(2) || '');
  const originGPA3 = useRef<string>(sessionStorage.getItem('curGPA')?.charAt(3) || '');
  const originHopeSemester1 = useRef<string>(sessionStorage.getItem('hopeSemester')?.charAt(2) || '');
  const originHopeSemester2 = useRef<string>(sessionStorage.getItem('hopeSemester')?.charAt(3) || '');
  const originHopeSemester3 = useRef<string>(sessionStorage.getItem('hopeSemester')?.charAt(5) || '');
  const originUserProfilePic = useRef<string>(sessionStorage.getItem('userProfilePic'));

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    if (originGPA1.current !== GPA1 || originGPA2.current !== GPA2 || originGPA3.current !== GPA3) {
      setIsGpaChanged(true);
    }
  }, [GPA1, GPA2, GPA3]);

  const onClickSubmit = async () => {
    let updateData = {};
    console.log(hopeSemester1, hopeSemester2, hopeSemester3);

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
      updateData = { ...updateData, newCurGPA: newGpa };
    }
    if (
      originHopeSemester1.current !== hopeSemester1 ||
      originHopeSemester2.current !== hopeSemester2 ||
      originHopeSemester3.current !== hopeSemester3
    ) {
      const newHopeSemester = '20' + hopeSemester1 + hopeSemester2 + '-' + hopeSemester3;
      updateData = { ...updateData, newHopeSemester: newHopeSemester };
    }
    if (originUserProfilePic.current !== userProfilePic) {
      updateData = { ...updateData, newProfilePic: userProfilePic };
    }

    if (Object.keys(updateData).length !== 0) {
      console.log(updateData);
      try {
        await axios.post('http://localhost:8080/user/updateMe', updateData, config);
        window.location.reload(); // 페이지 새로고침.
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 고려대학교 전체 학과 리스트
  let majorList: { value1: string; value2: string }[] = MajorList;

  // 모달 페이지 초기화
  const [currentModal, setCurrentModal] = useState<number>(0);

  // 모달 헤더 버튼 클릭 이벤트
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

  // -----------------------------------------------------------------

  return (
    <Main>
      {isOpenModal && isSubmitted && isGpaChanged && (
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
          <AlertWrapper>
            <AlertIconExclamation width="113px" height="113px" />
            <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
              변경한 학점을 저장하시겠습니까?
            </Typography>
            <Typography size="mediumText" bold="500" style={{ marginTop: '24px', lineHeight: '136.111%' }}>
              수정을 저장하면 이번 이중전공 지원 시즌 동안
              <br />단 한 번의 학점 수정 기회가 남아요.
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '22px', marginTop: '80px' }}>
              <LabelButton
                buttonType="secondary"
                size="medium"
                onClick={() => {
                  setIsSubmitted(false);
                }}
              >
                취소
              </LabelButton>
              <LabelButton
                buttonType="primary"
                size="medium"
                onClick={() => {
                  setOpenModal(!isOpenModal);
                  setIsSubmitted(true);
                  onClickSubmit();
                }}
              >
                확인
              </LabelButton>
            </div>
          </AlertWrapper>
        </ModalLarge>
      )}
      {isOpenModal && !isSubmitted && (
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
          <Typography size="bodyText" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
            프로필 정보 수정하기
          </Typography>
          <div style={{ height: '40px' }}></div>
          <HeaderButtonWrapper width="calc(672px * 0.6)" height="calc(53.2px * 0.6)">
            <EditModalHeaderButton // 버튼 아이콘 삽입 필요
              isClicked={headerButtonStates.basicMajor}
              onClick={() => {
                handleHeaderButtonClick('basicMajor');
                setCurrentModal(0);
              }}
            >
              나의 기본정보
            </EditModalHeaderButton>
            <EditModalHeaderButton
              isClicked={headerButtonStates.interestMajor}
              onClick={() => {
                handleHeaderButtonClick('interestMajor');
                setCurrentModal(1);
              }}
            >
              관심 전공
            </EditModalHeaderButton>
            <EditModalHeaderButton
              isClicked={headerButtonStates.currentGPA}
              onClick={() => {
                handleHeaderButtonClick('currentGPA');
                setCurrentModal(2);
              }}
            >
              현재 내 학점
            </EditModalHeaderButton>
            <EditModalHeaderButton
              isClicked={headerButtonStates.desiredSemester}
              onClick={() => {
                handleHeaderButtonClick('desiredSemester');
                setCurrentModal(3);
              }}
            >
              희망 지원학기
            </EditModalHeaderButton>
          </HeaderButtonWrapper>
          {currentModal === 0 && ( // '나의 기본전공' 버튼 클릭 시
            <ContentsWrapper
              style={{
                marginBottom: '101px',
              }}
            >
              <SubContentsWrapper>
                <ContentsTitle>프로필 사진 변경하기</ContentsTitle>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                  <CurrentImg
                    src={
                      userProfilePic === 'customProfile'
                        ? userProfileLink
                        : `design_image/character/rectProfile/${userProfilePic}.png`
                    }
                    alt="current profile"
                  />
                  <div>
                    <CandidateImgsWrapper>
                      <CandidateImg // 각 이미지들을 버튼으로 수정 필요, 이미지 업로드 기능 구현 필요
                        src="design_image/character/rectProfile/rectProfile1.png"
                        alt="candidate profile 1"
                        onClick={() => setUserProfilePic('rectProfile1')}
                      />
                      <CandidateImg
                        src="design_image/character/rectProfile/rectProfile2.png"
                        alt="candidate profile 2"
                        onClick={() => setUserProfilePic('rectProfile2')}
                      />
                      <CandidateImg
                        src="design_image/character/rectProfile/rectProfile3.png"
                        alt="candidate profile 3"
                        onClick={() => setUserProfilePic('rectProfile3')}
                      />
                      <CandidateImg
                        src="design_image/character/rectProfile/rectProfile4.png"
                        alt="candidate profile 4"
                        onClick={() => setUserProfilePic('rectProfile4')}
                      />
                    </CandidateImgsWrapper>
                    <div style={{ gap: '5px', marginTop: '52px' }}>
                      <ImgCtrlButton />
                      <ImgCtrlButton>삭제</ImgCtrlButton>
                    </div>
                  </div>
                </div>
              </SubContentsWrapper>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <SubContentsWrapper>
                  <ContentsTitle>닉네임 변경하기</ContentsTitle>
                  <TextFieldBox
                    value={nickname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setNickname(e.target.value);
                    }}
                    state={nicknameState}
                    setState={setNicknameState}
                    setValue={setNickname}
                    width="calc(592px * 0.6)"
                    height="calc(48px * 0.6)"
                  ></TextFieldBox>
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
                    width="calc(592px * 0.6)"
                    height="calc(48px * 0.6)"
                  ></TextFieldBox>
                </SubContentsWrapper>
                <SubContentsWrapper>
                  <ContentsTitle>본전공 변경하기</ContentsTitle>
                  <DropDown
                    title="전공선택" // 수정필요
                    optionList={majorList}
                    value={firstMajor}
                    setValue={setFirstMajor}
                    width="calc(628px * 0.6)"
                    height="calc(68px * 0.6)"
                  ></DropDown>
                </SubContentsWrapper>
              </div>
            </ContentsWrapper>
          )}
          {currentModal === 1 && ( // '관심전공' 버튼 클릭 시
            <ContentsWrapper
              style={{
                marginBottom: '503px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <SubContentsWrapper>
                  <ContentsTitle>희망 관심전공 변경하기</ContentsTitle>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <DropDown
                      title="전공선택" // 수정필요
                      optionList={majorList}
                      value={hopeMajor1}
                      setValue={setHopeMajor1}
                    ></DropDown>
                    <DropDown
                      title="전공선택" // 수정필요
                      optionList={majorList}
                      value={hopeMajor2}
                      setValue={setHopeMajor2}
                    ></DropDown>
                  </div>
                </SubContentsWrapper>
              </div>
            </ContentsWrapper>
          )}
          {currentModal === 2 && ( // '현재 내 학점' 버튼 클릭 시
            <ContentsWrapper
              style={{
                marginBottom: '603px',
              }}
            >
              <SubContentsWrapper>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <ContentsTitle>나의 지원학점 변경하기</ContentsTitle>
                  <ModalHelpMessage />
                </div>
                <VerifiBoxWrapper>
                  <VerificationBox name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={true} />
                  <div style={{ marginTop: 60 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="none">
                      <circle cx="1" cy="1" r="1" fill="##D85888" />
                    </svg>
                  </div>
                  <VerificationBox name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={true} />
                  <VerificationBox name="gpa-3" value={GPA3} setValue={setGPA3} isEntered={true} />
                </VerifiBoxWrapper>
              </SubContentsWrapper>
            </ContentsWrapper>
          )}
          {currentModal === 3 && ( // '희망 진입학기' 버튼 클릭 시
            <ContentsWrapper
              style={{
                marginBottom: '603px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <SubContentsWrapper>
                  <ContentsTitle>희망 이중 지원학기 변경하기</ContentsTitle>
                  <VerifiBoxWrapper>
                    <VerificationBox
                      name="semester-1"
                      value={hopeSemester1}
                      setValue={setHopeSemester1}
                      isEntered={true}
                    ></VerificationBox>
                    <VerificationBox
                      name="semester-2"
                      value={hopeSemester2}
                      setValue={setHopeSemester2}
                      isEntered={true}
                    ></VerificationBox>
                    <div style={{ marginTop: 26 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" fill="none">
                        <path stroke="#D85888" stroke-linecap="round" stroke-width="2" d="M1 1h10" />
                      </svg>
                    </div>
                    <VerificationBox
                      name="semester-3"
                      value={hopeSemester3}
                      setValue={setHopeSemester3}
                      isEntered={true}
                    ></VerificationBox>
                  </VerifiBoxWrapper>
                </SubContentsWrapper>
              </div>
            </ContentsWrapper>
          )}
          <MoveButtonWrapper>
            <PrevButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              취소
            </PrevButton>
            <SubmitButton
              onClick={() => {
                // setOpenModal(!isOpenModal);
                setIsSubmitted(true);
                if (!isGpaChanged) onClickSubmit();
              }}
            >
              저장하기
            </SubmitButton>
          </MoveButtonWrapper>
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
  z-index: 20; // Modal.tsx 와 상이한 stacking context
`;

const HeaderButtonWrapper = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '672px'}; // Set width using the prop or a default value
  height: ${(props) => props.height || '53.2px'}; // Set height using the prop or a default value
  display: flex;
  flex-direction: row;
`;

const MoveButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(628px * 0.6); // 628px;
  gap: 18px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(628px * 0.6) px;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
  gap: 35px;
`;

const ContentsTitle = styled.text`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  opacity: 0.8;
`;

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const CurrentImg = styled.img`
  width: 153px;
  height: 153px;
  object-fit: cover;
`;

const CandidateImg = styled.img`
  width: 74px;
  height: 74px;
  object-fit: cover;
  cursor: pointer;
`;

const CandidateImgsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 13px;
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 628px;
  align-items: center;
  text-align: center;
  margin: auto auto;
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