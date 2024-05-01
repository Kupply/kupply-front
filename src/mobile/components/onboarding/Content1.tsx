import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import ApplyTable from '../landing/ApplyTable';
import CTA02 from '../../assets/CTAs/CTA02';

function Content1() {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <Typography size="3.33vw" bold="700" color="#D85888" style={{ lineHeight: '120%' }}>
        실시간 모의지원
      </Typography>
      <Typography
        size="5vw"
        bold="700"
        style={{
          lineHeight: '133.33%',
          textShadow: '0 0.42vw 1.69vw rgba(255,255,255,0.3',
          margin: '1.67vw 0 0.83vw 0',
        }}
      >
        모의지원 현황을 실시간으로 확인하세요
      </Typography>
      <Typography
        size="3.06vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ lineHeight: '120%', opacity: '0.8', textAlign: 'center' }}
      >
        쿠플라이 모의지원 현황을 통해
        <br />
        내가 희망하는 학과의 실시간 경쟁률을 확인하세요!
      </Typography>
      <ApplyTable />
      <BlurBox>
        <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
          지금 쿠플라이 회원가입하고
          <br />
          이중전공 모의지원 현황을 확인해보세요
        </Typography>
        <CTA02 onClick={() => navigate('/signup0')} />
      </BlurBox>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 117.5vw;
  padding-top: 19.44vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BlurBox = styled.div`
  width: 100vw;
  height: 37.67vw;
  padding-top: 6.39vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.44vw;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1.67vw);
  position: absolute;
  bottom: 0;
`;

export default Content1;
