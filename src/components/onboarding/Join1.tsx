// TODO: Link 버튼에 onClick 이벤트 추가

import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api_url } from '../../utils/HttpClient';
import Typography from '../../assets/Typography';
import Button02 from '../../assets/buttons/Button02';
import CTA02 from '../../assets/CTAs/CTA02';
import IconButton04 from '../../assets/iconButtons/IconButton04';

function Join1() {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [ID, setID] = useState<string>('');
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<'disabled' | 'default' | 'hover'>('default');

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setIsLogined(true);
    else setIsLogined(false);
  }, []);

  const handleButtonClick = async () => {
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

  const handleForgetClick = () => {
    window.open('https://www.koreapas.com/bbs/lostid_new.php', '_blank', 'noopener,noreferrer');
  };
  const handleSyncClick = () => {
    navigate('/sync0');
  };

  return (
    <MainWrapper>
      {isLogined ? (
        <>
          <Typography
            size="1.98vw"
            bold="700"
            color="#2C323A"
            style={{ margin: '4.95vw 0 0.42vw 0', lineHeight: '131.58%' }}
          >
            쿠플라이 모의지원을 통해 당신의 합격 가능성을 확인하세요!
          </Typography>
          <Typography size="1.25vw" bold="500" color="#2C323A" style={{ opacity: 0.8 }}>
            실시간 이중전공 지원현황과 나의 학점 백분위 정보까지, 오직 쿠플라이에서 제공해 드릴게요.
          </Typography>
          <CTA02
            state={buttonState}
            onClick={() => navigate('/myboard')}
            onMouseEnter={() => setButtonState('hover')}
            onMouseLeave={() => setButtonState('default')}
            style={{ margin: '2.29vw 0 5.63vw 0' }}
          />
        </>
      ) : (
        <>
          <Typography
            size="1.98vw"
            bold="700"
            color="#2C323A"
            style={{ margin: '5vw 0 0.9375vw 0', lineHeight: '131.58%' }} // margin 순서: top right bottom left
          >
            당신이 찾고있던 이중전공에 대한 모든 정보, 오직 쿠플라이에서.
          </Typography>
          <Typography
            size="1.25vw"
            bold="500"
            color="#2C323A"
            style={{ opacity: 0.8, textAlign: 'center', margin: '0 0 2.865vw 0', lineHeight: '1.56vw' }}
          >
            쿠플라이는 고파스 계정으로 이용 가능합니다.
            <br />
            고파스 계정으로 로그인하고, 실시간 이중전공 지원현황과 간편한 학점 비교 등, 쿠플라이만의 다양한 서비스를
            이용해보세요.
            {/* 고려대학교 이메일 주소 입력으로 실시간 이중전공 지원현황 확인과 간편한 학점 비교 등, 쿠플라이만의 다양한
            서비스를 이용해보세요. */}
          </Typography>
          <JoinBox>
            <Button02
              onClick={() => navigate('/login')}
              style={{
                width: '23.33vw',
                boxShadow:
                  '7px 3px 16px 0px rgba(216, 88, 136, 0.20), 26px 11px 28px 0px rgba(216, 88, 136, 0.17), 59px 25px 38px 0px rgba(216, 88, 136, 0.10), 105px 45px 46px 0px rgba(216, 88, 136, 0.03), 164px 70px 50px 0px rgba(216, 88, 136, 0.00)',
              }}
            />
          </JoinBox>
          <LinkBox>
            <div style={{ display: 'flex', gap: '0.26vw', alignItems: 'center' }}>
              <IconButton04 />
              <Link onClick={handleForgetClick}>고파스 아이디/비밀번호 찾기</Link>
            </div>
            <Link onClick={handleSyncClick}>쿠플라이의 기존 회원이신가요?</Link>
          </LinkBox>
        </>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const JoinBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  gap: 1.15vw;
  margin: 0 0 2.865vw 0;
  align-items: center;
`;

// 출처: src/pages/login/OldLoginPage.tsx
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

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.78vw;
  margin-bottom: 5.83vw;
`;

const ImageWrapper = styled.img`
  width: 1.3vw;
  height: 1.3vw;
`;

// 삭제 예정
const TextFieldWrapper = styled.div`
  width: 32.99vw; //33.33vw;
  height: 10.15vw; //4.48vw;
  border-radius: 0.52vw;
  background-image: url('../../designImage/onboarding/Blur.svg');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextFieldBox = styled.input`
  width: 32.71vw;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border: 1px solid #d85888;
  padding: 1.2vw 0.94vw;
  border-radius: 0.52vw;
  background: rgba(255, 255, 255);
  color: #141414;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  &::placeholder {
    color: #b9b9b9;
    font-family: Pretendard;
    font-size: 0.94vw;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

export default Join1;
