import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
import styled from "styled-components";
import Typography from "../../assets/Typography";
import Step4Button from "../../components/signUp/Step4Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userTypeState } from "../../store/atom";
import { useRecoilState } from "recoil";
import Button04 from "../../assets/buttons/Button04";
import Button03 from "../../assets/buttons/Button03";
import { UserInput } from "../../components/signUp/UserInput";
import { UserInputText } from "../../components/signUp/UserInputText";

export function SignUp4Page(){

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userTypeState);

  // 넘겨받는 데이터가 없는 경우 돌려보내기 위해 
  // 잠시 수정 
  // useEffect(() => {
  //   if (!sessionStorage.getItem('nickname')) navigate('/');
  //   else sessionStorage.removeItem('role');
  // }, []);


  const handleButtonClick = (inputType: string) => {
    if(inputType === 'candidate' && user.userState[0] !== 'clicked'){
      setUser((prev) => ({
      userType: 'candidate', 
      userState: ['clicked', 'inactive']
    }));
    } else if(inputType === 'passer' && user.userState[1] !== 'clicked'){
      setUser((prev) => ({
      userType: 'passer', 
      userState: ['inactive', 'clicked']
    }));
    }
  };

  const handleNext = () => {
    if (user.userType === 'candidate' && user.userState[0] === 'clicked'){
        sessionStorage.setItem('role', 'candidate');
        return navigate('/signUp4-candidate');
      }
      else if (user.userType === 'passer' && user.userState[1] === 'clicked'){
        sessionStorage.setItem('role', 'passer');
        return navigate('/signUp4-passer');
      }
      return navigate('');
    }

  const handlePrev = () => {
    navigate('/signUp3');
  };

  return (
    <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
      <ContentsList>
      <ContentsWrapper>
        <div style={{ display: 'flex' }}>
          <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
            쿠플라이에서 원하는 서비스를 선택해주세요.
          </Typography>
        </div>
        <Step4Button
          state={user.userType === 'candidate' ? user.userState[0] : 'inactive'}
          double={false}
          onClick={() => handleButtonClick('candidate')}
        />
        <Step4Button 
          state={user.userType === 'passer' ? user.userState[1] : 'inactive'} 
          double={true} 
          onClick={() => handleButtonClick('passer')}
        />
      </ContentsWrapper>
      </ContentsList>
      <AliasButtonsWrapper>
        <Button04 onClick={handlePrev} />
        <Button03
          state={user.userState[0] === 'clicked' || user.userState[1] === 'clicked' ? 'pressed' : 'disabled'}
          onClick={handleNext}
        />
      </AliasButtonsWrapper>
    </SignUpPageWrapper>
  )
}

/* ----------------------------------------- */

export function SignUp4PageCandidate(){
  return (
    <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="hopeMajor1"/>
          <UserInput userInfoType="hopeMajor1"/>
          <UserInputText userInfoType="hopeMajor2"/>
          <UserInput userInfoType="hopeMajor2"/>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="GPAcandidate"/>
          {/* GPA 관련 입력  */}
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="hopeSemester"/>
          {/* 희망 학기 관련 입력 */}
        </ContentsWrapper>
      </ContentsList>
    </SignUpPageWrapper>
  )
}

/* ---------------------------------------- */

export function SignUp4PagePasser(){
  return (
    <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="doubleMajor"/>
          <UserInput userInfoType="doubleMajor"/>
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="GPApasser"/>
          {/* GPA 관련 입력  */}
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="enterSemester"/>
          {/* 진입학기 관련 입력 */}
        </ContentsWrapper>
      </ContentsList>
    </SignUpPageWrapper>
  )
}


const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const AliasButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 70px;
`;
