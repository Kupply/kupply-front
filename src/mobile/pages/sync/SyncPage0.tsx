import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api_url } from '../../../utils/HttpClient';
import { SyncPageWrapper } from '../../components/signup/SyncPageWrapper';
import Typography from '../../../assets/Typography';
import Input01, { StateOptions } from '../../assets/field/Input01';
import Button05 from '../../assets/buttons/Button05';
import LoginModal from '../../components/login/LoginModal';

export default function SyncPage0() {
  const [ID, setID] = useState('');
  const [IDState, setIDState] = useState<StateOptions>('default');
  const [password, setPassword] = useState<string>('');
  const [passwordState, setPasswordState] = useState<StateOptions>('default');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (ID === '' || password === '') return;

    const url = `${api_url}/auth/checkKupply`;

    try {
      await axios
        .post(url, {
          email: ID,
          password: password,
        })
        .then((res) => {
          sessionStorage.setItem('kupplyId', res.data.userId);
          navigate('/sync1');
        });
    } catch (err: any) {
      setPassword('');
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert('유효하지 않은 쿠플라이 아이디 혹은 비밀번호예요.');
      } else {
        alert('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const forgotPassword = async (ID: string) => {
    try {
      const url = `${api_url}/auth/forgotPassword`;
      await axios.post(url, { userEmail: ID });

      setIsModalVisible(!isModalVisible);
      alert('입력하신 이메일로 임시 비밀번호를 보냈습니다.');
    } catch (err: any) {
      if (err.response.data.error.message) {
        alert(err.response.data.error.message);
      }
    }
  };

  return (
    <SyncPageWrapper step={1} stepInfo="쿠플라이 아이디 인증하기">
      {isModalVisible && (
        <LoginModal
          isOpenModal={isModalVisible}
          setOpenModal={setIsModalVisible}
          onClickModal={() => setIsModalVisible((prev) => !prev)}
          sendEmail={forgotPassword}
        />
      )}
      <MessageContent>
        <Typography size="5.56vw" bold="700">
          환영합니다!
        </Typography>
        <div style={{ textAlign: 'center' }}>
          <Typography size="3.33vw" bold="500" style={{ lineHeight: '4.44vw', wordBreak: 'break-all' }}>
            간단한 인증을 통해
          </Typography>
          <img
            src={process.env.PUBLIC_URL + `/designImage/login/tigerEmoji.png`}
            alt="tigerEmoji"
            style={{
              height: '4.329vw',
              verticalAlign: 'middle',
              margin: '0 0.4vw',
            }}
          />
          <Typography size="3.33vw" bold="500" style={{ lineHeight: '4.44vw', wordBreak: 'break-all' }}>
            고파스 아이디와 <br /> 쿠플라이 아이디를 연동하세요.
          </Typography>
        </div>
      </MessageContent>
      <ContentsList>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">
              기존 쿠플라이&nbsp;아이디
            </Typography>
            <Typography size="3.33vw" bold="500">
              를 입력해주세요.
            </Typography>
          </TextBox>
          <Input01
            style={{ width: '100%' }}
            setState={setIDState}
            setValue={setID}
            state={IDState}
            value={ID}
            placeholder="kupply@korea.ac.kr"
            helpMessage="고려대학교 이메일 주소입니다."
            isCheckDuplicated={false}
          />
        </ContentsWrapper>
        <ContentsWrapper>
          <TextBox>
            <Typography size="3.33vw" bold="700">
              기존 쿠플라이 비밀번호
            </Typography>
            <Typography size="3.33vw" bold="500">
              를 입력해주세요.
            </Typography>
          </TextBox>
          <Input01
            style={{ width: '100%' }}
            setState={setPasswordState}
            setValue={setPassword}
            state={passwordState}
            value={password}
            placeholder="비밀번호"
            type="password"
          />
        </ContentsWrapper>
        <SubContent>
          <PasswordButton onClick={toggleModal}>기존 쿠플라이 비밀번호를 잊으셨나요?</PasswordButton>
        </SubContent>
        <ButtonsWrapper>
          <Button05
            value={ID}
            state={IDState === 'filled' ? 'pressed' : 'default'}
            onClick={handleButtonClick}
            style={{ width: '100%' }}
          >
            쿠플라이 아이디 인증하기
          </Button05>
        </ButtonsWrapper>
      </ContentsList>
    </SyncPageWrapper>
  );
}

const MessageContent = styled.div`
  gap: 3.05vw;
  margin-top: 11.944vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 52.278vw;
  text-align: center;
  margin-bottom: 11.944vw;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.55vw;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
  width: 91.11vw;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  // 이거 핸드폰 height 따라 달라져야 해서 padding으로 박을 지를 고민중
  // vh로 박아야 할 가능성이 클듯
  margin-top: 63.33vw;
  width: 100%;
`;

const TextBox = styled.div`
  width: 100%;
  align-items: flex-start;
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
