import axios from 'axios';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

import { api_url } from '../../utils/HttpClient';
import TextAreaBox from '../../assets/TextArea';
import Typography from '../../assets/Typography';
import { inputState } from './UserInput';
import {
  nextButtonState,
  verificationCodeState,
  gpaState,
  semesterState,
  isGpaChangedState,
  gpaSettingsState,
  semesterSettingsState,
  userState,
  userSettingsState,
  currentSemesterState,
} from '../../store/atom';

export const CodeVerification = () => {
  const [codeState, setCodeState] = useRecoilState(verificationCodeState);
  const email = sessionStorage.getItem('email') || '';
  const [nextButton, setNextButton] = useRecoilState(nextButtonState);
  const { num1, num2, num3, num4, num5, num6 } = codeState;
  const navigate = useNavigate();

  const handleCodeState = (boxNum: string, value: string) => {
    setCodeState((prev) => ({
      ...prev,
      [boxNum]: value,
    }));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text/plain').slice(0, 6);

    if (/^\d{6}$/.test(clipboardData)) {
      setCodeState({
        num1: clipboardData[0],
        num2: clipboardData[1],
        num3: clipboardData[2],
        num4: clipboardData[3],
        num5: clipboardData[4],
        num6: clipboardData[5],
      });
    }
  };

  useEffect(() => {
    async function handleVerification() {
      const entireCode = num1 + num2 + num3 + num4 + num5 + num6;
      const url = `${api_url}/auth/certifyEmail`;
      try {
        await axios.post(url, { email: email, code: entireCode });
        navigate('/signup2');
      } catch (err: any) {
        alert(err.response.data.error.message);
      }
    }

    if (!!num1 && !!num2 && !!num3 && !!num4 && !!num5 && !!num6) {
      // verify 되면 자동으로 signup2로 넘어간다
      setNextButton(true);

      handleVerification();
    } else {
      setNextButton(false);
    }
  }, [num1, num2, num3, num4, num5, num6]);

  return (
    <CodeVerifiBoxWrapper>
      {Array.from({ length: 6 }, (_, index) => (
        <TextAreaBox
          key={index}
          name={`pin-${index + 1}`}
          value={eval(`num${index + 1}`)}
          setValue={(value) => handleCodeState(`num${index + 1}`, value)}
          onPaste={index == 0 ? handlePaste : undefined}
        />
      ))}
    </CodeVerifiBoxWrapper>
  );
};

// Settings에서는 localStorage에 저장, SignUp에서는 sessionStorage에 저장
type LocationUsed = 'Settings' | 'SignUp';

/* ---------------------------------------------------------------- */
interface GpaSemesterVerificationProps {
  userType: 'passer' | 'candidate';
  state?: inputState;
  setState?: (args: inputState) => void;
  toNext?: boolean;
  locationUsed?: LocationUsed;
}

