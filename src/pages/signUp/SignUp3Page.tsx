import React, { useState, useEffect } from 'react';
import { SignUpPageWrapper } from '../../components/signUp/SignUpPageWrapper';
import styled from 'styled-components';
import { UserInput } from '../../components/signUp/UserInput';
import { useNavigate } from 'react-router-dom';
import Typography from '../../assets/Typography';
import NicknameCheckButton from '../../assets/progressIndicator/Loader';
import { useRecoilState } from 'recoil';
import { userState, errorMessageState } from '../../store/atom';
import { useSignUp3Verification } from '../../utils/SignUpFunctions';
import Button04 from '../../assets/buttons/Button04';
import Button03 from '../../assets/buttons/Button03';
import { UserInputText } from '../../components/signUp/UserInputText';
import NewTextFieldBox from '../../assets/NewTextFieldBox';
import { useNicknameVerification } from '../../utils/UserInputVerification';

type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error';

export default function SignUp3Page() {
  const navigate = useNavigate();
  const [next, setNext] = useState(false);
  const [nickname, setNickname] = useRecoilState(userState('nickname'));
  const { complete } = useSignUp3Verification();

  const handleNext = () => {
    setNext(true);
    Promise.resolve().then(() => {
      navigate('/signup4');
    });
  };

  const handlePrev = () => {
    navigate('/signup2');
  };
  return (
    <SignUpPageWrapper step={3} stepInfo={'비밀번호 및 닉네임 설정하기'}>
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="id" />
          <UserInput userInfoType="id" userInfoTypeManual="kuEmail">
            <InfoMessageWrapper>
              <CircleImage src={process.env.PUBLIC_URL + `/designImage/CircleImage.svg`} />
              <CheckImage src={process.env.PUBLIC_URL + `/designImage/CheckImage.svg`} />
              <div
                style={{
                  position: 'absolute',
                  left: '0.8vw',
                  display: 'flex',
                  justifyContent: 'center',
                  top: '0.265vw',
                }}
              >
                <Typography size="0.625vw" bold="400" color="#A8A8A8">
                  쿠플라이 아이디는 고려대학교 이메일 주소입니다.
                </Typography>
              </div>
            </InfoMessageWrapper>
          </UserInput>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="password" />
          <UserInput userInfoType="password" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="password2" />
          <UserInput userInfoType="password2" />
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="nickname" />
          <UserInput userInfoType="nickname" toNext={next} />
        </ContentsWrapper>
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

const InfoMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1.0416vw;
  position: relative;
`;

const CircleImage = styled.img`
  position: absolute;
  top: 0.208vw; //4px;
  width: 0.625vw;
  height: 0.625vw;
  left: 0;
`;

const CheckImage = styled.img`
  position: absolute;
  top: 0.39vw; //7px;
  width: 0.3125vw;
  height: 0.3125vw;
  left: 0.18vw;
`;

// 얘도 픽셀로 안 박으면 괴이한 현상이 일어남
const NicknameCheckButtonWrapper = styled.div`
  position: absolute;
  top: 1.15vw; //20.2px;
  left: 25.7vw; //490px;
  z-index: 9999;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //position: relative;
  gap: 0.469vw; //9px;
`;
