import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import TextFieldBox, { StateOptions } from '../../assets/OldTextFieldBox';
import { ImgCtrlButton, ImgDelButton } from '../../assets/myboardpage/ImgCtrlButton';
import DropDown from '../../assets/dropdown/DropDown';
import VerificationBox from '../../assets/VerificationBox';
import TextArea from '../../assets/TextArea';
//import Typography from '../../assets/OldTypography';
import { ScrollSmall, ScrollLarge } from '../../assets/scroll/Scroll';
import LabelButton from '../../assets/buttons/LabelButton';
import NicknameCheckButton from '../../assets/progressIndicator/Loader';
import client from '../../utils/HttpClient';
import { majorTargetList } from '../../common/MajorTarget';
import { majorAllList } from '../../common/MajorAll';
import AlertIconExclamation from '../../assets/icons/AlertIconExclamation';
import MockApplicationButton from '../../assets/myboardpage/MockApplication';
import ModalLarge from '../../components/base/ModalLarge';
import SubmitButton from '../../assets/buttons/OldSubmitButton';
import { TextButton03Settings, TextButton04 } from '../../assets/buttons/TextButton';
import Button03 from '../../assets/buttons/Button03';
import Button01 from '../../assets/buttons/Button01';
import Typography from '../../assets/Typography';
import { TermsText1, TermsText2 } from '../../components/signUp/TermsText';
import Icon02 from '../../assets/icons/Icon02';
import { useRecoilState } from 'recoil';
import { SBContentState } from '../../store/atom';
import { GpaChangeModal } from '../../components/settings/GpaChangeModal';

interface SettingsPageProps {
  selected: number;
  setSelected: (selected: number) => void;
}

type NicknameCheckStateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

type errorMessageType = {
  passwordErrorMessage: string;
  nicknameErrorMessage: string;
};

const colorMapping = {
  primary: css`
    color: white;
    background-color: #d85888;

    // not in disabled state && hovering
    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.75);
      box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
    }

    // not in disabled state && being activated or clicked (after pressing a button)
    &:active:not(:disabled) {
      color: #d85888;
      background-color: rgba(216, 88, 136, 0.1);
    }
  `,
  secondary: css`
    color: #d85888;
    border: 1px solid #d85888;

    &:hover:not(:disabled) {
      background: rgba(216, 88, 136, 0.1);

      border: none;
    }

    &:active:not(:disabled) {
      color: white;
      border: none;
      background: #d85888;
    }
  `,
};

