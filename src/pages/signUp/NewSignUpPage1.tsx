import { SignUpPageWrapper } from '../../components/signUp/SignUpPageWrapper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserInput } from '../../components/signUp/UserInput';
import { UserInputText } from '../../components/signUp/UserInputText';
import { useCallback, useEffect, useState } from 'react';
import { useSignUp0Verification } from '../../utils/SignUpFunctions';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/atom';
import TextFieldBox, { StateOptions } from '../../assets/OldTextFieldBox';
import { sendEmail } from '../../utils/SignUpFunctions';
import Button04 from '../../assets/buttons/Button04';
import Button03 from '../../assets/buttons/Button03';
import { NavItem } from '../../admin/layouts/dashboard/nav';
import { useNewSignUp0Verification } from '../../utils/SignUpFunctions';
import client from '../../utils/HttpClient';

export function SignUp1Page() {
  const [next, setNext] = useState(false);
  const {complete, ID, pass} = useNewSignUp0Verification();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = async () => {
    try {
      const response = await axios.post('https://api.kupply.devkor.club/auth/koreapasLogin', {
        koreapasId: ID,
        koreapasPassword: pass,
      });
  
      const { result, data } = response.data;
      console.log('result: ', result, 'data: ', data)
  
      // 3. 로그인 성공 & 레벨 적절 → 쿠플라이 등록 여부 확인
      if (data.isKupply === false) {
        // 쿠플라이 미등록자
        const firstMajorName = data.firstMajorName; // 백엔드가 이미 name 포함시켜줬다고 가정
        const koreapasData = {
          koreapasUUID: data.uuid,
          nickname: data.nickname,
          studentId: data.hakbun,
          firstMajorCode: data.dept,
          firstMajorCampus: data.campus,
          firstMajorName,
        };
  
        setNext(true);
        navigate('/signUp2', { state: { koreapasData } });
      } else {
        // 쿠플라이 등록자 (로그인 완료)
        setNext(true);
        navigate('/integratePage'); 
        // Promise.resolve().then(() => {
        //   navigate('/integratePage');
        // });
      }
    } catch (err: any) {
      if (err.status === 401) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다!');
      } else if (err.status === 403) {
        alert('고파스 강등 또는 미인증 회원입니다!');
      } else {
        setError('요청 중 오류 발생: ' + (err.message || '알 수 없는 오류'));
      }
    }
  };
  
  const handlePrev = () => {
    navigate('/');
  }

  return (
    <SignUpPageWrapper step={1} stepInfo="고려대학생 인증하기">
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="koreapasID" />
          <UserInput userInfoType='koreapasID' toNext={next}/>
        </ContentsWrapper>
        <ContentsWrapper>
        <UserInputText userInfoType="koreapasPass"/>
        <UserInput userInfoType='koreapasPass' toNext={next}/>
        </ContentsWrapper> 
      </ContentsList>
      <LinkBox>
          <Link href={'https://www.koreapas.com/bbs/lostid_new.php'}>고파스 아이디 비밀번호 찾기</Link> 
      </LinkBox>
      <ButtonsWrapper>
        <Button04 onClick={handlePrev} style={{width:'25.582%'}}/>
        <Button03 state={complete? 'pressed' : 'disabled'} onClick={handleNext} style={{width: '74.418%'}}/>
      </ButtonsWrapper>
    </SignUpPageWrapper>
  );
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.823vw; //35px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.417vw; //8px;
  //margin-top: 5.21vw; //100px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.9375vw;
  //margin-top: 18.073vw; //347px;
  width: 100%;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.31vw;
  margin-top: 4.11vw;
  margin-bottom: 4.53vw;
`;

const Link = styled.a`
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 0.73vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 100% */
  text-decoration-line: underline;
  text-transform: uppercase;
`;