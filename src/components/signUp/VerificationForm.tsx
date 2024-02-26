import styled from "styled-components";
import TextAreaBox from "../../assets/TextArea";
import React, { useEffect, useState, useRef } from "react";
import { nextButtonState, verificationCodeState, gpaState, semesterState, isGpaChangedState, gpaSettingsState, semesterSettingsState } from "../../store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { emailAtom } from "../../store/atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { inputState } from "../../pages/signUp/SignUp4Page";
import Typography from "../../assets/Typography";

export const CodeVerification = () => {

  const [codeState, setCodeState] = useRecoilState(verificationCodeState);
  const email = useRecoilValue(emailAtom);
  const [nextButton, setNextButton] = useRecoilState(nextButtonState);
  const {num1, num2, num3, num4, num5, num6} = codeState;
  const navigate = useNavigate();

  const handleCodeState = (boxNum:string, value:string) => {
    setCodeState((prev) => ({
      ...prev,
      [boxNum]: value
    }))
    console.log(boxNum, value, codeState);
  };

  const handlePaste = (e:React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text/plain').slice(0, 6);

    if (/^\d{6}$/.test(clipboardData)){
      setCodeState({
        num1: clipboardData[0],
        num2: clipboardData[1],
        num3: clipboardData[2],
        num4: clipboardData[3],
        num5: clipboardData[4],
        num6: clipboardData[5]
      })
    }
  }
  
  useEffect(() => {
    async function handleVerification(){
      const entireCode = num1 + num2 + num3 + num4 + num5 + num6;
      const url = 'https://api.kupply.devkor.club/auth/certifyEmail';
      try {
        await axios.post(url, { email: email, code: entireCode }); 
        navigate('/signup2');
      } catch (err: any) {
        alert(err.response.data.error.message);
      }
    }

    if(!!num1 && !!num2 && !!num3 && !!num4 && !!num5 && !!num6){ 
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
            onPaste={index === 0 ? handlePaste: undefined}
          />
        ))}
    </CodeVerifiBoxWrapper>
  )
}

// Settings에서는 localStorage에 저장, SignUp에서는 sessionStorage에 저장 
type LocationUsed = 'Settings' | 'SignUp';

/* ---------------------------------------------------------------- */
interface GpaSemesterVerificationProps{
  userType: 'passer' | 'candidate';
  state?: inputState;
  setState?: (args:inputState) => void;
  toNext?: boolean;
  locationUsed? : LocationUsed;
};


