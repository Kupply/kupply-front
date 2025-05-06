import { useNavigate } from "react-router-dom";
import { useNewSignUp5Verification } from "../../../utils/SignUpFunctions";
import { useState, useRef, useEffect } from "react";
import { koreapasJoin } from "../../../utils/SignUpFunctions";
import { SignUpPageWrapper } from '../../components/signup/SignUpPageWrapper';
import styled from "styled-components";
import Button03 from "../../assets/buttons/Button03";
import Button04 from "../../assets/buttons/Button04";
import { UserInput } from "../../components/signup/UserInput";
import Typography from "../../../assets/Typography";
import CTA01 from '../../assets/CTAs/CTA01';

export function SignUp5Page(){
 
   const navigate = useNavigate();
   const [next, setNext] = useState(false);
   const {complete, nickname:nickname, ID:kuEmail} = useNewSignUp5Verification();
  
   useEffect(() => {
    if(!sessionStorage.getItem('role')) navigate('/');
   }, []);

   const handleNext = async () => {
    try {
      const role = sessionStorage.getItem('role') || '';
      const res = await koreapasJoin(role, nickname.info, kuEmail.info);
  
      // 성공한 경우만 아래 실행
      setNext(true);
      sessionStorage.setItem('toComplete', 'true');
      navigate('/signupcomplete');
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message || '회원가입에 실패했습니다.');
    }
  };

 
   const handlePrev = () => {
     navigate('/signUp4');
   };

   return (
    <SignUpPageWrapper step={5} stepInfo="프로필 생성 후 가입 완료하기"> 
        <div style={{marginBottom: '16.94vw'}}></div>
        <ContentsList>
            <ContentsWrapper>
            <div>
            <Typography size="3.33vw" bold="700">고려대학교 이메일</Typography>
            <Typography size="3.33vw" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="kuEmail" toNext={next}/>
            </ContentsWrapper>
            <ContentsWrapper>
            <div>
            <Typography size="3.33vw" bold="400">쿠플라이에서 사용할</Typography>
            <Typography size="3.33vw" bold="700"> 닉네임</Typography>
            <Typography size="3.33vw" bold="400">을 입력해주세요.</Typography>
            </div>
            <UserInput userInfoType="nickname" toNext={next}/>
            </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{width:'25.582%'}}/>
        <Button03 state={complete? 'default' : 'disabled'} onClick={handleNext} style={{width: '74.418%'}}/>
      </ButtonsWrapper>
    </SignUpPageWrapper>
  )
}


export function SignUp5Complete() {
    const navigate = useNavigate();
    const handleNext = () => {
      navigate('/login');
    };
  
    const isMountedRef = useRef(false);
    //넘겨받은 데이터가 없는 경우 올바른 경로가 아니므로 main으로 돌려보낸다.
    //회원가입 때 입력된 정보는 회원가입이 완료되면 지워져야 함.
    useEffect(() => {
      if (!isMountedRef.current) {
        isMountedRef.current = true;
        return;
      }
  
      if (sessionStorage.getItem('toComplete') !== 'true') {
        sessionStorage.clear();
        navigate('/');
      } else {
        sessionStorage.clear();
      }
    }, []);
  
    return (
      <Wrapper2>
        <div style={{ textAlign: 'center', marginTop: '12.9629vh', marginBottom: '2.222vh', zIndex: 2 }}>
          <Typography size="5.55vw" bold="700" style={{ lineHeight: '2.604vw' }}>
            축하합니다!
          </Typography>
        </div>
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <Typography size="3.89vw" bold="700" style={{ opacity: '0.8', lineHeight: '125%', fontWeight: '500' }}>
            이제 쿠플라이의 회원이 되셨습니다.
            <br />
            로그인 후, 쿠플라이의 다양한 서비스를 이용해보세요.
          </Typography>
        </div>
        <div>
          <img
            src="designImage/signUp/CheckAni.webp"
            alt="completeImage"
            style={{
              width: '90vw',
              height: '100%',
              background: 'url(designImage/signUp/CheckAni.webp), lightgray 50% / cover no-repeat',
              transform: 'translateY(-4.375vw)',
            }}
          />
        </div>
        <CTA01 state="default" onClick={handleNext}>
          로그인하고 쿠플라이 이용하기
        </CTA01>
      </Wrapper2>
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
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw; // 100%
  height: auto;
  padding-bottom: 5vw;
  box-sizing: 'border-box';
  //background: #FCFAFB;
  background: linear-gradient(180deg, #fcfafb 69.56%, rgba(252, 250, 251, 0) 115.91%);
`;