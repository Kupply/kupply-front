import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { MobileSelectedState, SBContentState } from "../../store/atom";
import client from "../../utils/HttpClient";
import { StateOptions } from "../assets/field/Input01";
import { majorAllList } from "../../common/MajorAll";
import { majorTargetList } from "../../common/MajorTarget";
import SettingsWrapper from "../components/settings/SettingsWrapper";
import { MainTable } from "../components/settings/MainTable";
import Typography from "../../assets/Typography";
import Input01 from "../assets/field/Input01";
import { placeholderMapping, helpMessageMapping, errorMessageMapping } from "../components/signup/UserInput";
import DropDown from "../assets/selectControl/DropDown";
import TextAreaBox from "../assets/textarea/TextArea01";
import SettingsModal from "../components/settings/SettingsModal";
import { MobileScroll } from "../assets/scroll/MobileScroll";
import { TermsText1, TermsText2 } from "../components/signup/TermsText";


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

export const MobileSettingsPage = () => {
  // selected == 0이면 main, 1이면 나의 기본정보 수정, 2이면 프로필 사진/닉네임 변경, 3이면 마이보드 프로필 수정, 4이면 계졍관리
  const [selected, setSelected] = useRecoilState(MobileSelectedState);
  const navigate = useNavigate();

  const [scrollActive, setActive] = useState(false);
  // 잠시 수정 
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
  }, [nicknameCheck]);

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
      if(year <= 23 || (semester !== 1 && semester !==2)){
        alert('유효한 학기를 입력해주세요!');
      }else{
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

  return(

    <SettingsWrapper selected={selected} onClickFunction={
      selected == 1 ? firstSubmit : 
      selected == 2 ? secondSubmit : 
      selected == 3 ? () => {setModalOpen((prev) => !prev)} : 
      selected == 4 ? fourthSubmit : 
      () => {}}>
      {modalOpen && (
        <SettingsModal
        isOpenModal={modalOpen}
        setOpenModal={setModalOpen}
        onClickModal={() => {setModalOpen(!modalOpen)}}
        onCheck={thirdSubmit}
        />
      )}
      {selected == 0 && (
        <>
        <MainTable/>
        <Line/>
        <div style={{marginLeft: '4.44vw'}} onClick={() => {navigate('/delete')}}>
          <Typography style={{color: '#EE6767', opacity: 0.6}} size="4.44vw">계졍삭제</Typography>
        </div>
        </>
      )}
      {selected == 1 && (
        <>
          <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">이름&nbsp;</Typography>
            <Typography size="3.33vw" bold="500">수정하기</Typography>
          </TextBox>
          <Input01 
            placeholder={placeholderMapping['name']}
            value={name}
            state={nameState}
            setState={setNameState}
            setValue={setName}
            helpMessage={helpMessageMapping['name']}
            errorMessage={errorMessageMapping['name']}
            />
          </ContentsWrapper>
          <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">고려대학교 학번&nbsp;</Typography>
            <Typography size="3.33vw" bold="500">수정하기</Typography>
          </TextBox>
          <Input01 
            placeholder={placeholderMapping['studentId']}
            value={stdID}
            state={stdIDState}
            setState={setStdIDState}
            setValue={setStdID}
            helpMessage={helpMessageMapping['studentId']}
            errorMessage={errorMessageMapping['studentId']}
            />
          </ContentsWrapper>
          <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">본전공(1전공)&nbsp;</Typography>
            <Typography size="3.33vw" bold="500">수정하기</Typography>
          </TextBox>
            <DropDown
              title={placeholderMapping['firstMajor']}
              value={firstMajor}
              setValue={setFirstMajor}
              optionList={majorAllList}
            />
          </ContentsWrapper>
        </>
      )}
      {selected == 2 && (
        <>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">프로필 사진&nbsp;</Typography>
            <Typography size="3.33vw" bold="500">변경하기</Typography>
          </TextBox>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <CurrentImg
              src={
                userProfilePic === 'customProfile'
                  ? userProfileLink
                  : `designImage/character/rectProfile/${userProfilePic}.png`
              }
              alt="current profile"
            />
            
              <CandidateImgsWrapper>
                {Array.from({ length: 4 }, (_, index) => (
                  <CandidateImg
                    src={`designImage/character/rectProfile/RectProfile${index+1}.png`}
                    alt={`candidate profile ${index+1}`}
                    onClick={() => setUserProfilePic(`rectProfile${index+1}`)}
                  />
                ))}
              </CandidateImgsWrapper>
            </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">닉네임&nbsp;</Typography>
            <Typography size="3.33vw" bold="500">수정하기</Typography>
          </TextBox>
          <Input01
            state={nicknameState}
            setState={setNicknameState}
            value={nickname}
            setValue={setNickname}
          />
        </ContentsWrapper>
        </>
      )}
      {selected == 3 && (
        <>
          <ContentsWrapper>
            <TextBox>
              <Typography size="3.33vw" bold="500">희망하는&nbsp;</Typography>
              <Typography size="3.33vw" bold="700">이중전공</Typography>
              <Typography size="3.33vw" bold="500">을 선택해주세요.</Typography>
            </TextBox>
            <DropDown
              title={placeholderMapping['hopeMajor1']}
              optionList={majorTargetList.filter((el) => el.value1 !== hopeMajor2 && el.value1 !== firstMajor)}
              value={hopeMajor1}
              setValue={setHopeMajor1}
            />
            <DropDown
              title={placeholderMapping['hopeMajor2']}
              optionList={majorTarget.filter((el) => el.value1 !== hopeMajor1 && el.value1 !== firstMajor)}
              value={hopeMajor2}
              setValue={setHopeMajor2}
            />
          </ContentsWrapper>
          <ContentsWrapper>
            <TextBox>
              <Typography size="3.33vw" bold="700">학점&nbsp;</Typography>
              <Typography size="3.33vw" bold="500">수정하기</Typography>
            </TextBox>
            <VerifiBoxWrapper>
            <TextAreaBox name="gpa-1" value={GPA1} setValue={setGPA1} isEntered={true} />
            <div style={{ marginTop: '8vw', width: '2px', height: '2px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
                <circle cx="1" cy="1" r="1" fill="#141414" />
              </svg>
            </div>
            <TextAreaBox name="gpa-2" value={GPA2} setValue={setGPA2} isEntered={true} />
            <TextAreaBox name="gpa-3" value={GPA3} setValue={setGPA3} isEntered={true} setRef={setLastBoxRef} />
          </VerifiBoxWrapper>

          </ContentsWrapper>
          <ContentsWrapper>
            <TextBox>
              <Typography size="3.33vw" bold="700">희망 이중 지원학기&nbsp;</Typography>
              <Typography size="3.33vw" bold="500">수정하기</Typography>
            </TextBox>
            <VerifiBoxWrapper>
            <TextAreaBox
              name="semester-1"
              value={hopeSemester1}
              setValue={setHopeSemester1}
              isEntered={hopeSemester1 ? true : false}
              />
            <TextAreaBox
              name="semester-2"
              value={hopeSemester2}
              setValue={setHopeSemester2}
              isEntered={hopeSemester2 ? true : false}
            />
            <Typography size="3.33vw" bold="500" style={{ marginTop: '7.5vw' }}>년도</Typography>
            <TextAreaBox
              name="semester-3"
              value={hopeSemester3}
              setValue={setHopeSemester3}
              isEntered={hopeSemester3 ? true : false}
            />
            <Typography size="3.33vw" bold="500" style={{ marginTop: '7.5vw' }}>학기</Typography>
          </VerifiBoxWrapper>
          </ContentsWrapper>
        </>
      )}
      {selected == 4 && (
        <>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">쿠플라이 아이디</Typography>
          </TextBox>
          <Input01
            state={emailState}
            setState={setEmailState}
            value={email}
            setValue={setEmail}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">비밀번호&nbsp;</Typography>
            <Typography size="3.33vw" bold="500">변경하기</Typography>
          </TextBox>
          <Input01
            state={passwordState}
            setState={setPasswordState}
            value={pwd}
            setValue={setPwd}
            placeholder={placeholderMapping['password']}
            errorMessage={errorMessageMapping['password']}
            helpMessage={'대소문자와 특수문자를 포함해주세요!'}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">비밀번호 재확인</Typography>
            <Typography size="3.33vw" bold="500">하기</Typography>
          </TextBox>
          <Input01
          state={password2State}
          setState={setPassword2State}
          value={pwdConfirm}
          setValue={setPwdConfirm}
          placeholder={placeholderMapping['password2']}
          errorMessage={errorMessageMapping['password2']}
          helpMessage={helpMessageMapping['password2']}
          />
        </ContentsWrapper>
        </>
      )}
      {selected == 5 && (
        <>
        <TextBox>
          <Typography size="3.33vw" bold="700">서비스 이용약관</Typography>
        </TextBox>
        <TextOutBox>
          <MobileScroll height='30vw'>
            <TermsText1 />
          </MobileScroll>
        </TextOutBox>
        <TextBox>
          <Typography size="3.33vw" bold="700">개인정보 처리방침</Typography>
        </TextBox>
        <TextOutBox>
          <MobileScroll height='30vw'>
            <TermsText2 />
          </MobileScroll>
        </TextOutBox>
        </>
      )}
    </SettingsWrapper>
  );
}

const Line = styled.div`
height: 1px;
width: 100%;
background-color: var(--DF_Grey-2, #DFDFDF);
`;

const TextBox = styled.div`
width: 100%;
align-items: flex-start;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw; /* 9px */
  width: 91.111vw; /* 328px */
  margin-bottom: 2px;
`;

const CurrentImg = styled.img`
  width: 27.5vw; //153px;
  height: 27.5vw; //153px;
  object-fit: cover;
`;

const CandidateImgsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const CandidateImg = styled.img`
  width: 13.33vw; //74px;
  height: 13.33vw; //74px;
  object-fit: cover;
  cursor: pointer;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 0.6771vw;
`;

const TextOutBox = styled.div`
  width: 91.11vw;
  height: 38.9vw;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4167vw; // 8px;

  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 2.78vw;
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
  z-index: 1;
`;
