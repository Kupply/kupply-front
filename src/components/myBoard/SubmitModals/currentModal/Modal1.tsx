import NotSubmittedWrapper from "./NotSubmittedWrapper";
import { CurrentModalProps } from "./Modal0";
import Typography from "../../../../assets/Typography";
import { CurSemesterVerification, SemesterVerification } from "../../../signUp/VerificationForm";
import { useEffect, useState } from "react";
import { inputState } from "../../../../pages/signUp/SignUp4Page";
import FirstReAppliedButton from "../../../../assets/myboardpage/FirstReAppliedButton";
import styled from "styled-components";
import { appModalUserTypeState } from "../../../../store/atom";
import { useRecoilState } from "recoil";
import Button04 from "../../../../assets/buttons/Button04";
import Button03 from "../../../../assets/buttons/Button03";

export default function CurrentModal1(props: CurrentModalProps){
  const {handlePrev, handleNext} = props;
  const [semesterState, setSemesterState] = useState<inputState>('incomplete');
  // 근데 여기서 이걸 먼저 다시 default로 바꿔주고 시작
  const [userType, setUserType] = useRecoilState(appModalUserTypeState);
  const [nextButton, setNextButton] = useState(false);

  const handleButtonClick = (buttonState: string) => {
    if(buttonState === 'candidate' && userType.userState[0] !== 'clicked'){
      setUserType({
        userType: 'candidate',
        userState: ['clicked', 'inactive']
      })
    }else if(buttonState === 'passer' && userType.userState[1] !== 'clicked'){
      setUserType({
        userType: 'passer',
        userState: ['inactive', 'clicked']
      })
    }
  }

  useEffect(()=>{
    if(semesterState === 'complete' && (userType.userState[0] === 'clicked' || userType.userState[1] === 'clicked'))
      setNextButton(true);
    else setNextButton(false);
  }, [semesterState, userType]);

  return (
    <>
      <NotSubmittedWrapper currentStep={2}>
      <div style={{ position: 'absolute', top: '13.958vw', left: '4.844vw' }}>
        <div style={{ display: 'flex', marginBottom: '0.521vw', whiteSpace: 'nowrap' }}>
          <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
            재학 중인 학년/학기
          </Typography>
          <Typography size="0.9375vw" bold="500">를 입력해주세요.</Typography>
        </div>
        <CurSemesterVerification userType="candidate" setState={setSemesterState}/>
      </div>
      <div style={{ position: 'absolute', top: '21.458vw', left: '4.844vw' }}>
        <div style={{ display: 'flex', marginBottom: '0.521vw' }}>
          <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
            과거 동일 학과를 지원
          </Typography>
          <Typography size="0.9375vw" bold="500">했던 경험이 있나요?</Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <FirstReAppliedButton
            state={userType.userState[0]}
            double={false}
            onClick={() => handleButtonClick('candidate')}
          />
          <FirstReAppliedButton
            style={{ marginLeft: '1.771vw' }}
            state={userType.userState[1]}
            double={true}
            onClick={() => handleButtonClick('passer')}
          />
        </div>
      </div>
      <ButtonsWrapper style={{ position: 'absolute', left: '4.844vw', top: '26.042vw' }}>
        <Button04 state='pressed' onClick={handlePrev} />
        <Button03 state={nextButton ? 'pressed' : 'disabled'} onClick={handleNext} />
      </ButtonsWrapper>
    </NotSubmittedWrapper>
    </>
    
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

