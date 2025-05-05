import { SignUpPageWrapper } from '../../components/signup/SignUpPageWrapper';
import styled from 'styled-components';
import Typography from '../../../assets/Typography';
import { useNavigate } from 'react-router-dom';
import { UserInput } from '../../components/signup/UserInput';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userTypeState } from '../../../store/atom';
import { userState } from '../../../store/atom';
import Button06 from '../../assets/buttons/Button06';
import Button07 from '../../assets/buttons/Button07';
import Button03 from '../../assets/buttons/Button03';
import Button04 from '../../assets/buttons/Button04';
import { useSignUp4CandidateHandler, useSignUp4PasserHandler } from '../../../utils/SignUpFunctions';
import { GPAVerification } from '../../components/signup/VerificationForm';
import { SemesterVerification } from '../../components/signup/VerificationForm';

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
      <div style={{ marginBottom: '61px' }}></div>
      <ContentsList>
        <ContentsWrapper>
          <div style={{ display: 'flex' }}>
            <Typography size="3.33vw" bold="700">
              쿠플라이에서 원하는 서비스
            </Typography>
            <Typography size="3.33vw" bold="400">
              를 선택해주세요.
            </Typography>
          </div>
          <Button06
            style={{ width: '100%' }}
            state={user.userType === 'candidate' ? user.userState[0] : 'inactive'}
            onClick={fixedUserType ? () => {} : () => handleButtonClick('candidate')}
          />
          <Button07
            style={{ width: '100%' }}
            state={user.userType === 'passer' ? user.userState[1] : 'inactive'}
            onClick={fixedUserType ? () => {} : () => handleButtonClick('passer')}
          />
        </ContentsWrapper>
      </ContentsList>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
        <Button03
          state={user.userState[0] === 'clicked' || user.userState[1] === 'clicked' ? 'default' : 'disabled'}
          onClick={handleNext}
          style={{ width: '74.418%' }}
        />
      </ButtonsWrapper>
    </SignUpPageWrapper>
  );
}

export type inputState = 'incomplete' | 'error' | 'complete';
 
 export function SignUp4PageCandidate() {
   const { setGpaState, setMajorState, complete, next, handleNext, handlePrev } = useSignUp4CandidateHandler();

   const navigate = useNavigate();
   useEffect(() => {
    if (!sessionStorage.getItem('studentId')) navigate('/');
  }, []);

  
     return (
       <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
         <div style={{ marginBottom: '50px' }}></div>
         <ContentsList>
           <ContentsWrapper>
             <div>
               <Typography size="3.33vw" bold="700">
                 관심전공
               </Typography>
               <Typography size="3.33vw" bold="400">
                 을 선택해주세요.
               </Typography>
             </div>
             <UserInput userInfoType="hopeMajor1" toNext={next} setStateValid={setMajorState} />
             <UserInput userInfoType="hopeMajor2" toNext={next} setStateValid={setMajorState} />
           </ContentsWrapper>
           <ContentsWrapper>
             <div>
               <Typography size="3.33vw" bold="400">
                 현재{' '}
               </Typography>
               <Typography size="3.33vw" bold="700">
                 학점
               </Typography>
               <Typography size="3.33vw" bold="400">
                 을 소수점 둘째자리까지 입력해주세요.
               </Typography>
             </div>
             <GPAVerification userType="candidate" setState={setGpaState} toNext={next} />
           </ContentsWrapper>
         </ContentsList>
         <ButtonsWrapper>
           <Button04 onClick={handlePrev} style={{ width: '25.582%' }} />
           <Button03 state={complete ? 'default' : 'disabled'} onClick={handleNext} style={{ width: '74.418%' }} />
         </ButtonsWrapper>
       </SignUpPageWrapper>
     );
   }

   export function SignUp4PagePasser() {
    const { setGpaState, setSemesterState, setMajorState, complete, next, handleNext, handlePrev } =
      useSignUp4PasserHandler();

      const navigate = useNavigate();
      useEffect(() => {
       if (!sessionStorage.getItem('studentId')) navigate('/');
     }, []);
  
    return (
      <SignUpPageWrapper step={4} stepInfo="마이보드 프로필 생성하기">
        <div style={{ marginBottom: '50px' }}></div>
        <ContentsList>
          <ContentsWrapper>
            <div>
              <Typography size="3.33vw" bold="700">
                진입한 이중전공
              </Typography>
              <Typography size="3.33vw" bold="400">
                을 선택해주세요.
              </Typography>
            </div>
            <UserInput userInfoType="secondMajor" toNext={next} setStateValid={setMajorState} />
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
              <Typography size="3.33vw" bold="400">
                지원 당시의{' '}
              </Typography>
              <Typography size="3.33vw" bold="700">
                학점
              </Typography>
              <Typography size="3.33vw" bold="400">
                을 소수점 두 자리까지 입력해주세요.
              </Typography>
            </div>
            <GPAVerification userType="passer" setState={setGpaState} toNext={next} />
          </ContentsWrapper>
          <ContentsWrapper>
            <div>
              <Typography size="3.33vw" bold="700">
                이중전공 지원학기
              </Typography>
              <Typography size="3.33vw" bold="400">
                를 입력해주세요.
              </Typography>
            </div>
            <SemesterVerification userType="passer" setState={setSemesterState} toNext={next} />
          </ContentsWrapper>
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
    gap: 5.556vw; /* 20px converted to vw */
    width: 91.111vw; /* 328px converted to vw */
  `;
  
  const ContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3.333vw; /* 12px converted to vw */
  `;
  
  const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 27.778vw; /* 100px converted to vw */
    gap: 2.222vw; /* 8px converted to vw */
    width: 100%;
    // Additional style using vh might be considered based on dynamic content or device orientation changes
  `;
  