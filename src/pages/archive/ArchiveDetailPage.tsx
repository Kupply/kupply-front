import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import SegmentedPicker from '../../assets/tabMenu/TabMenu01';
import GpaLineChart, { Data, LineData } from '../../assets/GpaLineChart';
import { DBkeywords } from '../../common/Keyword';
import { MajorOptionsShortEng as MajorOptions } from '../../types/MajorTypes';
import { collegeNameMappingByEng as collegeNameMapping, semesterMapping, majorNameMapping } from '../../utils/Mappings';
import { usePastApplyData } from '../../store/query';

// 경쟁률 적용 X (디자인 나와서 고치면서 수정할 예정)

const ArchiveDetailPage = () => {
  const navigate = useNavigate();

  const handlePrev = () => {
    navigate('/archive');
  };

  const { majorName } = useParams() as { majorName: MajorOptions };
  const majorKoreanName = majorNameMapping[majorName][0];
  const majorEngishName = majorNameMapping[majorName][1];
  const majorSymbolPath = `../../designImage/majorSymbol/newMajorImage/${collegeNameMapping[majorName]}_trans_small.png`;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [enoughData, setEnoughData] = useState<boolean>(false);

  const [numOfSelection, setNumOfSelection] = useState<number>(0);
  const [numOfApplication, setNumOfApplication] = useState<number>(0);
  const [numOfPassed, setNumOfPassed] = useState<number>(0);

  const [lineData, setLineData] = useState<LineData>(tmpRandomData2);
  const [avgGpa, setAvgGpa] = useState<Data>(tmpMeanGpa);
  const [medianGpa, setMedianGpa] = useState<Data>(tmpMedianGpa);
  const [modeGpa, setModeGpa] = useState<Data>(tmpModeGpa);
  const [minGpa, setMinGpa] = useState<Data>(tmpMinGpa);

  const [keywords, setKeywords] = useState<string[]>(DBkeywords[majorKoreanName] || []);

  const handleButtonClick = async (idx: number) => {
    if (activeIdx !== idx) {
      setActiveIdx(idx);
    }

    try {
      const semesterStr = semesterMapping[idx];
      const semester = semesterStr === '모든 학기 누적' ? 'all' : semesterStr.slice(0, -1);
      setSelectedSemester(semester);
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

  const { data } = usePastApplyData(majorName, selectedSemester);
  useEffect(() => {
    if (data) {
      const { metadata, passedData } = data.pastData;

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
        setLineData(tmpRandomData2);
      }
    }
  }, [data]);

  return (
    <Wrapper>
      <InnerWrapper>
        <MajorWrapper>
          <LeftBox>
            <PreviousIconWrapper>
              <PreviousIconBox onClick={handlePrev} src="../../designImage/previous/D_Previous icon.png" />
            </PreviousIconWrapper>
            <MajorIconContainer>
              <MajorIconBlur />
              <MajorIconBox src={majorSymbolPath} />
            </MajorIconContainer>
            <MajorTextBox>
              <MajorTextKorean>{majorKoreanName}</MajorTextKorean>
              <MajorTextEnglish>{majorEngishName}</MajorTextEnglish>
            </MajorTextBox>
          </LeftBox>
          <WarningTextBox>
            <WarningIcon src="../../designImage/previous/D_alert-circle.png" />
            <WarningText>
              해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 실제 통계와 다를 수 있어요.
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
            <DescriptionIcon src="../../designImage/previous/UserDOutline.png" />
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
                  ? `${Math.floor(numOfSelection / 4)} 명`
                  : `${numOfSelection} 명`}
              </SelectionInfoValue>
            </SelectionInfoContent>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="3.75vw" fill="none">
              <path stroke="#DFDFDF" stroke-linecap="round" d="M1 1v72" />
            </svg>
            <SelectionInfoContent>
              <Text>{activeIdx === 0 ? '평균 지원자 수' : '지원자 수'}</Text>
              <SelectionInfoValue>
                {activeIdx === 0 ? `${Math.floor(numOfApplication / 4)} 명` : `${numOfApplication} 명`}
              </SelectionInfoValue>
            </SelectionInfoContent>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="3.75vw" fill="none">
              <path stroke="#DFDFDF" stroke-linecap="round" d="M1 1v72" />
            </svg>
            <SelectionInfoContent>
              <Text>{activeIdx === 0 ? '평균 합격률' : '합격률'}</Text>
              <SelectionInfoValue>
                {numOfApplication === 0 ? '집계불가' : `${((numOfPassed / numOfApplication) * 100).toFixed(2)} %`}
              </SelectionInfoValue>
            </SelectionInfoContent>
          </SelectionInfoContentsWrapper>
        </SelectionInfoWrapper>
        <Container>
          <PasserGPAInfoWrapper keywordsLength={keywords.length}>
            <PasserGPAInfoDescriptionWrapper>
              <PasserGpaChartDescriptionBox>
                <DescriptionIcon src="../../designImage/previous/FiBarChart.png" />
                <Description>{majorKoreanName} 합격자 학점 분포</Description>
              </PasserGpaChartDescriptionBox>
              <PasserGpaAnalyticDescriptionBox>
                <DescriptionIcon src="../../designImage/previous/UChartGrowth.png" />
                <Description>합격자 학점 분석</Description>
              </PasserGpaAnalyticDescriptionBox>
            </PasserGPAInfoDescriptionWrapper>
            <PasserGPAInfoDetailsWrapper>
              <PasserGPAInfoGraphWrapper>
                <GpaLineChart
                  lineData={lineData}
                  meanGpa={avgGpa}
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
                    <TextNumber>{avgGpa.gpa.toFixed(2)}</TextNumber>
                  </PasserGPAInfoTextBox>
                </PasserGPAInfoBox>

                <PasserGPAInfoBox>
                  <PasserMedianGPAIcon />
                  <PasserGPAInfoTextBox>
                    <Text>합격자 학점 중위값</Text>
                    <TextNumber>{medianGpa.gpa.toFixed(2)}</TextNumber>
                  </PasserGPAInfoTextBox>
                </PasserGPAInfoBox>

                <PasserGPAInfoBox>
                  <PasserModeGPAIcon />
                  <PasserGPAInfoTextBox>
                    <Text>합격자 학점 최빈값</Text>
                    <TextNumber>{modeGpa.gpa.toFixed(2)}</TextNumber>
                  </PasserGPAInfoTextBox>
                </PasserGPAInfoBox>

                <PasserGPAInfoBox>
                  <PasserMinGPAIcon />
                  <PasserGPAInfoTextBox>
                    <Text>합격자 학점 최저값</Text>
                    <TextNumber>{minGpa.gpa.toFixed(2)}</TextNumber>
                  </PasserGPAInfoTextBox>
                </PasserGPAInfoBox>
              </PasserGPAInfoAnalyticsWrapper>
            </PasserGPAInfoDetailsWrapper>
          </PasserGPAInfoWrapper>
          {keywords.length !== 0 && (
            <KeywordWrapper>
              <KeywordDescriptionBox>
                <DescriptionIcon src="../../designImage/previous/FiEdit2.png" />
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
              <CollectingTitleText>쿠플라이에서 정보를 수집하고 있어요</CollectingTitleText>
              <CollectingDetailText>
                더 정확한 정보를 제공하기 위해서 쿠플라이에서 정보를 수집하고 있어요.
                {'\n'}더 나은 서비스를 위해서 조금만 더 기다려주세요!
              </CollectingDetailText>
            </CollectingWrapper>
          )}
        </Container>
      </InnerWrapper>
    </Wrapper>
  );
};

