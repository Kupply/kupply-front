import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { emailAtom, errorMessageState, userState } from "../store/atom";
import { useEffect, useState } from "react";
import { inputState } from "../pages/signUp/SignUp4Page";
import { userType } from "../store/atom";
import client from "./HttpClient";
import { useEmailVerification, useNicknameVerification, usePassword2Verification, usePasswordVerification, useStudentIdVerification } from "./UserInputVerification";


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
      passSemester: sessionStorage.getItem('passSemester'),
      passGPA: parseFloat(sessionStorage.getItem('passGPA') || ''),
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

export function useSignUp0Verification(){
  const {idVerified} = useEmailVerification('signUp');
  const [complete, setComplete] = useState(false);
  
  useEffect(() => {
    if(idVerified){
      setComplete(true);
    }else{
      setComplete(false);
    }
  }, [idVerified]);
  
  return {idVerified, complete};
}

export function useSignUp2Verification(){
  const [name, setName] = useRecoilState(userState('name'));
  const [stdId, setStdId] = useRecoilState(userState('studentId'));
  const [firstM, setFirstM] = useRecoilState(userState('firstMajor'));
  const [complete, setComplete] = useState(false);
  const {stdIdVerified} = useStudentIdVerification('signUp');
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
  // name, stdId, firstMajor의 completed 여부

  useEffect(() => {
    if (name.infoState === 'filled' && stdIdVerified && !!firstM.info && !complete) {
      setComplete(true);
    } else if (!(name.infoState === 'filled' && stdIdVerified && !!firstM.info) && complete) {
      setComplete(false);
    }
  }, [name.infoState, stdIdVerified, firstM.info, complete]);

  return {
    complete
  }

}

export function useSignUp3Verification(){
  const {idVerified} = useEmailVerification('signUp');
  const {passwordVerified} = usePasswordVerification('signUp');
  const {password2Verified} = usePassword2Verification('signUp');
  const {nicknameVerified} = useNicknameVerification('signUp');
  const [nickname, setNickname] = useRecoilState(userState('nickname'));
  const [complete, setComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (passwordVerified && password2Verified && nicknameVerified && idVerified && !complete) {
      setComplete(true);
    } else if (!(passwordVerified && password2Verified && nicknameVerified && idVerified) && complete) {
      setComplete(false);
    }
  }, [passwordVerified, password2Verified, nicknameVerified, complete, idVerified]);


  // useEffect(() => {
  // if (!sessionStorage.getItem('name')) navigate('/');
  // else {
  //   sessionStorage.removeItem('password'); //비밀번호는 삭제
  //   if (nickname.info !== '') setNickname((prev) => ({...prev, infoState: 'filled'}));
  // }
  // }, []);

  return {complete};

}


export function useSignUp4Handler(){
  
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
    sessionStorage.removeItem('passGPA');
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
