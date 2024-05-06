// 배경이미지 디자인 문의하기: 상단 붉은색, 하단 opacity\
// 모의지원 날짜 수정 필요

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import CTA02 from '../../assets/CTAs/CTA02';

function GoToApply() {
  const navigate = useNavigate();

  const currentDate = new Date();
  const startDate = new Date('2024-05-10');
  const endDate = new Date('2024-05-31');
  const isDateInRange = currentDate >= startDate && currentDate <= endDate;

  const handleButtonClick = () => {
    isDateInRange ? navigate('/myboard') : navigate('/archive');
  };

  return (
    <MainWrapper>
      <Typography size="5vw" bold="700" style={{ lineHeight: '120%' }}>
        {isDateInRange ? '쿠플라이 실시간 이중전공 모의지원 현황' : '지금은 모의지원 가능 기간이 아닙니다'}
      </Typography>
      <Typography
        size="3.33vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ lineHeight: '133.33%', textAlign: 'center', margin: '3.33vw 0 6.39vw 0' }}
      >
        {isDateInRange ? '이번학기 나의 희망 학과의' : '모의지원 기능은 5월 10일에 오픈해요'}
        <br />
        {isDateInRange
          ? '실시간 지원자 수와 경쟁률을 제공해 드릴게요'
          : '기다리는 동안 과거 합격자료를 보며 이중전공을 준비하세요!'}
      </Typography>
      <CTA02 onClick={handleButtonClick}>{isDateInRange ? '모의지원 하러가기' : '과거 합격자료 보러가기'}</CTA02>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 39vw;
  padding-top: 18.39vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 104.92%);
  background-image: url('../../../../designImage/mobile/landing/apply.png');
  background-size: 79.44vw 62.22vw;
  background-position: center bottom;
  background-repeat: no-repeat;
`;

export default GoToApply;
