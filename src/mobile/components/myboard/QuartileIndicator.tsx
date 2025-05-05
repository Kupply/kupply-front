import React, { useState } from 'react';
import styled from 'styled-components';

import Typography from '../../../assets/Typography';
import MobileTabMenu05 from '../../assets/tabMenu/TabMenu05';
import { isPeriodPassed, currentMonth } from '../../../common/ApplicationPeriod';

const MobileQuartileIndicator = ({
  userData,
  onViewMajor,
  myStageData,
  isApplied,
}: {
  userData: any;
  onViewMajor: any;
  myStageData: any;
  isApplied: boolean;
}) => {
  let myPercentile = (myStageData.rank / myStageData.applyNum) * 100;
  if (myStageData.rank === myStageData.applyNum && myStageData.rank === 1) {
    myPercentile = 1;
  }

  const name = userData.userNickname;
  const major = myStageData.majorName;

  return (
    <Wrapper isApplied={isApplied}>
      {!isApplied &&
        (isPeriodPassed ? (
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ lineHeight: '120%' }}>
              이번 학기 모의지원 기간이 종료되었어요.
            </Typography>
            <Typography
              size="3.06vw"
              bold="400"
              color="rgba(20,20,20,0.8)"
              style={{ lineHeight: '120%', textAlign: 'center' }}
            >
              다음 학기에 지원해주세요!
            </Typography>
          </BlurBox>
        ) : currentMonth <= 5 ? (
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ lineHeight: '120%' }}>
              쿠플라이에서 모의지원(5월 오픈) 후 열람 가능해요!
            </Typography>
            <Typography
              size="3.06vw"
              bold="400"
              color="rgba(20,20,20,0.8)"
              style={{ lineHeight: '120%', textAlign: 'center' }}
            >
              모의지원 완료 후, 나와 같은 학과를 지원한 <br /> 지원자의 실시간 통계를 열람해보세요!
            </Typography>
          </BlurBox>
        ) : (
          <BlurBox>
            <Typography size="3.89vw" bold="700" style={{ lineHeight: '120%' }}>
              쿠플라이에서 모의지원(11월 오픈) 후 열람 가능해요!
            </Typography>
            <Typography
              size="3.06vw"
              bold="400"
              color="rgba(20,20,20,0.8)"
              style={{ lineHeight: '120%', textAlign: 'center' }}
            >
              모의지원 완료 후, 나와 같은 학과를 지원한 <br /> 지원자의 실시간 통계를 열람해보세요!
            </Typography>
          </BlurBox>
        ))}
      <TitleBox>
        <Icon src="designImage/mobile/myboard/QuartileIcon.svg" alt="Icon" />
        <TitleText>내 학점 위치 파악하기</TitleText>
      </TitleBox>

      <BodyBox>
        <ChartBox>
          <MobileTabMenu05 {...myStageData} />
        </ChartBox>
        <BodyBodyBox>
          <ContentBox>
            <ContentText>
              {major} 이중전공 지원자들 중 {name}님의 학점은, 상위
            </ContentText>
          </ContentBox>
          <PercentBox>
            <NumText>{myPercentile.toFixed(0)}</NumText>
            <PercentText>%</PercentText>
          </PercentBox>
        </BodyBodyBox>
        <Text4>해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 실제 통계와 다를 수 있어요.</Text4>
      </BodyBox>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isApplied: boolean }>`
  position: relative;
  width: 91.11vw;
  height: auto;
  margin-top: 16.67vw;
  margin-bottom: ${(props) => (props.isApplied ? '0' : '20.83vw')};
`;

const BodyBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  width: 91.11vw;
  height: 47.78vw;
  border-radius: 2.78vw;
  border: 0.45px solid #eee;
  //opacity: 0.6;
  background: #fff;

  margin-top: 3.61vw;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;

  gap: 1.67vw;
  margin-bottom: 1.94vw;
`;

const ChartBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  margin-top: 3.61vw;
`;

const BodyBodyBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 81.66vw;
  top: 33.33vw;
`;

const ContentBox = styled.div`
  position: relative;
  display: flex;
  width: 51.94vw;
`;

const PercentBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  gap: 0.83vw;
`;

const Text4 = styled.div`
  position: absolute;
  top: 52.78vw;
  left: 4.44vw;

  color: #a8a8a8;

  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

///////////////// Text /////////////////
const TitleText = styled.text`
  color: #141414;

  /* mob_body_Bold */
  font-family: Pretendard;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
`;

const ContentText = styled.text`
  color: #141414;

  /* mob_detail_Medium */
  font-family: Pretendard;
  font-size: 3.89vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
`;

const NumText = styled.text`
  color: #d85888;

  /* mob_head1_bold */
  font-family: Pretendard;
  font-size: 8.33vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 36px */
`;

const PercentText = styled.text`
  color: rgba(67, 67, 67, 0.8);

  /* mob_head1_bold */
  font-family: Pretendard;
  font-size: 8.33vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 36px */
`;

///////////////// image /////////////////

const Icon = styled.img`
  position: relative;
  display: flex;

  width: 4.44vw;
  height: 4.44vw;
`;

const BlurBox = styled.div`
  width: 91.11vw;
  height: 66vw;
  box-sizing: border-box;
  padding-top: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5.56vw;
  border-radius: 1.39vw;
  background: rgba(248, 248, 248, 1);
  box-shadow: 0 0 7.78vw 0 rgba(20, 20, 20, 0.05);
  backdrop-filter: blur(3.33vw);
  position: absolute;
  top: 8.06vw;
  left: 0;
  z-index: 10;
  -webkit-backdrop-filter: blur(3.33vw);
`;

export default MobileQuartileIndicator;
