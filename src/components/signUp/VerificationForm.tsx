import styled from "styled-components";
import TextAreaBox from "../../assets/TextArea";
import React, { useEffect, useState } from "react";
import { nextButtonState, verificationCodeState, gpaState, semesterState } from "../../store/atom";
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

interface GpaSemesterVerificationProps{
  userType: 'passer' | 'candidate';
  state?: inputState;
  setState: (args:inputState) => void;
  toNext: boolean;
};

// 
export const GPAVerification:React.FC<GpaSemesterVerificationProps>  = ({userType, setState, toNext}) => {
  const [userGpa, setUserGpa] = useRecoilState(gpaState(userType));
  const {num1, num2, num3} = userGpa;
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);


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
      setState('complete')
      if(+(num1 + '.' + num2 + num3) > 4.5) 
        setState('error');
    };
    
  }, [userGpa]);

  const handleGPAState = (num:string, value:string) => {
    setUserGpa((prev) => ({
      ...prev,
      [num]: value
    }))
  };

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

// 지금 문제가 한칸에 대해서만 입력을 하는데에도 전체가 바뀌는 마법이 일어남 
export const SemesterVerification:React.FC<GpaSemesterVerificationProps> =  ({userType, setState, toNext}) => {
  const [userSemester, setUserSemester] = useRecoilState(semesterState(userType));
  const {num1, num2, num3} = userSemester;


  useEffect(() => {
    const semesterYear = +(num1 + num2);
    if(!!num1 && !!num2 && !!num3) {
      setState('complete')
      if(!(num3 === '1' || num3 === '2') || semesterYear < 23 || (semesterYear === 23 && num1 === '1')) 
        setState('error');
    };
    
  }, [userSemester]);

  const handleSemesterState = (num:string, value:string) => {
    setUserSemester((prev) => ({
      ...prev,
      [num]: value
    }))
  };

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







