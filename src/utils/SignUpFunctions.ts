import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailAtom, errorMessageState, userState } from "../store/atom";
import { useEffect, useState } from "react";
import { inputState } from "../pages/signUp/SignUp4Page";
import { userType } from "../store/atom";
import client from "./HttpClient";

export function useEmailVerification(){
  const [complete, setComplete] = useState(false);
  const [ID, setID] = useRecoilState(userState('kuEmail'));

  console.log(ID);
  const IDPattern = /.+@korea\.ac\.kr$/;
  useEffect(() => {
    if (ID.infoState === 'filled') {
      if (!IDPattern.test(ID.info)) {
        setID((prev) => ({...prev, infoState: 'error'}));
        setComplete(false);
      }
      else {
        console.log('test passed');
        setID((prev) => ({...prev, infoState: 'filled'}));
        setComplete(true);
      }
    }
  }, [ID.info, ID.infoState]);

  return {complete, ID};
}


export const sendEmail = async (email: string) => {
  const url = 'https://api.kupply.devkor.club/auth/sendEmail';
  try {
    await axios.post(url, { email: email });
    return true;
  } catch (e: any){
    alert(e.response.data.error.message);
    console.log(e);
    return false;
  }
}

export const join = async (role: string) => {
  const url = 'https://api.kupply.devkor.club/auth/join'; // 만든 API 주소로 바뀌어야 함.
  const commonData = {
    name: sessionStorage.getItem('name'),
    studentId: Number(sessionStorage.getItem('studentId')),
    nickname: sessionStorage.getItem('nickname'),
    email: sessionStorage.getItem('email'),
    password: sessionStorage.getItem('password'),
    firstMajor: sessionStorage.getItem('firstMajor'),
    role: sessionStorage.getItem('role'),
  };
  if (role === 'passer') {
    await client.post('/auth/join', {
      ...commonData,
      passSemester: sessionStorage.getItem('passerSemester'),
      passGPA: parseFloat(sessionStorage.getItem('passerGPA') || ''),
      secondMajor: sessionStorage.getItem('secondMajor'),
    });
  } else {
    await client.post('/auth/join', {
      ...commonData,
      curGPA: sessionStorage.getItem('candidateGPA'),
      hopeMajor1: sessionStorage.getItem('hopeMajor1'),
      hopeMajor2: sessionStorage.getItem('hopeMajor2'),
      hopeSemester: sessionStorage.getItem('candidateSemester'),
    });
  }
};

export function useSignUp2Validation(){
  const [name, setName] = useRecoilState(userState('name'));
  const [stdId, setStdId] = useRecoilState(userState('studentId'));
  const [firstM, setFirstM] = useRecoilState(userState('firstMajor'));
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  // 잠시 수정 
  // useEffect(() => {
  //   if (!sessionStorage.getItem('email')) navigate('/');
  //   else {
  //     sessionStorage.removeItem('firstMajor'); //dropdown value는 초기화
  //     if (name.info !== '') setName((prev) => ({...prev, infoState: 'filled'}));
  //     if (stdId.info !== '') setStdId((prev) => ({...prev, infoState: 'filled'}));
  //   }
  // }, []);

  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdId.infoState === 'filled') {
      if (!passwordCheck.test(stdId.info)) 
        setStdId((prev) => ({...prev, infoState: 'error'}));
      else setStdId((prev) => ({...prev, infoState: 'filled'}));
    }
  }, [stdId.info, stdId.infoState]);

  useEffect(() => {
    if (name.infoState === 'filled' && stdId.infoState === 'filled' && !!firstM.info && !complete) {
      setComplete(true);
    } else if (!(name.infoState === 'filled' && stdId.infoState === 'filled' && !!firstM.info) && complete) {
      setComplete(false);
    }
  }, [name.infoState, stdId.infoState, firstM.info, complete]);

  return {
    complete
  }
}

