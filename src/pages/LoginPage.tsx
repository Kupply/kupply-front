import styled from 'styled-components';

import Logo from '../assets/Logo';
import Typography from '../assets/Typography';
import AlertMessage from '../assets/AlertMessage';

function LoginPage() {
  return (
    <MainWrapper>
      <LoginBox>
        <Logo size="12.71vw" style={{ marginTop: '119px' }} />
        <Typography size="0.94vw" bold="500" style={{ marginTop: '5px' }}>
          고려대학교 메일로 이용하는 쿠플라이의 모든 서비스
        </Typography>
        <TextFieldWrapper>
          <div style={{ height: '85px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
            <Typography size="0.94vw" bold="700">
              쿠플라이 아이디
            </Typography>
            <Typography size="0.94vw">를 입력해주세요.</Typography>
            <AlertMessage>쿠플라이 아이디는 고려대학교 이메일 주소입니다.</AlertMessage>
          </div>
        </TextFieldWrapper>
      </LoginBox>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 1153px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #fcfafb;
`;

const LoginBox = styled.main`
  width: 42.5vw;
  height: 952px;
  margin-top: 76px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
`;

const TextFieldWrapper = styled.div`
  width: 32.71vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export default LoginPage;
