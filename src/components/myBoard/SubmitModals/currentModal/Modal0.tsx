import NotSubmittedWrapper from "./NotSubmittedWrapper";
import Button04 from "../../../../assets/buttons/Button04";
import Button03 from "../../../../assets/buttons/Button03";
import { UserInputText } from "../../../signUp/UserInputText";
import { UserInput } from "../../../signUp/UserInput";
import { GPAVerification } from "../../../signUp/VerificationForm";
import styled from "styled-components";
import { useStudentIdVerification } from "../../../../utils/UserInputVerification";
import { useEffect, useState } from "react";
import { inputState } from "../../../../pages/signUp/SignUp4Page";
import Typography from "../../../../assets/Typography";

// GpaVerification userType은 임의로 지정해 놓은 상태 
export interface CurrentModalProps{
  handlePrev?: () => void;
  handleNext?: () => void;
}

export default function CurrentModal0(props: CurrentModalProps){
  const {handlePrev, handleNext} = props;
  const {stdIdVerified} = useStudentIdVerification('settings');
  const [gpaState, setGpaState] = useState<inputState>('incomplete');
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    if(gpaState === 'complete' && stdIdVerified){
      setNextButton(true);
    }
    else setNextButton(false);
  }, [gpaState, stdIdVerified]);

  return (
    <ContentsWrapper>
      <NotSubmittedWrapper currentStep={1}>
      <div style={{ position: 'absolute', top: '13.958vw', left: '4.844vw' }}>
        <div style={{ display: 'flex', marginBottom: '0.521vw' }}>
          <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
            학점
          </Typography>
          <Typography size="0.9375vw">을 입력해주세요.</Typography>
        </div>
        <GPAVerification userType="candidate" setState={setGpaState}/>
      </div>
      <div style={{ position: 'absolute', top: '21.458vw', left: '4.844vw', width: '32.708vw' }}>
        <div style={{ display: 'flex', marginBottom: '0.521vw' }}>
          <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
            고려대학교 학번
          </Typography>
          <Typography size="0.9375vw">을 입력해주세요.</Typography>
        </div>
        <UserInput userInfoType="studentId" locationUsed="settings"/>
      </div>
      <ButtonsWrapper style={{ position: 'absolute', left: '4.844vw', top: '26.042vw' }}>
        <Button04 state='disabled' onClick={handlePrev} />
        <Button03 state={nextButton ? 'pressed' : 'disabled'} onClick={handleNext} />
      </ButtonsWrapper>
    </NotSubmittedWrapper>
    </ContentsWrapper>
    
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  //gap: 18px;
  gap: 0.9375vw;
  //margin-top: 130px;
  margin-top: 6.771vw;
  //padding-left: 93px;
  //width: 630px;
  width: 32.813vw;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //height: 796px;
  height: 41.458vw;
`;