export default ArchiveDetailPage;

const GlobalStyles = createGlobalStyle` // 가로 스크롤 숨기기 -> 세로 스크롤 두개 생기는 현상으로 지움
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
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

const InnerWrapper = styled.div`
  width: 86.71875vw;
  max-width: 1665px;
`;

const MajorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 86.71875vw;
  max-width: 1665px;
  margin-top: 46.4px;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviousIconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  height: 3.125vw;
  width: 3.125vw;
  margin-right: 0.46875vw;
`;

const PreviousIconBox = styled.img`
  align-items: center;
  justify-content: center;
  height: 3.125vw;
  width: 3.125vw;
`;

const MajorIconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MajorIconBox = styled.img`
  width: 3.125vw;
  height: 4.1vw;
  flex-shrink: 0;
`;

const MajorIconBlur = styled.div`
  position: absolute;
  width: 3.65vw;
  height: 3.65vw;
  opacity: 0.7;
  z-index: -1;
  background: radial-gradient(50% 50% at 50% 50%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 69.5px;

  bottom: 0%;
  left: -10%;
`;

const MajorTextBox = styled.div`
  display: inline-flex;
  align-items: flex-end;
  gap: 0.98vw;
  margin-left: 1.5625vw;
  align-items: center;
`;

const MajorTextKorean = styled.text`
  color: #141414;

  /* Heading 1 */
  font-family: Pretendard;
  font-size: 1.875vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  white-space: nowrap;
`;

const MajorTextEnglish = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.5625vw;
  font-style: normal;
  font-weight: 500;
  //line-height: 66.667%;
  line-height: 100%;
`;

const WarningTextBox = styled.div`
  display: flex;
  gap: 0.21vw;
  // padding: 94px 0px 37px 0px;
  align-items: center;
  white-space: nowrap;
`;

const WarningText = styled.text`
  color: #a7a7a7;
  font-family: Pretendard;
  font-size: 0.73vw;
  font-weight: 400;
  font-style: normal;
  text-align: center;
`;

const WarningIcon = styled.img`
  width: 0.73vw;
  height: 0.73vw;
  background: none;
`;

const SegmentedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  max-width: 1665px;
  border-radius: 5px;
  border: 1px solid var(--White, #fff);

  /* 임시 */
  box-shadow: 0px 4px 200px 0px rgba(20, 20, 20, 0.05);

  padding: 6px 0px; // 10.26vw;
  margin-top: 19.82px;
  left: 0;
`;

