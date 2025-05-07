import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '../../assets/Typography';

import { api_url } from '../../utils/HttpClient';
import Input01, { StateOptions } from '../assets/field/Input01';
import CheckBox02 from '../assets/checkBoxes/CheckBox02';
import CTA01 from '../assets/CTAs/CTA01';
import Button05 from '../assets/buttons/Button05';
import IconButton04 from '../../assets/iconButtons/IconButton04';

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
  // const [isModalVisible, setIsModalVisible] = useState(false); // 고파스 연동 전 사용했던 모달
  const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'accessTokenExpire']);

  // const toggleModal = () => {
  //   setIsModalVisible(!isModalVisible);
  // };  // 고파스 연동 전 사용했던 모달

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

  // const forgotPassword = async () => {
  //   try {
  //     const url = `${api_url}/auth/forgotPassword`;
  //     await axios.post(url, { userEmail: ID });

  //     setIsModalVisible(!isModalVisible);
  //     alert('입력하신 이메일로 임시 비밀번호를 보냈습니다.');
  //   } catch (err: any) {
  //     if (err.response.data.error.message) {
  //       alert(err.response.data.error.message);
  //     }
  //   }
  // };

  const handleForgetClick = () => {
    window.open('https://www.koreapas.com/bbs/lostid_new.php', '_blank', 'noopener,noreferrer');
  };

  return (
    <Wrapper>
      {/* {isModalVisible && (
        <LoginModal
          isOpenModal={isModalVisible}
          setOpenModal={setIsModalVisible}
          onClickModal={() => setIsModalVisible((prev) => !prev)}
          sendEmail={forgotPassword}
        />
      )} */}
      <ContentsList>
        <LogoContainer onClick={() => navigate('/')}>
          <img src={process.env.PUBLIC_URL + '/designImage/kupply/KupplyVer1.svg'} alt="LOGO IMAGE" />
        </LogoContainer>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">
              고파스&nbsp;아이디
            </Typography>
            <Typography size="3.33vw" bold="500">
              를 입력해주세요.
            </Typography>
          </TextBox>
          <Input01
            placeholder={'고파스 아이디'}
            helpMessage={'쿠플라이 아이디는 고파스 아이디입니다.'}
            errorMessage={''}
            value={ID}
            setValue={setID}
            state={IdState}
            setState={setIdState}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">
              고파스 비밀번호
            </Typography>
            <Typography size="3.33vw" bold="500">
              를 입력해주세요.
            </Typography>
          </TextBox>
          <Input01
            placeholder={'고파스 비밀번호'}
            errorMessage={''}
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
          <div style={{ display: 'flex', gap: '0.83vw', alignItems: 'center' }}>
            <IconButton04 size="2.77vw" />
            <PasswordButton onClick={handleForgetClick}>고파스 아이디/비밀번호 찾기</PasswordButton>
          </div>
        </SubContent>
        <ButtonsWrapper>
          <CTA01
            state={ID != '' && password !== '' ? 'default' : 'disabled'}
            onClick={onLoginClick}
            style={{ width: '100%' }}
          >
            로그인
          </CTA01>
          <Button05
            size="large"
            onClick={() => {
              navigate('/signup1');
            }}
          >
            고파스 아이디로 회원가입
          </Button05>
          <Button05
            size="large"
            onClick={() => {
              navigate('/sync0');
            }}
          >
            쿠플라이의 기존 회원이신가요?
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
