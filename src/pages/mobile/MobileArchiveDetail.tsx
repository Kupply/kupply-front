import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

import DropDown02 from '../../mobile/assets/selectControl/DropDown02';
import MobileArchiveGraph, { Data, LineData } from '../../mobile/assets/graph/Graph';
import { Card0301, Card0302, Card0303 } from '../../mobile/assets/cards/Card03';
import Card05 from '../../mobile/assets/cards/Card05';
import Banner01 from '../../mobile/assets/banners/Banner01';
import { DBkeywords } from '../../common/Keyword';
import { recruit } from '../../mappings/Recruiting';
import { MajorOptionsShortEng as MajorOptions } from '../../mappings/MajorTypes';
import { client } from '../../utils/HttpClient';
import {
  collegeNameMappingByEng as collegeNameMapping,
  semesterAPIMapping as semesterForAPI,
  semesterMapping,
  majorNameMapping,
} from '../../mappings/Mappings';
import MobileHeader from '../../mobile/assets/base/Header';
import MobileFooter from '../../mobile/assets/base/Footer';

// 이미지 교체 X
// 합격자 학점 분석 수정
// Card03 이미지 변경 -> 수정 X
// 학기 선택에 따른 화면 전환 수정 X (베너 카드 등등)
// 모자이크 X
// 키워드 X

