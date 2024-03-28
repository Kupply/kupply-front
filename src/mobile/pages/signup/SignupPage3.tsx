import { SignUpPageWrapper } from "../../components/signup/SignUpPageWrapper";
import styled from "styled-components";
import Typography from "../../../assets/Typography";
import { useNavigate } from "react-router-dom";
import { UserInput } from "../../components/signup/UserInput";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../store/atom";
import { useSignUp3Verification } from "../../../utils/SignUpFunctions";
import MobileNicknameCheckButton from "../../assets/progressIndicator/Loader";
import { nicknameCheckAPI } from "../../assets/progressIndicator/Loader";

type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error' ;

export default function SignUpPage3(){
  const navigate = useNavigate();
  const [next, setNext] = useState(false); 
  const [nickname, setNickname] = useRecoilState(userState('nickname'));
  const {complete} = useSignUp3Verification();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const APIResponse = await nicknameCheckAPI(nickname.info);
        setTimeout(() => {
          if (APIResponse?.data.isSuccess === true) setValid(true);
          else setValid(false);
        }, 1000);
      } catch (error) {
        // Handle error if necessary
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Cleanup code here if needed
    };
  }, [nickname]);

  return(
    <SignUpPageWrapper step={2} stepInfo="사용자 기본 정보 입력하기">
        <div style={{marginBottom: '61px'}}></div>
        <ContentsList>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="700">쿠플라이 아이디</Typography>
            </div>
            <UserInput userInfoType="id" userInfoTypeManual="kuEmail"/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="700">비밀번호</Typography>
            <Typography size="12px" bold="400">를 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="password" toNext={next}/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="400">비밀번호를&nbsp;</Typography>
            <Typography size="12px" bold="700">확인&nbsp;</Typography>
            <Typography size="12px" bold="400">해주세요.</Typography>
            </div>
            <UserInput userInfoType="password2" toNext={next}/>
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
            <Typography size="12px" bold="400">쿠플라이에서 사용할&nbsp;</Typography>
            <Typography size="12px" bold="700">닉네임</Typography>
            <Typography size="12px" bold="400">을 설정해주세요.</Typography>
            </div>
            <UserInput userInfoType="nickname" toNext={next} valid={valid}/>
          </ContentsWrapper>
        </ContentsList>
  
      </SignUpPageWrapper>
  )
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 328px;
`;
