import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../assets/Typography';
import Button02 from '../../assets/buttons/Button02';

function Join2() {
  const [ID, setID] = useState<string>('');
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    //버튼 클릭 시 고려대 이메일인지 검사하고 맞다면 pass, 틀리면 alert를 내보낸다.
    const IDPattern = /.+@korea\.ac\.kr$/;
    if (IDPattern.test(ID)) {
      //페이지 이동 전 email을 보낼 것을 요청하고, 에러가 발생하면 alert를 띄운다.
      const url = 'https://api.kupply.devkor.club/auth/sendEmail'; // 만든 API 주소로 바뀌어야 함.
      try {
        // await axios.post(url, { email: ID });
        // await client.post('/auth/sendEmail', { email: ID });

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

  return (
    <MainWrapper>
      <Typography
        size="1.98vw"
        bold="700"
        color="#FFF"
        style={{
          textShadow:
            '5px 3px 13px rgba(202, 63, 130, 0.25), 42px 30px 31px rgba(202, 63, 130, 0.13), 74px 53px 37px rgba(202, 63, 130, 0.04), 116px 83px 40px rgba(202, 63, 130, 0.00);',
          lineHeight: '131.579%',
          marginBottom: '0.73vw',
        }}
      >
        간편 이메일 등록 후 이중전공에 대한 모든 정보 확인하기!
      </Typography>
      <Typography size="1.25vw" bold="500" color="#FFF">
        몇가지 회원가입 단계를 거친 후, 쿠플라이만의 다양한 서비스를 이용해보세요.
      </Typography>
      <JoinBox>
        <TextFieldBox
          placeholder="Bright@Korea.ac.kr"
          value={ID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setID(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              handleButtonClick();
            }
          }}
        ></TextFieldBox>
        <Button02 onClick={handleButtonClick}></Button02>
      </JoinBox>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 13.33vw;
  padding-top: 3.39vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../../designImage/onboarding/Join2.png');
  background-size: cover;
`;

const JoinBox = styled.div`
  width: auto;
  height: auto;
  margin-top: 1.82vw;
  display: flex;
  gap: 1.15vw;
`;

const TextFieldBox = styled.input`
  width: 32.71vw;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border: 0.1vw solid #d85888;
  padding: 1.3vw 0.94vw;
  border-radius: 0.52vw;
  background: rgba(255, 255, 255, 0.7);
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
  }
`;

export default Join2;
