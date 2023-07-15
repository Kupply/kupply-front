import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 800px;
  background: white;
`;

const BoxWrapper = styled.div`
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const MainBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 300px;
  background: pink;
`;

const LeftButton = styled.button`
  width: 0;
  height: 0;
  background: white;
  border-top: 50px solid white;
  border-bottom: 50px solid white;
  border-left: 50px solid white;
  border-right: 50px solid pink;
`;

const RightButton = styled.button`
  width: 0;
  height: 0;
  background: white;
  border-top: 50px solid white;
  border-bottom: 50px solid white;
  border-left: 50px solid pink;
  border-right: 50px solid white;
`;

const CreateAccountButton = styled.button`
  border: none;
  width: 300px;
  height: 80px;
  background: pink;
`;

function MainPage() {
  return (
    <Wrapper>
      <BoxWrapper>
        <LeftButton />
        <MainBox>
          <h1>2023년 2학기 이중전공 지원자 현황</h1>
        </MainBox>
        <RightButton />
      </BoxWrapper>
      <CreateAccountButton>
        <h3>서비스 가입하기</h3>
      </CreateAccountButton>
    </Wrapper>
  );
}

export default MainPage;
