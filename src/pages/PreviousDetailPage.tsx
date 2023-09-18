import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import SegmentedPicker from '../assets/SegmentedPicker';
import GpaLineChart, { Data, LineData } from '../assets/GpaLineChart';

type MajorOptions =
  | 'business-school'
  | 'department-of-economics'
  | 'school-of-psychology'
  | 'department-of-statistics'
  | 'school-of-media-and-communication'
  | 'department-of-computer-science-and-engineering'
  | 'department-of-food-and-resources'
  | 'department-of-mathematics'
  | 'department-of-chemistry';

const majorNameMapping = {
  'business-school': ['경영대학', 'Business School'],
  'department-of-economics': ['경제학과', 'Department of Economics'],
  'school-of-psychology': ['심리학부', 'School of Psychology'],
  'department-of-statistics': ['통계학과', 'Department of Statistics'],
  'school-of-media-and-communication': ['미디어학부', 'Schoole of Media and Communication'],
  'department-of-computer-science-and-engineering': ['컴퓨터학과', 'Department of Computer Science and Engineering'],
  'department-of-food-and-resources': ['식품자원경제학과', 'Department of Food and Resources'],
  'department-of-mathematics': ['수학과', 'Department of Mathematics'],
  'department-of-chemistry': ['화학과', 'Department of Chemistry'],
};

const semesterMapping: string[] = [
  '전학기 누적',
  '2023-1R',
  '2022-2R',
  '2022-1R',
  '2021-2R',
  '2021-1R',
  '2020-2R',
  '2020-1R',
];

