import { SignUpPageWrapper } from '../../components/signUp/SignUpPageWrapper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserInput } from '../../components/signUp/UserInput';
import { UserInputText } from '../../components/signUp/UserInputText';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button04 from '../../assets/buttons/Button04';
import Button03 from '../../assets/buttons/Button03';
import { useNewSignUp1Verification } from '../../utils/SignUpFunctions';
import { api_url } from '../../utils/HttpClient';
import { SimpleConsoleLogger } from 'typeorm';

export function SignUp1Page() {
  const [next, setNext] = useState(false);
  const { complete, ID, pass } = useNewSignUp1Verification();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 최초 로그인 후 sign up1을 건너뛰고 싶다는 거자나
  //   // 그러니까 로그인을 하려고 입력을 했는데 아직 회원은 아닌 경우
  //   const uuid = localStorage.getItem('koreapasUUID');
  //   if (uuid) {
  //     sessionStorage.setItem('koreapasUUID', uuid);
  //     navigate('/signUp2');
  //   }
  // }, []);

  const handleSyncClick = () => {
    navigate('/sync0');
  };

  const handleNext = async () => {
    if (ID === '' || pass === '') return;

    const checkUrl = `${api_url}/auth/checkKoreapas`;
    const joinedUrl = `${api_url}/auth/checkKoreapasJoined`;
    const loginUrl = `${api_url}/auth/koreapasLogin`;

    try {
      // Step 1: 인증 후 정보 받기
      const res = await axios.post(checkUrl, {
        id: ID,
        password: pass,
      });

      const { koreapasUUID, nickname, studentId, firstMajorCode, firstMajorCampus } = res.data.data;

      if (firstMajorCampus === 'A' && !firstMajorCode) {
        alert('고파스의 ‘꽈톡’ 페이지에 접속 후 다시 회원가입을 시도해주세요.');
        sessionStorage.clear();
        navigate('/');
        return;
      }

      sessionStorage.setItem('koreapasUUID', koreapasUUID);
      sessionStorage.setItem('nickname', nickname);
      sessionStorage.setItem('studentId', studentId);
      sessionStorage.setItem('firstMajorCode', firstMajorCode);
      sessionStorage.setItem('firstMajorCampus', firstMajorCampus);

      // Step 2: UUID로 기존 가입 여부 확인
      const joinedRes = await axios.post(joinedUrl, { koreapasUUID });
      const alreadyJoined = joinedRes.data.data.alreadyJoined;
      console.log('AlreadyJoined?: ', alreadyJoined);
      if (alreadyJoined) {
        // ✅ 이미 가입한 유저 → 로그인 API 호출
        alert('이미 가입된 사용자입니다. 자동으로 로그인됩니다!');
        const loginRes = await axios.post(loginUrl, {
          id: ID,
          password: pass,
          isRememberOn: false, // 또는 isChecked (checkbox 상태) 전달
        });

        localStorage.setItem('accessToken', loginRes.data.data.accessToken);
        localStorage.setItem('refreshToken', loginRes.data.data.refreshToken);
        localStorage.setItem('isLogin', 'true');
        navigate('/');
        window.location.reload();
      } else {
        // ❌ 신규 유저 → sign-up flow로
        navigate('/signUp2');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert('유효하지 않은 고파스 아이디 혹은 비밀번호에요.');
      } else if (axios.isAxiosError(err) && err.response?.status === 403) {
        alert('고파스 강등 또는 미인증 회원은 쿠플라이 서비스를 이용할 수 없어요.');
      } else {
        alert('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  const handlePrev = () => {
    navigate('/');
  };

  const handleForgetClick = () => {
    window.open('https://www.koreapas.com/bbs/lostid_new.php', '_blank', 'noopener,noreferrer');
  };

  return (
    <SignUpPageWrapper step={1} stepInfo="고려대학생 인증하기">
      <ContentsList>
        <ContentsWrapper>
          <UserInputText userInfoType="koreapasID" />
          <UserInput userInfoType="koreapasID" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <UserInputText userInfoType="koreapasPass" />
          <UserInput userInfoType="koreapasPass" toNext={next} />
        </ContentsWrapper>
      </ContentsList>
      <LinkBox>
        <Link onClick={handleForgetClick}>고파스 아이디 비밀번호 찾기</Link>
        <Link onClick={handleSyncClick}>쿠플라이의 기존 회원이신가요?</Link>
      </LinkBox>
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

const Link = styled.button`
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 0.73vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 100% */
  text-decoration-line: underline;
  text-transform: uppercase;
`;
