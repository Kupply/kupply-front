import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api_url } from '../../utils/HttpClient';
import { SyncPageWrapper } from '../../components/sync/SyncPageWrapper';
import Typography from '../../assets/Typography';
import CTA01 from '../../assets/CTAs/CTA01';
import TextFieldBox, { StateOptions } from '../../assets/OldTextFieldBox';

export default function SyncPage1() {
  const [ID, setID] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [idState, setIdState] = useState<StateOptions>('filled');
  const [passwordState, setPasswordState] = useState<StateOptions>('filled');

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('kupplyId')) navigate('/');
  }, []);

  const handleButtonClick = async () => {
    if (ID === '' || password === '') return;

    const url = `${api_url}/auth/checkKoreapas`;

    try {
      await axios
        .post(url, {
          id: ID,
          password: password,
        })
        .then((res) => {
          if (res.data.data.firstMajorCampus === 'S') {
            alert('세종캠퍼스 학우는 새로 회원가입 후 이용해주세요.');
            sessionStorage.clear();
            navigate('/signup1');
            return;
          } else if (!res.data.data.firstMajorCode) {
            alert('고파스의 ‘꽈톡’ 페이지에 접속 후 다시 연동을 시도해주세요.');
            sessionStorage.clear();
            navigate('/');
            return;
          }

          sessionStorage.setItem('koreapasUUID', res.data.data.koreapasUUID);
          sessionStorage.setItem('nickname', res.data.data.nickname);
          sessionStorage.setItem('studentId', res.data.data.studentId);
          sessionStorage.setItem('firstMajorCode', res.data.data.firstMajorCode);
          sessionStorage.setItem('firstMajorCampus', res.data.data.firstMajorCampus);
          navigate('/sync2');
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

  const handleForgetClick = () => {
    window.open('https://www.koreapas.com/bbs/lostid_new.php', '_blank', 'noopener,noreferrer');
  };

  return (
    <SyncPageWrapper step={2} stepInfo="고파스 아이디 인증하기">
      <ContentsList>
        <ContentsWrapper>
          <TextFieldWrapper>
            <TextBox style={{ height: '1.47vw' }}>
              <Typography size="0.94vw" bold="700">
                고파스 아이디
              </Typography>
              <Typography size="0.94vw">를 입력해주세요.</Typography>
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
        <Link onClick={handleForgetClick}>고파스 아이디/비밀번호를 잊으셨나요?</Link>
      </LinkBox>
      <ButtonsWrapper>
        <CTA01 state={ID != '' && password !== '' ? 'default' : 'disabled'} onClick={handleButtonClick}>
          고파스 아이디 인증하기
        </CTA01>
      </ButtonsWrapper>
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
