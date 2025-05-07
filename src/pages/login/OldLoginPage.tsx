import axios from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api_url } from '../../utils/HttpClient';
import Typography from '../../assets/Typography';
import AlertMessage from '../../assets/toolTips/ToolTip01';
import CTA01 from '../../assets/CTAs/CTA01';
import IconButton04 from '../../assets/iconButtons/IconButton04';
import TextFieldBox, { StateOptions } from '../../assets/OldTextFieldBox';

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
  gap: 0.78vw;
  margin-top: 3.81vw;
  margin-bottom: 4.03vw;
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
  const handleSyncClick = () => {
    navigate('/sync0');
  };
  const handleForgetClick = () => {
    window.open('https://www.koreapas.com/bbs/lostid_new.php', '_blank', 'noopener,noreferrer');
  };
  const handleJoinClick = () => {
    navigate('/signup1');
  };

  const [ID, setID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idState, setIdState] = useState<StateOptions>('filled');
  const [passwordState, setPasswordState] = useState<StateOptions>('filled');
  const [isChecked, setIsChecked] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false); // 고파스 연동 전 사용했던 모달
  const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'accessTokenExpire']);

  // const toggleModal = () => {
  //   setIsModalVisible(!isModalVisible);
  // }; // 고파스 연동 전 사용했던 모달

  // login API 접근
  const onLoginClick = async () => {
    if (ID === '' || password === '') return;
    const url = `${api_url}/auth/koreapasLogin`;
    try {
      await axios
        .post(url, {
          id: ID,
          password: password,
          isRememberOn: isChecked,
        })
        .then((res) => {
          if (!res.data.data.isKupply) {
            alert('쿠플라이 회원이 아니에요. \n고파스 아이디로 쿠플라이 서비스에 회원가입 해주세요.');
            sessionStorage.setItem('isKupply', res.data.data.isKupply);
            sessionStorage.setItem('firstMajorCampus', res.data.data.koreapasData.firstMajorCampus);
            sessionStorage.setItem('firstMajorCode', res.data.data.koreapasData.firstMajorCode);
            sessionStorage.setItem('firstMajorName', res.data.data.koreapasData.firstMajorName);
            sessionStorage.setItem('nickname', res.data.data.koreapasData.nickname);
            sessionStorage.setItem('studentId', res.data.data.koreapasData.studentId);
            sessionStorage.setItem('koreapasUUID', res.data.data.koreapasData.koreapasUUID);
            navigate('/signup2'); // 약관 동의 페이지로
          } else {
            localStorage.setItem('accessToken', res.data.data.accessToken);
            localStorage.setItem('refreshToken', res.data.data.refreshToken);
            localStorage.setItem('isLogin', 'true');
            setLogin(true);
            navigate('/');
            window.location.reload();
          }
        });
    } catch (err: any) {
      setPassword('');
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert('유효하지 않은 고파스 아이디 혹은 비밀번호에요.');
      } else if (axios.isAxiosError(err) && err.response?.status === 403) {
        alert('고파스 강등 또는 미인증 회원은 쿠플라이 서비스를 이용할 수 없어요.');
      } else {
        alert('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  return (
    <Wrapper>
      {/* {isOpenAlert ? (
        <div style={{ transform: 'translateY(-10.375vw) translateX(+5vw)' }}>
          <Login2JoinModal isOpenAlert={isOpenAlert} setOpenAlert={setOpenAlert} onClickModal={handleLink2Click} />
        </div>
      ) : null} */}
      <LoginBox>
        <LogoImage
          src="../../designImage/kupply/KupplyVer1.svg"
          style={{ marginTop: '6.2vw', marginBottom: '0.6vw' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
          <img
            src={process.env.PUBLIC_URL + `/designImage/login/tigerEmoji.png`}
            alt="tigerEmoji"
            style={{ height: '1.5vw' }}
          />
          <Typography size="0.94vw" bold="500">
            고파스 아이디로 이용하는 쿠플라이의 모든 서비스
          </Typography>
        </div>
        <TextFieldWrapper>
          <TextBox style={{ height: '5.47vw' }}>
            <Typography size="0.94vw" bold="700">
              고파스 아이디
            </Typography>
            <Typography size="0.94vw">를 입력해주세요.</Typography>
            <AlertMessage>쿠플라이 아이디는 고파스 아이디입니다.</AlertMessage>
          </TextBox>
          <TextFieldBox
            placeholder="고파스 아이디"
            value={ID}
            setValue={setID}
            state={idState}
            setState={setIdState}
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
            // isFilled={ID !== ''}
          />
        </TextFieldWrapper>
        <TextFieldWrapper>
          <TextBox>
            <Typography size="0.94vw" bold="700">
              고파스 비밀번호
            </Typography>
            <Typography size="0.94vw">를 입력해주세요.</Typography>
          </TextBox>
          <TextFieldBox
            type="password"
            placeholder="고파스 비밀번호"
            value={password}
            setValue={setPassword}
            state={passwordState}
            setState={setPasswordState}
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
            // isFilled={password !== ''}
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
          <div style={{ display: 'flex', gap: '0.26vw', alignItems: 'center' }}>
            <IconButton04 />
            <Link onClick={handleForgetClick}>고파스 아이디/비밀번호 찾기</Link>
          </div>
          {/* <Link onClick={handleSyncClick}>쿠플라이의 기존 회원이신가요?</Link> */}
          <Link onClick={handleJoinClick}>고파스 아이디로 회원가입</Link>
        </LinkBox>
        <CTA01
          state={ID != '' && password !== '' ? 'default' : 'disabled'}
          onClick={onLoginClick}
          style={{ marginBottom: '1vw' }}
        >
          로그인
        </CTA01>
        <CTA01 state={'default'} onClick={handleSyncClick}>
          쿠플라이의 기존 회원이신가요?
        </CTA01>
      </LoginBox>
      {/* {isModalVisible && <LoginModal />} */}
    </Wrapper>
  );
}

export default LoginPage;