export const GPAVerification:React.FC<GpaSemesterVerificationProps>  = ({userType, setState, toNext, locationUsed = 'SignUp'}) => {

  // 
  const [userGpa, setUserGpa] = useRecoilState(locationUsed === 'SignUp' ? gpaState(userType) : gpaSettingsState(userType));
  const [isGpaChanged, setIsGpaChanged] = useRecoilState(isGpaChangedState);
  const {num1, num2, num3} = userGpa;
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  // candidate인지 passer인지에 따라 달라져야 할듯
  const originGPA1 = useRef<string>(localStorage.getItem(`${userType}GPA`)?.charAt(0) || '');
  const originGPA2 = useRef<string>(localStorage.getItem(`${userType}GPA`)?.charAt(2) || '');
  const originGPA3 = useRef<string>(localStorage.getItem(`${userType}GPA`)?.charAt(3) || '');

  useEffect(() => {
    if(parseFloat(`${num1}.${num2}${num3}`) > 4.5){
      setUserGpa({
        num1: '4',
        num2: '5',
        num3: '0'
      })

      if(lastBoxRef && lastBoxRef.current) lastBoxRef.current.focus();
    }
  }, [userGpa, lastBoxRef]);

  useEffect(() => {
    if(!!num1 && !!num2 && !!num3) {
      setState?.('complete')
      if(+(num1 + '.' + num2 + num3) > 4.5) 
        setState?.('error');
    };
    
  }, [userGpa]);

  const handleGPAState = (num:string, value:string) => {
    setUserGpa((prev) => ({
      ...prev,
      [num]: value
    }))
  };

  // Settings에서는 비정상적인 학점 변화를 감지해야 한다 
  // 이를 바탕으로 isGPAChanged를 변경 이를 thirdSubmit에서 활용
  useEffect(() => {
    if(locationUsed === 'Settings'){
      const newGpa = parseFloat(num1 + '.' + num2 + num3);
      const oldGpa = parseFloat(originGPA1.current + '.' + originGPA2.current + originGPA3.current);
      
      // 제대로 작동
      console.log(newGpa, oldGpa);

      if(Math.abs(oldGpa - newGpa) >= 1.5){
        setIsGpaChanged({changed: true, strange: true});
      }else if(oldGpa !== newGpa){
        setIsGpaChanged({changed: true, strange: false});
      }else{
        setIsGpaChanged({changed: false, strange: false});
      }
    }
    console.log(isGpaChanged);
  }, [userGpa]);

  // toNext는 signUp에서만 사용
  if(toNext){
    sessionStorage.setItem(`${userType}GPA`, num1 + '.' + num2 + num3);
  }

  return (
    <VerifiBoxWrapper>
      <TextAreaBox name="gpa-1" value={num1} setValue={(value) => handleGPAState(`num1`, value)}/>
      <div style={{ marginTop: 60 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" fill="none">
          <circle cx="1" cy="1" r="1" fill="#141414" />
        </svg>
      </div>
      <TextAreaBox name="gpa-2" value={num2} setValue={(value) => handleGPAState(`num2`, value)}/>
      <TextAreaBox name="gpa-3" value={num3} setValue={(value) => handleGPAState(`num3`, value)} setRef={setLastBoxRef}/>
    </VerifiBoxWrapper>
  )
  
}


/* ---------------------------------------------------------------- */
export const SemesterVerification:React.FC<GpaSemesterVerificationProps> =  ({userType, setState, toNext, locationUsed = 'SignUp'}) => {

  const [userSemester, setUserSemester] = useRecoilState(locationUsed === 'SignUp' ? semesterState(userType) : semesterSettingsState(userType));
  const {num1, num2, num3} = userSemester;

  useEffect(() => {
    const semesterYear = +(num1 + num2);
    if(!!num1 && !!num2 && !!num3) {
      setState?.('complete')

      console.log(userType, num1, num2, num3);
      if((!(num3 === '1' || num3 === '2') || semesterYear < 23 || (semesterYear === 23 && num1 === '1')) && userType === 'candidate') 
        setState?.('error');

      else if((!(num3 === '1' || num3 === '2') || semesterYear > 23 || (semesterYear === 23 && num3 === '2')) && userType === 'passer'){
        setState?.('error');
      }
        
    };
    
  }, [userSemester]);

  const handleSemesterState = (num:string, value:string) => {
    setUserSemester((prev) => ({
      ...prev,
      [num]: value
    }))
  };

  // toNext는 signUp에서만 활용
  if(toNext){
    sessionStorage.setItem(`${userType}Semester`, '20' + num1 + num2 + '-' + num3);
  }

  return (
  <VerifiBoxWrapper>
    <TextAreaBox name="semester-1" value={num1} setValue={(value) => handleSemesterState('num1', value)}/>
    <TextAreaBox name="semester-2" value={num2} setValue={(value) => handleSemesterState('num2', value)}/>
    <Typography size="16px" bold="500" style={{ marginTop: '58px' }}>년도</Typography>
    <TextAreaBox name="semester-3" value={num3} setValue={(value) => handleSemesterState('num3', value)}/>
    <Typography size="16px" bold="500" style={{ marginTop: '58px' }}>학기</Typography>
  </VerifiBoxWrapper>
  )

}

const CodeVerifiBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 13px;
`;







