import React from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';
import Input01, { StateOptions } from '../assets/field/Input01';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { placeholderMapping, helpMessageMapping, errorMessageMapping } from '../components/signup/UserInput';
import CheckBox02 from '../assets/checkBoxes/CheckBox02';
import CTA01 from '../assets/CTAs/CTA01';
import Button05 from '../assets/buttons/Button05';
import LoginModal from '../components/login/LoginModal';
import { sendEmail } from '../../utils/SignUpFunctions';

interface LoginPageProps {
  setLogin: (state: boolean) => void;
}

export default function LoginPage(props: LoginPageProps) {
  const { setLogin } = props;

  const navigate = useNavigate();
  const handleLink2Click = () => {
    navigate('/', { state: { showModal: true } });
  };

  const [ID, setID] = useState<string>('');
  const [IdState, setIdState] = useState<StateOptions>('default');
  const [password, setPassword] = useState<string>('');
  const [passwordState, setPasswordState] = useState<StateOptions>('default');
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'accessTokenExpire']);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
      {isModalVisible && (
        <LoginModal
          isOpenModal={isModalVisible}
          setOpenModal={setIsModalVisible}
          onClickModal={() => setIsModalVisible((prev) => !prev)}
          sendEmail={sendEmail}
        />
      )}
      <ContentsList>
        <LogoContainer onClick={() => navigate('/')}>
          <img src={process.env.PUBLIC_URL + '/designImage/kupply/KupplyVer1.svg'} alt="LOGO IMAGE" />
        </LogoContainer>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">
              쿠플라이&nbsp;아이디
            </Typography>
            <Typography size="3.33vw" bold="500">
              를 입력해주세요
            </Typography>
          </TextBox>
          <Input01
            placeholder={placeholderMapping['id']}
            helpMessage={helpMessageMapping['id']}
            errorMessage={errorMessageMapping['id']}
            value={ID}
            setValue={setID}
            state={IdState}
            setState={setIdState}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">
              비밀번호
            </Typography>
            <Typography size="3.33vw" bold="500">
              를 입력해주세요
            </Typography>
          </TextBox>
          <Input01
            placeholder={placeholderMapping['password']}
            errorMessage={errorMessageMapping['password']}
            value={password}
            setValue={setPassword}
            setState={setPasswordState}
            state={passwordState}
            type="password"
          />
        </ContentsWrapper>
        <SubContent>
          <CheckBox02
            state={isChecked ? 'active' : 'default'}
            onImageClick={() => setIsChecked((prevState) => !prevState)}
          />
          <PasswordButton onClick={toggleModal}>비밀번호를 잊으셨나요?</PasswordButton>
        </SubContent>
        <ButtonsWrapper>
          <CTA01
            state={ID != '' && password !== '' ? 'default' : 'disabled'}
            onClick={onLoginClick}
            style={{ width: '100%' }}
          >
            로그인하기
          </CTA01>
          <Button05
            size="large"
            onClick={() => {
              navigate('/signup0');
            }}
          >
            포털 이메일로 회원가입
          </Button05>
        </ButtonsWrapper>
      </ContentsList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
  margin-top: 50px;
  width: 34.167vw;
  height: 7.5vw;
  flex-shrink: 0;
`;

const ContentsList = styled.div`
  width: 91.11vw;
  display: flex;
  flex-direction: column;
  gap: 5.55vw;
  align-items: flex-start;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw; /* 9px */
  width: 91.111vw; /* 328px */
  margin-bottom: 2px;
`;

const TextBox = styled.div`
  width: 100%;
  align-items: flex-start;
`;

const TempHeader = styled.div`
  height: 43px;
`;

const SubContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const PasswordButton = styled.div`
  color: rgba(216, 88, 136, 0.8);
  font-family: Pretendard;
  font-size: 2.78vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 12px */
  text-decoration-line: underline;
  text-transform: uppercase;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.22vw;
`;
