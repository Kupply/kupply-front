import NotSubmittedHeader from './NotSubmittedHeader';
import Button04 from '../../../../assets/buttons/Button04';
import Button03 from '../../../../assets/buttons/Button03';
import { UserInputText } from '../../../signUp/UserInputText';
import { UserInput } from '../../../signUp/UserInput';
import { GPAVerification } from '../../../signUp/VerificationForm';
import styled from 'styled-components';
import { useStudentIdVerification } from '../../../../utils/UserInputVerification';
import { useEffect, useState } from 'react';
import { inputState } from '../../../signUp/UserInput';
import Typography from '../../../../assets/Typography';

// GpaVerification userType은 임의로 지정해 놓은 상태
export interface CurrentModalProps {
  handlePrev?: () => void;
  handleNext?: () => void;
}

export default function CurrentModal0(props: CurrentModalProps) {
  const { handlePrev, handleNext } = props;
  const { stdIdVerified } = useStudentIdVerification('settings');
  const [gpaState, setGpaState] = useState<inputState>('incomplete');
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    if (gpaState === 'complete' && stdIdVerified) {
      setNextButton(true);
    } else setNextButton(false);
  }, [gpaState, stdIdVerified]);

  // 그러면 이제
  return (
    <>
      <LeftAlignedContainer>
        <div style={{ marginBottom: '2vw' }}>
          <div style={{ display: 'flex', marginBottom: '0.521vw' }}>
            <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
              학점
            </Typography>
            <Typography size="0.9375vw">을 입력해주세요.</Typography>
          </div>
          <GPAVerification userType="candidate" setState={setGpaState} locationUsed="Settings" />
        </div>

        <div>
          <div style={{ display: 'flex', marginBottom: '0.521vw' }}>
            <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
              고려대학교 학번
            </Typography>
            <Typography size="0.9375vw">을 입력해주세요.</Typography>
          </div>
          <div style={{ width: '32.71vw' }}>
            <UserInput userInfoType="studentId" locationUsed="settings" />
          </div>
        </div>
      </LeftAlignedContainer>

      <ButtonsWrapper>
        <Button04 state="disabled" onClick={handlePrev} />
        <Button03 state={nextButton ? 'pressed' : 'disabled'} onClick={handleNext} />
      </ButtonsWrapper>
    </>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.9375vw;
  align-items: center;
`;

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align children to the left */
  height: 15vw;
  margin-top: 7vw;
  margin-bottom: 3vw;
  margin-left: 4.5vw;
  width: 36vw;
`;
