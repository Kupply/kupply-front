import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CTA02 from '../../assets/CTAs/CTA02';
import ApplyTable from '../landing/ApplyTable';
import Typography from '../../../assets/Typography';
import { isDateInRange, isPeriodPassed, currentMonth } from '../../../common/ApplicationPeriod';

function Content1() {
  const navigate = useNavigate();

  const [isLogined, setisLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  // 회원의 모의지원 여부에 따라 테이블 블러 여부를 결정한다.
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'false');
    }
  }, []);

  return (
    <MainWrapper>
      <Typography size="3.33vw" bold="700" color="#D85888" style={{ lineHeight: '120%' }}>
        실시간 지원현황
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
        모의지원 현황을 실시간으로 확인해보세요
      </Typography>
      <Typography
        size="3.06vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ lineHeight: '120%', opacity: '0.8', textAlign: 'center' }}
      >
        쿠플라이 모의지원 현황을 통해
        <br />
        이중전공 학과의 이번 학기 경쟁률을 예측할 수 있어요.
      </Typography>
      <ApplyTable />
      {!isLogined ? (
        <BlurBox>
          <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
            <br />
            이중전공 모의지원 현황을 확인해보세요
          </Typography>
          <CTA02 onClick={() => navigate('/login')}>로그인하러 가기</CTA02>
        </BlurBox>
      ) : isDateInRange ? (
        // 모의지원 기간 내
        !isApplied ? (
          <></>
        ) : (
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
              지금 희망 전공에 모의지원하고
              <br />
              실시간 전체 모의지원 현황을 확인해보세요
            </Typography>
            <CTA02 onClick={() => navigate('/myboard')}>나도 모의지원 하러가기</CTA02>
          </BlurBox>
        )
      ) : isPeriodPassed ? (
        currentMonth === 6 || currentMonth === 7 ? ( // 1학기 모의지원 종료 후 (6월, 7월)
          <>
            <BlurBox>
              <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
                1학기 모의지원 서비스는 종료되었습니다.
              </Typography>
            </BlurBox>
          </>
        ) : (
          // 2학기 모의지원 종료 후 (12월, 1월)
          <>
            <BlurBox>
              <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
                2학기 모의지원 서비스는 종료되었습니다.
              </Typography>
            </BlurBox>
          </>
        )
      ) : // 학기 시작 이후 모의지원 기간 전
      currentMonth < 5 ? (
        <>
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
              1학기 모의지원 서비스는 5월 1일 오픈됩니다.
              <br /> 기다리는 동안 과거 합격자료를 살펴보며 이중전공을 준비해요!
            </Typography>
            <CTA02 onClick={() => navigate('/archive')}>과거 합격자료 보러가기</CTA02>
          </BlurBox>
        </>
      ) : (
        <>
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ textAlign: 'center', lineHeight: '120%', opacity: 0.8 }}>
              2학기 모의지원 서비스는 11월 1일 오픈됩니다.
              <br /> 기다리는 동안 과거 합격자료를 살펴보며 이중전공을 준비해요!
            </Typography>
            <CTA02 onClick={() => navigate('/archive')}>과거 합격자료 보러가기</CTA02>
          </BlurBox>
        </>
      )}
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
  height: 62.69vw;
  /* padding-top: 6.39vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.44vw;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1.67vw);
  position: absolute;
  bottom: 0;
  -webkit-backdrop-filter: blur(1.67vw);
`;

export default Content1;
