import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useCookies } from 'react-cookie';
import TextFieldBox, { StateOptions } from '../assets/OldTextFieldBox';
import { ImgCtrlButton, ImgDelButton } from '../assets/myboardpage/ImgCtrlButton';
import DropDown from '../assets/dropdown/dropDown';
import { HelpMessage, ModalHelpMessage } from '../assets/myboardpage/HellpMessage';
import VerificationBox from '../assets/VerificationBox';
import Typography from '../assets/OldTypography';
import { ScrollBarSmall, ScrollBarLarge } from '../assets/ScrollButton';
import LabelButton from '../assets/buttons/LabelButton';
import NicknameCheckButton from '../assets/NicknameCheckButton';
import client from '../utils/httpClient';
import { majorTargetList } from '../common/majorTarget';
import { majorAllList } from '../common/majorAll';
import AlertIconExclamation from '../assets/icons/AlertIconExclamation';
import MockApplicationButton from '../assets/myboardpage/MockApplication';
import ModalLarge from '../components/base/ModalLarge';
import SubmitButton from '../assets/buttons/OldSubmitButton';

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
  width: 1920px;
  height: 100%;
  background: var(--White, #fff);
  display: flex;
`;

const Sidebar = styled.div`
  width: 521px;
  height: 1153px;
  flex-shrink: 0;
  border-right: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.3) 100%);
`;

const Title = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
  padding-top: 70px;
  padding-bottom: 70px;
`;

const Content = styled.div`
  padding-left: 128px;
`;

