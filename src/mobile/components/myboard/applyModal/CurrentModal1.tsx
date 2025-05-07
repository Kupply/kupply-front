import NotSubmittedWrapper from './NotSubmittedHeader';
import FirstReAppliedButton from './FirstReappliedButton';
import { CurSemesterVerification, SemesterVerification } from '../../signup/VerificationForm';
import { CurrentModalProps } from './CurrentModal0';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Button03 from '../../../assets/buttons/Button03';
import Button04 from '../../../assets/buttons/Button04';
import { UserInputText } from '../../../../components/signUp/UserInputText';
import { UserInput } from '../../signup/UserInput';
import { GPAVerification } from '../../signup/VerificationForm';
import { useStudentIdVerification } from '../../../../utils/UserInputVerification';
import { inputState } from '../../signup/UserInput';
import Typography from '../../../../assets/Typography';
import { appModalUserTypeMobileState } from '../../../../store/atom';
import { useRecoilState } from 'recoil';

export default function CurrentModal1(props: CurrentModalProps) {
  const { handlePrev, handleNext } = props;
  const [semesterState, setSemesterState] = useState<inputState>('incomplete');
  // 근데 여기서 이걸 먼저 다시 default로 바꿔주고 시작
  const [userType, setUserType] = useRecoilState(appModalUserTypeMobileState);
  const [nextButton, setNextButton] = useState(false);

  const handleButtonClick = (buttonState: string) => {
    if (buttonState === 'candidate' && userType.userState[0] !== 'clicked') {
      setUserType({
        userType: 'candidate',
        userState: ['clicked', 'inactive'],
      });
    } else if (buttonState === 'passer' && userType.userState[1] !== 'clicked') {
      setUserType({
        userType: 'passer',
        userState: ['inactive', 'clicked'],
      });
    }
  };

  useEffect(() => {
    if (semesterState === 'complete' && (userType.userState[0] === 'clicked' || userType.userState[1] === 'clicked'))
      setNextButton(true);
    else setNextButton(false);
  }, [semesterState, userType]);

  return (
    <>
      <LeftAlignedContainer>
        <div style={{ marginBottom: '5.56vw', marginTop: '9.44vw' }}>
          <div style={{ display: 'flex', marginBottom: '2.5vw', whiteSpace: 'nowrap' }}>
            <Typography size="3.33vw" bold="700" style={{ opacity: '0.8' }}>
              재학 중인 학년/학기
            </Typography>
            <Typography size="3.33vw">를 입력해주세요.</Typography>
          </div>
          <CurSemesterVerification userType="candidate" setState={setSemesterState} />
        </div>

        <div style={{ display: 'flex', marginBottom: '2.5vw' }}>
          <Typography size="3.33vw" bold="700" style={{ opacity: '0.8' }}>
            과거에 동일한 학과를 지원
          </Typography>
          <Typography size="3.33vw">했던 경험이 있나요?</Typography>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.22vw' }}>
          <FirstReAppliedButton
            state={userType.userState[0]}
            double={false}
            onClick={() => handleButtonClick('candidate')}
          />
          <FirstReAppliedButton
            state={userType.userState[1]}
            double={true}
            onClick={() => handleButtonClick('passer')}
          />
        </div>
      </LeftAlignedContainer>

      <ButtonsWrapper>
        <Button04 state="default" onClick={handlePrev} />
        <Button03 state={nextButton ? 'default' : 'disabled'} onClick={handleNext} />
      </ButtonsWrapper>
    </>
  );
}

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2.22vw;
  width: 81.94vw;
  margin-top: 21.39vw;
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 56.39vw;
  margin-bottom: 5vw;
  margin-top: 9.44vw;
`;

const Content = styled.text`
  color: #141414;

  /* mob_detail_Regular */
  font-family: Pretendard;
  font-size: 3.89vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  opacity: 0.6;
`;
