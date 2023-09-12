import React from 'react';
import styled from 'styled-components';
import Carousel from '../components/carousel/Carousel';
import LabelButton from '../assets/buttons/LabelButton';
import { useNavigate } from 'react-router-dom';
import NextButton from '../assets/buttons/NextButton';
import PrevButton from '../assets/buttons/PrevButton';
import Modal from '../components/base/Modal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1500px;
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
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/join');
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
          <TextFieldBox placeholder="Bright@korea.ac.kr" />
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
