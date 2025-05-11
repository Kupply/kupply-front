import { SignUpPageWrapper } from '../../components/signUp/SignUpPageWrapper';
import styled from 'styled-components';
import { UserInput } from '../../components/signUp/UserInput';
import Button04 from '../../assets/buttons/Button04';
import Button03 from '../../assets/buttons/Button03';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSignUp2Verification } from '../../utils/SignUpFunctions';
import { UserInputText } from '../../components/signUp/UserInputText';

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
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="name" />
          <UserInput userInfoType="name" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="studentId" />
          <UserInput userInfoType="studentId" toNext={next} />
        </ContentsWrapper>
        {firstMajorCampus === 'S' && (
          <ContentsWrapper>
            <UserInputText userInfoType="firstMajorSejong" />
            <UserInput userInfoType="firstMajorSejong" toNext={next} />
          </ContentsWrapper>
        )}
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
        <Button03 state={complete ? 'pressed' : 'disabled'} onClick={handleNext} style={{ width: '74.418%' }} />
      </ButtonsWrapper>
    </SignUpPageWrapper>
  );
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.823vw; //34px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.9375vw; //18px;
  margin-top: 1.823vw; //34px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4686vw; //9px;
`;
