import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import ModalLarge from '../components/base/ModalLarge';
import Typography from '../assets/OldTypography';
import NextButton from '../assets/buttons/OldNextButton';
import axios from 'axios';

const Wrapper = styled.main`
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005;
`;

const CloseButton = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 70px;
  right: 50px;
  cursor: pointer;
`;

const LogoBox = styled.div`
  display: flex;
  height: 46px;
  justify-content: center;
  align-items: center;
  gap: 8.418px;
  flex-shrink: 0;
  margin-top: 170px;
  margin-bottom: 39px;
`;

const LogoImage = styled.img`
  width: 188px;
  height: 46px;
`;

const IDField = styled.input<{ isFilled: boolean }>`
  display: flex;
  width: 592px;
  padding: 25px 18px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  border: ${(props) => (props.isFilled ? '1px solid #D85888' : '1px solid #b9b9b9')};
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(216, 88 136, 0.1);
  color: #d85888;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin-top: 32px;
  margin-bottom: 30px;
  &::placeholder {
    color: rgba(185, 185, 185, 0.8);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
`;

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [ID, setID] = useState<string>('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const forgotPassword = async () => {
    try {
      const url = 'https://api.kupply.devkor.club/auth/forgotPassword';
      await axios.post(url, { userEmail: ID });

      setIsOpen(!isOpen);
      alert('입력하신 이메일로 임시 비밀번호를 보냈습니다!');
    } catch (err: any) {
      if (err.response.data.error.message) {
        alert(err.response.data.error.message);
      }
    }
  };

  return isOpen ? (
    <Wrapper>
      <ModalLarge onClickToggleModal={handleToggle}>
        <CloseButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M38.9142 23.9142C39.6953 23.1332 39.6953 21.8668 38.9142 21.0858C38.1332 20.3047 36.8668 20.3047 36.0858 21.0858L30 27.1716L23.9142 21.0858C23.1332 20.3047 21.8668 20.3047 21.0858 21.0858C20.3047 21.8668 20.3047 23.1332 21.0858 23.9142L27.1716 30L21.0858 36.0858C20.3047 36.8668 20.3047 38.1332 21.0858 38.9142C21.8668 39.6953 23.1332 39.6953 23.9142 38.9142L30 32.8284L36.0858 38.9142C36.8668 39.6953 38.1332 39.6953 38.9142 38.9142C39.6953 38.1332 39.6953 36.8668 38.9142 36.0858L32.8284 30L38.9142 23.9142Z"
              fill="#434343"
            />
          </svg>
        </CloseButton>
        <LogoBox>
          <LogoImage src="../../design_image/Kupply_ver1.png" />
        </LogoBox>
        <Typography size="largeText">임시 비밀번호를 발급받을 고려대 이메일 주소를 입력해주세요.</Typography>
        <IDField
          placeholder="kupply@korea.ac.kr"
          value={ID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setID(e.target.value);
          }}
          isFilled={ID !== ''}
        />
        <NextButton active={ID !== ''} disabled={ID === ''} style={{ marginBottom: '80px' }} onClick={forgotPassword}>
          제출하기
        </NextButton>
        <Typography size="smallText" color="#B9b9b9">
          쿠플라이 아이디는 고려대학교 이메일 주소입니다
        </Typography>
      </ModalLarge>
    </Wrapper>
  ) : null;
}
