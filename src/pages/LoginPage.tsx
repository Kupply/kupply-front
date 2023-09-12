import React from 'react';
import styled from 'styled-components';
import Typography from '../assets/Typography';
import NextButton from '../assets/buttons/NextButton';

const Wrapper = styled.div`
  width: 100%;
  height: 1511px;
  display: flex;
  justify-content: center;
  background-color: #fcfafb;
`;

const LoginBox = styled.div`
  width: 816px;
  height: 952px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 76px;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
`;

const LogoBox = styled.div`
  display: flex;
  height: 59.457px;
  justify-content: center;
  align-items: center;
  gap: 10.955px;
  flex-shrink: 0;
  margin-top: 118px;
  margin-bottom: 12px;
`;

const LogoImage = styled.img`
  width: 60.615px;
  height: 59.457px;
  flex-shrink: 0;
`;

const LogoText = styled.text`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: 'GmarketSans';
  font-size: 2.1em; // (참고) 폰트크기의 기본값은 16px
  font-style: normal;
  line-height: normal;
  font-weight: 500;
  letter-spacing: 1.177px;
`;

const TextFieldBox = styled.div`
  display: flex;
  width: 628px;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 34px;
`;

const TextField = styled.input`
  display: flex;
  width: 628px;
  padding: 25px 18px;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #b9b9b9;
  background: #fff;
`;

const TextBox = styled.div`
  display: flex;
  width: 628px;
`;

const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 66px;
  margin-bottom: 87px;
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

function LoginPage() {
  return (
    <Wrapper>
      <LoginBox>
        <LogoBox>
          <LogoImage src="../../design_image/logo.png" />
          <LogoText>쿠플라이</LogoText>
        </LogoBox>
        <Typography size="mediumText" style={{ marginBottom: '50px' }}>
          고려대학교 메일로 이용하는 쿠플라이의 모든 서비스
        </Typography>
        <TextFieldBox>
          <TextBox>
            <Typography size="mediumText" bold="700">
              쿠플라이 아이디
            </Typography>
          </TextBox>
          <TextField />
        </TextFieldBox>
        <TextFieldBox>
          <TextBox>
            <Typography size="mediumText" bold="700">
              비밀번호
            </Typography>
            <Typography size="mediumText">를 입력해주세요.</Typography>
          </TextBox>
          <TextField />
        </TextFieldBox>
        <TextBox>
          <Typography size="mediumText" bold="600" color="#A8A8A8">
            로그인 상태 유지
          </Typography>
        </TextBox>
        <LinkBox>
          <Link>비밀번호를 잊으셨나요?</Link>
          <Link>회원가입</Link>
        </LinkBox>
        <NextButton active={false}>로그인</NextButton>
      </LoginBox>
    </Wrapper>
  );
}

export default LoginPage;
