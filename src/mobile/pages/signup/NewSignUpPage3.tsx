import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSignUp2Verification } from '../../../utils/SignUpFunctions';
import styled from 'styled-components';
import { SignUpPageWrapper } from '../../components/signup/SignUpPageWrapper';
import Typography from '../../../assets/Typography';
import { UserInput } from '../../components/signup/UserInput';
import Button03 from '../../assets/buttons/Button03';
import Button04 from '../../assets/buttons/Button04';
import { UserInputText } from '../../../components/signUp/UserInputText';

export default function SignUp3Page() {
  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const { complete } = useSignUp2Verification();

  // setNext에 대한 re-render가 이루어지고 navigate가 일어나도록 이렇게 짬
  const handleNext = () => {
    setNext(true);
    Promise.resolve().then(() => {
      navigate('/signup4');
    });
  };

  const handlePrev = () => {
    navigate('/signUp2');
  };

  useEffect(() => {
    if (!sessionStorage.getItem('agreeTerms')) navigate('/');
  }, []);

  const firstMajorCampus = sessionStorage.getItem('firstMajorCampus');

  return (
    <SignUpPageWrapper step={3} stepInfo="사용자 기본 정보 입력하기">
      <div style={{ marginBottom: '16.94vw' }}></div>
      <ContentsList>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="700">
              이름
            </Typography>
            <Typography size="3.33vw" bold="400">
              을 입력해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="name" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="700">
              고려대학교 학번
            </Typography>
            <Typography size="3.33vw" bold="400">
              을 입력해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="studentId" toNext={next} />
        </ContentsWrapper>
        {firstMajorCampus === 'S' && (
          <ContentsWrapper>
            <div>
              <Typography size="3.33vw" bold="700">
                본전공(1전공)
              </Typography>
              <Typography size="3.33vw" bold="400">
                을 입력해주세요.
              </Typography>
            </div>
            <UserInput userInfoType="firstMajorSejong" toNext={next} />
          </ContentsWrapper>
        )}
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
        <Button03 state={complete ? 'default' : 'disabled'} onClick={handleNext} style={{ width: '74.418%' }} />
      </ButtonsWrapper>
    </SignUpPageWrapper>
  );
}
const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.556vw; /* 20px */
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw; /* 9px */
  width: 91.111vw; /* 328px */
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 27.778vw; /* 100px */
  gap: 2.222vw; /* 8px */
  width: 100%;
`;
