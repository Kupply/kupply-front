//Field 없어서 미완

import styled from 'styled-components';

import Typography from '../../assets/Typography';
import Button02 from '../../assets/buttons/Button02';

function Join1() {
  return (
    <MainWrapper>
      <Typography size="1.98vw" bold="700" color="#2C323A" style={{ marginTop: '95px', lineHeight: '2.6vw' }}>
        당신이 찾고있던 이중전공에 대한 모든 정보, 오직 쿠플라이에서.
      </Typography>
      <Typography size="1.25vw" bold="500" color="#2C323A">
        이메일 주소 입력으로 실시간 이중전공 지원현황과 간편한 학점 비교 등, 쿠플라이만의 다양한 서비스를 이용해보세요.
      </Typography>
      <JoinBox>
        <Button02 />
      </JoinBox>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const JoinBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  gap: 1.15vw;
  margin: 44px 0 108px 0;
`;

export default Join1;