export function useSignUp3Validation(){
  const [password, setPassword] = useRecoilState(userState('password'));
  const [password2, setPassword2] = useRecoilState(userState('password2'));
  const [nickname, setNickname] = useRecoilState(userState('nickname'));
  const [errorMessages, setErrorMessages] = useRecoilState(errorMessageState);
  const [complete, setComplete] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (password.infoState === 'filled' && password2.infoState === 'filled' && nickname.infoState === 'filled' && !complete) {
      setComplete(true);
    } else if (!(password.infoState === 'filled' && password2.infoState === 'filled' && nickname.infoState === 'filled') && complete) {
      setComplete(false);
    }
  }, [password.infoState, password2.infoState, nickname.infoState, complete]);

  /* password의 유효성 검사 + 알맞은 errorMessage 설정 */
  useEffect(() => {
    const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*?])[a-zA-Z\d~!@#$%^&*?ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{8,20}$/;
    if (password.infoState === 'filled') {
      if (!passwordCheck.test(password.info)) {
        let errorMessage = '비밀번호가 ';

        if (!/(?=.*[a-zA-Z])/.test(password.info)) {
          errorMessage += ' 영문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-])/.test(password.info)) {
          errorMessage += ' 특수 문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[0-9])/.test(password.info)) {
          errorMessage += ' 숫자를 포함하고 있지 않아요!';
        } else if (password.info.length < 8) errorMessage += ' 최소 8자 이상이어야 해요!';
        else if (password.info.length > 20) errorMessage = '비밀번호는 20자를 넘어갈 수 없어요!';
        else errorMessage = '비밀번호에 허용되지 않은 문자가 포함되었어요!';
        setErrorMessages({
          ...errorMessages,
          passwordErrorMessage: errorMessage,
        });
        setPassword((prev) => ({...prev, infoState: 'error'}));
      } else setPassword((prev) => ({...prev, infoState: 'filled'}));
    }
  }, [password.info, password.infoState]);

  /* password2의 일치 여부 검사 */
  
  useEffect(() => {
    if (!!password.info && !!password2.info && password.infoState === 'filled' && password2.infoState === 'filled') {
      if (password.info === password2.info) {
        setPassword2((prev) => ({...prev, infoState: 'filled'}));
      } else {
        setPassword2((prev) => ({...prev, infoState: 'error'}));
      }
    }

  }, [password.info, password.infoState, password2.info, password2.infoState]);

  //nicknameState가 바뀔 때, 즉 창을 클릭할 때에 대한 대처이다.
  // 닉네임 제한 10->7자 수정
  useEffect(() => {
    if ((nickname.info.length === 1 || nickname.info.length > 7) && nickname.infoState !== 'focused') {
      setNickname((prev) => ({...prev, infoState: 'error'}));
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '닉네임은 2자 이상 7자 이하여야 해요.',
      });
    } else if (nickname.infoCheck === 'error' && nickname.infoState !== 'focused') {
      setNickname((prev) => ({...prev, infoState: 'error'}));
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '중복되는 닉네임이에요!',
      });
    } else if (nickname.infoCheck !== 'filled') {
      if (!(nickname.infoState === 'default' || nickname.infoState === 'focused' || nickname.infoState === 'hover')) {
        setNickname((prev) => ({...prev, infoState: 'error'}));
        setErrorMessages({
          ...errorMessages,
          nicknameErrorMessage: '닉네임 중복 검사를 완료해 주세요.',
        });
      }
    }
  }, [nickname.infoState]);

  //nickname이 바뀌면 중복 확인 검사 결과도 처음으로 돌아가야 함.
  useEffect(() => {
    setNickname((prev) => ({...prev, infoCheck: 'default'}));
  }, [nickname.info]);

  //중복 체크의 결과에 따라 nicknameState가 바뀐다.
  useEffect(() => {
    if (nickname.infoCheck === 'filled') setNickname((prev) => ({...prev, infoState: 'filled'}));
    else if (nickname.infoCheck === 'error') {
      setNickname((prev) => ({...prev, infoState: 'error'}));
      setErrorMessages({
        ...errorMessages,
        nicknameErrorMessage: '중복되는 닉네임이에요!',
      });
    }
  }, [nickname.infoCheck]);

  // 잠시 수정 
  // useEffect(() => {
  // if (!sessionStorage.getItem('name')) navigate('/');
  // else {
  //   sessionStorage.removeItem('password'); //비밀번호는 삭제
  //   if (nickname.info !== '') setNickname((prev) => ({...prev, infoState: 'filled'}));
  // }
  // }, []);

  return {complete};
}


export function useInputState(){
   // 이제 여기서 hopeMajor와 GPA와 hopeSemester에 대한 입력이 모두 이루어졌는지에 대한 확인과 
  const [gpaState, setGpaState] = useState<inputState>('incomplete');
  const [semesterState, setSemesterState] = useState<inputState>('incomplete');
  const [majorState, setMajorState] = useState<inputState>('incomplete');
  const [complete, setComplete] = useState(false);
  const [next, setNext] = useState<boolean>(false);
  const navigate = useNavigate();

  // 먼저 모두 찼는지 확인 - error은 complete된걸 imply한다 VerificationForm에서 확인가능 
  useEffect(() => {
    if((gpaState === 'complete' || gpaState === 'error') && (semesterState === 'complete' || semesterState === 'error') && majorState === 'complete') 
      setComplete(true);
  }, [gpaState, semesterState, majorState]);

  useEffect(() => {
    if (!sessionStorage.getItem('role')) navigate('/');
    sessionStorage.removeItem('secondMajor');
    sessionStorage.removeItem('passedGPA');
    sessionStorage.removeItem('passSemester');
  }, []);
  
  // buttonActive에서만 작동 
  const handleNext = () => {
    if(gpaState === 'error') alert('유효한 학점을 입력해주세요.');
    if (semesterState === 'error') alert('유효한 학기를 입력해주세요.');
    if(gpaState === 'complete' && semesterState === 'complete') {
      setNext(true);
      Promise.resolve().then(() => {
        navigate('/signup5');
      });
    }
  }

  const handlePrev = () => {
    navigate('/signup4');
  };

  return {
    gpaState,
    setGpaState,
    semesterState,
    setSemesterState,
    majorState,
    setMajorState,
    complete,
    next,
    handleNext,
    handlePrev,
  };
}