const SelectionInfoDescriptionBox = styled.div`
  display: flex;
  align-items: center;
  background: none;
  width: 30.21vw;
  gap: 0.42vw;

  margin-left: 1.875vw;
`;

const PasserGPAInfoDescriptionWrapper = styled.div`
  display: flex;
  margin-left: 1.875vw;
  margin-top: 33px;
`;

const PasserGpaChartDescriptionBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.42vw;
  margin-right: 51.93vw;
`;

const PasserGpaAnalyticDescriptionBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.42vw;
`;

const KeywordDescriptionBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.42vw;
  margin-left: 1.875vw;
  margin-top: 1.2vw;
`;

const Description = styled.text`
  text-align: center;

  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
`;

const DescriptionIcon = styled.img`
  width: 1.04vw;
  height: 1.04vw;
`;

const SelectionInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1665px;
  height: 4.6875vw;

  border-radius: 5px;
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 200px #1414140d;
  background-color: #ffffff99;

  margin-top: 36px;
`;

const SelectionInfoContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;
`;

const SelectionInfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.15vw;
`;

const SelectionInfoValue = styled.text`
  text-align: center;

  color: #141414;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
`;

const PasserGPAInfoWrapper = styled.div<{ keywordsLength: number }>`
  position: relative;
  width: 100%;
  max-width: 1665px;
  height: 40vw; // 555px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  background-color: #ffffff99;
  box-shadow: 0px 4px 200px #1414140d;
  z-index: 1;

  margin-top: 18px;
  margin-bottom: ${(props) => (props.keywordsLength === 0 ? '104px' : '18px')};
`;

const PasserGPAInfoDetailsWrapper = styled.div`
  display: flex;
  gap: 2.08vw;
  margin-left: 1.3vw;
  margin-top: 32px;

  height: 30vw;
`;

const PasserGPAInfoGraphWrapper = styled.div`
  display: inline-flex;
  width: 62.5vw;
  height: auto;
`;

const PasserGPAInfoAnalyticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // row-gap: 29px;
  row-gap: 1.51vw;
  margin-top: 18px;

  height: 29vw;
`;

const PasserGPAInfoBox = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
`;

const PasserMeanGPAIcon = styled.div`
  width: 8px;
  //height: 80px;
  height: 5.2vw;
  flex-shrink: 0;
  border-radius: 1.46vw;
  background: var(--Secondary-V, #f5bdbd);
`;

const PasserMedianGPAIcon = styled.div`
  width: 8px;
  height: 5.2vw;
  flex-shrink: 0;
  border-radius: 1.46vw;
  background: #e96d6d;
`;

const PasserModeGPAIcon = styled.div`
  width: 8px;
  height: 5.2vw;
  flex-shrink: 0;
  border-radius: 1.46vw;
  background: #d85888;
`;

const PasserMinGPAIcon = styled.div`
  width: 8px;
  height: 5.2vw;
  flex-shrink: 0;
  border-radius: 1.46vw;
  background: var(--Blue, #313b80);
`;

const PasserGPAInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  row-gap: 0.78125vw;
`;

const KeywordWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1665px;
  width: 100%;
  height: 6.5625vw;
  gap: 0.83vw;
  background-color: #ffffff99;
  box-shadow: 0px 4px 200px #1414140d;
  border: 1px solid #ffffff;
  border-radius: 5px;
  z-index: 1;

  margin-bottom: 104px;
`;

const KeywordContainer = styled.div`
  display: flex;
  gap: 1.15vw;
  margin-left: 1.875vw;
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
  padding: 0.625vw 1.35vw;
  position: relative;
`;

const Text = styled.text`
  text-align: center;

  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
`;

const TextNumber = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.875vw;
  font-style: normal;
  font-weight: 700;
  line-height: 55.556%;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CollectingWrapper = styled.div<{ keywordsLength: number }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 87.5vw;
  max-width: 1665px;
  height: 52vw;
  //height: ${(props) => (props.keywordsLength === 0 ? '555px' : '699px')};
  background-color: #f7f7f773;
  box-shadow: 0px 0px 28px #1414140d;
  backdrop-filter: blur(10px);
  border-radius: 5px;
  gap: 24px;
  margin-top: 18px;
  top: 0;
  left: 0;
  z-index: 2;
`;

const CollectingTitleText = styled.text`
  text-align: center;
  color: #141414;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
`;

const CollectingDetailText = styled.text`
  text-align: center;

  color: #141414;
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 500;
  white-space: pre-wrap;
`;

const tmpMeanGpa = { gpa: 3.75, num: 7 };
const tmpMedianGpa = { gpa: 4.0, num: 7 };
const tmpModeGpa = { gpa: 4.25, num: 11 };
const tmpMinGpa = { gpa: 3.0, num: 2 };

const tmpRandomData2 = [
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
