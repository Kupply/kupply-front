import styled from 'styled-components';
import Carousel from '../components/carousel/Carousel';
import LabelButton from '../assets/buttons/LabelButton';
import MainPageModal from './MainPageModal';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import MockApplicationButton, { MockApplicationProps } from '../assets/myboardpage/MockApplication';
import client from '../utils/httpClient';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1920px; //100%;
  // max-width: 1920px; //2560px;
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

// 지원하기 버튼용
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 200px;
  padding: 16px 32px;
  gap: 8px;
  border-radius: 10px;
  // default
  background: linear-gradient(91deg, #d85888 -19.76%, #f5bdbd 87.65%, rgba(253, 242, 242, 0.3) 124.79%);
  // hover
  &:hover:not(:disabled) {
    box-shadow: 0px 20px 50px 0px rgba(232, 88, 136, 0.41);
  }
  // unactive
  &:disabled {
    opacity: 0.5;
    background: linear-gradient(91deg, #d85888 -19.76%, #f5bdbd 87.65%, rgba(253, 242, 242, 0.3) 124.79%);
  }
`;

const Text = styled.text`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

const EventBox = styled.div`
  position: fixed;
  top: 100px;
  right: 100px;
  width: 550px;
  height: 550px;
  background-image: url('../design_image/eventImage.png');
  background-size: cover;
  z-index: 700;
`;

const CloseButton = styled.button`
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CloseForDayButton = styled.button`
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
  text-decoration-line: underline;
  text-transform: uppercase;
  position: absolute;
  top: 520px;
  right: 170px;
`;

// 아이콘 위치 수정 완료
const Icon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_3412_8527)">
      <path
        d="M18.3327 1.6665L9.16602 10.8332"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3327 1.6665L12.4993 18.3332L9.16602 10.8332L1.66602 7.49984L18.3327 1.6665Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3412_8527">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

//////////////////////

function MainPage() {
  const [ID, setID] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);
  const [isEventVisible, setIsEventVisible] = useState(false); // 23.11.20 이벤트 종료되었으므로 디폴트값 false 로 수정

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeEventBox = () => {
    setIsEventVisible(false);
  };

  const closeEventBoxForDay = () => {
    const now = new Date();
    localStorage.setItem('eventBoxClosed', now.toISOString());
    setIsEventVisible(false);
  };

  useEffect(() => {
    sessionStorage.clear();

    const eventBoxClosed = localStorage.getItem('eventBoxClosed');
    if (eventBoxClosed) {
      const now = new Date();
      const closedDate = new Date(eventBoxClosed);
      const isSameDay = now.toDateString() === closedDate.toDateString();

      if (!isSameDay) {
        localStorage.removeItem('eventBoxClosed');
        setIsEventVisible(true);
      } else {
        setIsEventVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    if (location.state?.showModal) {
      setIsModalVisible(true);
    }
  }, [location]);

  // 로그인 여부 확인
  const [isLogined, setisLogined] = useState<boolean>(false);
  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  //회원가입 정보는 main에서는 지워져야 함.
  useEffect(() => {
    sessionStorage.clear();
  }, []);

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

  const goToMyBoard = () => {
    navigate('/myboard');
  };

  return (
    <Wrapper>
      {isEventVisible && (
        <EventBox>
          <CloseButton
            onClick={() => {
              closeEventBox();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 60 60" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M38.9142 23.9142C39.6953 23.1332 39.6953 21.8668 38.9142 21.0858C38.1332 20.3047 36.8668 20.3047 36.0858 21.0858L30 27.1716L23.9142 21.0858C23.1332 20.3047 21.8668 20.3047 21.0858 21.0858C20.3047 21.8668 20.3047 23.1332 21.0858 23.9142L27.1716 30L21.0858 36.0858C20.3047 36.8668 20.3047 38.1332 21.0858 38.9142C21.8668 39.6953 23.1332 39.6953 23.9142 38.9142L30 32.8284L36.0858 38.9142C36.8668 39.6953 38.1332 39.6953 38.9142 38.9142C39.6953 38.1332 39.6953 36.8668 38.9142 36.0858L32.8284 30L38.9142 23.9142Z"
                fill="#434343"
              />
            </svg>
          </CloseButton>
          <CloseForDayButton onClick={closeEventBoxForDay}>하루동안 보지 않기</CloseForDayButton>
        </EventBox>
      )}
      <Carousel />
      {!isLogined ? (
        <JoinMainContainer>
          <ContainerMainText>당신이 찾고있던 이중전공에 대한 모든 정보가 바로 이곳에!</ContainerMainText>
          <ContainerSubText>
            간단한 회원가입으로 실시간 이중전공 지원현황과 간편한 학점 비교 등, 쿠플라이만의 다양한 서비스를
            이용해보세요.
          </ContainerSubText>
          <JoinWrapper>
            <TextFieldBox
              placeholder="고려대학교 이메일 주소"
              value={ID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setID(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  handleButtonClick();
                }
              }}
            />
            <LabelButton buttonType="primary" size="large" onClick={handleButtonClick}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="../../design_image/kupply_icon.png"
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                회원가입
              </div>
            </LabelButton>
          </JoinWrapper>
        </JoinMainContainer>
      ) : (
        <JoinMainContainer>
          <ContainerMainText>쿠플라이 모의지원을 통해 당신의 합격 가능성을 확인하세요!</ContainerMainText>
          <ContainerSubText>
            간단한 모의지원으로 나의 학점 위치 및 다른 지원자 현황을 파악해볼 수 있어요.
          </ContainerSubText>
          <Button onClick={goToMyBoard}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icon />
              <Text style={{ marginLeft: '8px' }}>모의지원 하러가기</Text>
            </div>
          </Button>
        </JoinMainContainer>
      )}
      {isModalVisible && (
        <MainPageModal
          currentModal={currentModal}
          isOpenModal={isModalVisible}
          setCurrentModal={setCurrentModal}
          setOpenModal={setIsModalVisible}
          onClickModal={closeModal}
        />
      )}
    </Wrapper>
  );
}

export default MainPage;