const PreviousDetailPage = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/previous');
  };

  const { majorName } = useParams() as { majorName: MajorOptions };
  const majorKoreanName = majorNameMapping[majorName][0];
  const majorEngishName = majorNameMapping[majorName][1];

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [enoughData, setEnoughData] = useState<boolean>(false);

  // FIXME: axios, ajax?로 받아온 누적 데이터 값으로 초기값 설정.
  const [numOfSelection, setNumOfSelection] = useState<number>(11);
  const [numOfApplication, setNumOfApplication] = useState<number>(11);
  const [competitionRate, setCompetitionRate] = useState<number>(1.11);
  let initPasserGpaInfos: number[] = [1.11, 1.11, 1.11, 1.11];
  const [passerGpaInfos, setPasserGpaInfos] = useState<number[]>(initPasserGpaInfos);
  let initKeywords: string[] = [
    '리더쉽',
    '목표달성',
    '소통',
    '비즈니스의 이해',
    '도전과 극복',
    '비전',
    '자기개발',
    '팀 내 소통',
  ];
  const [keywords, setKeywords] = useState<string[]>(initKeywords);

  const tmpRandomData = [
    {
      gpa: 4.5,
      num: 7,
    },
    {
      gpa: 4.3,
      num: 10,
    },
    {
      gpa: 4.25,
      num: 20,
    },
    {
      gpa: 4.1,
      num: 9,
    },
    {
      gpa: 4.0,
      num: 7,
    },
    {
      gpa: 3.9,
      num: 7,
    },
    {
      gpa: 3.75,
      num: 7,
    },
    {
      gpa: 3.6,
      num: 6,
    },
    {
      gpa: 3.5,
      num: 5,
    },
    {
      gpa: 3.35,
      num: 4,
    },
    {
      gpa: 3.0,
      num: 2,
    },
  ];

  const tmpMeanGpa = { gpa: 3.75, num: 7 };
  const tmpMedianGpa = { gpa: 4.0, num: 7 };
  const tmpModeGpa = { gpa: 4.25, num: 11 };
  const tmpMinGpa = { gpa: 3.0, num: 2 };

  const [lineData, setLineData] = useState<LineData>(tmpRandomData);
  const [meanGpa, setMeanGpa] = useState<Data>(tmpMeanGpa);
  const [medianGpa, setMedianGpa] = useState<Data>(tmpMedianGpa);
  const [modeGpa, setModeGpa] = useState<Data>(tmpModeGpa);
  const [minGpa, setMinGpa] = useState<Data>(tmpMinGpa);

  useEffect(() => {
    const hasEnoughData = lineData.length > 10;
    setEnoughData(hasEnoughData);
  }, [lineData]);

  const handleButtonClick = (idx: number) => {
    if (activeIdx !== idx) {
      setActiveIdx(idx);
    }

    // 여기서 axios 요청으로 보여줄 데이터들 받고 setSomething으로 변경?
    setNumOfSelection((idx + 1) * 11);
    setNumOfApplication((idx + 1) * 11);
    setCompetitionRate(((idx + 1) * 111) / 100);
  };

  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  return (
    <Wrapper>
      <MajorWrapper>
        <PreviousIconWrapper>
          <PreviousIconBox onClick={handlePrev} src="../../design_image/previous_detail/fi_x-circle.png" />
        </PreviousIconWrapper>
        <MajorIconBox />
        <MajorTextBox>
          <MajorTextKorean>{majorKoreanName}</MajorTextKorean>
          <MajorTextEnglish>{majorEngishName}</MajorTextEnglish>
        </MajorTextBox>
        <WarningTextBox>
          <WarningIcon src="../../design_image/previous_detail/fi_alert-circle.png" />
          <WarningText>
            본 통계는 서비스 자체 설문조사를 통해 수집된 정보를 기반으로 한 것으로서 실제 통계와 상이할 수 있습니다.
          </WarningText>
        </WarningTextBox>
      </MajorWrapper>
      <SegmentedWrapper>
        {semesterMapping.map((semester, index) => (
          <SegmentedPicker
            key={index}
            state={activeIdx === index ? 'active' : hoveredIdx === index ? 'hover' : 'default'}
            semester={semester}
            onClick={() => handleButtonClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </SegmentedWrapper>
      <SelectionInfoWrapper>
        <SelectionInfoDescriptionBox>
          <DescriptionIcon src="../../design_image/previous_detail/fi_user.png" />
          <Description>
            {semesterMapping[activeIdx]} {majorKoreanName} 이중전공 선발 정보
          </Description>
        </SelectionInfoDescriptionBox>
        <SelectionInfoContentsWrapper>
          <SelectionInfoContent>
            <Text>선발인원</Text>
            <SelectionInfoValue>{numOfSelection}명</SelectionInfoValue>
          </SelectionInfoContent>
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="72" viewBox="0 0 1 72" fill="none">
            <path d="M1 0V72" stroke="#141414" stroke-linecap="round" stroke-width="1" stroke-opacity="0.25" />
          </svg>
          <SelectionInfoContent>
            <Text>지원자 수</Text>
            <SelectionInfoValue>{numOfApplication}명</SelectionInfoValue>
          </SelectionInfoContent>
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="72" viewBox="0 0 1 72" fill="none">
            <path d="M1 0V72" stroke="#141414" stroke-linecap="round" stroke-width="1" stroke-opacity="0.25" />
          </svg>
          <SelectionInfoContent>
            <Text>경쟁률</Text>
            <SelectionInfoValue>{competitionRate}:1</SelectionInfoValue>
          </SelectionInfoContent>
        </SelectionInfoContentsWrapper>
      </SelectionInfoWrapper>
      <Container>
        <PasserGPAInfoWrapper>
          <PasserGPAInfoDescriptionWrapper>
            <PasserGpaChartDescriptionBox>
              <DescriptionIcon src="../../design_image/previous_detail/fi_bar-chart.png" />
              <Description>{majorKoreanName} 합격자 학점 분포</Description>
            </PasserGpaChartDescriptionBox>
            <PasserGpaAnalyticDescriptionBox>
              <DescriptionIcon src="../../design_image/previous_detail/u_chart-growth.png" />
              <Description>합격자 학점 분석</Description>
            </PasserGpaAnalyticDescriptionBox>
          </PasserGPAInfoDescriptionWrapper>
          <PasserGPAInfoDetailsWrapper>
            <PasserGPAInfoGraphWrapper>
              <GpaLineChart
                lineData={lineData}
                meanGpa={meanGpa}
                medianGpa={medianGpa}
                modeGpa={modeGpa}
                minGpa={minGpa}
                width={1088}
                height={409}
              />
            </PasserGPAInfoGraphWrapper>
            <PasserGPAInfoAnalyticsWrapper>
              <PasserGPAInfoBox>
                <PasserMeanGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 평균값</Text>
                  <Text>{passerGpaInfos[0]}</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
                <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
              </svg>
              <PasserGPAInfoBox>
                <PasserMedianGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 중위값</Text>
                  <Text>{passerGpaInfos[1]}</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
                <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
              </svg>
              <PasserGPAInfoBox>
                <PasserModeGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 최빈값</Text>
                  <Text>{passerGpaInfos[2]} (11명)</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
                <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
              </svg>
              <PasserGPAInfoBox>
                <PasserMinGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 최저값</Text>
                  <Text>{passerGpaInfos[3]}</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
            </PasserGPAInfoAnalyticsWrapper>
          </PasserGPAInfoDetailsWrapper>
        </PasserGPAInfoWrapper>
        <KeywordWrapper>
          <KeywordDescriptionBox>
            <DescriptionIcon src="../../design_image/previous_detail/fi_edit-2.png" />
            <Description>자기소개서 합격 키워드</Description>
          </KeywordDescriptionBox>
          <KeywordContainer>
            {keywords.map((keyword, index) => (
              <KeywordBox key={index}>
                <Text>{keyword}</Text>
              </KeywordBox>
            ))}
          </KeywordContainer>
        </KeywordWrapper>
        {!enoughData && (
          <CollectingWrapper>
            <CollectingTitleText>쿠플라이에서 아직 정보를 수집 중입니다!</CollectingTitleText>
            <CollectingDetailText>
              더 정확한 정보를 제공하기 위해서 쿠플라이에서 정보를 수집 중입니다.
              {'\n'}더 나은 서비스를 위해서 조금만 더 기다려주세요!
            </CollectingDetailText>
          </CollectingWrapper>
        )}
      </Container>
    </Wrapper>
  );
};

export default PreviousDetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 90%;
    height: 90%;
    border-radius: 782px;
    filter: blur(150px);
    opacity: 0.7;
    background: radial-gradient(50% 50% at 50% 50%, rgba(232, 88, 136, 0.15) 0%, rgba(255, 175, 189, 0.05) 100%);
    z-index: -1;
  }

  &::before {
    top: -30%;
    left: -30%;
  }

  &::after {
    bottom: -30%;
    right: -40%;
  }
`;

const MajorWrapper = styled.div`
  height: 145px;
  width: 100%;
  display: flex;
  padding-left: 103px;
`;

const PreviousIconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  height: 60px;
  width: 60px;
  margin: 54px 9px 31px 103px;
`;

const PreviousIconBox = styled.img`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
`;

const MajorIconBox = styled.img`
  width: 60px;
  height: 78.77px;
  background-color: pink;
  margin: 46.4px 30px 19.82px 0px;
`;

const MajorTextBox = styled.div`
  display: flex;
  width: 920px;
  height: 100%;
  gap: 18.91px;
`;

const MajorTextKorean = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 48px;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  margin-top: 60.54px;
  // margin: 60.54px 0px 33.96px 0px;
`;

const MajorTextEnglish = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 36px;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  margin-top: 78.72px;
  // margin: 78.72px 0px 42.04px 18.91px;
`;

const WarningTextBox = styled.div`
  display: flex;
  gap: 4px;
  padding: 94px 0px 37px 0px;
  align-items: center;
`;

const WarningText = styled.text`
  color: #a7a7a7;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
`;

const WarningIcon = styled.img`
  width: 14px;
  height: 14px;
  background: none;
`;

const SegmentedWrapper = styled.div`
  display: flex;
  gap: 18px;
  padding: 6px 197px;
  align-items: center;
  justify-content: center;
`;

const SelectionInfoDescriptionBox = styled.div`
  display: inline-flex;
  width: 580px;
  gap: 8px;
  padding-left: 36px;
  align-items: center;
  background: none;
`;

const PasserGPAInfoDescriptionWrapper = styled.div`
  display: flex;
  padding: 33px 0px 0px 36px;
`;

const PasserGpaChartDescriptionBox = styled.div`
  display: inline-flex;
  gap: 8px;
  width: 1229px;
  align-items: center;
`;

const PasserGpaAnalyticDescriptionBox = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
`;

const KeywordDescriptionBox = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 23px 0px 0px 36px;
  align-items: center;
`;

const Description = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
`;

const DescriptionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SelectionInfoWrapper = styled.div`
  background-color: #ffffff99;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  height: 90px;
  width: 1665px;
  margin-top: 36px;
  align-items: center;
  display: flex;
`;

const SelectionInfoContentsWrapper = styled.div`
  margin-right: 142px;
  gap: 114px;
  display: flex;
`;

const SelectionInfoContent = styled.div`
  gap: 22px;
  display: flex;
  align-items: center;
`;

const SelectionInfoValue = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
`;

const PasserGPAInfoWrapper = styled.div`
  height: 555px;
  width: 1665px;
  background-color: #ffffff99;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  margin-top: 18px;
  position: relative;
  z-index: 1;
`;

const PasserGPAInfoDetailsWrapper = styled.div`
  display: flex;
  gap: 133px;
`;

const PasserGPAInfoGraphWrapper = styled.div`
  height: 409px;
  width: 1088px;
  margin: 70px 0px 0px 44px;
`;

const PasserGPAInfoAnalyticsWrapper = styled.div`
  margin-top: 81px;
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

const PasserGPAInfoBox = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
`;

const PasserMeanGPAIcon = styled.div`
  height: 12px;
  width: 12px;
  background-color: #f5bdbd;
  border-radius: 6px;
  box-shadow: 0px 0px 20px #f5bdbd99;
`;

const PasserMedianGPAIcon = styled.div`
  height: 12px;
  width: 12px;
  background-color: #e96d6d;
  border-radius: 6px;
  box-shadow: 0px 0px 20px #d8588880;
`;

const PasserModeGPAIcon = styled.div`
  height: 12px;
  width: 12px;
  background-color: #d85888;
  border-radius: 6px;
  box-shadow: 0px 0px 20px #d8588880;
`;

const PasserMinGPAIcon = styled.div`
  height: 12px;
  width: 12px;
  background-color: #7900a3;
  border-radius: 6px;
  box-shadow: 0px 0px 20px #7900a380;
`;

const PasserGPAInfoTextBox = styled.div`
  display: flex;
  gap: 47px;
`;

const KeywordWrapper = styled.div`
  gap: 16px;
  height: 126px;
  width: 1665px;
  background-color: #ffffff99;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  margin-top: 18px;
  position: relative;
  z-index: 1;
`;

const KeywordContainer = styled.div`
  display: flex;
  gap: 22px;
  padding: 16px 0px 0px 36px;
`;

const KeywordBox = styled.div`
  align-items: center;
  background-color: #ffffff99;
  border: 1px solid;
  border-color: #f5bdbd;
  border-radius: 999px;
  display: inline-flex;
  gap: 8px;
  justify-content: center;
  padding: 12px 26px;
  position: relative;
`;

const Text = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CollectingWrapper = styled.div`
  background-color: rgba(247, 247, 247, 0.96);
  border-radius: 5px;
  box-shadow: 0px 0px 28px #1414140d;
  height: 699px;
  width: 1665px;
  margin-top: 18px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const CollectingTitleText = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
`;

const CollectingDetailText = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  white-space: pre-wrap;
`;
