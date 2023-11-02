import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import SegmentedPicker from '../assets/SegmentedPicker';
import GpaLineChart, { Data, LineData } from '../assets/GpaLineChart';
import { recruit } from '../common/recruiting';
import { DBkeywords } from '../common/keyword';
import client from '../utils/httpClient';

type MajorOptions =
  | 'business'
  | 'economics'
  | 'psychology'
  | 'statistics'
  | 'mathematics'
  | 'chemistry'
  | 'media'
  | 'foodecon'
  | 'computer';

const majorNameMapping = {
  business: ['경영학과', 'Business School'],
  economics: ['경제학과', 'Department of Economics'],
  psychology: ['심리학부', 'School of Psychology'],
  statistics: ['통계학과', 'Department of Statistics'],
  mathematics: ['수학과', 'Department of Mathematics'],
  chemistry: ['화학과', 'Department of Chemistry'],
  media: ['미디어학부', 'School of Media & Communication'],
  foodecon: ['식품자원경제학과', 'Department of Food & Resources'],
  computer: ['컴퓨터학과', 'Department of Computer Science & Engineering'],
};

const collegeNameMapping = {
  foodecon: 'bio',
  media: 'media',
  computer: 'info',
  business: 'business',
  psychology: 'psycho',
  chemistry: 'science',
  mathematics: 'science',
  economics: 'political',
  statistics: 'political',
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

const semesterForAPI: string[] = ['all', '2023-1', '2022-2', '2022-1', '2021-2', '2021-1', '2020-2', '2020-1'];

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
    num: 11,
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

const ArchiveDetailPage = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/archive');
  };

  const { majorName } = useParams() as { majorName: MajorOptions };
  const majorKoreanName = majorNameMapping[majorName][0];
  const majorEngishName = majorNameMapping[majorName][1];
  const majorSymbolPath = `../../design_image/previous_detail/${collegeNameMapping[majorName]}.png`;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [enoughData, setEnoughData] = useState<boolean>(false);

  const [numOfSelection, setNumOfSelection] = useState<number>(0);
  const [numOfApplication, setNumOfApplication] = useState<number>(0);
  const [numOfPassed, setNumOfPassed] = useState<number>(0);

  const [lineData, setLineData] = useState<LineData>(tmpRandomData);
  const [meanGpa, setMeanGpa] = useState<Data>(tmpMeanGpa);
  const [medianGpa, setMedianGpa] = useState<Data>(tmpMedianGpa);
  const [modeGpa, setModeGpa] = useState<Data>(tmpModeGpa);
  const [minGpa, setMinGpa] = useState<Data>(tmpMinGpa);

  const [keywords, setKeywords] = useState<string[]>(DBkeywords[majorKoreanName] || []);

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  // 누적 데이터로 default 값 setting
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // const APIresponse = await axios.get(`http://localhost:8080/pastData/${majorName}/all`, config);
        const APIresponse = await client.get(`/pastData/${majorName}/all`);
        const data = APIresponse.data.pastData;

        if (data.passedData.passedGPACountArray.length > 0) {
          const selectionNum = recruit[majorKoreanName][semesterForAPI[activeIdx]] || 0;
          // let competitionRate = 0;
          // if (selectionNum > 0) {
          //   competitionRate = data.overallData.numberOfData / selectionNum;
          // }

          setEnoughData(true);
          setNumOfApplication(data.overallData.numberOfData);
          setNumOfSelection(selectionNum);
          setNumOfPassed(data.passedData.passedNumberOfData);
          setLineData(data.passedData.passedGPACountArray);
          setMeanGpa(data.passedData.passedMeanGPAData);
          setMedianGpa(data.passedData.passedMedianGPAData);
          setModeGpa(data.passedData.passedModeGPAData);
          setMinGpa(data.passedData.passedMinimumGPAData);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitialData();
  }, [majorName]);

  const handleButtonClick = async (idx: number) => {
    if (activeIdx !== idx) {
      setActiveIdx(idx);
    }

    try {
      const semester = semesterForAPI[idx];
      // const APIresponse = await axios.get(`http://localhost:8080/pastData/${majorName}/${semester}`, config);
      const APIresponse = await client.get(`/pastData/${majorName}/${semester}`);
      const data = APIresponse.data.pastData;

      const selectionNum = recruit[majorKoreanName][semesterForAPI[idx]] || 0;
      // let competitionRate = 0;
      // if (selectionNum > 0) {
      //   competitionRate = data.overallData.numberOfData / selectionNum;
      // }

      setEnoughData(true);
      setNumOfApplication(data.overallData.numberOfData);
      setNumOfSelection(selectionNum);
      setNumOfPassed(data.passedData.passedNumberOfData);
      setLineData(data.passedData.passedGPACountArray);
      setMeanGpa(data.passedData.passedMeanGPAData);
      setMedianGpa(data.passedData.passedMedianGPAData);
      setModeGpa(data.passedData.passedModeGPAData);
      setMinGpa(data.passedData.passedMinimumGPAData);

      console.log(data.passedData.passedMedianGPAData);

      if (data.passedData.passedGPACountArray.length > 0) {
        setEnoughData(true);
      } else {
        setEnoughData(false);
        setLineData(tmpRandomData);
        setMeanGpa(tmpMeanGpa);
        setMedianGpa(tmpMedianGpa);
        setModeGpa(tmpModeGpa);
        setMinGpa(tmpMinGpa);
      }
    } catch (err) {
      console.log(err);
    }
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
          <PreviousIconBox onClick={handlePrev} src="../../design_image/previous_detail/D_Previous icon.png" />
        </PreviousIconWrapper>
        <MajorIconContainer>
          <MajorIconBlur />
          <MajorIconBox src={majorSymbolPath} />
        </MajorIconContainer>
        <MajorTextBox>
          <MajorTextKorean>{majorKoreanName}</MajorTextKorean>
          {majorName === 'foodecon' || majorName === 'computer' ? (
            <MajorTextEnglishSmall>{majorEngishName}</MajorTextEnglishSmall>
          ) : majorName === 'media' ? (
            <MajorTextEnglishMiddle>{majorEngishName}</MajorTextEnglishMiddle>
          ) : (
            <MajorTextEnglishLarge>{majorEngishName}</MajorTextEnglishLarge>
          )}
        </MajorTextBox>
        <WarningTextBox>
          <WarningIcon src="../../design_image/previous_detail/D_alert-circle.png" />
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
          <DescriptionIcon src="../../design_image/previous_detail/user_D_Outline.png" />
          <Description>
            {semesterMapping[activeIdx]} {majorKoreanName} 이중전공 선발 정보
          </Description>
        </SelectionInfoDescriptionBox>
        <SelectionInfoContentsWrapper>
          <SelectionInfoContent>
            <Text>{activeIdx === 0 ? '평균 선발인원' : '선발인원'}</Text>
            <SelectionInfoValue>
              {numOfSelection === 0
                ? '집계불가'
                : activeIdx === 0
                ? `${Math.floor(numOfSelection / 6)} 명`
                : `${numOfSelection} 명`}
            </SelectionInfoValue>
          </SelectionInfoContent>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="72" fill="none">
            <path stroke="#DFDFDF" stroke-linecap="round" d="M1 1v72" />
          </svg>
          <SelectionInfoContent>
            <Text>모의 지원자 수</Text>
            <SelectionInfoValue>{numOfApplication}명</SelectionInfoValue>
          </SelectionInfoContent>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="72" fill="none">
            <path stroke="#DFDFDF" stroke-linecap="round" d="M1 1v72" />
          </svg>
          <SelectionInfoContent>
            <Text>모의 지원 합격자 수</Text>
            <SelectionInfoValue>{enoughData ? numOfPassed : 0}명</SelectionInfoValue>
          </SelectionInfoContent>
        </SelectionInfoContentsWrapper>
      </SelectionInfoWrapper>
      <Container>
        <PasserGPAInfoWrapper keywordsLength={keywords.length}>
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
                width={1200}
                height={470}
              />
            </PasserGPAInfoGraphWrapper>
            <PasserGPAInfoAnalyticsWrapper>
              <PasserGPAInfoBox>
                <PasserMeanGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 평균값</Text>
                  <Text>{meanGpa.gpa}</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
                <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
              </svg>
              <PasserGPAInfoBox>
                <PasserMedianGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 중위값</Text>
                  <Text>{medianGpa.gpa}</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
                <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
              </svg>
              <PasserGPAInfoBox>
                <PasserModeGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 최빈값</Text>
                  <Text>
                    {modeGpa.gpa} ({modeGpa.num}명)
                  </Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
                <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
              </svg>
              <PasserGPAInfoBox>
                <PasserMinGPAIcon />
                <PasserGPAInfoTextBox>
                  <Text>합격자 학점 최저값</Text>
                  <Text>{minGpa.gpa}</Text>
                </PasserGPAInfoTextBox>
              </PasserGPAInfoBox>
            </PasserGPAInfoAnalyticsWrapper>
          </PasserGPAInfoDetailsWrapper>
        </PasserGPAInfoWrapper>
        {keywords.length !== 0 && (
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
        )}
        {!enoughData && (
          <CollectingWrapper keywordsLength={keywords.length}>
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

export default ArchiveDetailPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 1920px;

  &::before {
    content: '';
    position: absolute;
    width: 1000px;
    height: 1000px;
    border-radius: 1000px;
    filter: blur(75px);
    opacity: 0.4;
    background: radial-gradient(
      51.7% 51.7% at 58.12% 41.5%,
      rgba(216, 88, 136, 0.3) 0%,
      rgba(255, 175, 189, 0.18) 100%
    );
    filter: blur(75px);
    z-index: -2;
    top: -100px;
    left: -200px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 1000px;
    height: 1000px;
    border-radius: 1000px;
    filter: blur(75px);
    opacity: 0.5;
    background: radial-gradient(
      67.64% 67.64% at 116.69% 26.92%,
      rgba(216, 88, 136, 0.5) 0%,
      rgba(255, 175, 189, 0.05) 100%
    );
    z-index: -2;
    top: 400px;
    right: 150px;
  }
`;

const MajorWrapper = styled.div`
  height: 145px;
  width: 100vw;
  max-width: 1690px;
  display: flex;
`;

const PreviousIconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  height: 60px;
  width: 60px;
  margin: 54px 9px 31px 0px;
`;

const PreviousIconBox = styled.img`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
`;

const MajorIconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MajorIconBox = styled.img`
  width: 60px;
  height: 78.77px;
  margin: 46.4px 30px 19.82px 0px;
`;

const MajorIconBlur = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  opacity: 0.7;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 69.5px;

  bottom: 0%;
  left: -10%;
`;

const MajorTextBox = styled.div`
  display: inline-flex;
  width: 900px;
  height: 100%;
  gap: 18px;
`;

const MajorTextKorean = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 48px;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  margin-top: 59px;
`;

const MajorTextEnglishLarge = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 36px;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  margin-top: 77px;
`;

const MajorTextEnglishMiddle = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  margin-top: 77px;
`;

const MajorTextEnglishSmall = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  margin-top: 77px;
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
  width: 100vw;
  max-width: 1665px;
  gap: 18px;
  padding: 6px 197px;
  align-items: center;
  justify-content: center;
`;

const SelectionInfoDescriptionBox = styled.div`
  display: flex;
  width: 580px;
  gap: 8px;
  align-items: center;
  background: none;
  margin-left: 36px;
`;

const PasserGPAInfoDescriptionWrapper = styled.div`
  display: flex;
  margin-left: 36px;
  margin-top: 33px;
`;

const PasserGpaChartDescriptionBox = styled.div`
  display: inline-flex;
  gap: 8px;
  margin-right: 997px;
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
  margin-left: 36px;
  margin-top: 23px;
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
  width: 100vw;
  max-width: 1665px;
  margin-top: 36px;
  align-items: center;
  display: flex;
`;

const SelectionInfoContentsWrapper = styled.div`
  gap: 96px;
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

const PasserGPAInfoWrapper = styled.div<{ keywordsLength: number }>`
  height: 555px;
  width: 100vw;
  max-width: 1665px;
  background-color: #ffffff99;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  margin-top: 18px;
  margin-bottom: ${(props) => (props.keywordsLength === 0 ? '104px' : '18px')};
  position: relative;
  z-index: 1;
`;

const PasserGPAInfoDetailsWrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-left: 25px;
  margin-top: 32px;
`;

const PasserGPAInfoGraphWrapper = styled.div`
  display: inline-flex;
`;

const PasserGPAInfoAnalyticsWrapper = styled.div`
  margin-top: 30px;
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 126px;
  width: 100vw;
  max-width: 1665px;
  background-color: #ffffff99;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  margin-bottom: 104px;
  position: relative;
  z-index: 1;
`;

const KeywordContainer = styled.div`
  display: flex;
  gap: 22px;
  margin-left: 36px;
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

const CollectingWrapper = styled.div<{ keywordsLength: number }>`
  background-color: #f7f7f773;
  border-radius: 5px;
  box-shadow: 0px 0px 28px #1414140d;
  backdrop-filter: blur(10px);
  height: ${(props) => (props.keywordsLength === 0 ? '555px' : '699px')};
  width: 100vw;
  max-width: 1665px;
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
