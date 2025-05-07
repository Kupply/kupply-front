import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api_url } from '../../utils/HttpClient';
import { SyncPageWrapper } from '../../components/sync/SyncPageWrapper';
import Typography from '../../assets/Typography';
import AlertMessage from '../../assets/toolTips/ToolTip01';
import LoginModal from '../../components/login/LoginModal';
import CTA01 from '../../assets/CTAs/CTA01';
import TextFieldBox, { StateOptions } from '../../assets/OldTextFieldBox';

export default function SyncPage0() {
  const [ID, setID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idState, setIdState] = useState<StateOptions>('filled');
  const [passwordState, setPasswordState] = useState<StateOptions>('filled');
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
        alert('유효하지 않은 쿠플라이 아이디 혹은 비밀번호에요.');
      } else {
        alert('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
      }
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SyncPageWrapper step={1} stepInfo="쿠플라이 아이디 인증하기">
      <ContentsList>
        <ContentsWrapper>
          <TextFieldWrapper>
            <TextBox style={{ height: '1.47vw' }}>
              <Typography size="0.94vw" bold="700">
                기존 쿠플라이 아이디
              </Typography>
              <Typography size="0.94vw">를 입력해주세요.</Typography>
              <AlertMessage>기존 쿠플라이 아이디는 고려대학교 이메일 주소입니다.</AlertMessage>
            </TextBox>
            <TextFieldBox
              placeholder="kupply@korea.ac.kr"
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
                    handleButtonClick();
                  }
                }
              }}
              // isFilled={ID !== ''}
            />
          </TextFieldWrapper>
          <TextFieldWrapper>
            <TextBox>
              <Typography size="0.94vw" bold="700">
                기존 쿠플라이 비밀번호
              </Typography>
              <Typography size="0.94vw">를 입력해주세요.</Typography>
            </TextBox>
            <TextFieldBox
              type="password"
              placeholder="쿠플라이 비밀번호"
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
                    handleButtonClick();
                  }
                }
              }}
              // isFilled={password !== ''}
            />
          </TextFieldWrapper>
        </ContentsWrapper>
      </ContentsList>
      <LinkBox>
        <Link onClick={toggleModal}>기존 쿠플라이 비밀번호를 잊으셨나요?</Link>
      </LinkBox>
      <ButtonsWrapper>
        <CTA01 state={ID != '' && password !== '' ? 'default' : 'disabled'} onClick={handleButtonClick}>
          쿠플라이 아이디 인증하기
        </CTA01>
      </ButtonsWrapper>
      {isModalVisible && <LoginModal />}
    </SyncPageWrapper>
  );
}

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.823vw; //35px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.417vw; //8px;
  margin-top: 0.21vw; //100px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.9375vw;
  margin-top: 5.073vw; //347px;
  width: 100%;
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

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.31vw;
  margin-top: 3.11vw;
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
