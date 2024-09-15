import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import Banner02 from '../../assets/banners/Banner02';
import Button02 from '../../assets/buttons/Button02';
import CTA02 from '../../assets/CTAs/CTA02';

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
      const url = 'https://api.kupply.devkor.club/auth/sendEmail'; // 만든 API 주소로 바뀌어야 함.
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
        {isLogined ? '당신의 합격 가능성을 확인하세요!' : '모든 정보, 오직 쿠플라이에서'}
      </Typography>
      <Typography
        size="3.33vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ lineHeight: '133.33%', textAlign: 'center', marginBottom: isLogined ? '6.39vw' : '0' }}
      >
        {isLogined ? '실시간 이중전공 지원현황과 나의 학점 백분위 정보까지,' : '고려대학교 이메일 주소입력으로'}
        <br />
        {isLogined ? '오직 쿠플라이에서 제공해 드릴게요.' : '쿠플라이만의 다양한 서비스를 이용해보세요.'}
      </Typography>
      {isLogined ? (
        <CTA02 size="large" onClick={handleMyboardButtonClick}>
          나도 모의지원 하러가기
        </CTA02>
      ) : (
        <JoinWrapper>
          <TextFieldWrapper>
            <TextFieldBox
              placeholder="kupply@korea.ac.kr"
              value={ID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setID(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  handleJoinButtonClick();
                }
              }}
            />
          </TextFieldWrapper>
          <Button02
            onClick={handleJoinButtonClick}
            style={{
              boxShadow:
                '9.72vw 11.94vw 4.44vw 0 rgba(216, 88, 136, 0.00), 6.11vw 7.78vw 3.89vw 0 rgba(216, 88, 136, 0.03), 3.33vw 4.44vw 3.33vw 0 rgba(216, 88, 136, 0.10), 1.67vw 1.94vw 2.5vw 0 rgba(216, 88, 136, 0.17), 0.28vw 0.56vw 1.39vw 0 rgba(216, 88, 136, 0.20)',
            }}
          />
        </JoinWrapper>
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
