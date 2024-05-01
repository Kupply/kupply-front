import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import DropDown02 from '../../mobile/assets/selectControl/DropDown02';
import MobileArchiveGraph, { Data, LineData } from '../../mobile/assets/graph/Graph';
import { Card0301, Card0302, Card0303 } from '../../mobile/assets/cards/Card03';
import Card05 from '../../mobile/assets/cards/Card05';
import { DBkeywords } from '../../common/Keyword';
import client from '../../utils/HttpClient';
import { MajorOptionsShortEng as MajorOptions } from '../../types/MajorTypes';
import {
  collegeNameMappingByEng as collegeNameMapping,
  semesterAPIMapping as semesterForAPI,
  semesterMapping,
  majorNameMapping,
} from '../../utils/Mappings';

// 이미지 교체 X
// 합격자 학점 분석 수정
// Card03 이미지 변경 -> 수정 X
// 학기 선택에 따른 화면 전환 수정 X
// 모자이크 X
// 키워드 X

export const mockHashes = ['전학기 누적', '2023-2R', '2023-1R', '2022-2R', '2022-1R'];

const MobileArchiveDetailPage = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/archive');
  };

  const [sortCriterion, setSortCriterion] = useState('가나다순');
  const [lineData, setLineData] = useState<LineData>(tmpRandomData);
  //const { majorName } = useParams() as { majorName: MajorOptions };
  //const majorKoreanName = majorNameMapping[majorName][0];
  //const majorEngishName = majorNameMapping[majorName][1];
  //const [keywords, setKeywords] = useState<string[]>(DBkeywords[majorKoreanName] || []);

  return (
    <MobilePageWrapper>
      <BannerBox>
        <BannerPrevious onClick={handlePrev} src="../../designImage/mobile/banner/BannerPrevious.svg" />
        <BannerImage src="../../designImage/mobile/banner/Banner1_1.png" /> {/* 학과별 적용 X */}
        <BannerTextBox>
          <BannerTitle>경영학과</BannerTitle> {/* 학과별 적용 X */}
          <div style={{ marginTop: '2.5vw' }} />
          <BannerText>Business School</BannerText> {/* 학과별 적용 X */}
        </BannerTextBox>
      </BannerBox>
      <DropDownWrapper>
        <DropDownText>학기선택</DropDownText>
        <DropDownBox>
          <DropDown02
            optionList={['전학기 누적', '2023-2R', '2023-1R', '2022-2R', '2022-1R']}
            value={sortCriterion}
            setValue={setSortCriterion}
          />
        </DropDownBox>
      </DropDownWrapper>
      <BodyBox>
        <RecruitTitleBox>
          <IconImage src="../../designImage/icon/icon_13_02.svg" />
          <RecruitText>이중전공 선발 정보</RecruitText>
        </RecruitTitleBox>
        <RecruitBox>
          <RecruitLeftBox>
            <Card0301 avgPassNum={0} /> {/*수정 필요*/}
          </RecruitLeftBox>
          <RecruitRightBox>
            <Card0302 appliedNum={0} passNum={0} /> {/*수정 필요*/}
          </RecruitRightBox>
        </RecruitBox>

        <RecruitTitleBox>
          <IconImage src="../../designImage/icon/icon_17_03.svg" /> {/* 수정 필요 */}
          <RecruitText>합격자 학점 분포</RecruitText>
        </RecruitTitleBox>
        <GraphBox>
          <MobileArchiveGraph
            lineData={tmpRandomData}
            meanGpa={{
              gpa: 3.7,
              num: 0.392,
            }}
            medianGpa={{
              gpa: 3.9,
              num: 0.486,
            }}
            modeGpa={{
              gpa: 4,
              num: 0.5,
            }}
            minGpa={{
              gpa: 3,
              num: 0,
            }}
            width={0}
            height={0}
          />
        </GraphBox>

        <RecruitTitleBox>
          <IconImage src="../../designImage/previous/UChartGrowth.png" />
          <RecruitText>합격자 학점 분석</RecruitText>
        </RecruitTitleBox>

        <GpaAnalysisBox>
          <Card05 kind={'Mean'} text={'합격자 평균 학점'} textNumber={4.5} />
          <Card05 kind={'Median'} text={'합격자 학점 중위값'} textNumber={4.5} />
          <Card05 kind={'Mode'} text={'합격자 학점 최빈값'} textNumber={4.5} modeNumber={11} />
          <Card05 kind={'Min'} text={'합격자 최저 학점'} textNumber={4.5} />
        </GpaAnalysisBox>

        <RecruitTitleBox>
          <IconImage src="../../designImage/icon/icon_19.svg" />
          <RecruitText>자기소개서 합격 키워드</RecruitText>
        </RecruitTitleBox>
        <KeywordBox></KeywordBox>
      </BodyBox>
    </MobilePageWrapper>
  );
};

//##################### BOX #####################

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
  height: 40px;
  gap: 25px;
  background: #fff;
`;

const DropDownBox = styled.div`
  justify-content: flex-start;
  width: 80%;
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
  font-size: 13px;
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

export default MobileArchiveDetailPage;
