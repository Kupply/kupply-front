import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api_url, client } from './HttpClient';
import { emailAtom, errorMessageState, userState } from '../store/atom';
import { inputState } from '../components/signUp/UserInput';
import { userType } from '../store/atom';
import {
  useEmailVerification,
  useNicknameVerification,
  usePassword2Verification,
  usePasswordVerification,
  useStudentIdVerification,
} from './UserInputVerification';
import { nameToMajorCodeMapping } from '../mappings/Mappings';

export const sendEmail = async (email: string) => {
  const url = `${api_url}/auth/sendEmail`;
  try {
    await client.post('/auth/sendEmail', { email: email });
    return true;
  } catch (e: any) {
    alert(e.response.data.error.message);
    console.log(e);
    return false;
  }
};

// candidate이나 passer가 들어옴
export const join = async (role: string) => {
  const url = `${api_url}/auth/join`;
  const commonData = {
    name: sessionStorage.getItem('name'),
    studentId: Number(sessionStorage.getItem('studentId')),
    nickname: sessionStorage.getItem('nickname'),
    email: sessionStorage.getItem('email'),
    password: sessionStorage.getItem('password'),
    firstMajor: sessionStorage.getItem('firstMajor'),
    role: sessionStorage.getItem('role'),
  };
  console.log(commonData);
  if (role === 'passer') {
    await client.post('/auth/join', {
      ...commonData,
      passSemester: sessionStorage.getItem('passSemester'),
      passGPA: parseFloat(sessionStorage.getItem('passGPA') || ''),
      secondMajor: sessionStorage.getItem('secondMajor'),
    });
  } else if (role === 'candidate') {
    await client.post('/auth/join', {
      ...commonData,
      curGPA: sessionStorage.getItem('curGPA'),
      hopeMajor1: sessionStorage.getItem('hopeMajor1'),
      hopeMajor2: sessionStorage.getItem('hopeMajor2'),
      hopeSemester: sessionStorage.getItem('hopeSemester'),
    });
  }
};

export const koreapasJoin = async (role: string, nickname: string, email: string) => {
  const campus = sessionStorage.getItem('firstMajorCampus');

  let userData;

  if (campus === 'A') {
    userData = {
      koreapasUUID: sessionStorage.getItem('koreapasUUID'),
      name: sessionStorage.getItem('name'),
      studentId: Number(sessionStorage.getItem('studentId')),
      firstMajorCode: sessionStorage.getItem('firstMajorCode'),
      campus,
      email,
      nickname,
      role,
    };
  } else {
    // campus === 'S'
    const firstMajorName = sessionStorage.getItem('firstMajorSejong') || '';
    const firstMajorCode = nameToMajorCodeMapping[firstMajorName];

    userData = {
      koreapasUUID: sessionStorage.getItem('koreapasUUID'),
      name: sessionStorage.getItem('name'),
      studentId: Number(sessionStorage.getItem('studentId')),
      firstMajorCode: firstMajorCode,
      campus,
      email,
      nickname,
      role,
    };
  }

  if (role === 'passer') {
    Object.assign(userData, {
      secondMajor: sessionStorage.getItem('secondMajor'),
      passSemester: sessionStorage.getItem('passSemester'),
      passGPA: parseFloat(sessionStorage.getItem('passGPA') || '0'),
    });
  } else if (role === 'candidate') {
    Object.assign(userData, {
      curGPA: parseFloat(sessionStorage.getItem('curGPA') || '0'),
      hopeMajor1: sessionStorage.getItem('hopeMajor1'),
      hopeMajor2: sessionStorage.getItem('hopeMajor2'),
    });
  }

  try {
    console.log('THIS IS FROM SIGNUPFUNCTION KOREAPASJOIN', userData);
    await client.post('/auth/koreapasJoin', userData);
  } catch (e) {
    console.error(e);
    throw e; // 여기서 return이 아니라 throw 해야 try/catch에서 catch됨
  }
};

export function useSignUp0Verification() {
  const { idVerified } = useEmailVerification('signUp');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (idVerified) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [idVerified]);

  return { idVerified, complete };
}
export function useNewSignUp1Verification() {
  const [ID, setID] = useRecoilState(userState('koreapasID')); // 지금 얘만 문제인데?
  const [pass, setPass] = useRecoilState(userState('koreapasPass'));
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (ID.info !== '') setID((prev) => ({ ...prev, infoState: 'filled' }));
    if (pass.info !== '') setPass((prev) => ({ ...prev, infoState: 'filled' }));
  }, []);

  useEffect(() => {
    console.log('ID.infostate: ', ID.infoState, 'pass.infostate: ', pass.infoState);
    if (ID.infoState === 'filled' && pass.infoState === 'filled' && !complete) {
      setComplete(true);
    } else if (!(ID.infoState === 'filled' && pass.infoState === 'filled') && complete) {
      setComplete(false);
    }
  }, [ID.infoState, pass.infoState, complete]);

  return {
    complete,
    ID: ID.info,
    pass: pass.info,
  };
}

