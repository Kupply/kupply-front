import { SignUpPageWrapper } from "../../components/signUp/SignUpPageWrapper";
 import styled from "styled-components";
 import { UserInput } from "../../components/signUp/UserInput";
 import Button04 from "../../assets/buttons/Button04";
 import Button03 from "../../assets/buttons/Button03";
 import { useNavigate } from "react-router-dom";
 import { useEffect, useState, useRef } from "react";
 import { useNewSignUp5Verification, useSignUp2Verification } from "../../utils/SignUpFunctions";
 import { UserInputText } from "../../components/signUp/UserInputText";
 import Typography from "../../assets/Typography";
 import CTA01 from "../../assets/CTAs/CTA01";
 import { koreapasJoin } from "../../utils/SignUpFunctions";
 import { nameToMajorCodeMapping } from "../../mappings/Mappings";

 
 export default function SignUp5Page(){
 
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
       <ContentsList>
         <ContentsWrapper>
           <UserInputText userInfoType="kuEmail"/>
           <UserInput userInfoType="kuEmail" toNext={next}/>
         </ContentsWrapper>
         <ContentsWrapper>
           <UserInputText userInfoType="nickname"/>
           <UserInput userInfoType="nickname" toNext={next}/>
         </ContentsWrapper>
       </ContentsList>
       <ButtonsWrapper>
         <Button04 onClick={handlePrev} style={{width:'25.582%'}}/>
         <Button03 state={complete? 'pressed' : 'disabled'} onClick={handleNext} style={{width: '74.418%'}}/>
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
           <Typography size="2.5vw" bold="700" style={{ lineHeight: '2.604vw' }}>
             축하합니다!
           </Typography>
         </div>
         <div style={{ textAlign: 'center', zIndex: 1 }}>
           <Typography size="1.25vw" bold="700" style={{ opacity: '0.8', lineHeight: '125%', fontWeight: '500' }}>
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
               width: '40.677vw',
               height: '100%',
               background: 'url(designImage/signUp/CheckAni.webp), lightgray 50% / cover no-repeat',
               transform: 'translateY(-4.375vw)',
             }}
           />
         </div>
         <div style={{ transform: 'translateY(-11.51vw)' }}>
           <CTA01 state="default" onClick={handleNext}>
             <Typography size="1.042vw" bold="700" color="var(--White, #FFF)">
               로그인하고 쿠플라이 이용하기
             </Typography>
           </CTA01>
         </div>
       </Wrapper2>
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
   gap: 0.417vw; //9px;
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