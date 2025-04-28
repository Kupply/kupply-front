import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api_url, client } from '../../utils/HttpClient';
import Typography from '../../assets/Typography';
import NextButton from '../../assets/buttons/OldNextButton';
import LoginModal from '../../components/login/LoginModal';
import AlertMessage from '../../assets/toolTips/ToolTip01';
import Login2JoinModal from '../../components/login/Login2JoinModal';
import { CheckBoxButton02 } from '../../assets/buttons/CheckBoxButton';
import CTA01 from '../../assets/CTAs/CTA01';

const Wrapper = styled.div`
  width: 100vw;
  height: 60.05vw;
  display: flex;
  justify-content: center;
  background-color: #fcfafb;
`;

const LoginBox = styled.div`
  width: 42.5vw;
  height: 49.58vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.96vw;
  flex-shrink: 0;
  border-radius: 0.52vw;
  background: rgba(255, 255, 255, 0.7);
`;

const LogoImage = styled.img`
  width: 12.5vw;
  height: 3.13vw;
  flex-shrink: 0;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  width: auto;
  flex-direction: column;
  gap: 0.42vw;
  margin-bottom: 1.25vw;
`;

const IDField = styled.input<{ isFilled: boolean }>`
  display: flex;
  width: 30.83vw;
  padding: 1.3vw 0.94vw;
  align-items: flex-start;
  gap: 8px;
  border-radius: 0.52vw;
  border: ${(props) => (props.isFilled ? '1px solid #D85888' : '1px solid #b9b9b9')};
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(216, 88 136, 0.1);
  color: #d85888;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  &::placeholder {
    color: rgba(185, 185, 185, 0.8);
    font-family: Pretendard;
    font-size: 0.94vw;
    font-style: normal;
    font-weight: 500;
    line-height: 0.94vw;
  }
`;

const PasswordField = styled.input<{ isFilled: boolean }>`
  display: flex;
  width: 30.83vw;
  padding: 1.3vw 0.94vw;
  align-items: flex-start;
  gap: 8px;
  border-radius: 0.52vw;
  border: ${(props) => (props.isFilled ? '1px solid #D85888' : '1px solid #b9b9b9')};
  background: #fff;
  font-size: 0.94vw;
  letter-spacing: 0.26vw;
  &::placeholder {
    color: rgba(185, 185, 185, 0.8);
    font-family: Pretendard;
    font-size: 0.94vw;
    font-style: normal;
    font-weight: 500;
    line-height: 0.94vw;
    letter-spacing: 0px;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: flex-end;
  width: 32.71vw;
`;

const CheckButton = styled.button<{ checked: boolean }>`
  width: 0.94vw;
  height: 0.94vw;
  flex-shrink: 0;
  background-image: url(${(props) =>
    props.checked ? 'designImage/textField/CheckCircle28.png' : 'designImage/login/DCheckCircle.png'});
  background-size: cover;
  border: none;
  cursor: pointer;
  margin-right: 0.21vw;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.31vw;
  margin-top: 4.11vw;
  margin-bottom: 4.53vw;
`;

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

export interface LoginPageProps {
  setLogin: (state: boolean) => void;
}

function LoginPage(props: LoginPageProps) {
  const { setLogin } = props;
  const [isOpenAlert, setOpenAlert] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleLink2Click = () => {
    navigate('/signup0', { state: { showModal: true } });
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
    if (ID === '' || password === '') return;
    const url = `${api_url}/auth/login`;
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
      window.location.reload();
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
        <div style={{ transform: 'translateY(-10.375vw) translateX(+5vw)' }}>
          <Login2JoinModal isOpenAlert={isOpenAlert} setOpenAlert={setOpenAlert} onClickModal={handleLink2Click} />
        </div>
      ) : null}
      <LoginBox>
        <LogoImage
          src="../../designImage/kupply/KupplyVer1.svg"
          style={{ marginTop: '6.2vw', marginBottom: '0.6vw' }}
        />
        <Typography size="0.94vw" bold="500">
          고려대학교 이메일로 이용하는 쿠플라이의 모든 서비스
        </Typography>
        <TextFieldWrapper>
          <TextBox style={{ height: '5.47vw' }}>
            <Typography size="0.94vw" bold="700">
              쿠플라이 아이디
            </Typography>
            <Typography size="0.94vw">를 입력해주세요.</Typography>
            <AlertMessage>쿠플라이 아이디는 고려대학교 이메일 주소입니다.</AlertMessage>
          </TextBox>
          <IDField
            placeholder="kupply@korea.ac.kr"
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
            <Typography size="0.94vw" bold="700">
              비밀번호
            </Typography>
            <Typography size="0.94vw">를 입력해주세요.</Typography>
          </TextBox>
          <PasswordField
            type="password"
            placeholder="쿠플라이 비밀번호"
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
          <Typography
            onClick={() => setIsChecked((prevState) => !prevState)}
            size="0.94vw"
            bold="600"
            color={isChecked ? '#D85888' : '#A8A8A8'}
          >
            로그인 상태 유지
          </Typography>
        </TextBox>
        <LinkBox>
          <Link onClick={toggleModal}>비밀번호를 잊으셨나요?</Link>
          <Link onClick={handleLink2Click}>회원가입</Link>
        </LinkBox>
        <CTA01 state={ID != '' && password !== '' ? 'default' : 'disabled'} onClick={onLoginClick}>
          로그인
        </CTA01>
      </LoginBox>
      {isModalVisible && <LoginModal />}
    </Wrapper>
  );
}

export default LoginPage;
