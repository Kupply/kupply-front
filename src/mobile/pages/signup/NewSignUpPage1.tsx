import { useState, useEffect } from 'react';
import { useNewSignUp1Verification } from '../../../utils/SignUpFunctions';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../../utils/HttpClient';
import axios from 'axios';
import { SignUpPageWrapper } from '../../components/signup/SignUpPageWrapper';
import styled from 'styled-components';
import Button03 from '../../assets/buttons/Button03';
import Button04 from '../../assets/buttons/Button04';
import Typography from '../../../assets/Typography';
import { UserInput } from '../../components/signup/UserInput';

export function SignUp1Page() {
  const [next, setNext] = useState(false);
  const { complete, ID, pass } = useNewSignUp1Verification();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 최초 로그인 후 sign up1을 건너뛰고 싶다는 거자나
  //   // 그러니까 로그인을 하려고 입력을 했는데 아직 회원은 아닌 경우
  //   // 이거 완전히 잘못됐어.
  //   // uuid만 확인 하고 다른 설정을 안하고 있자나. 다른 것까지 다 하도록 만들어야 해
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
      console.log('Already Joined??', alreadyJoined);

      if (alreadyJoined) {
        alert('이미 가입된 사용자입니다. 자동으로 로그인됩니다!');
        // ✅ 이미 가입한 유저 → 로그인 API 호출
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
    <SignUpPageWrapper step={1} stepInfo="고려대 학생 인증하기">
      <div style={{ marginTop: '14.5vw', marginBottom: '12.3vw', textAlign: 'center' }}>
        <Typography size="6.66vw" bold="700" style={{ lineHeight: '131.579%', textAlign: 'center' }}>
          환영합니다!
        </Typography>

        <div style={{ marginTop: '4.6vw', textAlign: 'center' }}>
          <span style={{ fontSize: '4vw', fontWeight: 500, opacity: 0.8 }}>쿠플라이는</span>
          <img
            src={process.env.PUBLIC_URL + `/designImage/login/tigerEmoji.png`}
            alt="tigerEmoji"
            style={{
              height: '4.329vw',
              verticalAlign: 'middle',
              margin: '0 0.4vw',
            }}
          />
          <span style={{ fontSize: '4vw', fontWeight: 700, opacity: 0.8 }}>고파스 아이디/비밀번호</span>
          <br />
          <span style={{ fontSize: '4vw', fontWeight: 500, opacity: 0.8 }}>로 서비스 이용이 가능합니다.</span>
        </div>
      </div>
      <ContentsList>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="700">
              고파스 아이디
            </Typography>
            <Typography size="3.33vw" bold="400">
              를 입력해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="koreapasID" toNext={next} />
        </ContentsWrapper>
        <ContentsWrapper>
          <div>
            <Typography size="3.33vw" bold="700">
              고파스 비밀번호
            </Typography>
            <Typography size="3.33vw" bold="400">
              를 입력해주세요.
            </Typography>
          </div>
          <UserInput userInfoType="koreapasPass" toNext={next} />
        </ContentsWrapper>
        <LinkBox>
          <Link onClick={handleForgetClick}>고파스 아이디 비밀번호 찾기</Link>
          <Link onClick={handleSyncClick}>쿠플라이의 기존 회원이신가요?</Link>
        </LinkBox>
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
  margin-top: 20.778vw; /* 100px */
  gap: 2.222vw; /* 8px */
  width: 100%;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5vw;
  margin-top: 12.11vw;
  //   margin-bottom: 2.53vw;
`;

const Link = styled.button`
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 2.78vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 100% */
  text-decoration-line: underline;
  text-transform: uppercase;
`;
