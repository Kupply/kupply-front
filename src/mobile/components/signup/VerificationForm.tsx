import styled from "styled-components";
import TextAreaBox from "../../assets/textarea/TextArea01";
import React, { useEffect, useState, useRef } from "react";
import { nextButtonState, verificationCodeState, gpaState, semesterState, isGpaChangedState, gpaSettingsState, semesterSettingsState, userState, userSettingsState } from "../../../store/atom"
import { useRecoilState, useRecoilValue } from "recoil";
import { emailAtom } from "../../../store/atom";
import { useNavigate, useRouteError } from "react-router-dom";
import axios from "axios";
import { inputState } from "../../../pages/signUp/SignUp4Page";
import Typography from "../../../assets/Typography";

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
};


export const GPAVerification:React.FC<GpaSemesterVerificationProps>  = ({userType, setState, toNext}) => {

  const [userGpa, setUserGpa] = useRecoilState(gpaState(userType));
  const [userStdId, setUserStdId] = useRecoilState(userState('studentId'));
  const [fixedGpa, setFixedGpa] = useState(false);
  const [isGpaChanged, setIsGpaChanged] = useRecoilState(isGpaChangedState);
  const {num1, num2, num3} = userGpa;
  const [lastBoxRef, setLastBoxRef] = useState<any>(null);

  // candidate인지 passer인지에 따라 달라져야 할듯
  const originGPA1 = useRef<string>(localStorage.getItem(userType === 'candidate' ? 'curGPA' : 'passGPA')?.charAt(0) || '');
  const originGPA2 = useRef<string>(localStorage.getItem(userType === 'candidate' ? 'curGPA' : 'passGPA')?.charAt(2) || '');
  const originGPA3 = useRef<string>(localStorage.getItem(userType === 'candidate' ? 'curGPA' : 'passGPA')?.charAt(3) || '');

  useEffect(()=>{
    if(+userStdId.info.slice(2, 4) === 24){
      setUserGpa({
        num1: '0',
        num2: '0',
        num3: '0'
      });
      setFixedGpa(true);
    }
  },[]);

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

  if(toNext){
    sessionStorage.setItem(userType === 'candidate' ? 'curGPA' : 'passGPA', num1 + '.' + num2 + num3);
  }

  return (
    <VerifiBoxWrapper>
      <TextAreaBox name="gpa-1" value={num1} setValue={fixedGpa ? ()=>{} : (value) => handleGPAState(`num1`, value)}/>
      <div style={{ marginTop: '33px', width: '5px', height: '10px', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none">
          <circle cx="1" cy="1" r="1" fill="#141414" />
        </svg>
      </div>
      <TextAreaBox name="gpa-2" value={num2} setValue={fixedGpa ? ()=>{} :(value) => handleGPAState(`num2`, value)}/>
      <TextAreaBox name="gpa-3" value={num3} setValue={fixedGpa ? ()=>{} :(value) => handleGPAState(`num3`, value)} setRef={setLastBoxRef}/>
    </VerifiBoxWrapper>
  )
  
}


/* ---------------------------------------------------------------- */
export const SemesterVerification:React.FC<GpaSemesterVerificationProps> =  ({userType, setState, toNext}) => {

  const [userSemester, setUserSemester] = useRecoilState(semesterState(userType));
  const {num1, num2, num3} = userSemester;

  useEffect(() => {
    const semesterYear = +(num1 + num2);
    if(!!num1 && !!num2 && !!num3) {
      setState?.('complete')

      // 학기가 1, 2가 아니면 안되고 바라는 학기가 24보다 작으면 안된다 
      if((!(num3 === '1' || num3 === '2') || semesterYear < 24 && userType === 'candidate'))
        setState?.('error');

      // 통과한 사람은 학기가 1, 2가 아니면 안되고 24이후에 통과한 사람이면 안되지 
      else if((!(num3 === '1' || num3 === '2') || semesterYear >= 24) && userType === 'passer'){
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
    sessionStorage.setItem(userType === 'candidate' ? 'hopeSemester' : 'passSemester', '20' + num1 + num2 + '-' + num3);
  }

  return (
  <VerifiBoxWrapper>
    <TextAreaBox name="semester-1" value={num1} setValue={(value) => handleSemesterState('num1', value)}/>
    <TextAreaBox name="semester-2" value={num2} setValue={(value) => handleSemesterState('num2', value)}/>
    <Typography size="12px" bold="400" style={{ marginTop: '33px' }}>년도</Typography>
    <TextAreaBox name="semester-3" value={num3} setValue={(value) => handleSemesterState('num3', value)}/>
    <Typography size="12px" bold="400" style={{ marginTop: '33px' }}>학기</Typography>
  </VerifiBoxWrapper>
  )

}

/* --------------------------------------- */
export const CurSemesterVerification:React.FC<GpaSemesterVerificationProps> = ({userType, setState, toNext}) => {
  const [currentSemester1, setCurrentSemester1] = useState<string>(
    localStorage.getItem('currentSemester')?.charAt(0) || '',
  );
  const [currentSemester2, setCurrentSemester2] = useState<string>(
    localStorage.getItem('currentSemester')?.charAt(2) || '',
  );
  useEffect(() => {
    if (
      !!currentSemester1 && !!currentSemester2 && 
      (+currentSemester1 >= 1 && +currentSemester1 <=4) && (+currentSemester2 === 1 || +currentSemester2 === 2)
    ) {
      setState?.('complete');
    } else{
      setState?.('error');
    }
  }, [currentSemester1, currentSemester2]);

  return (
    <VerifiBoxWrapper>
      <TextAreaBox name="currentSemester-1" value={currentSemester1} setValue={setCurrentSemester1} />
      <div style={{ marginTop: '1.263vw', width: '0.729vw', height: '0.1042vw' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 2" fill="none">
          <path d="M0 1H14" stroke="#B9B9B9" />
        </svg>
      </div>
      <TextAreaBox name="currentSemester-2" value={currentSemester2} setValue={setCurrentSemester2} />
    </VerifiBoxWrapper>
  )
}

const CodeVerifiBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const VerifiBoxWrapper = styled.div`
  display: flex;
  gap: 0.6771vw;
`;






