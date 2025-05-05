import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Button03 from '../../../assets/buttons/Button03';
import Button04 from '../../../assets/buttons/Button04';

import { UserInputText } from '../../../../components/signUp/UserInputText';
import { UserInput } from '../../signup/UserInput';
import { GPAVerification } from '../../signup/VerificationForm';
import { useStudentIdVerification } from '../../../../utils/UserInputVerification';
import { inputState } from '../../../../components/signUp/UserInput';

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

  return (
    <>
      <LeftAlignedContainer>
        <ContentBox>
          <Content>실제 이중전공 지원 시 입력한 정보와 달라진 정보를 수정해주세요.</Content>
        </ContentBox>
        <div style={{ marginBottom: '2vw' }}>
          <div style={{ display: 'flex', marginBottom: '2.5vw' }}>
            <Typography size="3.33vw" bold="700" style={{ opacity: '0.8' }}>
              학점
            </Typography>
            <Typography size="3.33vw">을 입력해주세요.</Typography>
          </div>
          <GPAVerification userType="candidate" setState={setGpaState} locationUsed="Settings"/>
        </div>

        <div>
          <div style={{ display: 'flex', marginBottom: '2.5vw' }}>
            <Typography size="3.33vw" bold="700" style={{ opacity: '0.8' }}>
              고려대학교 학번
            </Typography>
            <Typography size="3.33vw">을 입력해주세요.</Typography>
          </div>
          <div style={{ width: '100%' }}>
            <UserInput userInfoType="studentId" locationUsed="settings"/>
          </div>
        </div>
      </LeftAlignedContainer>

      <ButtonsWrapper>
        <Button04 state="disabled" onClick={handlePrev} />
        <Button03 onClick={handleNext} />
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
