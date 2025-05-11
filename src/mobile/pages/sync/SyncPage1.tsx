import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api_url } from '../../../utils/HttpClient';
import { SyncPageWrapper } from '../../components/signup/SyncPageWrapper';
import Typography from '../../../assets/Typography';
import Input01, { StateOptions } from '../../assets/field/Input01';
import Button05 from '../../assets/buttons/Button05';

export default function SyncPage1() {
  const [ID, setID] = useState('');
  const [IDState, setIDState] = useState<StateOptions>('default');
  const [password, setPassword] = useState<string>('');
  const [passwordState, setPasswordState] = useState<StateOptions>('default');

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
        alert('유효하지 않은 고파스 아이디 혹은 비밀번호예요.');
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
              고파스&nbsp;아이디
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
            placeholder="고파스 아이디"
            isCheckDuplicated={false}
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
            style={{ width: '100%' }}
            setState={setPasswordState}
            setValue={setPassword}
            state={passwordState}
            value={password}
            placeholder="고파스 비밀번호"
            type="password"
          />
        </ContentsWrapper>
        <SubContent>
          <PasswordButton onClick={handleForgetClick}>고파스 아이디/비밀번호를 잊으셨나요?</PasswordButton>
        </SubContent>
        <ButtonsWrapper>
          <Button05
            state={IDState === 'filled' ? 'pressed' : 'default'}
            onClick={handleButtonClick}
            style={{ width: '100%' }}
          >
            고파스 아이디 인증하기
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
