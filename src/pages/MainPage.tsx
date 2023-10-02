import styled from 'styled-components';
import Carousel from '../components/carousel/Carousel';
import LabelButton from '../assets/buttons/LabelButton';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 1153px;
  background: white;
  gap: 80px;
`;

const JoinMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1400px;
  height: 192px;
  justify-content: center;
  align-items: center;
  background: white;
`;

const ContainerMainText = styled.h3`
  color: #2c323a;
  text-align: center;
  font-family: Pretendard;
  font-size: 38px;
  font-style: normal;
  font-weight: 700;
  line-height: 50px;
  margin-top: 0;
  margin-bottom: 12px;
`;

const ContainerSubText = styled.text`
  color: #2c323a;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 34px;
`;

const JoinWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const TextFieldBox = styled.input`
  display: flex;
  width: 628px;
  padding: 25px 18px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #d85888;
  color: #141414;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 100% */
  &::placeholder {
    color: #b9b9b9;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 100% */
  }
`;

function MainPage() {
  const [ID, setID] = useState<string>('');

  const navigate = useNavigate();

  //회원가입 정보는 main에서는 지워져야 함.
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleButtonClick = async () => {
    //버튼 클릭 시 고려대 이메일인지 검사하고 맞다면 pass, 틀리면 alert를 내보낸다.
    const IDPattern = /.+@korea\.ac\.kr$/;
    if (IDPattern.test(ID)) {
      //페이지 이동 전 email을 보낼 것을 요청하고, 에러가 발생하면 alert를 띄운다.
      const url = 'http://localhost:8080/auth/sendEmail'; // 만든 API 주소로 바뀌어야 함.
      try {
        // await axios.post(url, { email: ID });

        //sessionStorage에 입력받은 email을 저장한 후 다음 페이지로 넘어간다.
        window.sessionStorage.setItem('email', ID);
        navigate('/join');
      } catch (e) {
        //이 코드는 이메일이 이미 인증된, 즉 겹치는 경우를 처리한다.
        alert(e);
      }
    } else {
      alert('형식에 맞는 이메일이 아닙니다.');
    }
  };

  return (
    <Wrapper>
      <Carousel />
      <JoinMainContainer>
        <ContainerMainText>당신을 찾고있던 이중전공에 대한 모든 정보가 바로 이곳에!</ContainerMainText>
        <ContainerSubText>
          간단한 이메일 주소 입력으로 실시간 이중전공 지원현황과 간편한 학점 비교 등, 쿠플라이만의 다양한 서비스를
          이용해보세요.
        </ContainerSubText>
        <JoinWrapper>
          <TextFieldBox
            placeholder="Bright@korea.ac.kr"
            value={ID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setID(e.target.value);
            }}
          />
          <LabelButton buttonType="primary" size="large" onClick={handleButtonClick}>
            <img
              src="../../design_image/kupply_icon.png"
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            />
            Join!
          </LabelButton>
        </JoinWrapper>
      </JoinMainContainer>
    </Wrapper>
  );
}

export default MainPage;