const MobileArchiveDetailPage = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/archive');
  };

  const { majorName } = useParams() as { majorName: MajorOptions };
  const [sortCriterion, setSortCriterion] = useState('모든 학기 누적');

  const majorKoreanName = majorNameMapping[majorName][0];
  const majorEngishName = majorNameMapping[majorName][1];

  const [enoughData, setEnoughData] = useState<boolean>(false);

  const [numOfSelection, setNumOfSelection] = useState<number>(0);
  const [numOfApplication, setNumOfApplication] = useState<number>(0);
  const [numOfPassed, setNumOfPassed] = useState<number>(0);

  const [lineData, setLineData] = useState<LineData>(tmpRandomData);
  const [avgGpa, setAvgGpa] = useState<Data>(tmpMeanGpa);
  const [medianGpa, setMedianGpa] = useState<Data>(tmpMedianGpa);
  const [modeGpa, setModeGpa] = useState<Data>(tmpModeGpa);
  const [minGpa, setMinGpa] = useState<Data>(tmpMinGpa);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const APIresponse = await client.get(`/pastData/${majorName}/all`);
        if (APIresponse) {
          const { metadata, passedData } = APIresponse.data.pastData;

          setNumOfSelection(metadata.recruitNumber);
          setNumOfApplication(metadata.appliedNumber);
          setNumOfPassed(metadata.passedNumber);
          if (passedData.length > 0) {
            setEnoughData(true);
            setAvgGpa(metadata.passedAvgGPAData);
            setMedianGpa(metadata.passedMedianGPAData);
            setModeGpa(metadata.passedModeGPAData);
            setMinGpa(metadata.passedMinimumGPAData);
            setLineData(passedData);
          } else {
            // 데이터가 없을 때, 블러 뒤에 띄울 임시 데이터
            setEnoughData(false);
            setAvgGpa(tmpMeanGpa);
            setMedianGpa(tmpMedianGpa);
            setModeGpa(tmpModeGpa);
            setMinGpa(tmpMinGpa);
            setLineData(tmpRandomData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitialData();
  }, [majorName]);

  useEffect(() => {
    const handleButtonClick = async () => {
      try {
        let semester;
        if (sortCriterion === '모든 학기 누적') semester = 'all';
        else semester = sortCriterion.slice(0, -1);

        const APIresponse = await client.get(`/pastData/${majorName}/${semester}`);
        if (APIresponse) {
          const { metadata, passedData } = APIresponse.data.pastData;

          setNumOfSelection(metadata.recruitNumber);
          setNumOfApplication(metadata.appliedNumber);
          setNumOfPassed(metadata.passedNumber);
          if (passedData.length > 0) {
            setEnoughData(true);
            setAvgGpa(metadata.passedAvgGPAData);
            setMedianGpa(metadata.passedMedianGPAData);
            setModeGpa(metadata.passedModeGPAData);
            setMinGpa(metadata.passedMinimumGPAData);
            setLineData(passedData);
          } else {
            // 데이터가 없을 때, 블러 뒤에 띄울 임시 데이터
            setEnoughData(false);
            setAvgGpa(tmpMeanGpa);
            setMedianGpa(tmpMedianGpa);
            setModeGpa(tmpModeGpa);
            setMinGpa(tmpMinGpa);
            setLineData(tmpRandomData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleButtonClick();
  }, [sortCriterion]);

  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

  return (
    <MobilePageWrapper style={{ marginTop: '23.33vw' }}>
      <MobileHeader logined={isLogined} setLogin={setisLogined} />
      <Banner01 major={majorKoreanName} />
      <DropDownWrapper>
        <DropDownText>지원학기 선택</DropDownText>
        <DropDownBox>
          <DropDown02 optionList={semesterMapping} value={sortCriterion} setValue={setSortCriterion} />
        </DropDownBox>
      </DropDownWrapper>
      <BodyBox>
        <RecruitTitleBox>
          <IconImage src="../../designImage/icon/icon_13_02.svg" />
          <RecruitText>이중전공 선발 정보</RecruitText>
        </RecruitTitleBox>
        <RecruitBox>
          <RecruitLeftBox>
            <Card0301
              cardType={sortCriterion === '모든 학기 누적' ? '0' : '1'}
              avgPassNum={sortCriterion === '모든 학기 누적' ? Math.floor(numOfSelection / 4) : numOfSelection}
            />
          </RecruitLeftBox>
          <RecruitRightBox>
            <Card0302 appliedNum={numOfApplication} passNum={numOfPassed} />
          </RecruitRightBox>
        </RecruitBox>

        <RecruitTitleBox>
          <IconImage src="../../designImage/icon/icon_17_03.svg" /> {/* 수정 필요 */}
          <RecruitText>합격자 학점 분포</RecruitText>
        </RecruitTitleBox>

        {enoughData === false ? (
          <Wrapper1>
            <BlurWrapper1 />
            <BlurMsg1>
              <BlurTitle1>쿠플라이에서 아직 정보를 수집 중입니다!</BlurTitle1>
              <Blurtext1>
                더 정확한 정보를 제공하기 위해서 쿠플라이에서 정보를 수집 중입니다.
                <br />더 나은 서비스를 위해서 조금만 더 기다려주세요!
              </Blurtext1>
            </BlurMsg1>
          </Wrapper1>
        ) : (
          <GraphBox>
            <MobileArchiveGraph
              lineData={lineData}
              meanGpa={avgGpa}
              medianGpa={medianGpa}
              modeGpa={modeGpa}
              minGpa={minGpa}
              width={0}
              height={0}
            />
          </GraphBox>
        )}

        <RecruitTitleBox>
          <IconImage src="../../designImage/previous/UChartGrowth.png" />
          <RecruitText>합격자 학점 분석</RecruitText>
        </RecruitTitleBox>

        {enoughData === false ? (
          <Wrapper2>
            <BlurWrapper2 />
            <BlurMsg2>
              <BlurTitle2>쿠플라이에서 아직 정보를 수집 중입니다!</BlurTitle2>
              <Blurtext2>
                더 정확한 정보를 제공하기 위해서 쿠플라이에서 정보를 수집 중입니다.
                <br />더 나은 서비스를 위해서 조금만 더 기다려주세요!
              </Blurtext2>
            </BlurMsg2>
          </Wrapper2>
        ) : (
          <GpaAnalysisBox>
            <Card05 kind={'Mean'} text={'합격자 학점 평균값'} textNumber={avgGpa.gpa} />
            <Card05 kind={'Mode'} text={'합격자 학점 최빈값'} textNumber={modeGpa.gpa} modeNumber={modeGpa.num} />
            <Card05 kind={'Median'} text={'합격자 학점 중위값'} textNumber={medianGpa.gpa} />
            <Card05 kind={'Min'} text={'합격자 학점 최저값'} textNumber={minGpa.gpa} />
          </GpaAnalysisBox>
        )}

        {/* <RecruitTitleBox>
          <IconImage src="../../designImage/icon/icon_19.svg" />
          <RecruitText>자기소개서 합격 키워드</RecruitText>
        </RecruitTitleBox> */}
        {/* <KeywordBox></KeywordBox> */}
      </BodyBox>
      <MobileFooter />
    </MobilePageWrapper>
  );
};

//##################### BOX #####################

const Wrapper1 = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 70.77vw;
  border-radius: 2.78vw;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  margin-top: 5vw;
`;

const BlurWrapper1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  z-index: 10;
`;

const BlurMsg1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  gap: 24px;
  background: rgba(248, 248, 248, 0.45);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  backdrop-filter: blur(5px);
  z-index: 20;
`;

const Wrapper2 = styled.div`
  border-radius: 2.78vw;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45vw; // 160px 44.44vw
  margin-top: 5vw;
`;

const BlurWrapper2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  z-index: 10;
`;

const BlurMsg2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  gap: 24px;
  background: rgba(248, 248, 248, 0.45);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  backdrop-filter: blur(5px);
  z-index: 20;
`;

const MobilePageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #f9f9f9;
`;

const BodyBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 91.11vw;
  height: auto;
  flex-shrink: 0;
  background: #f9f9f9; // 배경색 모르겠어서 풋터 색상 임시로 적용
  padding-bottom: 13.06vw;
`;

const BannerBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 33.33vw; // 120px;
  flex-shrink: 0;
`;

const BannerTextBox = styled.div`
  position: absolute;
  justify-content: flex-start;
  left: 43.89vw;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100vw;
  height: 60px;
  gap: 25px;
  background: #fff;
`;

const DropDownBox = styled.div`
  justify-content: flex-start;
  width: 70%;
`;

const RecruitTitleBox = styled.div`
  // 이중전공 선발 정보 타이틀 박스
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 5.56vw; // 20px;

  gap: 2.22vw; // 8px;
  margin-top: 32px; // 8.89vw
`;

const RecruitBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 2.22vw; // 8px;

  margin-top: 3.89vw;
`;

const RecruitLeftBox = styled.div`
  // 이중전공 선발 정보 왼쪽 박스
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44.44vw;
  height: 47.5vw;
  flex-shrink: 0;
  border-radius: 2.78vw;
  background: white;
  filter: drop-shadow(0px 14.857px 37.143px rgba(223, 223, 223, 0.4));
  backdrop-filter: blur(6.685710906982422px);
`;

const RecruitRightBox = styled.div`
  // 이중전공 선발 정보 오른쪽 박스
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44.44vw;
  height: 47.5vw;
  flex-shrink: 0;
  border-radius: 2.78vw;
  background: rgba(49, 59, 128, 1);
  filter: drop-shadow(0px 14.857px 37.143px rgba(223, 223, 223, 0.4));
  backdrop-filter: blur(6.685710906982422px);
`;

const GraphBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72.77vw;
  border-radius: 2.78vw;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);

  /* 카드 셰도우 */
  box-shadow: 0px 14.857px 37.143px 0px rgba(223, 223, 223, 0.4);
  backdrop-filter: blur(6.685710906982422px);

  margin-top: 3.89vw;
`;

const GpaAnalysisBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45vw; // 160px 44.44vw
  margin-top: 5vw;

  flex-wrap: wrap;
  column-gap: 2.22vw;
  row-gap: 3.89vw;
`;

const KeywordBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  //height: 28.61vw;
  flex-shrink: 0;
  border-radius: 2.78vw;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 4px 200px 0px rgba(20, 20, 20, 0.05);
  padding: 5.28vw 0;
  margin-top: 3.89vw;

  .items {
    flex: 1 1 160px;
  }
`;

//##################### TEXT #####################

const BlurTitle1 = styled.div`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 4vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const Blurtext1 = styled.div`
  color: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 500;
  line-height: 136.111%;
`;

const BlurTitle2 = styled.div`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 4vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const Blurtext2 = styled.div`
  color: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-family: Pretendard;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 500;
  line-height: 136.111%;
`;

const BannerTitle = styled.text`
  color: #141414;
  /* BODY TEXT_Bold */
  font-family: Pretendard;
  font-size: 5.56vw; // 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const BannerText = styled.text`
  color: #141414;
  /* mob_detail_Medium */
  font-family: Pretendard;
  font-size: 3.89vw; // 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
`;

const DropDownText = styled.text`
  color: rgba(20, 20, 20, 0.5);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 71.425%; /* 9.285px; */

  margin-left: 5vw; // 18px;
`;

const RecruitText = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 3.89vw; // 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 142.857%;
`;

const KeyWordText = styled.text`
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

//##################### IMAGE #####################
const BannerPrevious = styled.img`
  position: absolute;
  width: 3.61vw;
  height: 3.61vw;

  top: 5vw;
  left: 5vw;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
`;

const IconImage = styled.img`
  display: flex;
  width: 3.33vw; // 12px;
  height: 3.33vw; // 12px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const tmpRandomData = [
  { gpa: 3, num: 0 },
  { gpa: 3.1, num: 0.014 },
  { gpa: 3.2, num: 0.052 },
  { gpa: 3.3, num: 0.108 },
  { gpa: 3.4, num: 0.176 },
  { gpa: 3.5, num: 0.25 },
  { gpa: 3.6, num: 0.324 },
  { gpa: 3.7, num: 0.392 },
  { gpa: 3.8, num: 0.448 },
  { gpa: 3.9, num: 0.486 },
  { gpa: 4, num: 0.5 },
  { gpa: 4.1, num: 0.484 },
  { gpa: 4.2, num: 0.432 },
  { gpa: 4.3, num: 0.338 },
  { gpa: 4.4, num: 0.196 },
  { gpa: 4.5, num: 0 },
];

const tmpMeanGpa = { gpa: 3.7, num: 0.392 };
const tmpMedianGpa = { gpa: 3.9, num: 0.486 };
const tmpModeGpa = { gpa: 4, num: 0.5 };
const tmpMinGpa = { gpa: 3, num: 0 };

export default MobileArchiveDetailPage;