const ContentButton = styled.div<{ selected: boolean }>`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
  opacity: 0.6;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.selected &&
    css`
      color: var(--Main-Black, #141414);
      text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 100% */
      opacity: 1;
    `}
`;
const DeleteButton = styled.div<{ selected: boolean }>`
  color: var(--Main-Black, #ee6767);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
  opacity: 0.6;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.selected &&
    css`
      color: var(--Main-Black, #ee6767);
      text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 100% */
      opacity: 1;
    `}
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

interface SettingsPageProps {
  selected: number;
  setSelected: (selected: number) => void;
}

const BodyContainer = styled.div`
  padding-left: 262px;
  padding-top: 70px;
`;

const BodyTitle = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
`;

const BodyContent = styled.div`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 111.111% */
  opacity: 0.6;
  margin-top: 12px;
`;

const TextFieldTitle = styled.div`
  margin-top: 58px;
  margin-bottom: 9px;
  opacity: 0.8;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
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

const Optional = styled.span`
  color: var(--A8_Grey-4, #a8a8a8);
  text-align: right;

  /* Medium Text */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 100% */
  opacity: 0.8;
  margin-left: 455px;
`;
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
const ButtonWrapper = styled.button<{
  buttonType: 'primary' | 'secondary';
}>`
  margin-top: 60px;
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;
  padding: 24px 34px;
  border-radius: 10px;
  width: 630px;
  height: 68px;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */

  &:disabled {
    cursor: not-allowed;
    opacity: 0.445;
  }

  ${(props) => colorMapping[props.buttonType]};
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
const TextOutBox = styled.div`
  width: 628px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-right: 18px;
  line-height: 123.54%; /* 22.237px */
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

const ModalBg = styled.div`
  // 모달 백그라운드
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(20, 16, 19, 0.55);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1005;
`;

const ModalWrapper = styled.div`
  width: 814px;
  height: 500px;
  margin-bottom: 100px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--White, #fff);
  padding: 70px;
`;
const XWrapper = styled.div`
  padding-left: 704px;
`;
const ModalFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleModal = styled.div`
  color: var(--Main-Black, #141414);
  margin-top: 10px;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
`;
const Description = styled.div`
  margin-top: 10px;
  color: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 136.111% */
`;

const StyledTable = styled.table`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
  border-collapse: collapse;
  border: 1px solid black;
  border-radius: 10px;

  th {
    text-align: center;
    background-color: #dfdfdf;
    border: 1px solid black;
    padding: 2px 2px;
  }

  td {
    text-align: left;
    border: 1px solid black;
  }
`;

const NicknameCheckButtonWrapper = styled.div`
  position: absolute;
  top: 110px;
  left: 490px;
  z-index: 20;
`;

const ContentsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 9px;
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

const ContentsText = styled.div`
  // mediumText
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 122.836%;
  text-align: left;
`;

const TitleText = styled.div`
  // bodyText
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 122.836%; /* 22.11px */
  text-align: left;
`;

type NicknameCheckStateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

type errorMessageType = {
  passwordErrorMessage: string;
  nicknameErrorMessage: string;
};

const SettingsPage = ({ selected, setSelected }: SettingsPageProps) => {
  const navigate = useNavigate();

  const onClick = (index: number) => {
    setSelected(index);
  };
  const [scrollActive, setActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [nickname, setNickname] = useState<string>(localStorage.getItem('nickname') || '');
  const [nicknameState, setNicknameState] = useState<StateOptions>('filled');
  const [nicknameCheck, setNicknameCheckState] = useState<NicknameCheckStateOptions>('filled');
  const [currentNickname, setCurrentNickname] = useState('');
  const [errorMessages, setErrorMessages] = useState<errorMessageType>({
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
  });

  const [name, setName] = useState<string>(localStorage.getItem('name') || '');
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

  const [isGpaChanged, setIsGpaChanged] = useState<boolean>(false);

  useEffect(() => {
    if (originGPA1.current !== GPA1 || originGPA2.current !== GPA2 || originGPA3.current !== GPA3) {
      setIsGpaChanged(true);
    } else {
      setIsGpaChanged(false);
    }
  }, [GPA1, GPA2, GPA3]);

  useEffect(() => {
    // 로그인한 유저 정보 localStorage에
    const getMe = async () => {
      try {
        // const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
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

  //nicknameState가 바뀔 때, 즉 창을 클릭할 때에 대한 대처이다.
  // 닉네임 제한 10->7자 수정
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

  /* 전화번호 유효성 검사 + '-' 넣은 형식으로 바꾸기*/
  // useEffect(() => {
  //   const phoneCheck = /^010\d{8}$/;
  //   const phoneFormatCheck = /^010-\d{4}-\d{4}$/;
  //   if (phoneNumberState === 'filled') {
  //     if (!phoneCheck.test(phoneNumber) && !phoneFormatCheck.test(phoneNumber)) setPhoneNumberState('error');
  //     else {
  //       const newphoneNumber = phoneNumber;
  //       const newPhone = newphoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

  //       setPhoneNumber(newPhone);
  //     }
  //   }
  // }, [phoneNumber, phoneNumberState]);
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
        <Main>
          <ModalLarge
            onClickToggleModal={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <CloseButton
              onClick={() => {
                setModalOpen(!modalOpen);
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
            <AlertWrapper style={{ marginTop: '180px' }}>
              <AlertIconExclamation width="113px" height="113px" />
              <Typography size="largeText" bold="700" style={{ marginTop: '25px' }}>
                변경한 정보를 저장하시겠습니까?
              </Typography>
              <Typography size="mediumText" bold="500" style={{ marginTop: '24px', lineHeight: '136.111%' }}>
                이중전공 지원 기간 동안에는 학점 수정이 최대 두 번까지만 가능해요.
              </Typography>
              <div style={{ display: 'flex', gap: 22, marginTop: 60 }}>
                <div
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    navigate('/settings');
                  }}
                >
                  <LabelButton
                    buttonType="secondary"
                    size="medium"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    취소
                  </LabelButton>
                </div>
                <div
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    thirdSubmit();
                  }}
                >
                  <LabelButton buttonType="primary" size="medium">
                    확인
                  </LabelButton>
                </div>
              </div>
            </AlertWrapper>
          </ModalLarge>
        </Main>
      )}
      <Sidebar>
        <Content>
          <Title>환경설정</Title>
          <Flex>
            <ContentButton
              selected={selected === 0}
              onClick={() => {
                onClick(0);
              }}
            >
              나의 기본정보 수정하기
            </ContentButton>
            <ContentButton
              selected={selected === 1}
              onClick={() => {
                onClick(1);
              }}
            >
              프로필 사진 / 닉네임 변경하기
            </ContentButton>
            <ContentButton
              selected={selected === 2}
              onClick={() => {
                onClick(2);
              }}
            >
              마이보드 프로필 수정하기
            </ContentButton>
            <ContentButton
              selected={selected === 3}
              onClick={() => {
                onClick(3);
              }}
            >
              계정관리
            </ContentButton>
          </Flex>
          <div style={{ marginTop: 210 }}>
            <ContentButton
              selected={selected === 4}
              onClick={() => {
                onClick(4);
              }}
            >
              약관보기
            </ContentButton>
          </div>
          <div style={{ marginTop: 50 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="284" height="2" viewBox="0 0 284 2" fill="none">
              <path d="M283 1L0.999988 1" stroke="#DFDFDF" stroke-linecap="round" />
            </svg>
          </div>{' '}
          <div style={{ marginTop: 50 }}>
            <DeleteButton
              selected={selected === 5}
              onClick={() => {
                navigate('/delete');
              }}
            >
              계정 삭제
            </DeleteButton>
          </div>
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
          <SubmitButton
            style={{ marginTop: '60px' }}
            active={!isApplied}
            onClick={() => {
              firstSubmit();
            }}
          >
            저장하기
          </SubmitButton>
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
              <div style={{ gap: '5px', marginTop: '52px', display: 'flex' }}></div>
            </div>
          </div>
          <ContentsWrapper>
            <div style={{ display: 'flex', marginTop: '60px' }}>
              <Typography
                size="mediumText"
                style={{ color: 'var(--Main-Black, #141414)', fontWeight: 700, opacity: 0.8 }}
              >
                닉네임&nbsp;
              </Typography>
              <Typography
                size="mediumText"
                style={{ color: 'var(--Main-Black, #141414)', fontWeight: 400, opacity: 0.8, lineHeight: '18px' }}
              >
                수정하기
              </Typography>
            </div>
            <TextFieldBox
              placeholder="닉네임"
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
          </ContentsWrapper>
          <div>
            <SubmitButton
              style={{ marginTop: '60px' }}
              active={!isApplied}
              onClick={() => {
                secondSubmit();
              }}
            >
              저장하기
            </SubmitButton>
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
            <VerificationBox name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={true} />
            <div style={{ marginTop: 60 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#D85888" />
              </svg>
            </div>
            <VerificationBox name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={true} />
            <VerificationBox name="gpa-3" value={GPA3} setValue={setGPA3} isEntered={true} setRef={setLastBoxRef} />
          </VerifiBoxWrapper>
          <TextFieldTitle>
            <strong>희망 지원학기</strong> 수정하기
          </TextFieldTitle>
          <VerifiBoxWrapper>
            <VerificationBox
              name="semester-1"
              value={hopeSemester1}
              setValue={setHopeSemester1}
              isEntered={hopeSemester1 ? true : false}
            ></VerificationBox>
            <VerificationBox
              name="semester-2"
              value={hopeSemester2}
              setValue={setHopeSemester2}
              isEntered={hopeSemester2 ? true : false}
            ></VerificationBox>
            <Typography size={'normalText'} style={{ marginTop: '58px' }}>
              년도
            </Typography>
            <VerificationBox
              name="semester-3"
              value={hopeSemester3}
              setValue={setHopeSemester3}
              isEntered={hopeSemester3 ? true : false}
            ></VerificationBox>
            <Typography size={'normalText'} style={{ marginTop: '58px' }}>
              학기
            </Typography>
          </VerifiBoxWrapper>
          <div>
            <SubmitButton
              style={{ marginTop: '60px' }}
              active={!isApplied}
              onClick={() => {
                if (isGpaChanged) {
                  setModalOpen(true);
                } else {
                  thirdSubmit();
                }
              }}
            >
              저장하기
            </SubmitButton>
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
            <SubmitButton
              style={{ marginTop: '60px' }}
              active={!isApplied}
              onClick={() => {
                fourthSubmit();
              }}
            >
              저장하기
            </SubmitButton>
          </div>
        </BodyContainer>
      )}
      {selected === 4 && (
        <BodyContainer>
          <BodyTitle>약관보기</BodyTitle>
          <BodyContent>
            다음은 고려대학교 이중전공 지원/합격정보 통계 서비스 쿠플라이의 이용약관입니다.
          </BodyContent>{' '}
          <ScrollBarLarge isChecked={scrollActive}>
            <div style={{ marginTop: 30 }}>
              <div style={{ marginBottom: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
                <Typography size="bodyText" style={{ textAlign: 'left' }}>
                  서비스 이용약관
                </Typography>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M12.1339 17.2676L15.8672 14.0009"
                    stroke="#434343"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.8672 14L12.1339 10.2667"
                    stroke="#434343"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <TextOutBox>
              <ScrollBarSmall isChecked={scrollActive}>
                <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
                  <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    제 1장 총칙
                  </Typography>
                  <TitleText>제 1조 (목적)</TitleText>
                  <ContentsText>
                    1. 본 약관은 이용자가 고려대학교 이중전공 지원/합격정보 통계 서비스 쿠플라이 (이하 “쿠플라이”라
                    합니다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 쿠플라이 및
                    쿠플라이의 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. <br />
                    2. 본 약관이 규정한 내용 이외의 ‘쿠플라이’와 ‘이용자’ 간의 권리, 의무 및 책임사항에 관하여서는
                    전기통신사업법 기타 대한민국의 관련 법령과 상관습에 의합니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 2조 (정의)</TitleText>
                  <ContentsText>
                    본 약관에서 사용하는 용어의 정의는 다음과 같습니다. <br />
                    1. 사이트: 회사가 정보 및 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를
                    이용하여 정보 및 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장 또는 회사가 운영하는
                    웹사이트
                    <br />
                    2. 이용자: 사이트에 접속하여 본 약관에 따라 서비스를 제공 받는 회원 및 비회원
                    <br />
                    3. 회원: 쿠플라이에 개인정보를 제공하여 회원가입을 한 자로서, 쿠플라이와 서비스 이용계약을 체결하고
                    사이트 내 모든 서비스를 계속적으로 이용할 수 있는 자<br />
                    4. 비회원: 회원에 가입하지 않고 서비스를 이용하는 자로서, 사이트 내 일부 서비스를 일시적으로 이용할
                    수 있는 자<br />
                    5. 아이디(ID): 회원의 고려대학교 학생 인증과 서비스 이용을 위하여 회원이 입력한 본인의 고려대학교
                    이메일 주소
                    <br />
                    6. 비밀번호(Password): 이용자가 등록회원과 동일인인지 신원을 확인하고, 회원의 통신상 개인정보를
                    보호하기 위하여 회원이 정한 문자, 숫자, 특수문자의 조합
                    <br />
                    7. 회원 탈퇴: 회원이 이용계약을 종료시키는 행위
                    <br />
                    8. 컨텐츠(Contents): 회사에서 제공하는 학과(부)별 합격자료, 실시및 지원자 통계 및 기타정보
                  </ContentsText>
                  <br />
                  <TitleText>제 3조 (약관의 명시, 효력 및 개정)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 약관의 내용과 주소지, 관리자의 성명, 개인정보보호 담당자의 성명, 연락처(이메일 주소)
                    등을 이용자가 알 수 있도록 쿠플라이 사이트의 초기 서비스 화면에 게시합니다.
                    <br />
                    2. 이 약관은 그 내용을 쿠플라이의 사이트에 게시하거나 에메일 등 기타의 방법으로 회원에게
                    공지함으로써 효력이 발생합니다.
                    <br />
                    3. 서비스 이용 시 화면에서 제시되는 경고 메세지의 효력은 본 약관의 효력과 동일합니다.
                    <br />
                    4. 쿠플라이 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보 보호
                    이용에 관한 법률 기타 관련 법령을 위배하지 않는 범위 내에서, 사정 변경의 경우와 영업상 중요 사유가
                    있을 때 약 변경할 수 있으며, 변경된 약관은 2항과 같은 방법으로 효력을 발생합니다.
                    <br />
                    5.이 약관에 동의하는 것은 정기적으로 사이트를 방문하여 약관의 변경사항을 확인하는 것에 동의함을
                    의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 쿠플라이에서 책임지지
                    않습니다.
                    <br />
                    6.회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력
                    발생일로부터 7일 이내의 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에
                    동의한 것으로 간주됩니다. 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수
                    있으며, 변경된 약관의 효력 발생일로부터 7일 이내의 거부의사를 표시하지 아니하고 서비스를 계속 사용할
                    경우 약관의 변경 사항에 동의한 것으로 간주됩니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 4조 (약관 외 준칙)</TitleText>
                  <ContentsText>
                    1. 이 약관은 쿠플라이가 제공하는 개별 서비스에 관한 이용안내(이하 “서비스별 안내”라 합니다)와 함께
                    적용합니다.
                    <br />
                    2. 이 약관에 명시되지 않은 사항에 대해서는 전기 통신 기본법, 전기 통신 사업법, 기타 관련법령 및
                    서비스별 안내의 규정에 의합니다.
                  </ContentsText>
                  <br />
                  <br />
                  <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    제 2장 서비스 이용 계약
                  </Typography>
                  <TitleText>제 5조 (이용 계약의 성립)</TitleText>
                  <ContentsText>
                    1. 이용 계약은 서비스 이용 희망자의, 본 이용 약관에 대해 동의한다는 의사표시와 이용 신청에 대한
                    쿠플라이의 승낙으로 성립됩니다. <br />
                    2. 본 이용약관에 대한 동의는 회원 가입 또는 이용 신청 당시 사이트의 ‘동의함’ 버튼을 누름으로써 그
                    의사표시를 합니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 6조 (회원가입 및 승낙)</TitleText>
                  <ContentsText>
                    1. 이용자가 회원에 가입하여 사이트의 서비스를 이용하고자 하는 경우, 이용자는 사이트에서 요청하는
                    개인 신상정보를 제공해야 합니다.
                    <br />
                    2. 이용자의 서비스 이용 신청에 대하여 운영진이 승낙한 경우, 사이트는 회원 ID/Password와 기타
                    사이트가 필요하다고 인정하는 내용을 이용자에게 통지합니다.
                    <br />
                    3. 쿠플라이는 다음 각 호에 해당하는 이용 신청에 대하여는 이를 승낙하지 아니합니다.
                    <br />
                    (1) 고려대학교 소속이 아닌 이용자가 신청하는 경우
                    <br />
                    *서울캠퍼스/세종캠퍼스 무관
                    <br />
                    **재학생, 휴학생, 수료생, 졸업생 모두 고려대학교 소속으로 인정
                    <br />
                    (2) 본인 실명이 아니거나 다른 사람의 명의를 사용하여 신청한 경우
                    <br />
                    (3) 서비스 이용 계약 신청서의 내용을 허위로 기재한 경우
                    <br />
                    (4) 사회의 안녕과 질서 혹은 미풍양속을 저해할 목적으로 신청한 경우
                    <br />
                    (5) 부정한 용도로 본 서비스를 이용하고자 하는 경우
                    <br />
                    (6) 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우
                    <br />
                    (7) 본 서비스와 경쟁관계에 있는 이용자가 신청하는 경우
                    <br />
                    (8) 기타 이용 신청자의 귀책사유로 이용승낙이 곤란한 경우
                    <br />
                    4. 쿠플라이는 서비스 이용신청이 다음 각 호에 해당하는 경우에는 그 신청에 대하여 승낙 제한사유가
                    해소될 때까지 승낙을 유보할 수 있습니다.
                    <br />
                    (1) 쿠플라이의 설비가 여유가 없는 경우
                    <br />
                    (2) 쿠플라이의 기술상 지장이 있는 경우
                    <br />
                    (3) 기타 쿠플라이의 귀책사유로 이용승낙이 곤란한 경우
                  </ContentsText>
                  <br />
                  <TitleText>제 7조 (회원 정보의 변경 등)</TitleText>
                  <ContentsText>
                    1. 회원은 마이페이지를 통하여 언제든지 본인의 개인정보를 열람할 수 있고, 회사가 인정하는 경미한
                    내용을 변경 또는 수정할 수 있습니다. 단, 본래 영구적인 학교 이메일 및 안정적인 서비스 운영을 위해
                    필요한 기타 회사가 정한 사항은 변경 또는 수정할 수 없습니다.
                    <br />
                    2. 회원은 회원가입 신청 시 기재한 사항이 변경되었을 경우, 즉시 개인정보 관리화면을 통하여 이를
                    수정하거나 이메일 등 기타 회사가 정한 방법으로 회사에게 그 변경사항을 알려야 합니다.
                    <br />
                    3. 2항의 변경사항을 회사에 알리지 아니함으로써, 회원이 입은 불이익에 대하여 회사는 회원 또는 제3자에
                    대하여 손해배상 기타 일체의 책임을 부담하지 아니하고, 회사 또는 회사와 제휴한 온라인서비스 제공자가
                    입은 불이익에 대하여 회원은 손해배상 기타 일체의 책임을 부담합니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 8조 (서비스 이용)</TitleText>
                  <ContentsText>
                    1. 회원은 회원 가입 시 발급된 계정 하나로 사이트 내 모든 서비스를 이용할 수 있습니다. 단, 일부
                    서비스의 경우 해당 서비스 이용에 앞서 추가적인 개인 정보를 요청할 수 있습니다.
                    <br />
                    2. 비회원은 회사가 정한 일부 서비스에 한해 사이트를 이용할 수 있습니다.
                    <br />
                    3. 쿠플라이의 서비스 이용은 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을
                    원칙으로 합니다. 단, 일부 서비스의 경우 고려대학교 학사일정에 따라 회사가 정한 일정 기간 동안에만
                    운영됩니다.
                    <br />
                    4. 쿠플라이에서 제공하는 서비스는 기본적으로 무료입니다.
                    <br />
                    5. 쿠플라이는 제공하는 서비스 이용과 관련하여 이용자에게 발생한 어떠한 손해에 대해서도 책임을 지지
                    않습니다.
                  </ContentsText>
                  <br />
                  <br />
                  <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    제 3장 서비스 제공 및 변경
                  </Typography>

                  <TitleText>제 9조 (서비스 내용)</TitleText>
                  <ContentsText>
                    쿠플라이가 제공하는 서비스의 내용은 다음과 같습니다.
                    <br />
                    1. 고려대학교 이중전공 지원 관련 정보의 제공
                    <br />
                    2. 각 학과(부)별 이중전공 합격 관련 정보의 제공 (*현재는 베타버전으로서 경영학과, 경제학과,
                    통계학과, 미디어학부, 심리학부, 수학과, 식품자원경제학과, 컴퓨터학과, 화학과에 한해 정보 제공)
                    <br />
                    3. 각 학과(부)별 지원 안정 정도 평가의 제공
                    <br />
                    4. 모의지원을 바탕으로 각 학과(부)별 실시간 지원자 통계의 제공
                    <br />
                    5. 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스 제공
                  </ContentsText>
                  <br />
                  <TitleText>제 10조 (정보의 제공 및 광고의 게재)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 회원에게 서비스 이용에 필요하다고 인정되는 각종 정보에 대해서 사이트 및 이메일, SMS
                    발송 등 각종 매체에 게재하는 방법 등으로 회원에게 제공할 수 있습니다.
                    <br />
                    2. 쿠플라이는 서비스 개선 및 소개 등을 목적으로 회원의 동의 하에 추가적인 개인정보를 요청할 수
                    있습니다.
                    <br />
                    3. 쿠플라이는 서비스의 운영과 관련하여 사이트, 이메일, SMS 등에 광고 등을 게재할 수 있습니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 11조 (서비스 제공의 제한 및 중단)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 정기점검, 보수, 교체 등 쿠플라이가 필요한 경우 및 부득이한 사유로 인하여 서비스 이용에
                    지장이 있는 경우에는 서비스 이용의 전부 또는 일부를 제한하거나 일시 중단할 수 있습니다.
                    <br />
                    2. 전시, 사변, 천재지변 또는 이에 준하는 국가 비상사태가 발생하거나 발생할 우려가 있는 경우 정전,
                    서비스 이용 폭주 등으로 정상적인 서비스가 불가능한 경우 등 불가항력적인 사유가 있는 경우에는 서비스
                    이용의 전부 또는 일부를 제한하거나 중지할 수 있습니다.
                    <br />
                    3. 제 1항에 의한 서비스 중단의 경우에는 사이트는 회원에게 제11조의 방법으로 통지를 합니다. 단,
                    사이트가 통제할 수 없는 사유로 인한 서비스 중단으로 사전 통지가 불가능한 경우에는 그러하지
                    아니합니다.
                    <br />
                    4. 쿠플라이는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은
                    손해에 대하여 배상합니다. 단, 쿠플라이의 고의 또는 과실이 없음을 입증하는 경우에는 그러하지
                    아니합니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 12조 (회원에 대한 통지)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 회원에 대한 통지를 하는 경우에는 회원이 서비스 이용 신청 시 사이트 화면 또는 회원가입
                    시 제출한 이메일 주소로 할 수 있습니다.
                    <br />
                    2. 1. 2. 쿠플라이는 불특정다수 회원에 대한 통지의 경우 7일 이상 사이트 사이트 화면에 게시함으로써
                    개별통지에 갈음할 수 있습니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 13조 (회원탈퇴 및 자격상실)</TitleText>
                  <ContentsText>
                    1. 회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 쿠플라이 웹페이지 내의 환경설정 메뉴를 통해
                    가입해지를 신청할 수 있으며, 쿠플라이는 즉시 회원 탈퇴 처리를 합니다.
                    <br />
                    2. 회원 탈퇴가 이루어짐과 동시에 탈퇴회원의 서비스 이용 정보는 삭제되며, 이로 인해 발생하는 불이익에
                    대한 책임은 회원 본인에게 있습니다.
                    <br />
                    3. 회원이 다음 각 호의 사유에 해당하는 경우, 쿠플라이는 회원의 회원자격을 적절한 방법으로 제한 및
                    정지, 상실시킬 수 있습니다.
                    <br />
                    (1) 가입 신청 시에 허위 내용을 등록한 경우
                    <br />
                    (2) 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우
                    <br />
                    (3) 서비스를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
                    <br />
                    (4) 쿠플라이가 회원 자격을 제한 및 정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 10일 이내에 그
                    사유가 시정되지 아니하는 경우
                    <br />
                    5. 쿠플라이가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고,
                    회원등록 말소 전에 소명할 기회를 부여합니다.
                  </ContentsText>
                  <br />
                  <br />
                  <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    제 4장 서비스 관련 권한, 의무 관계
                  </Typography>
                  <TitleText>제 14조 (회사의 의무)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 회원이 희망한 서비스 제공 개시일에 특별한 사정이 없는 한 서비스를 이용할 수 있도록
                    하여야 합니다.
                    <br />
                    2. 쿠플라이는 계속적이고 안정적인 서비스의 제공을 위하여 설비에 장애가 생기거나 명실된 때에는
                    부득이한 사유가 없는 한 지체없이 이를 수리 또는 복구합니다.
                    <br />
                    3. 쿠플라이는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다.
                    <br />
                    4. 쿠플라이는 회원으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한
                    절차를 거쳐 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우는 이용자에게 그 사유와 처리 일정을
                    통보하여야 합니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 15조 (회원의 의무)</TitleText>
                  <ContentsText>
                    1. 회원은 다음 각 호의 행위를 하여서는 안됩니다.
                    <br />
                    (1) 회원가입 신청 또는 변경 시 허위내용을 등록하는 행위
                    <br />
                    (2) 쿠플라이에 게시된 정보를 변경하는 행위
                    <br />
                    (3) 쿠플라이 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위
                    <br />
                    (4) 다른 회원의 계정을 도용하는 행위
                    <br />
                    (5) 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)을 전송 또는 게시하는
                    행위
                    <br />
                    (6) 쿠플라이 운영진을 가장, 사칭하거나 또는 타인의 명의를 도용하여 글을 게시하거나 메일을 발송하는
                    행위
                    <br />
                    (7) 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된
                    소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나
                    전자우편으로 발송하는 행위
                    <br />
                    (8) 스토킹(stalking) 등 다른 회원을 괴롭히는 행위
                    <br />
                    (9) 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위
                    <br />
                    (10) 쿠플라이가 제공하는 서비스에서 정한 약관 기타 서비스 이용에 관한 규정을 위반하는 행위
                    <br />
                    (11) 외설 또는 폭력적인 메세지, 화상, 음성 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위
                    <br />
                    (12) 사실관계를 왜곡하는 정보 제공 등 기타 쿠플라이가 부적절하다고 판단하는 행위
                    <br />
                    2. 회원이 개인의 정보를 허위 또는 잘못 기재하여 생기는 불이익에 대한 책임은 회원 본인에게 있으며,
                    이에 쿠플라이는 면책합니다.
                    <br />
                    3. 쿠플라이가 사이트 운영상 부적절하다고 판단한 정보가 게시된 경우, 쿠플라이는 게시를 행한 자의
                    승낙없이 게재된 해당 정보를 삭제할 수 있습니다. 단, 쿠플라이는 이러한 정보의 삭제 등을 할 의무를
                    지지 않습니다.
                    <br />
                    4. 제 1항에 해당하는 행위를 한 회원이 있을 경우 쿠플라이는 본 약관 제12조에서 정한 바에 따라 회원의
                    회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
                    <br />
                    5. 회원은 그 귀책사유로 인하여 쿠플라이나 다른 회원이 입은 손해를 배상할 책임이 있습니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 16조 (저작권의 귀속 및 권리 의무)</TitleText>
                  <ContentsText>
                    1. 서비스에 대한 저작권 및 지적재산권은 회사에 있습니다.
                    <br />
                    2. 회원이 서비스상에 게시한 게시물(이하 “게시물’”)의 저작권은 해당 게시물의 저작자에게 있습니다.
                    <br />
                    3. 2. 3. 게시물은 반드시 본인에게 저작권이 있는 자료만 등록하여야 합니다. 만일 저작권 관련 분쟁 시
                    모든 책임은 판매자 본인에게 있으며, 저작권법 등 관련법령 및 회사가 정한 절차에 따라 필요한 조치를
                    취합니다.
                    <br />
                    4. 회원은 “쿠플라이”의 서비스를 이용함으로써 얻은 정보를 “쿠플라이”의 사전승낙 없이 복제, 전송,
                    출판, 배포, 방송 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
                    <br />
                    5. 쿠플라이는 회원이 쿠플라이에 게시한 게시물을 사용, 복제, 수정, 출판, 배포할 수 있습니다.
                    <br />
                    6. 회원이 서비스상에 게시한 게시물은 검색결과 내지 서비스 프로모션 등에 노출될 수 있으며, 해당
                    노출을 위하여 필요한 경우, 회사는 게시물을 일부 수정하거나 편집 기타 방법으로 이를 게시할 수
                    있습니다. 이 경우, 회원은 회사에 대하여 해당 게시물의 삭제, 검색결과 제외, 비공개 기타 필요한 조치를
                    요청할 수 있습니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 17조 (게시물 관리)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 회원에 대한 별도의 조치 없이 회원이 서비스상에 게시한 게시물을 편집하거나 이동할 수
                    있는 권리를 보유합니다.
                    <br />
                    2. 회원의 게시물이 저작권법, 정보보호법 기타 관련법령에 위반되는 내용을 포함하는 경우, 권리자는
                    관련법령이 정한 절차에 따라 해당 게시물의 게시중단, 삭제 기타 필요한 조치를 요청할 수 있고, 회사는
                    관련법령 및 회사가 정한 절차에 따라 필요한 조치를 취합니다.
                    <br />
                    3. 2항에 따른 권리자의 요청이 없는 경우라도 다음 각호의 1에 해당하는 경우, 회사는 관련법령 및 이
                    약관에 따라 별도의 사전 통지나 동의 없이 해당 게시물에 대한 게시중단, 삭제 기타 필요한 조치를 취할
                    수 있습니다.
                    <br />
                    (1) 해당 게시물이 저작권법 기타 관련법령을 위반하거나 위반할 우려가 있는 경우
                    <br />
                    (2) 해당 게시물이 제3자의 권리를 침해하거나 침해할 우려가 있는 경우
                    <br />
                    (3) 해당 게시물이 이 약관이나 회사의 정책에 위반되거나 위반될 우려가 있는 경우
                    <br />
                    (4) 기타 해당 게시물의 게시중단, 삭제 기타 조치를 취할 필요가 있다고 회사가 인정한 경우
                    <br />
                    4. 회원의 게시물이 제3자의 저작권 기타 재산권을 침해함으로써 발생하는 일체의 민ㆍ형사상 책임에
                    대하여, 회사는 이를 일체 부담하지 아니합니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 18조 (광고주 및 연결 사이트와의 관계)</TitleText>
                  <ContentsText>
                    1. 쿠플라이의 공식 사이트 이외의 쿠플라이 웹페이지 및 이메일에서 링크된 사이트에서는 쿠플라이의
                    ‘개인정보처리방침’이 적용되지 않습니다.
                    <br />
                    2. 쿠플라이는 쿠플라이 웹페이지 또는 이메일상에 게재되어 있거나 본 서비스를 통한 광고주의 판촉활동에
                    회원이 참여하거나 교신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다.
                  </ContentsText>
                  <br />
                  <br />
                  <Typography size="largeText" style={{ textAlign: 'left', marginBottom: '10px' }}>
                    제 5장 기타
                  </Typography>
                  <TitleText>제 19조 (양도의 금지)</TitleText>
                  <ContentsText>
                    회원은 서비스 이용권리를 타인에게 대여, 양도 또는 증여 등을 할 수 없으며, 또한 질권의 목적으로도
                    사용할 수 없습니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 20조 (면책 및 배상)</TitleText>
                  <ContentsText>
                    1. 쿠플라이는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스
                    제공에 관한 책임이 면제됩니다.
                    <br />
                    2. 쿠플라이는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
                    <br />
                    3. 쿠플라이는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것이나 서비스를 통하여 얻은 자료로
                    인한 손해에 관하여 책임을 지지 않습니다.
                    <br />
                    4. 쿠플라이는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을
                    지지 않습니다.
                    <br />
                    5. 쿠플라이는 서비스 이용과 관련하여 가입자에게 발생한 손해 가운데 가입자의 고의, 과실에 의한 손해에
                    대하여 책임을 지지 않습니다.
                  </ContentsText>
                  <br />
                  <TitleText>제 21조 (재판권 및 준거법)</TitleText>
                  <ContentsText>
                    1. 쿠플라이와 이용자간에 발생한 분쟁에 관한 소송은 서울중앙지방법원을 관할법원으로 합니다.
                    <br />
                    2. 쿠플라이와 이용자간에 제기된 소송에는 대한민국법을 적용합니다.
                  </ContentsText>
                  <br />
                  <TitleText>부칙</TitleText>
                  <ContentsText>1. 본 약관은 2023년 10월 20일부터 시행합니다.</ContentsText>
                </div>
              </ScrollBarSmall>
            </TextOutBox>
            <div style={{ marginTop: 30 }}>
              <div style={{ marginBottom: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
                <Typography size="bodyText" style={{ textAlign: 'left' }}>
                  개인정보 처리방침
                </Typography>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M12.1339 17.2676L15.8672 14.0009"
                    stroke="#434343"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.8672 14L12.1339 10.2667"
                    stroke="#434343"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div style={{ width: '628px', height: 'auto', marginBottom: '30' }}>
              <Typography size="mediumText" style={{ fontWeight: '400', textAlign: 'left', color: '#a8a8a8' }}>
                쿠플라이는 이용자들의 정보를 매우 중요시하며, 이용자가 쿠플라이에서 제공하는 서비스를 이용함과 동시에
                온라인 상에서 각 운영 서비스에 제공한 개인정보가 보호받을 수 있도록 최선을 다하고 있습니다.
                <br />
                <br />
              </Typography>
            </div>
            <TextOutBox>
              <ScrollBarSmall isChecked={scrollActive}>
                <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
                  <ContentsText>
                    쿠플라이는 이용자들의 정보를 매우 중요시하며, 이용자가 쿠플라이에서 제공하는 서비스(이하 “서비스”라
                    함)를 이용함과 동시에 온라인 상에서 각 운영 서비스에 제공한 개인정보가 보호받을 수 있도록 최선을
                    다하고 있습니다.
                    <br />
                    <br />
                    쿠플라이는 ‘개인정보보호법’에 따라 정보주체의 개인정보를 보호하고 있으며 이와 관련한 고충을 신속하고
                    원활하게 처리할 수 있도록 하기 위하여 ’개인정보보호법’ 제30조에 따라 다음과 같이 개인정보 처리방침을
                    수립하고 공개합니다. 서비스 운영팀은 개인정보처리방침을 홈페이지의 첫 화면에 공개함으로써 이용자들이
                    언제나 용이하게 확인할 수 있도록 조치하고 있습니다.
                    <br />
                    <br />
                    쿠플라이의 개인정보처리방침은 관련 법령 및 지침 변경이나 서비스 운영팀 내부 방침 변경 등으로 인하여
                    수시로 변경될 수 있으며, 개인정보처리방침의 지속적인 개선을 위하여 필요한 절차를 정하고 있습니다.
                    개인정보처리방침을 개정하는 경우 서비스 운영팀은 그 변경 사항을 홈페이지에 게시하여 이용자들이
                    개정된 사항을 쉽게 알아볼 수 있도록 하고 있습니다.
                    <br />
                    <br />
                    쿠플라이의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
                    <br />
                    <br />
                  </ContentsText>
                  <ContentsText style={{ fontWeight: '600' }}>
                    1. 정보 수집에 대한 동의
                    <br />
                    2. 개인정보 수집•이용 목적, 수집하는 개인정보의 항목 및 수집방법
                    <br />
                    3. 개인정보의 제3자 제공
                    <br />
                    4. 개인정보의 보유 및 이용 기간, 개인정보의 파기절차 및 방법
                    <br />
                    5. 개인정보 보호책임자 및 개인정보에 관한 민원 서비스
                    <br />
                    6. 개인정보의 안전성 확보조치에 관한 사항
                    <br />
                    7. 고지의 의무
                    <br />
                    <br />
                  </ContentsText>
                  <TitleText>1. 정보 수집에 대한 동의</TitleText>
                  <ContentsText>
                    (1) 쿠플라이는 개인정보를 개인의 동의 없이 수집하지 않습니다. 쿠플라이는 회원가입 및 서비스 이용
                    과정에서 개인정보 수집에 대한 '동의' 버튼을 클릭할 수 있는 절차를 마련하여 개인정보 수집에 대해
                    동의를 구하고 있습니다. (2) 쿠플라이는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하고,
                    통계 작성, 과학적 연구, 공익적 기록 보존 등을 위하여 가명정보를 처리할 수 있습니다. 쿠플라이는
                    가명정보가 재식별되지 않도록 추가정보와 분리하여 별도 저장 관리하고 필요한 기술적 관리적 보호조치를
                    취합니다. (3) 쿠플라이는 스크래핑 등의 기술을 이용하여 이용자의 데이터를 수집하는 행위를 불허합니다.
                    쿠플라이는 입력하신 정보를 이용자들에게 사전에 밝힌 목적 이외에 다른 목적으로는 사용하지 않으며,
                    외부로 유출하지 않습니다. 단, 쿠플라이에 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에
                    대해서는 본 ‘개인정보처리방침’이 적용되지 않음을 알려드립니다.
                    <br />
                    <br />
                    개인정보란 살아 있는 개인에 관한 정보로서 다음 어느 하나에 해당하는 정보를 말합니다.
                    <br />
                    - 성명, 주민등록번호 및 영상 등을 통하여 개인을 식별할 수 있는 정보
                    <br />
                    - 해당 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 쉽게 결합하여 알아볼 수 있는 정보, 이
                    경우 쉽게 결합할 수 있는지 여부는 다른 정보의 입수 가능성 등 개인을 알아보는 데 소요되는 시간, 비용,
                    기술 등을 합리적으로 고려하여야 합니다.
                    <br />- 가명정보
                  </ContentsText>
                  <br />
                  <br />
                  <TitleText>2. 개인정보 수집, 이용 목적, 수집하는 개인정보의 항목 및 수집방법</TitleText>
                  <br />

                  <StyledTable>
                    <thead>
                      <tr>
                        <th>수집이용 및 목적</th>
                        <th>수집항목</th>
                        <th>수집방법</th>
                        <th>보유 및 이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>회원관리</td>
                        <td>
                          - (필수항목): 고려대학교 이메일, 이름, 고려대학교 학번, 본전공(1전공), 아이디, 비밀번호,
                          닉네임, 희망 이중전공 1, 2지망, 희망 이중 지원학기
                        </td>
                        <td>회원가입</td>
                        <td>회원 탈퇴 시까지</td>
                      </tr>
                      <tr>
                        <td>모의지원</td>
                        <td>
                          - (필수항목): 학점, 1,2지망 지원 학과(부), 재지원 여부, 현재 학년 <br />- (선택항목): 지원 시
                          제출한 자기소개서 원문
                        </td>
                        <td>모의지원 서비스 이용</td>
                        <td>모의지원 서비스를 이용한 해당 학기 종강 후 1개월</td>
                      </tr>
                      <tr>
                        <td>
                          합격자료 업데이트
                          <br />
                          (회원정보와 학교 포탈시스템에 공시되는 당학기 이중전공 합격자 발표 자료 대조)
                        </td>
                        <td>- (필수항목): 이름, 고려대학교 학번, 1, 2지망 지원학과</td>
                        <td>회원가입 및 모의지원 서비스 이용</td>
                        <td>모의지원 서비스를 이용한 해당 학기 종강 후 1개월</td>
                      </tr>
                    </tbody>
                  </StyledTable>
                  <br />
                  <br />
                  <TitleText>3. 개인정보의 제3자 제공</TitleText>
                  <ContentsText>
                    쿠플라이는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 이용자가 외부 제휴사의
                    서비스를 이용하기 위하여 개인정보 제공에 직접 동의를 한 경우, 그리고 관련 법령에 의거해 쿠플라이에
                    개인정보 제출 의무가 발생한 경우, 이용자의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한
                    경우에 한하여 개인정보를 제공하고 있습니다.
                  </ContentsText>
                  <br />
                  <TitleText>4. 개인정보의 보유 및 이용 기간, 개인정보의 파기절차 및 방법</TitleText>
                  <ContentsText>
                    (1) 이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 회원
                    탈퇴를 요청하거나 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 수집 및 이용목적이 달성되거나
                    보유 및 이용기간이 종료한 경우 해당 개인정보를 지체 없이 파기합니다. 단, 관련 법령에 의하여 보존할
                    필요가 있는 경우 아래와 같이 관련 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                    <br />
                    - 서비스 이용 관련 개인정보 (로그인 방문 기록)
                    <br />
                    - 보존 근거: 통신비밀보호법
                    <br />
                    - 보존 기간: 3개월 이상
                    <br />
                    (2) 쿠플라이는 개인정보의 수집 및 이용목적이 달성된 개인정보는 재생이 불가능한 방법으로 파기하고
                    있습니다.
                  </ContentsText>
                  <br />
                  <TitleText>5. 개인정보 보호책임자 및 개인정보에 관한 민원 서비스</TitleText>
                  <ContentsText>
                    쿠플라이는 이용자의 개인정보 관련 문의사항 및 불만 처리 등을 위하여 아래와 같이 개인정보 보호
                    책임자를 지정하고 있습니다.
                    <br />
                    <br />
                    [개인정보 보호책임자]
                    <br />
                    - 이름: 오윤진
                    <br />
                    - 이메일: dhdbsrlw@korea.ac.kr
                    <br />
                    쿠플라이는 고려대학교 재학생들이 운영하는 서비스로서, 즉각적인 문의 응답은 어렵습니다. 다만,
                    개인정보 관련 민원 발생 시 아래 이메일로 문의주시면 최대한 빠르게 도와드리겠습니다.
                    <br />- 이메일: kupply.devkor@gmail.com
                    <br />
                    <br />
                    기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
                    <br />
                    - 개인정보 분쟁조정위원회 (www.kopico.go.kr/ 1833-6972) <br />
                    - 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118) <br />
                    - 대검찰청 사이버범죄수사과 (www.spo.go.kr / 국번없이 1301) <br />- 경찰청 사이버수사국
                    (ecrm.police.go.kr / 국번없이 182)
                  </ContentsText>
                  <br />
                  <TitleText>6.개인정보의 안전성 확보조치에 관한 사항</TitleText>
                  <ContentsText>
                    쿠플라이는 이용자의 개인정보를 안전하게 관리하기 위하여 최선을 다하고 있으며, 개인정보보호법에 따라
                    개인정보를 안전하게 보호하고 있습니다. 또한 개인정보를 처리하는 인원을 최소한으로 제한하고 정기적인
                    교육과 비밀번호 변경을 통해 개인정보가 유출되지 않도록 안전하게 관리하고 있습니다. 다만, 이용자
                    본인의 부주의나 인터넷 상의 문제로 아이디, 비밀번호 등의 개인정보가 유출되어 발생한 문제에 대해
                    쿠플라이는 책임을 지지 않습니다.
                  </ContentsText>
                  <br />
                  <TitleText>7. 고지의 의무</TitleText>
                  <ContentsText>
                    개인정보처리방침의 내용의 추가, 삭제 및 수정이 있을 경우에는 시행하기 최소 7일 전에 홈페이지 등에
                    공지하도록 하겠습니다.
                    <br />
                    - 개인정보처리방침 버전 번호: v1.0
                    <br />
                    - 공고일자: 2023년 10월 10일
                    <br />- 시행일자:2023년 10월 20일
                  </ContentsText>
                </div>
              </ScrollBarSmall>
            </TextOutBox>
          </ScrollBarLarge>
        </BodyContainer>
      )}
    </Wrapper>
  );
};

export default SettingsPage;

/*

<ModalBg>
          <ModalWrapper>
            <XWrapper
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.9142 23.9142C39.6953 23.1332 39.6953 21.8668 38.9142 21.0858C38.1332 20.3047 36.8668 20.3047 36.0858 21.0858L30 27.1716L23.9142 21.0858C23.1332 20.3047 21.8668 20.3047 21.0858 21.0858C20.3047 21.8668 20.3047 23.1332 21.0858 23.9142L27.1716 30L21.0858 36.0858C20.3047 36.8668 20.3047 38.1332 21.0858 38.9142C21.8668 39.6953 23.1332 39.6953 23.9142 38.9142L30 32.8284L36.0858 38.9142C36.8668 39.6953 38.1332 39.6953 38.9142 38.9142C39.6953 38.1332 39.6953 36.8668 38.9142 36.0858L32.8284 30L38.9142 23.9142Z"
                  fill="#434343"
                />
              </svg>
            </XWrapper>
            <ModalFlex>
              <img src="/design_image/AlertWarning.png" alt="delete" width={128} />
              <TitleModal>변경한 학점을 저장하시겠습니까?</TitleModal>
              <br />
              <Description>
                수정을 저장하면 이번 이중전공 지원 시즌 동안 <br /> 단 한 번의 학점 수정 기회가 남아요.
              </Description>
              <div style={{ display: 'flex', gap: 22, marginTop: 60 }}>
                <div
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    navigate('/settings');
                  }}
                >
                  <LabelButton
                    buttonType="secondary"
                    size="medium"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    취소
                  </LabelButton>
                </div>
                <div
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    thirdSubmit();
                  }}
                >
                  <LabelButton buttonType="primary" size="medium">
                    확인
                  </LabelButton>
                </div>
              </div>
            </ModalFlex>
          </ModalWrapper>
        </ModalBg>




*/
