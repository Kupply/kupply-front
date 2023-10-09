import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import TextFieldBox, { StateOptions } from '../../../assets/TextFieldBox';
import PrevButton from '../../../assets/buttons/PrevButton';
import SubmitButton from '../../../assets/buttons/SubmitButton';
import Typography from '../../../assets/Typography';
import ModalLarge from '../../../components/base/ModalLarge';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';
import ImgCtrlButton from '../../../assets/myboardpage/ImgCtrlButton';
import DropDown from '../../../assets/dropdown/dropDown';
import VerificationBox from '../../../assets/VerificationBox';
import AlertIconExclamation from '../../../assets/icons/AlertIconExclamation';
import LabelButton from '../../../assets/buttons/LabelButton';
import { ModalHelpMessage } from '../../../assets/myboardpage/HellpMessage';

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
}

export default function EditModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
  const majorList = [
    { value1: '경영학과', value2: '경영대학' },
    { value1: '국어국문학과', value2: '문과대학' },
    { value1: '철학과', value2: '문과대학' },
    { value1: '한국사학과', value2: '문과대학' },
    { value1: '사학과', value2: '문과대학' },
    { value1: '사회학과', value2: '문과대학' },
    { value1: '한문학과', value2: '문과대학' },
    { value1: '영어영문학과', value2: '문과대학' },
    { value1: '독어독문학과', value2: '문과대학' },
    { value1: '불어불문학과', value2: '문과대학' },
    { value1: '중어중문학과', value2: '문과대학' },
    { value1: '노어노문학과', value2: '문과대학' },
    { value1: '일어일문학과', value2: '문과대학' },
    { value1: '서어서문학과', value2: '문과대학' },
    { value1: '언어학과', value2: '문과대학' },
    { value1: '생명과학부', value2: '생명과학대학' },
    { value1: '생명공학부', value2: '생명과학대학' },
    { value1: '식품공학과', value2: '생명과학대학' },
    { value1: '환경생태공학부', value2: '생명과학대학' },
    { value1: '식품자원경제학과', value2: '생명과학대학' },
    { value1: '정치외교학과', value2: '정경대학' },
    { value1: '경제학과', value2: '정경대학' },
    { value1: '통계학과', value2: '정경대학' },
    { value1: '행정학과', value2: '정경대학' },
    { value1: '수학과', value2: '이과대학' },
    { value1: '물리학과', value2: '이과대학' },
    { value1: '화학과', value2: '이과대학' },
    { value1: '지구환경과학과', value2: '이과대학' },
    { value1: '화공생명공학과', value2: '공과대학' },
    { value1: '신소재공학부', value2: '공과대학' },
    { value1: '건축사회환경공학부', value2: '공과대학' },
    { value1: '건축학과', value2: '공과대학' },
    { value1: '기계공학부', value2: '공과대학' },
    { value1: '산업경영공학부', value2: '공과대학' },
    { value1: '전기전자공학부', value2: '공과대학' },
    { value1: '반도체공학과', value2: '공과대학' },
    { value1: '융합에너지공학과', value2: '공과대학' },
    { value1: '차세대통신학과', value2: '공과대학' },
    { value1: '의과대학', value2: '의과대학' },
    { value1: '교육학과', value2: '사범대학' },
    { value1: '국어교육과', value2: '사범대학' },
    { value1: '영어교육과', value2: '사범대학' },
    { value1: '지리교육과', value2: '사범대학' },
    { value1: '역사교육과', value2: '사범대학' },
    { value1: '가정교육과', value2: '사범대학' },
    { value1: '수학교육과', value2: '사범대학' },
    { value1: '체육교육과', value2: '사범대학' },
    { value1: '간호학과', value2: '간호대학' },
    { value1: '컴퓨터학과', value2: '정보대학' },
    { value1: '데이터과학과', value2: '정보대학' },
    { value1: '디자인조형학부', value2: '디자인조형학부' },
    { value1: '국제학부', value2: '국제대학' },
    { value1: '글로벌한국융합학부', value2: '국제대학' },
    { value1: '미디어학부', value2: '미디어학부' },
    { value1: '바이오의공학부', value2: '보건과학대학' },
    { value1: '바이오시스템의과학부', value2: '보건과학대학' },
    { value1: '보건환경융합과학부', value2: '보건과학대학' },
    { value1: '보건정책관리학부', value2: '보건과학대학' },
    { value1: '자유전공학부', value2: '자유전공학부' },
    { value1: '스마트보안학부', value2: '스마트보안학부' },
    { value1: '사이버국방학과', value2: '스마트보안학부' },
    { value1: '심리학부', value2: '심리학부' },
    { value1: '스마트모빌리티학부', value2: '스마트모빌리티학부' },
  ];

  /* 
  모달 헤더 버튼 클릭에 따른 페이지 전환 위한 상태 관리
  0: 나의 기본정보
  1: 관심 전공
  2: 현재 내 학점
  3: 희망 진입학기
  */
  const [currentModal, setCurrentModal] = useState<number>(0);
  // const [currentSrc, setCurrentSrc] = useState('design_image/character/rectProfile/rectProfile1.png');
  return (
    <Main>
      setCurrentModal(0); setIsSubmitted(false);
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
          <HeaderButtonWrapper>
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
                  ></TextFieldBox>
                </SubContentsWrapper>
                <SubContentsWrapper>
                  <ContentsTitle>본전공 변경하기</ContentsTitle>
                  <DropDown
                    title="전공선택" // 수정필요
                    optionList={majorList}
                    value={firstMajor}
                    setValue={setFirstMajor}
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

const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MoveButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 628px;
  gap: 18px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 628px;
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
