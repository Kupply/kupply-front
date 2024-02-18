import React, { useState } from "react";
import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
import styled from "styled-components";
import { UserInput } from "../../components/signUp/UserInput";
import { useNavigate } from "react-router-dom";
import Typography from "../../assets/Typography";
import NicknameCheckButton from "../../assets/progressIndicator/Loader";
import { useRecoilState } from "recoil";
import { userState } from "../../store/atom";
import { useSignUp3Validation } from "../../utils/SignUpFunctions";
import Button04 from "../../assets/buttons/Button04";
import Button03 from "../../assets/buttons/Button03";
import { UserInputText } from "../../components/signUp/UserInputText";

type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error' ;

export default function SignUp3Page(){
  const navigate = useNavigate();
  const [next, setNext] = useState(false); 
  const [nickname, setNickname] = useRecoilState(userState('nickname'));

  const {complete} = useSignUp3Validation();

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
    <SignUpPageWrapper step={3} stepInfo={"쿠플라이 비밀번호와 닉네임 설정하기"}>
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="email"/>
          <UserInput userInfoType="email">
            <InfoMessageWrapper>
              <InfoImageWrapper>
                <CircleImage src={process.env.PUBLIC_URL + `/designImage/CircleImage.svg`}/>
                <CheckImage src={process.env.PUBLIC_URL + `/designImage/CheckImage.svg`}/>  
              </InfoImageWrapper>
              <Typography size="12px" bold="400" color="#A8A8A8">
                  쿠플라이 아이디는 고려대학교 이메일입니다.
              </Typography>
            </InfoMessageWrapper>
          </UserInput>
        </ContentsWrapper>
        <ContentsWrapper>   
          <UserInputText userInfoType="password"/>    
          <UserInput userInfoType="password" toNext={next}/>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="password2"/>
          <UserInput userInfoType="password2"/>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="nickname"/>
          <UserInput userInfoType="nickname" toNext={next}>
          {nickname.info === '' || 
            nickname.infoState === 'filled' ? (<></>) : 
            (
              <NicknameCheckButtonWrapper>
                <NicknameCheckButton
                  nickname={nickname.info}
                  state={nickname.infoCheck as StateOptions}
                  setState={(so) => setNickname((prev) => ({...prev, infoCheck: so}))}
                ></NicknameCheckButton>
              </NicknameCheckButtonWrapper>
                
              )}
          </UserInput>
        </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} />
        <Button03 state={complete ? 'pressed' : 'disabled'} onClick={handleNext}/>
      </ButtonsWrapper>
    </SignUpPageWrapper>
  )
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 34px;
`;

const InfoMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-left: 1.0416vw;
`;

const InfoImageWrapper = styled.div`
  position: relative;
  width: 0.625vw;
`;

const CircleImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const CheckImage = styled.img`
  position: absolute;
  top: 3px;
  left: 0.156vw;
`;

const NicknameCheckButtonWrapper = styled.div`
  position: absolute;
  top: 2.480vw;
  left: 22.521vw;
  z-index: 9999;
`;
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 9px;
`;