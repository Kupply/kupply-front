import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Typography from '../assets/Typography';
import NextButton from '../assets/buttons/NextButton';
import LoginModal from './LoginModal';
import AlertMessage from '../assets/AlertMessage';
import client from '../utils/httpClient';
import Login2JoinModal from './Login2JoinModal';

const Wrapper = styled.div`
  width: 100vw;
  height: 933px;
  display: flex;
  justify-content: center;
  background-color: #fcfafb;
`;

const LoginBox = styled.div`
  width: 816px;
  height: 752px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
`;

const LogoImage = styled.img`
  width: 240px;
  height: 60px;
  flex-shrink: 0;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  width: 628px;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
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
  &::placeholder {
    color: rgba(185, 185, 185, 0.8);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
  }
`;

const PasswordField = styled.input<{ isFilled: boolean }>`
  display: flex;
  width: 592px;
  padding: 25px 18px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  border: ${(props) => (props.isFilled ? '1px solid #D85888' : '1px solid #b9b9b9')};
  background: #fff;
  font-size: 18px;
  letter-spacing: 5px;
  &::placeholder {
    color: rgba(185, 185, 185, 0.8);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0px;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: flex-end;
  width: 628px;
`;

const CheckButton = styled.button<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background-image: url(${(props) =>
    props.checked ? 'design_image/Check_Circle.png' : 'design_image/D_Check-circle.png'});
  background-size: cover;
  border: none;
  cursor: pointer;
  margin-right: 4px;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 36px;
  margin-bottom: 37px;
`;

const Link = styled.button`
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 100% */
  text-decoration-line: underline;
  text-transform: uppercase;
`;

export interface LoginPageProps {
  setLogin: (state: boolean) => void;
}

function LoginPage(props: LoginPageProps) {
  const { setLogin } = props;
  const [isOpenAlert, setOpenAlert] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleLink2Click = () => {
    navigate('/', { state: { showModal: true } });
  };

  const [ID, setID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'accessTokenExpire']);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // login API 접근
  const onLoginClick = async () => {
    const url = 'https://api.kupply.devkor.club/auth/login';
    try {
      await axios
        .post(url, {
          email: ID,
          password: password,
          isRememberOn: isChecked,
        })
        .then((res) => {
          if (res.data.data) {
            localStorage.setItem('accessToken', res.data.data.accessToken);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
          }
        });

      //로그인 상태를 유지하기 위해 localStorage에 로그인 여부와 ID를 저장 후 login 상태를 true로 바꾸고 메인 페이지로 보낸다.
      window.localStorage.setItem('isLogin', 'true');
      window.localStorage.setItem('loginedUser', ID);
      setLogin(true);
      navigate('/');
    } catch (err: any) {
      // 이후 수정 필요함.
      setPassword('');
      if (err.response.data.error.message) {
        alert(err.response.data.error.message);
      }
    }
  };

  return (
    <Wrapper>
      {isOpenAlert ? (
        <Login2JoinModal isOpenAlert={isOpenAlert} setOpenAlert={setOpenAlert} onClickModal={handleLink2Click} />
      ) : null}
      <LoginBox>
        <LogoImage src="../../design_image/Kupply_ver1.png" style={{ marginTop: '49px', marginBottom: '11.54px' }} />
        <Typography size="mediumText">고려대학교 메일로 이용하는 쿠플라이의 모든 서비스</Typography>
        <TextFieldWrapper>
          <TextBox style={{ height: '105px' }}>
            <Typography size="mediumText" bold="700">
              쿠플라이 아이디
            </Typography>
            <Typography size="mediumText">를 입력해주세요.</Typography>
            <AlertMessage />
          </TextBox>
          <IDField
            placeholder="0000@korea.ac.kr"
            value={ID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setID(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                if (ID !== '' && password !== '') {
                  onLoginClick();
                }
              }
            }}
            isFilled={ID !== ''}
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextBox>
            <Typography size="mediumText" bold="700">
              비밀번호
            </Typography>
            <Typography size="mediumText">를 입력해주세요.</Typography>
          </TextBox>
          <PasswordField
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                if (ID !== '' && password !== '') {
                  onLoginClick();
                }
              }
            }}
            isFilled={password !== ''}
          />
        </TextFieldWrapper>
        <TextBox>
          <CheckButton checked={isChecked} onClick={() => setIsChecked((prevState) => !prevState)}></CheckButton>
          <Typography size="mediumText" bold="600" color={isChecked ? '#D85888' : '#A8A8A8'}>
            로그인 상태 유지
          </Typography>
        </TextBox>
        <LinkBox>
          <Link style={{ marginBottom: '8px' }} onClick={toggleModal}>
            비밀번호를 잊으셨나요?
          </Link>
          <Link onClick={handleLink2Click}>회원가입</Link>
        </LinkBox>
        <NextButton
          active={ID !== '' && password !== ''}
          disabled={ID === '' || password === ''}
          onClick={onLoginClick}
        >
          로그인
        </NextButton>
      </LoginBox>
      {isModalVisible && <LoginModal />}
    </Wrapper>
  );
}

export default LoginPage;
