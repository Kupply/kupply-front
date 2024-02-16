import styled from "styled-components";
import TextAreaBox from "../../assets/TextArea";
import { useEffect, useState } from "react";
import { nextButtonState, verificationCodeState } from "../../store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { emailAtom } from "../../store/atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// onVerificationSuccess가 함수인데 이거 type정해줘야 함 
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
    <VerifiBoxWrapper>
      <TextAreaBox name="pin-1" value={num1} setValue={(num1) => handleCodeState('num1', num1)}/>
      <TextAreaBox name="pin-2" value={num2} setValue={(num2) => handleCodeState('num2', num2)}/>
      <TextAreaBox name="pin-3" value={num3} setValue={(num3) => handleCodeState('num3', num3)}/>
      <TextAreaBox name="pin-4" value={num4} setValue={(num4) => handleCodeState('num4', num4)}/>
      <TextAreaBox name="pin-5" value={num5} setValue={(num5) => handleCodeState('num5', num5)}/>
      <TextAreaBox name="pin-6" value={num6} setValue={(num6) => handleCodeState('num6', num6)}/>
    </VerifiBoxWrapper>
  )
}



const VerifiBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;