export const GPAVerification: React.FC<GpaSemesterVerificationProps> = ({
  userType,
  setState,
  toNext,
  locationUsed = 'SignUp',
}) => {
  const [userGpa, setUserGpa] = useRecoilState(
    locationUsed === 'SignUp' ? gpaState(userType) : gpaSettingsState(userType),
  );
  const [userStdId, setUserStdId] = useRecoilState(
    locationUsed === 'SignUp' ? userState('studentId') : userSettingsState('studentId'),
  );
  const [fixedGpa, setFixedGpa] = useState(false);
  const [isGpaChanged, setIsGpaChanged] = useRecoilState(isGpaChangedState);
  const { num1, num2, num3 } = userGpa;
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  // candidate인지 passer인지에 따라 달라져야 할듯
  const originGPA1 = useRef<string>(
    localStorage.getItem(userType === 'candidate' ? 'curGPA' : 'passGPA')?.charAt(0) || '',
  );
  const originGPA2 = useRef<string>(
    localStorage.getItem(userType === 'candidate' ? 'curGPA' : 'passGPA')?.charAt(2) || '',
  );
  const originGPA3 = useRef<string>(
    localStorage.getItem(userType === 'candidate' ? 'curGPA' : 'passGPA')?.charAt(3) || '',
  );

  // useEffect(()=>{
  //   if(+userStdId.info.slice(2, 4) === 24){
  //     setUserGpa({
  //       num1: '0',
  //       num2: '0',
  //       num3: '0'
  //     });
  //     setFixedGpa(true);
  //   }
  // },[]);

  useEffect(() => {
    if (parseFloat(`${num1}.${num2}${num3}`) > 4.5) {
      setUserGpa({
        num1: '4',
        num2: '5',
        num3: '0',
      });

      if (lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [userGpa, lastBoxRef]);

  useEffect(() => {
    if (!!num1 && !!num2 && !!num3) {
      setState?.('complete');
      if (+(num1 + '.' + num2 + num3) > 4.5) setState?.('error');
    }
  }, [userGpa]);

  const handleGPAState = (num: string, value: string) => {
    setUserGpa((prev) => ({
      ...prev,
      [num]: value,
    }));
  };

  // Settings에서는 비정상적인 학점 변화를 감지해야 한다
  // 이를 바탕으로 isGPAChanged를 변경 이를 thirdSubmit에서 활용
  useEffect(() => {
    if (locationUsed === 'Settings') {
      const newGpa = parseFloat(num1 + '.' + num2 + num3);
      const oldGpa = parseFloat(originGPA1.current + '.' + originGPA2.current + originGPA3.current);

      // 제대로 작동
      console.log(newGpa, oldGpa);

      if (Math.abs(oldGpa - newGpa) >= 1.5) {
        setIsGpaChanged({ changed: true, strange: true });
      } else if (oldGpa !== newGpa) {
        setIsGpaChanged({ changed: true, strange: false });
      } else {
        setIsGpaChanged({ changed: false, strange: false });
      }
    }
    console.log(isGpaChanged);
  }, [userGpa]);

  // toNext는 signUp에서만 사용
  if (toNext) {
    sessionStorage.setItem(userType === 'candidate' ? 'curGPA' : 'passGPA', num1 + '.' + num2 + num3);
  }

  return (
    <VerifiBoxWrapper>
      <TextAreaBox
        name="gpa-1"
        value={num1}
        setValue={fixedGpa ? () => {} : (value) => handleGPAState(`num1`, value)}
      />
      <div style={{ marginTop: '3.021vw', width: '2px', height: '2px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
          <circle cx="1" cy="1" r="1" fill="#141414" />
        </svg>
      </div>
      <TextAreaBox
        name="gpa-2"
        value={num2}
        setValue={fixedGpa ? () => {} : (value) => handleGPAState(`num2`, value)}
      />
      <TextAreaBox
        name="gpa-3"
        value={num3}
        setValue={fixedGpa ? () => {} : (value) => handleGPAState(`num3`, value)}
        setRef={setLastBoxRef}
      />
    </VerifiBoxWrapper>
  );
};

/* ---------------------------------------------------------------- */
export const SemesterVerification: React.FC<GpaSemesterVerificationProps> = ({
  userType,
  setState,
  toNext,
  locationUsed = 'SignUp',
}) => {
  const [userSemester, setUserSemester] = useRecoilState(
    locationUsed === 'SignUp' ? semesterState(userType) : semesterSettingsState(userType),
  );
  const { num1, num2, num3 } = userSemester;

  useEffect(() => {
    const semesterYear = +(num1 + num2);
    if (!!num1 && !!num2 && !!num3) {
      setState?.('complete');

      // 학기가 1, 2가 아니면 안되고 바라는 학기가 24보다 작으면 안된다
      if (!(num3 === '1' || num3 === '2') || (semesterYear < 24 && userType === 'candidate')) setState?.('error');
      // 통과한 사람은 학기가 1, 2가 아니면 안돼
      else if ((!(num3 === '1' || num3 === '2') || semesterYear >= 25) && userType === 'passer') {
        setState?.('error');
      }
    }
  }, [userSemester]);

  const handleSemesterState = (num: string, value: string) => {
    setUserSemester((prev) => ({
      ...prev,
      [num]: value,
    }));
  };

  // toNext는 signUp에서만 활용
  if (toNext) {
    sessionStorage.setItem(userType === 'candidate' ? 'hopeSemester' : 'passSemester', '20' + num1 + num2 + '-' + num3);
  }

  return (
    <VerifiBoxWrapper>
      <TextAreaBox name="semester-1" value={num1} setValue={(value) => handleSemesterState('num1', value)} />
      <TextAreaBox name="semester-2" value={num2} setValue={(value) => handleSemesterState('num2', value)} />
      <Typography size="0.833vw" bold="500" style={{ marginTop: '3.021vw' }}>
        년도
      </Typography>
      <TextAreaBox name="semester-3" value={num3} setValue={(value) => handleSemesterState('num3', value)} />
      <Typography size="0.833vw" bold="500" style={{ marginTop: '3.021vw' }}>
        학기
      </Typography>
    </VerifiBoxWrapper>
  );
};

/* --------------------------------------- */
export const CurSemesterVerification: React.FC<GpaSemesterVerificationProps> = ({ userType, setState, toNext }) => {
  const [curSemester, setCurSemester] = useRecoilState(currentSemesterState(userType));

  useEffect(() => {
    if (
      !!curSemester.num1 &&
      !!curSemester.num2 &&
      +curSemester.num1 >= 1 &&
      +curSemester.num1 <= 4 &&
      (+curSemester.num2 === 1 || +curSemester.num2 === 2)
    ) {
      setState?.('complete');
    } else {
      setState?.('error');
    }
  }, [curSemester]);

  const handleSemesterState = (num: string, value: string) => {
    setCurSemester((prev) => ({
      ...prev,
      [num]: value,
    }));
  };

  return (
    <VerifiBoxWrapper>
      <TextAreaBox
        name="currentSemester-1"
        value={curSemester.num1}
        setValue={(value) => handleSemesterState('num1', value)}
      />
      <div style={{ marginTop: '1.263vw', width: '0.729vw', height: '0.1042vw' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 2" fill="none">
          <path d="M0 1H14" stroke="#B9B9B9" />
        </svg>
      </div>
      <TextAreaBox
        name="currentSemester-2"
        value={curSemester.num2}
        setValue={(value) => handleSemesterState('num2', value)}
      />
    </VerifiBoxWrapper>
  );
};

const CodeVerifiBoxWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 0.6771vw;
`;