const SettingsPage = () => {
  const [selected, setSelected] = useRecoilState(SBContentState);
  const navigate = useNavigate();

  const onClick = (index: number) => {
    setSelected(index);
  };
  const [scrollActive, setActive] = useState(false);
  // 잠시 수정
  const [modalOpen, setModalOpen] = useState(true);

  const [nickname, setNickname] = useState<string>(localStorage.getItem('nickname') || '');
  const [nicknameState, setNicknameState] = useState<StateOptions>('filled');
  const [nicknameCheck, setNicknameCheckState] = useState<NicknameCheckStateOptions>('filled');
  const [currentNickname, setCurrentNickname] = useState('');
  const [errorMessages, setErrorMessages] = useState<errorMessageType>({
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
  });

  const [name, setName] = useState<string>(localStorage.getItem('name') || '');
  console.log('firstPrintName', name);
  const [nameState, setNameState] = useState<StateOptions>('filled');
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

  const [email, setEmail] = useState<string>(localStorage.getItem('loginedUser') || '');
  const [emailState, setEmailState] = useState<StateOptions>('filled');
  const [pwd, setPwd] = useState<string>('');
  const [passwordState, setPasswordState] = useState<StateOptions>('default');
  const [pwdConfirm, setPwdConfirm] = useState<string>('');
  const [password2State, setPassword2State] =
    useState<StateOptions>('default'); /* password의 유효성 검사 + 알맞은 errorMessage 설정 */
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);
  const [isApplied, setIsApplied] = useState<boolean>(localStorage.getItem('isApplied') === 'true' || false);

  const originGPA1 = useRef<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const originGPA2 = useRef<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const originGPA3 = useRef<string>(localStorage.getItem('curGPA')?.charAt(3) || '');

  // 잠시 수정
  const [isGpaChanged, setIsGpaChanged] = useState<boolean>(true);

  // useEffect(() => {
  //   if (originGPA1.current !== GPA1 || originGPA2.current !== GPA2 || originGPA3.current !== GPA3) {
  //     setIsGpaChanged(true);
  //   } else {
  //     setIsGpaChanged(false);
  //   }
  // }, [GPA1, GPA2, GPA3]);

  useEffect(() => {
    // 로그인한 유저 정보 localStorage에
    const getMe = async () => {
      try {
        //const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
        const APIresponse = await client.get('/user/getMe');
        const userInfo = APIresponse.data.data.user;

        localStorage.setItem('userProfilePic', userInfo.profilePic);
        localStorage.setItem('userProfileLink', userInfo.profileLink);
        localStorage.setItem('name', userInfo.name);
        localStorage.setItem('nickname', userInfo.nickname);
        localStorage.setItem('studentId', userInfo.studentId);
        localStorage.setItem('firstMajor', userInfo.firstMajor);
        localStorage.setItem('role', userInfo.role);
        if (userInfo.role === 'candidate') {
          localStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
          localStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
          localStorage.setItem('curGPA', userInfo.curGPA.toFixed(2));
          localStorage.setItem('hopeSemester', userInfo.hopeSemester);
          localStorage.setItem('isApplied', userInfo.isApplied);
        } else {
          localStorage.setItem('secondMajor', userInfo.secondMajor);
          localStorage.setItem('passSemester', userInfo.passSemester);
          localStorage.setItem('passGPA', userInfo.passGPA.toFixed(2));
        }

        setNickname(userInfo.nickname);
        setName(userInfo.name);
        setStdID(userInfo.studentId);
        setFirstMajor(userInfo.firstMajor);
        setHopeMajor1(userInfo.hopeMajor1);
        setHopeMajor2(userInfo.hopeMajor2);
        setGPA1(userInfo.curGPA.toFixed(2).charAt(0));
        setGPA2(userInfo.curGPA.toFixed(2).charAt(2));
        setGPA3(userInfo.curGPA.toFixed(2).charAt(3));
        setHopeSemester1(userInfo.hopeSemester.charAt(2));
        setHopeSemester2(userInfo.hopeSemester.charAt(3));
        setHopeSemester3(userInfo.hopeSemester.charAt(5));
        setUserProfilePic(userInfo.profilePic);
        setUserProfileLink(userInfo.profileLink);
        setCurrentNickname(userInfo.nickname);
      } catch (err) {
        console.log(err);
      }
    };
    getMe();
  }, []);

  useEffect(() => {
    if (parseFloat(`${GPA1}.${GPA2}${GPA3}`) > 4.5) {
      setGPA1('4');
      setGPA2('5');
      setGPA3('0');
      if (lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [GPA1, GPA2, GPA3]);

  useEffect(() => {
    const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*?])[a-zA-Z\d~!@#$%^&*?ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{8,20}$/;
    if (passwordState === 'filled') {
      if (!passwordCheck.test(pwd)) {
        let errorMessage = '비밀번호가 ';

        if (!/(?=.*[a-zA-Z])/.test(pwd)) {
          errorMessage += ' 영문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-])/.test(pwd)) {
          errorMessage += ' 특수 문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[0-9])/.test(pwd)) {
          errorMessage += ' 숫자를 포함하고 있지 않아요!';
        } else if (pwd.length < 8) errorMessage += ' 최소 8자 이상이어야 해요!';
        else if (pwd.length > 20) errorMessage = '비밀번호는 20자를 넘어갈 수 없어요!';
        else errorMessage = '비밀번호에 허용되지 않은 문자가 포함되었어요!';
        alert(errorMessage);

        setPasswordState('error');
      } else setPasswordState('filled');
    }
  }, [pwd, passwordState]);

  /* password2의 일치 여부 검사 */
  useEffect(() => {
    if (!!pwd && !!pwdConfirm && passwordState === 'filled' && password2State === 'filled') {
      if (pwd === pwdConfirm) {
        setPassword2State('filled');
      } else {
        setPassword2State('error');
      }
    }
  }, [pwd, passwordState, pwdConfirm, password2State]);
  /* 학번의 유효성 검사 */
  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdIDState === 'filled') {
      if (!passwordCheck.test(stdID)) setStdIDState('error');
      else setStdIDState('filled');
    }
  }, [stdID, stdIDState]);

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

  console.log('settings에서 뽑는', nickname, nicknameCheck, nicknameState);
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const firstSubmit = async () => {
    const updateData = {
      newName: name,
      newStudentId: stdID,
      newFirstMajor: firstMajor,
    };
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };
  const secondSubmit = async () => {
    const updateData = {
      newProfilePic: userProfilePic,
      newNickname: nickname,
    };
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/updateMe', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };
  const thirdSubmit = async () => {
    const newGpa = parseFloat(GPA1 + '.' + GPA2 + GPA3);
    const oldGpa = parseFloat(originGPA1.current + '.' + originGPA2.current + originGPA3.current);

    if (Math.abs(oldGpa - newGpa) >= 1.5) {
      alert('비정상적인 학점 변경이 감지되었습니다. 이메일로 문의바랍니다.');
      navigate('/settings');
    } else {
      const newHopeSemester = '20' + hopeSemester1 + hopeSemester2 + '-' + hopeSemester3;
      const year = +(hopeSemester1 + hopeSemester2);
      const semester = +hopeSemester3;
      if (year <= 23 || (semester !== 1 && semester !== 2)) {
        alert('유효한 학기를 입력해주세요!');
      } else {
        const updateData = {
          newCurGPA: newGpa,
          newHopeMajor1: hopeMajor1,
          newHopeMajor2: hopeMajor2,
          newHopeSemester: newHopeSemester,
        };
        try {
          // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
          await client.post('/user/updateMe', updateData, config);
          window.location.reload(); // 페이지 새로고침.
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const fourthSubmit = async () => {
    const updateData = {
      newPassword: pwd,
    };
    try {
      // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
      await client.post('/user/resetPassword', updateData, config);
      window.location.reload(); // 페이지 새로고침.
    } catch (err) {
      console.log(err);
    }
  };

  const majorAll = majorAllList;
  const majorTarget = [...majorTargetList];
  majorTarget.unshift({ value1: '희망 없음', value2: '희망 없음' });

  return (
    <Wrapper>
      {modalOpen && isGpaChanged && (
        <GpaChangeModal modalOpen={modalOpen} setModalOpen={setModalOpen} thirdSubmit={thirdSubmit} />
      )}
      <Sidebar>
        <Content>
          <Title>환경설정</Title>
          <Flex>
            <TextButton04
              selected={selected === 0}
              onCustomFunction={() => {
                onClick(0);
              }}
            >
              나의 기본정보 수정하기
            </TextButton04>
            <TextButton04
              selected={selected === 1}
              onCustomFunction={() => {
                onClick(1);
              }}
            >
              프로필 사진 / 닉네임 변경하기
            </TextButton04>
            <TextButton04
              selected={selected === 2}
              onCustomFunction={() => {
                onClick(2);
              }}
            >
              마이보드 프로필 수정하기
            </TextButton04>
            <TextButton04
              selected={selected === 3}
              onCustomFunction={() => {
                onClick(3);
              }}
            >
              계정관리
            </TextButton04>
            <div style={{ marginTop: '8.333vw' }}>
              <TextButton04
                selected={selected === 4}
                onCustomFunction={() => {
                  onClick(4);
                }}
              >
                약관보기
              </TextButton04>
            </div>
            <div style={{ marginTop: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14.7916vw" height="2" viewBox="0 0 284 2" fill="none">
                <path d="M283 1L0.999988 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
            </div>{' '}
            <div style={{ marginTop: 0 }}>
              <TextButton03Settings
                selected={selected === 5}
                onCustomFunction={() => {
                  navigate('/delete');
                }}
              >
                계정 삭제
              </TextButton03Settings>
            </div>
          </Flex>
        </Content>
      </Sidebar>
      {selected === 0 && (
        <BodyContainer>
          <BodyTitle>나의 기본정보 수정하기</BodyTitle>
          <BodyContent>나의 기본 사항과 맞지 않는 정보를 수정하세요.</BodyContent>
          <TextFieldTitle>
            <strong>이름</strong> 수정하기
          </TextFieldTitle>
          <TextFieldBox
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            state={nameState}
            setState={setNameState}
            setValue={setName}
          ></TextFieldBox>
          <TextFieldTitle>
            <strong>고려대학교 학번</strong> 수정하기
          </TextFieldTitle>
          <TextFieldBox
            value={stdID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setStdID(e.target.value);
            }}
            state={stdIDState}
            setState={setStdIDState}
            setValue={setStdID}
          ></TextFieldBox>
          <TextFieldTitle>
            <strong>본전공(1전공)</strong> 수정하기
          </TextFieldTitle>
          <DropDown
            title="전공선택" // 수정필요
            optionList={majorAll}
            value={firstMajor}
            setValue={setFirstMajor}
          ></DropDown>
          <Button03
            style={{ marginTop: '60px', width: '100%' }}
            state={isApplied ? 'pressed' : 'disabled'}
            onClick={() => {
              firstSubmit();
            }}
          >
            저장하기
          </Button03>
        </BodyContainer>
      )}
      {selected === 1 && (
        <BodyContainer>
          <BodyTitle>프로필 사진 / 닉네임 변경하기</BodyTitle>
          <BodyContent>쿠플라이에서 사용할 닉네임과 프로필을 수정하세요.</BodyContent>
          <TextFieldTitle>
            <strong>프로필 사진</strong> 변경하기
          </TextFieldTitle>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
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
                    src={`designImage/character/rectProfile/RectProfile${index + 1}.png`}
                    alt={`candidate profile ${index + 1}`}
                    onClick={() => setUserProfilePic(`rectProfile${index + 1}`)}
                  />
                ))}
              </CandidateImgsWrapper>
              <div style={{ gap: '5px', marginTop: '52px', display: 'flex' }}></div>
            </div>
          </div>
          <ContentsWrapper>
            <div style={{ display: 'flex', marginTop: '3.125vw' }}>
              <Typography
                size="0.9375vw"
                style={{ color: 'var(--Main-Black, #141414)', fontWeight: 700, opacity: 0.8 }}
              >
                닉네임&nbsp;
              </Typography>
              <Typography
                size="0.9375vw"
                style={{ color: 'var(--Main-Black, #141414)', fontWeight: 400, opacity: 0.8, lineHeight: '100%' }}
              >
                수정하기
              </Typography>
            </div>
            <div style={{ position: 'relative' }}>
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
          </ContentsWrapper>
          <div>
            <Button03
              style={{ marginTop: '12.760vw', width: '100%' }}
              state={isApplied ? 'pressed' : 'disabled'}
              onClick={() => {
                secondSubmit();
              }}
            >
              저장하기
            </Button03>
          </div>
        </BodyContainer>
      )}
      {selected === 2 && (
        <BodyContainer>
          <BodyTitle>마이보드 프로필 수정하기</BodyTitle>
          <BodyContent>
            마이보드는 도전자님이 작성하신 정보를 바탕으로, 도전자님의 희망 이중전공 진입을 도울
            <br />
            다양한 정보를 제공합니다. 신뢰할 수 있는 마이보드를 제공받기 위해 정보를 수정하세요.
          </BodyContent>
          <TextFieldTitle>
            <strong>희망 이중전공</strong> 수정하기
          </TextFieldTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
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

          <TextFieldTitle>
            <strong>학점</strong> 수정하기
          </TextFieldTitle>

          <VerifiBoxWrapper>
            <TextArea name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={true} />
            <div style={{ marginTop: '3.021vw', width: '2px', height: '2px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
                <circle cx="1" cy="1" r="1" fill="#141414" />
              </svg>
            </div>
            <TextArea name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={true} />
            <TextArea name="gpa-3" value={GPA3} setValue={setGPA3} isEntered={true} setRef={setLastBoxRef} />
          </VerifiBoxWrapper>
          <TextFieldTitle>
            <strong>희망 지원학기</strong> 수정하기
          </TextFieldTitle>
          <VerifiBoxWrapper>
            <TextArea
              name="semester-1"
              value={hopeSemester1}
              setValue={setHopeSemester1}
              isEntered={hopeSemester1 ? true : false}
            ></TextArea>
            <TextArea
              name="semester-2"
              value={hopeSemester2}
              setValue={setHopeSemester2}
              isEntered={hopeSemester2 ? true : false}
            ></TextArea>
            <Typography size="0.833vw" bold="500" style={{ marginTop: '3.021vw' }}>
              년도
            </Typography>
            <TextArea
              name="semester-3"
              value={hopeSemester3}
              setValue={setHopeSemester3}
              isEntered={hopeSemester3 ? true : false}
            ></TextArea>
            <Typography size="0.833vw" bold="500" style={{ marginTop: '3.021vw' }}>
              학기
            </Typography>
          </VerifiBoxWrapper>
          <div>
            <Button03
              style={{ marginTop: '60px', width: '100%' }}
              state={isApplied ? 'pressed' : 'disabled'}
              onClick={() => {
                if (isGpaChanged) {
                  setModalOpen(true);
                } else {
                  thirdSubmit();
                }
              }}
            >
              저장하기
            </Button03>
          </div>
        </BodyContainer>
      )}
      {selected === 3 && (
        <BodyContainer>
          <BodyTitle>계정관리</BodyTitle>
          <BodyContent>
            안전한 개인정보 보호를 위해 비밀번호를 변경하세요. 쿠플라이의 아이디는 고려대학교 <br />
            이메일 입니다.
          </BodyContent>
          <TextFieldTitle>
            <strong>쿠플라이 아이디</strong>
          </TextFieldTitle>
          <TextFieldBox
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            state={'filled'}
            setState={setEmailState}
            setValue={setEmail}
          ></TextFieldBox>
          <TextFieldTitle>
            <strong>비밀번호</strong> 변경하기
          </TextFieldTitle>
          <TextFieldBox
            placeholder="대소문자, 특수문자를 최소 하나씩 조합하여 8글자 이상"
            value={pwd}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPwd(e.target.value);
            }}
            state={passwordState}
            setState={setPasswordState}
            setValue={setPwd}
            helpMessage="비밀번호는 <8자 이상 20자 이하/1개 이상의 영문자/1개 이상의 숫자/1개 이상의 특수문자>가 포함되어야 합니다."
            type="password"
          ></TextFieldBox>
          <TextFieldTitle>
            <strong>비밀번호 재확인</strong>하기
          </TextFieldTitle>
          <TextFieldBox
            placeholder="비밀번호 확인"
            value={pwdConfirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPwdConfirm(e.target.value);
            }}
            state={password2State}
            setState={setPassword2State}
            setValue={setPwdConfirm}
            helpMessage="비밀번호 확인"
            errorMessage="비밀번호가 일치하지 않아요!"
            type="password"
          ></TextFieldBox>
          <div>
            <Button03
              style={{ marginTop: '60px', width: '100%' }}
              state={isApplied ? 'pressed' : 'disabled'}
              onClick={() => {
                fourthSubmit();
              }}
            >
              저장하기
            </Button03>
          </div>
        </BodyContainer>
      )}
      {selected === 4 && (
        <BodyContainer>
          <BodyTitle>약관보기</BodyTitle>
          <BodyContent>
            다음은 고려대학교 이중전공 지원/합격정보 통계 서비스 쿠플라이의 이용약관입니다.
          </BodyContent>{' '}
          <ScrollLarge isChecked={false}>
            <div style={{ marginTop: '1.56vw' }}>
              <div style={{ marginBottom: '1.146vw', display: 'flex', gap: '0.417vw', alignItems: 'center' }}>
                <Typography size="1.0416vw" bold="700" style={{ textAlign: 'left' }}>
                  서비스 이용약관
                </Typography>
              </div>
            </div>

            <TextOutBox>
              <ScrollSmall isChecked={false}>
                <TermsText1 />
              </ScrollSmall>
            </TextOutBox>

            <div style={{ marginTop: '1.56vw' }}>
              <div style={{ marginBottom: '1.146vw', display: 'flex', gap: '0.417vw', alignItems: 'center' }}>
                <Typography size="1.0416vw" bold="700" style={{ textAlign: 'left' }}>
                  개인정보 처리방침
                </Typography>
              </div>
            </div>

            <div style={{ width: '32.7083vw', height: 'auto', textAlign: 'left' }}>
              <Typography size="0.9375vw" bold="500" style={{ fontWeight: '400', textAlign: 'left', color: '#a8a8a8' }}>
                쿠플라이는 이용자들의 정보를 매우 중요시하며, 이용자가 쿠플라이에서 제공하는 서비스를 이용함과 동시에
                온라인 상에서 각 운영 서비스에 제공한 개인정보가 보호받을 수 있도록 최선을 다하고 있습니다.
                <br />
                <br />
              </Typography>
            </div>

            <TextOutBox>
              <ScrollSmall isChecked={false}>
                <TermsText2 />
              </ScrollSmall>
            </TextOutBox>
          </ScrollLarge>
        </BodyContainer>
      )}
    </Wrapper>
  );
};

const Main = styled.main`
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 70px;
  z-index: 1005;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  background: var(--White, #fff);
  padding-top: 70px;
  top: -70px;
  box-sizing: border-box;
  position: relative;
  display: flex;
`;
const Sidebar = styled.div`
  width: 27.135vw;
  height: 1153px;
  flex-shrink: 0;
  border-right: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.3) 100%);
`;

const Title = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; //24px; /* 100% */
  padding-top: 3.646vw; //70px;
  padding-bottom: 3.646vw; //70px;
`;

const Content = styled.div`
  padding-left: 6.667vw; //128px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.604vw; //50px;
`;

const BodyContainer = styled.div`
  //padding-left: 262px;
  padding-left: 13.645vw;
  padding-top: 3.646vw; //70px;
  //width: 628px;
  width: 32.7083vw;
`;

const BodyTitle = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; /* 100% */
`;

const BodyContent = styled.div`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 111.111%; //22px; /* 111.111% */
  opacity: 0.6;
  margin-top: 0.625vw; //12px;
`;

const TextFieldTitle = styled.div`
  margin-top: 3.021vw; //58px;
  margin-bottom: 0.4688vw; //9px;
  opacity: 0.8;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 0.9375vw;
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

const CurrentImg = styled.img`
  width: 7.96875vw; //153px;
  height: 7.96875vw; //153px;
  object-fit: cover;
`;

const CandidateImg = styled.img`
  width: 3.8541vw; //74px;
  height: 3.8541vw; //74px;
  object-fit: cover;
  cursor: pointer;
`;

const CandidateImgsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

const ContentsWrapper = styled.div`
  //position: relative;
  display: flex;
  flex-direction: column;
  width: 32.7083vw; //628px;
  gap: 9px;
`;

const NicknameCheckButtonWrapper = styled.div`
  position: absolute;
  top: 1.12vw; //23px;
  left: 25vw; //490px;
  z-index: 20;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 0.6771vw;
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

const TextOutBox = styled.div`
  //width: 628px;
  //width: 32.7083vw;
  width: 31.7vw;
  height: 228px;
  //height: 11.875vw;
  flex-shrink: 0;
  border-radius: 0.521vw; //10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.417vw 0.104vw; //8px 2px;
  margin-right: 0.9375vw; //18px;
  line-height: 123.54%; /* 22.237px */
`;

export default SettingsPage;
