import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api_url } from '../../../utils/HttpClient';
import Typography from '../../../assets/Typography';
import Banner02 from '../../assets/banners/Banner02';
import Button02 from '../../assets/buttons/Button02';
import CTA02 from '../../assets/CTAs/CTA02';
import IconButton04 from '../../../assets/iconButtons/IconButton04';
import { Icon } from '@mui/material';

function Join1() {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [ID, setID] = useState<string>('');

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setIsLogined(true);
    else setIsLogined(false);
  }, []);

  const navigate = useNavigate();

  const handleJoinButtonClick = async () => {
    //버튼 클릭 시 고려대 이메일인지 검사하고 맞다면 pass, 틀리면 alert를 내보낸다.
    const IDPattern = /.+@korea\.ac\.kr$/;
    if (IDPattern.test(ID)) {
      //페이지 이동 전 email을 보낼 것을 요청하고, 에러가 발생하면 alert를 띄운다.
      const url = `${api_url}/auth/sendEmail`;
      try {
        await axios.post(url, { email: ID });

        //sessionStorage에 입력받은 email을 저장한 후 다음 페이지로 넘어간다.
        window.sessionStorage.setItem('email', ID);
        navigate('/join');
      } catch (err: any) {
        //이 코드는 이메일이 이미 인증된, 즉 겹치는 경우를 처리한다.
        alert(err.response.data.error.message);
        if (err.response.data.error.message === '이미 회원가입이 완료된 이메일 입니다. 로그인해주세요.') {
          navigate('/login');
        }
      }
    } else {
      alert('형식에 맞는 이메일이 아닙니다.');
    }
  };

  const handleMyboardButtonClick = () => {
    navigate('/myboard');
  };
  const handleForgetClick = () => {
    window.open('https://www.koreapas.com/bbs/lostid_new.php', '_blank', 'noopener,noreferrer');
  };
  const handleSyncClick = () => {
    navigate('/sync0');
  };

  return (
    <MainWrapper isLogined={isLogined}>
      <Banner02 />
      <Typography
        size="5.56vw"
        bold="700"
        style={{ lineHeight: '120%', textAlign: 'center', margin: '8.89vw 0 3.33vw 0' }}
      >
        {isLogined ? '쿠플라이 모의지원을 통해' : '당신이 찾고있던 이중전공에 대한'}
        <br />
        {isLogined ? '당신의 합격 가능성을 확인하세요!' : '모든 정보, 오직 쿠플라이에서.'}
      </Typography>
      <Typography
        size="3.33vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ lineHeight: '133.33%', textAlign: 'center', marginBottom: isLogined ? '6.39vw' : '0' }}
      >
        {isLogined
          ? '실시간 이중전공 지원현황과 나의 학점 백분위 정보까지,'
          : '쿠플라이는 고파스 계정으로 이용이 가능합니다.'}
        <br />
        {isLogined ? '오직 쿠플라이에서 제공해 드릴게요.' : ''}
      </Typography>
      {isLogined ? (
        <CTA02 size="large" onClick={handleMyboardButtonClick}>
          나도 모의지원 하러가기
        </CTA02>
      ) : (
        <>
          <JoinWrapper>
            <Button02
              imgSize="6.11vw"
              onClick={() => navigate('/login')}
              style={{
                boxShadow:
                  '9.72vw 11.94vw 4.44vw 0 rgba(216, 88, 136, 0.00), 6.11vw 7.78vw 3.89vw 0 rgba(216, 88, 136, 0.03), 3.33vw 4.44vw 3.33vw 0 rgba(216, 88, 136, 0.10), 1.67vw 1.94vw 2.5vw 0 rgba(216, 88, 136, 0.17), 0.28vw 0.56vw 1.39vw 0 rgba(216, 88, 136, 0.20)',
              }}
            ></Button02>
          </JoinWrapper>
          <LinkBox>
            <div style={{ display: 'flex', gap: '0.83vw', alignItems: 'center' }}>
              <IconButton04 size="2.77vw" />
              <Link onClick={handleForgetClick}>고파스 아이디/비밀번호 찾기</Link>
            </div>
            <Link onClick={handleSyncClick}>쿠플라이의 기존 회원이신가요?</Link>
          </LinkBox>
        </>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ isLogined?: boolean }>`
  width: 100%;
  height: auto;
  padding: 5.56vw 0 6.67vw 0;
  padding: ${({ isLogined }) => (isLogined ? '5.56vw 0 11.94vw 0' : '5.56vw 0 6.67vw 0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const JoinWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.22vw;
  margin-top: 7.22vw;
`;

// 출처: src/pages/login/OldLoginPage.tsx
const Link = styled.button`
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 2.77vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  text-decoration-line: underline;
  text-transform: uppercase;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.38vw;
  margin-top: 7.22vw;
  margin-bottom: 5.83vw;
`;

const TextFieldWrapper = styled.div`
  width: 70vw;
  height: 23.33vw;
  background-image: url('../../../../designImage/mobile/onboarding/blur.png');
  background-size: 100% 130%;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.39vw;
`;

const TextFieldBox = styled.input`
  width: 67.78vw;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 2.22vw;
  border: 1px solid #d85888;
  padding: 3.33vw 0 3.33vw 4.44vw;
  border-radius: 1.39vw;
  background: rgba(255, 255, 255, 0.8);
  color: #141414;
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 500;
  line-height: 138.46%;

  &::placeholder {
    color: #b9b9b9;
    font-family: Pretendard;
    font-size: 3.61vw;
    font-style: normal;
    font-weight: 500;
    line-height: 138.46%;
    opacity: 0.8;
  }
`;

export default Join1;
