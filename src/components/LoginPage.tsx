import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
  background: white;
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 80px;
  background: white;
`;

const PassageBoxCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 80%;
`;

const PassageBox = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  height: 80%;
`;

const IDInput = styled.input`
  width: 67%;
  height: 80%;
  background: pink;
  border: none;
  font-size: 25px;
`;

const PasswordInput = styled.input.attrs({ type: "password" })`
  width: 67%;
  height: 80%;
  background: pink;
  border: none;
  font-size: 25px;
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  border: none;
  width: 13px;
  height: 13px;
  color: pink;
`;

const Line = styled.line`
  width: 60%;
  height: 1px;
  background: black;
`;

const Button = styled.button`
  width: 90px;
  height: 40px;
  border: none;
  background: white;
`;

function LoginPage() {
  return (
    <Wrapper>
      <LoginWrapper>
        <PassageBoxCenter>
          <h2>아이디</h2>
        </PassageBoxCenter>
        <IDInput />
      </LoginWrapper>
      <LoginWrapper>
        <PassageBoxCenter>
          <h2>비밀번호</h2>
        </PassageBoxCenter>
        <PasswordInput />
      </LoginWrapper>
      <LoginWrapper>
        <PassageBoxCenter />
        <PassageBox>
          <Check />
          <h4> 아이디 기억하기</h4>
        </PassageBox>
        <PassageBox>
          <Check />
          <h4> 자동 로그인</h4>
        </PassageBox>
      </LoginWrapper>
      <Line />
      <LoginWrapper>
        <PassageBoxCenter>
          <Button>
            <h4>회원가입</h4>
          </Button>
        </PassageBoxCenter>
        <PassageBoxCenter>
          <Button>
            <h4>아이디 찾기</h4>
          </Button>
        </PassageBoxCenter>
        <PassageBoxCenter>
          <Button>
            <h4>비밀번호 찾기</h4>
          </Button>
        </PassageBoxCenter>
      </LoginWrapper>
    </Wrapper>
  );
}

export default LoginPage;