export function useSignUp2Verification() {
  const [name, setName] = useRecoilState(userState('name'));
  const [stdId, setStdId] = useRecoilState(userState('studentId'));
  // const [firstM, setFirstM] = useRecoilState(userState('firstMajor'));
  const [complete, setComplete] = useState(false);
  const { stdIdVerified } = useStudentIdVerification('signUp');
  const navigate = useNavigate();

  // 잠시 수정
  // useEffect(() => {
  //   if (!sessionStorage.getItem('email')) navigate('/');
  //   else {
  //     sessionStorage.removeItem('firstMajor'); //dropdown value는 초기화
  //     if (name.info !== '') setName((prev) => ({ ...prev, infoState: 'filled' }));
  //     if (stdId.info !== '') setStdId((prev) => ({ ...prev, infoState: 'filled' }));
  //   }
  // }, []);
  // name, stdId, firstMajor의 completed 여부

  useEffect(() => {
    if (name.infoState === 'filled' && stdIdVerified && !complete) {
      setComplete(true);
    } else if (!(name.infoState === 'filled' && stdIdVerified) && complete) {
      setComplete(false);
    }
  }, [name.infoState, stdIdVerified, complete]);

  return {
    complete,
  };
}

export function useSignUp3Verification() {
  const { idVerified } = useEmailVerification('signUp');
  const { passwordVerified } = usePasswordVerification('signUp');
  const { password2Verified } = usePassword2Verification('signUp');
  const { nicknameVerified } = useNicknameVerification('signUp');
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

  useEffect(() => {
    if (!sessionStorage.getItem('name')) navigate('/');
    else {
      sessionStorage.removeItem('password'); //비밀번호는 삭제
      if (nickname.info !== '') setNickname((prev) => ({ ...prev, infoState: 'filled' }));
    }
  }, []);

  return { complete };
}

export function useSignUp4CandidateHandler() {
  const [gpaState, setGpaState] = useState<inputState>('incomplete');
  const [majorState, setMajorState] = useState<inputState>('incomplete');
  const [complete, setComplete] = useState(false);
  const [next, setNext] = useState<boolean>(false);
  const navigate = useNavigate();

  // 먼저 모두 찼는지 확인 - error은 complete된걸 imply한다 VerificationForm에서 확인가능
  useEffect(() => {
    if ((gpaState === 'complete' || gpaState === 'error') && majorState === 'complete') setComplete(true);
  }, [gpaState, majorState]);

  useEffect(() => {
    if (!sessionStorage.getItem('role')) navigate('/');
    sessionStorage.removeItem('secondMajor');
    sessionStorage.removeItem('passGPA');
    sessionStorage.removeItem('passSemester');
  }, []);

  // buttonActive에서만 작동
  const handleNext = () => {
    if (gpaState === 'error') alert('유효한 학점을 입력해주세요.');
    if (gpaState === 'complete') {
      setNext(true);
      Promise.resolve().then(() => {
        navigate('/signup5');
      });
    }
  };

  const handlePrev = () => {
    navigate('/signup4');
  };

  return {
    gpaState,
    setGpaState,
    majorState,
    setMajorState,
    complete,
    next,
    handleNext,
    handlePrev,
  };
}

export function useSignUp4PasserHandler() {
  const [gpaState, setGpaState] = useState<inputState>('incomplete');
  const [semesterState, setSemesterState] = useState<inputState>('incomplete');
  const [majorState, setMajorState] = useState<inputState>('incomplete');
  const [complete, setComplete] = useState(false);
  const [next, setNext] = useState<boolean>(false);
  const navigate = useNavigate();

  // 먼저 모두 찼는지 확인 - error은 complete된걸 imply한다 VerificationForm에서 확인가능
  useEffect(() => {
    if (
      (gpaState === 'complete' || gpaState === 'error') &&
      (semesterState === 'complete' || semesterState === 'error') &&
      majorState === 'complete'
    )
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
    if (gpaState === 'error') alert('유효한 학점을 입력해주세요.');
    if (semesterState === 'error') alert('유효한 학기를 입력해주세요.');
    if (gpaState === 'complete' && semesterState === 'complete') {
      setNext(true);
      Promise.resolve().then(() => {
        navigate('/signup5');
      });
    }
  };

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

export function useNewSignUp5Verification() {
  const { idVerified, ID, setID } = useEmailVerification('signUp');
  const { nicknameVerified, nickname, setNickname } = useNicknameVerification('signUp');
  // const [nickname, setNickname] = useRecoilState(userState('nickname'));
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (nicknameVerified && idVerified && !complete) {
      setComplete(true);
    } else if (!(nicknameVerified && idVerified) && complete) {
      setComplete(false);
    }
  }, [nicknameVerified, complete, idVerified]);

  // useEffect(() => {
  //   if (!sessionStorage.getItem('name')) navigate('/');
  //   else {
  //     if (nickname.info !== '') setNickname((prev) => ({ ...prev, infoState: 'filled' }));
  //   }
  // }, []);

  return {
    complete,
    ID,
    nickname,
  };
}
