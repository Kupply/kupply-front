import { SignUpPageWrapper } from '../../components/signUp/SignUpPageWrapper';
 import styled from 'styled-components';
 import Typography from '../../assets/Typography';
 import Step4Button from '../../components/signUp/Step4Button';
 import { useNavigate } from 'react-router-dom';
 import { userTypeState, userState } from '../../store/atom';
 import { useRecoilState } from 'recoil';
 import Button04 from '../../assets/buttons/Button04';
 import Button03 from '../../assets/buttons/Button03';
 import { UserInput } from '../../components/signUp/UserInput';
 import { UserInputText } from '../../components/signUp/UserInputText';
 import { GPAVerification, SemesterVerification } from '../../components/signUp/VerificationForm';
 import { useSignUp4CandidateHandler, useSignUp4PasserHandler } from '../../utils/SignUpFunctions';
 import { useEffect, useState } from 'react';
 
 export function SignUp4Page() {
   const navigate = useNavigate();
   const [user, setUser] = useRecoilState(userTypeState);
   const [userStdId, setUserStdId] = useRecoilState(userState('studentId'));
   const [fixedUserType, setFixedUserType] = useState(false);
   // 넘겨받는 데이터가 없는 경우 돌려보내기 위해
   // 잠시 수정
 
   useEffect(() => {
     if (!sessionStorage.getItem('studentId')) navigate('/');
   }, []);
 
   useEffect(() => {
     if (+userStdId.info.slice(2, 4) === 24) {
       setUser({
         userType: 'candidate',
         userState: ['clicked', 'inactive'],
       });
       setFixedUserType(true);
     }
   }, []);
 
   const handleButtonClick = (inputType: string) => {
     if (inputType === 'candidate' && user.userState[0] !== 'clicked') {
       setUser((prev) => ({
         userType: 'candidate',
         userState: ['clicked', 'inactive'],
       }));
     } else if (inputType === 'passer' && user.userState[1] !== 'clicked') {
       setUser((prev) => ({
         userType: 'passer',
         userState: ['inactive', 'clicked'],
       }));
     }
   };
 
   const handleNext = () => {
     if (user.userType === 'candidate' && user.userState[0] === 'clicked') {
       sessionStorage.setItem('role', 'candidate');
       return navigate('/signUp4-candidate');
     } else if (user.userType === 'passer' && user.userState[1] === 'clicked') {
       sessionStorage.setItem('role', 'passer');
       return navigate('/signUp4-passer');
     }
     return navigate('');
   };
 
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
             onClick={fixedUserType ? () => {} : () => handleButtonClick('candidate')}
           />
           <Step4Button
             state={user.userType === 'passer' ? user.userState[1] : 'inactive'}
             double={true}
             onClick={fixedUserType ? () => {} : () => handleButtonClick('passer')}
           />
         </ContentsWrapper>
       </ContentsList>
       <AliasButtonsWrapper>
         <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
         <Button03
           state={user.userState[0] === 'clicked' || user.userState[1] === 'clicked' ? 'pressed' : 'disabled'}
           onClick={handleNext}
           style={{ width: '74.418%' }}
         />
       </AliasButtonsWrapper>
     </SignUpPageWrapper>
   );
 }
 
 /* ----------------------------------------- */
 export type inputState = 'incomplete' | 'error' | 'complete';
 
 export function SignUp4PageCandidate() {
   const { setGpaState, setMajorState, complete, next, handleNext, handlePrev } = useSignUp4CandidateHandler();
 
      const navigate = useNavigate();
      useEffect(() => {
       if (!sessionStorage.getItem('studentId')) navigate('/');
     }, []);

   return (
     <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
       <ContentsList>
         <ContentsWrapper>
           <UserInputText userInfoType="hopeMajor1" />
           <UserInput userInfoType="hopeMajor1" toNext={next} setStateValid={setMajorState} />
           <UserInputText userInfoType="hopeMajor2" />
           <UserInput userInfoType="hopeMajor2" toNext={next} setStateValid={setMajorState} />
         </ContentsWrapper>
         <ContentsWrapper>
           <UserInputText userInfoType="candidateGPA" />
           <GPAVerification userType="candidate" setState={setGpaState} toNext={next} />
         </ContentsWrapper>
       </ContentsList>
       <ButtonsWrapper>
         <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
         <Button03 state={complete ? 'pressed' : 'disabled'} onClick={handleNext} style={{ width: '74.418%' }} />
       </ButtonsWrapper>
     </SignUpPageWrapper>
   );
 }
 
 /* ---------------------------------------- */
 
 export function SignUp4PagePasser() {
   const { setGpaState, setSemesterState, setMajorState, complete, next, handleNext, handlePrev } =
     useSignUp4PasserHandler();
  
     const navigate = useNavigate();
   useEffect(() => {
    if (!sessionStorage.getItem('studentId')) navigate('/');
  }, []);

   return (
     <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
       <ContentsList>
         <ContentsWrapper>
           <UserInputText userInfoType="secondMajor" />
           <UserInput userInfoType="secondMajor" toNext={next} setStateValid={setMajorState} />
         </ContentsWrapper>
         <ContentsWrapper>
           <UserInputText userInfoType="passGPA" />
           <GPAVerification userType="passer" setState={setGpaState} toNext={next} />
         </ContentsWrapper>
         <ContentsWrapper>
           <UserInputText userInfoType="passSemester" />
           <SemesterVerification userType="passer" setState={setSemesterState} toNext={next} />
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
 
 const ContentsWrapper = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.46875vw; //9px;
 `;
 
 const AliasButtonsWrapper = styled.div`
   display: flex;
   gap: 0.9375vw; //18px;
   margin-top: 3.646vw; //70px;
 `;
 
 const ButtonsWrapper = styled.div`
   display: flex;
   gap: 0.9375vw; //18px;
   margin-top: 1.823vw; //34px;
 `;