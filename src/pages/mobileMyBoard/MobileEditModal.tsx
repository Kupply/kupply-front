import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import Input01 from '../../mobile/assets/field/Input01';
import DropDown from '../../mobile/assets/selectControl/DropDown';
import TextAreaBox from '../../mobile/assets/textarea/TextArea01';
import { majorAllList } from '../../mappings/MajorAll';
import { majorTargetList, majorTargetList_sejong } from '../../mappings/MajorTarget';
import { client } from '../../utils/HttpClient';
import MoveButton from '../../mobile/components/myboard/MoveButton';
import MobileHeaderBar from '../../mobile/components/myboard/EditModalHeaderBar';
import AlertIconExclamation from '../../assets/icons/AlertIconExclamation';
import Button03 from '../../mobile/assets/buttons/Button03';
import Button04 from '../../mobile/assets/buttons/Button04';
import { useNavigate } from 'react-router-dom';
import Icon02 from '../../assets/icons/Icon02';
import Typography from '../../assets/Typography';
import ModalLarge from '../../mobile/components/base/ModalLarge';
import { useRecoilState } from 'recoil';
import { editModalMobileState } from '../../store/atom';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  isApplied: boolean;
}

export default function MobileEditModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal, isApplied } = props;
  // 임시로 true로 설정
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // 닉네임 중복 체크
  type StateOptions = 'default' | 'hover' | 'focused' | 'typing' | 'filled' | 'error' | 'loading' | 'password';

  type NicknameCheckStateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

  type errorMessageType = {
    passwordErrorMessage: string;
    nicknameErrorMessage: string;
  };
  const [nickname, setNickname] = useState<string>(localStorage.getItem('nickname') || '고대빵');
  const [nicknameState, setNicknameState] = useState<StateOptions>('filled');
  const [currentNickname, setCurrentNickname] = useState('');
  const [errorMessages, setErrorMessages] = useState<errorMessageType>({
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
  });

  // 각 input들의 값을 state를 사용하여 관리
  const [hopeMajor1, setHopeMajor1] = useState<string>(localStorage.getItem('hopeMajor1') || '');
  const [hopeMajor2, setHopeMajor2] = useState<string>(localStorage.getItem('hopeMajor2') || '');
  const [GPA1, setGPA1] = useState<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const [GPA2, setGPA2] = useState<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const [GPA3, setGPA3] = useState<string>(localStorage.getItem('curGPA')?.charAt(3) || '');
  const [userProfilePic, setUserProfilePic] = useState<string>(
    localStorage.getItem('userProfilePic') || 'rectProfile1',
  );
  const [userProfileLink, setUserProfileLink] = useState<string>(localStorage.getItem('userProfileLink') || '');
  const [isGpaChanged, setIsGpaChanged] = useState<boolean>(false);
  const [campus, setCampus] = useState<string>(localStorage.getItem('campus') || '');

  const originNickname = useRef<string>(localStorage.getItem('nickname'));
  const originHopeMajor1 = useRef<string>(localStorage.getItem('hopeMajor1'));
  const originHopeMajor2 = useRef<string>(localStorage.getItem('hopeMajor2'));
  const originGPA1 = useRef<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const originGPA2 = useRef<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const originGPA3 = useRef<string>(localStorage.getItem('curGPA')?.charAt(3) || '');
  const originUserProfilePic = useRef<string>(localStorage.getItem('userProfilePic'));

  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  const navigate = useNavigate();

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

  const onClickSubmit = async () => {
    let updateData = {};

    if (originNickname.current !== nickname) {
      updateData = { ...updateData, newNickname: nickname };
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

      updateData = { ...updateData, newCurGPA: newGpa };
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
  let majorTarget;
  if (campus === 'S') {
    majorTarget = [...majorTargetList_sejong];
  } else {
    majorTarget = [...majorTargetList];
  }
  majorTarget.unshift({ value1: '희망 없음', value2: '희망 없음' });

  const [currentModal, setCurrentModal] = useRecoilState(editModalMobileState);

  useEffect(() => {
    if (nicknameState === 'filled') {
      if (nickname.length === 1 || nickname.length > 7) setNicknameState('error');
      else setNicknameState('filled');
    }
  }, [nicknameState, nickname]);

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

  return (
    <Main>
      {isOpenModal && isSubmitted && isGpaChanged && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <ButtonWrapper>
            <TopButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              <Icon02 size="100%" />
            </TopButton>
          </ButtonWrapper>
          <div style={{ height: '20.833vw' }}></div>
          <AlertIconExclamation width="22.22vw" height="22.22vw" />
          <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '4.44vw' }}>
            변경한 학점을 저장하시겠습니까?
          </Typography>
          <div style={{ width: '60.6vw', textAlign: 'center', marginTop: '4.44vw' }}>
            <Typography size={'3.33vw'} color="#141414">
              수정을 저장하면 이번 이중전공 지원 시즌 동안 단 한 번의 학점 수정 기회가 남아요.
            </Typography>
          </div>
          <ActionWrapper>
            <Button04
              onClick={() => {
                setIsSubmitted(false);
              }}
              style={{ width: '39.17vw', height: '11.67vw' }}
            >
              취소
            </Button04>
            {/* onCheck가 onClick에 들어와야 하는데 잠시 수정 */}
            <Button03
              onClick={() => {
                setOpenModal(!isOpenModal);
                setIsSubmitted(true);
                onClickSubmit();
              }}
              style={{ width: '39.17vw', height: '11.67vw' }}
            >
              확인
            </Button03>
          </ActionWrapper>
        </ModalLarge>
      )}
      {isOpenModal && !isSubmitted && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <HeaderWrapper>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                marginTop: '5vw',
              }}
            >
              <div>
                <Typography size="3.88vw" bold="700">
                  프로필 정보 수정하기
                </Typography>
              </div>
              <TopButton
                onClick={() => {
                  setOpenModal(!isOpenModal);
                }}
                style={{ position: 'absolute', left: '50vw', zIndex: 10 }}
              >
                <Icon02 size="100%" />
              </TopButton>
            </div>
            <div style={{ height: '8.83vw' }}></div>
            <MobileHeaderBar />
          </HeaderWrapper>

          {currentModal === 0 && ( // '나의 기본전공' 버튼 클릭 시
            <ContentsWrapper>
              <SubContentsWrapper>
                <ContentsTitle>프로필 사진 변경하기</ContentsTitle>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '4vw' }}>
                  <CurrentImg
                    src={
                      userProfilePic === 'customProfile'
                        ? userProfileLink
                        : process.env.PUBLIC_URL + `/designImage/character/rectProfile/${userProfilePic}.png`
                    }
                    alt="current profile"
                  />
                  <div>
                    <CandidateImgsWrapper>
                      {Array.from({ length: 4 }, (_, index) => (
                        <CandidateImg
                          src={`designImage/character/rectProfile/rectProfile${index + 1}.png`}
                          alt={`candidate profile ${index + 1}`}
                          onClick={() => setUserProfilePic(`rectProfile${index + 1}`)} //case sensitivity?
                        />
                      ))}
                    </CandidateImgsWrapper>
                  </div>
                </div>
              </SubContentsWrapper>

              <SubContentsWrapper>
                <ContentsTitle>닉네임 변경하기</ContentsTitle>
                <Input01
                  value={nickname}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNickname(e.target.value);
                  }}
                  state={nicknameState}
                  setState={setNicknameState}
                  setValue={setNickname}
                  errorMessage={errorMessages.nicknameErrorMessage}
                />
              </SubContentsWrapper>
              <MoveButton
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                onClickSubmit={onClickSubmit}
                isApplied={isApplied}
                setIsSubmitted={setIsSubmitted}
                style={{ marginTop: '16px', width: '100%', display: 'flex', justifyContent: 'space-between' }}
                isGpaChanged={isGpaChanged}
              />
            </ContentsWrapper>
          )}
          {currentModal === 1 && ( // '관심전공' 버튼 클릭 시
            <ContentsWrapper2>
              <SubContentsWrapper>
                <ContentsTitle>희망하는 관심전공 변경하기</ContentsTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
                  <DropDown
                    title="1지망 전공 선택"
                    optionList={majorTarget.filter((el) => el.value1 !== '희망 없음' && el.value1 !== hopeMajor2)}
                    value={hopeMajor1}
                    setValue={setHopeMajor1}
                  />
                  <DropDown
                    title="2지망 전공 선택"
                    optionList={majorTarget.filter((el) => el.value1 !== hopeMajor1)}
                    value={hopeMajor2}
                    setValue={setHopeMajor2}
                  />
                </div>
              </SubContentsWrapper>
              <MoveButton
                isOpenModal={isOpenModal}
                setOpenModal={setOpenModal}
                onClickSubmit={onClickSubmit}
                isApplied={isApplied}
                setIsSubmitted={setIsSubmitted}
                style={{ marginTop: '9.740vw' }}
                isGpaChanged={isGpaChanged}
              />
            </ContentsWrapper2>
          )}
          {currentModal === 2 && ( // '현재 내 학점' 버튼 클릭 시
            <ContentsWrapper2>
              <ToolTip>
                <Typography color="#D85888" size="3.89vw" bold="700">
                  주의하세요!
                  <br />
                </Typography>
                <Typography color="black" size="3.05vw" bold="400">
                  이중전공 지원 시즌에는 학점을&nbsp;
                </Typography>
                <Typography color="#D85888" size="3.05vw" bold="400">
                  최대 2번까지만&nbsp;
                </Typography>
                <Typography color="black" size="3.05vw" bold="400">
                  변경 할 수 있어요. 정확한 나의 학점을 입력하면 확실한 지원정보 데이터를 제공받을 수 있어요.
                </Typography>
              </ToolTip>
              <SubContentsWrapper>
                <ContentsTitle>현재 내 학점 변경하기</ContentsTitle>
                <VerifiBoxWrapper>
                  <TextAreaBox name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={GPA1 !== ''} />
                  <div style={{ marginTop: '8.125vw', height: '0.6vw', width: '0.6vw' }}>
                    <img src="designImage/myBoard/Ellipse 981.svg" height="100%" width="100%" />
                  </div>
                  <TextAreaBox name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={GPA2 !== ''} />
                  <TextAreaBox
                    name="gpa-3"
                    value={GPA3}
                    setValue={setGPA3}
                    isEntered={GPA3 !== ''}
                    setRef={setLastBoxRef}
                  />
                </VerifiBoxWrapper>
              </SubContentsWrapper>

              <div style={{ marginTop: '40.56vw' }}>
                <MoveButton
                  isOpenModal={isOpenModal}
                  setOpenModal={setOpenModal}
                  onClickSubmit={onClickSubmit}
                  isApplied={isApplied}
                  setIsSubmitted={setIsSubmitted}
                  isGpaChanged={isGpaChanged}
                />
              </div>
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
  bottom: 0;
  top: 0;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fcfafb;
  border-radius: 2.78vw 2.78vw 0px 0px;
  border-bottom: 1px solid var(--DF_Grey-2, #dfdfdf);
`;

const TopButton = styled.button`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  width: 10vw;
  height: 10vw;
`;

const ContentsWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 83.33vw;
  margin-top: 8.33vw;
  height: 100%; // auto;
  overflow: auto;
  overflow-x: hidden;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 83.33vw;
  align-items: left;
  margin-left: auto;
  margin-right: auto;
  //margin-top: 58px;
  margin-top: 5.56vw;
  gap: 5.56vw;
`;

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
`;

const ContentsTitle = styled.text`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 3.33vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  opacity: 0.8;
`;

const CurrentImg = styled.img`
  width: 22.2vw;
  height: 22.2vw;
  object-fit: cover;
`;

const CandidateImg = styled.img`
  width: 12.5vw;
  height: 12.5vw;
  object-fit: cover;
  cursor: pointer;
`;

const CandidateImgsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 0.6771vw;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const ActionWrapper = styled.div`
  width: 290px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 51px;
`;

const ToolTip = styled.div`
  width: 76.388vw;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 5.56vw;
`;
