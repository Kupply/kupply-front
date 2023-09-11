import React, { useState } from 'react';
import styled from 'styled-components';
import SegmentedPicker from '../assets/SegmentedPicker';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MajorWrapper = styled.div`
  height: 145px;
  width: 100%;
  display: flex;
  padding-left: 103px;
`;

const PreviousIconBox = styled.div`
  height: 60px;
  width: 60px;
  background-color: pink;
  margin: 54px 9px 31px 103px;
`;

const MajorIconBox = styled.div`
  width: 60px;
  height: 78.77px;
  background-color: pink;
  margin: 46.4px 30px 19.82px 0px;
`;

const MajorTextKorean = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 48px;
  font-weight: 700;
  font-style: normal;
  text-align: center;
  margin: 60.54px 0px 33.96px 0px;
`;

const MajorTextEnglish = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 36px;
  font-weight: 500;
  font-style: normal;
  text-align: center;
  margin: 78.72px 0px 42.04px 18.91px;
`;

const WarningTextBox = styled.div`
  display: flex;
  gap: 4px;
  padding: 94px 0px 37px 489px;
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

const WarningIcon = styled.div`
  width: 14px;
  height: 14px;
  background-color: pink;
`;

const SegmentedWrapper = styled.div`
  display: flex;
  gap: 18px;
  padding: 6px 197px;
  align-items: center;
`;

const SelectionInfoDescriptionBox = styled.div`
  display: flex;
  gap: 8px;
  padding-left: 36px;
  align-items: center;
`;

const PasserGPAInfoDescriptionWrapper = styled.div`
  display: flex;
  gap: 997px;
  padding: 33px 0px 0px 36px;
`;

const PasserGPAInfoDescriptionBox = styled.div`
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

const DescriptionIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: pink;
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
  margin-left: 260px;
  margin-right: 142px;
  gap: 114px;
  display: inline-flex;
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
`;

const PasserGPAInfoDetailsWrapper = styled.div`
  display: flex;
  gap: 133px;
`;

const PasserGPAInfoGraphWrapper = styled.div`
  height: 409px;
  width: 1088px;
  margin: 36px 0px 0px 44px;
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
const PasserGPAInfoIcon = styled.div`
  background-color: pink;
  height: 12px;
  width: 12px;
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

const PreviousDetailPage = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleButtonClick = (idx: number) => {
    if (activeIdx !== idx) {
      setActiveIdx(idx);
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
        <PreviousIconBox />
        <MajorIconBox />
        <MajorTextKorean>경영대학</MajorTextKorean>
        <MajorTextEnglish>Business School</MajorTextEnglish>
        <WarningTextBox>
          <WarningIcon />
          <WarningText>
            본 통계는 서비스 자체 설문조사를 통해 수집된 정보를 기반으로 한 것으로서 실제 통계와 상이할 수 있습니다.
          </WarningText>
        </WarningTextBox>
      </MajorWrapper>
      <SegmentedWrapper>
        <SegmentedPicker
          state={activeIdx === 0 ? 'active' : hoveredIdx === 0 ? 'hover' : 'default'}
          semester="전학기 누적"
          onClick={() => handleButtonClick(0)}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 1 ? 'active' : hoveredIdx === 1 ? 'hover' : 'default'}
          semester="2023-1R"
          onClick={() => handleButtonClick(1)}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 2 ? 'active' : hoveredIdx === 2 ? 'hover' : 'default'}
          semester="2022-2R"
          onClick={() => handleButtonClick(2)}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 3 ? 'active' : hoveredIdx === 3 ? 'hover' : 'default'}
          semester="2022-1R"
          onClick={() => handleButtonClick(3)}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 4 ? 'active' : hoveredIdx === 4 ? 'hover' : 'default'}
          semester="2021-2R"
          onClick={() => handleButtonClick(4)}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 5 ? 'active' : hoveredIdx === 5 ? 'hover' : 'default'}
          semester="2021-1R"
          onClick={() => handleButtonClick(5)}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 6 ? 'active' : hoveredIdx === 6 ? 'hover' : 'default'}
          semester="2020-2R"
          onClick={() => handleButtonClick(6)}
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 7 ? 'active' : hoveredIdx === 7 ? 'hover' : 'default'}
          semester="2020-1R"
          onClick={() => handleButtonClick(7)}
          onMouseEnter={() => handleMouseEnter(7)}
          onMouseLeave={handleMouseLeave}
        />
      </SegmentedWrapper>
      <SelectionInfoWrapper>
        <SelectionInfoDescriptionBox>
          <DescriptionIcon />
          <Description>2022-2R 경영대 이중전공 선발 정보</Description>
        </SelectionInfoDescriptionBox>
        <SelectionInfoContentsWrapper>
          <SelectionInfoContent>
            <Text>선발인원</Text>
            <SelectionInfoValue>30명</SelectionInfoValue>
          </SelectionInfoContent>
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="72" viewBox="0 0 1 72" fill="none">
            <path d="M1 0V72" stroke="#141414" stroke-linecap="round" stroke-width="1" stroke-opacity="0.25" />
          </svg>
          <SelectionInfoContent>
            <Text>지원자 수</Text>
            <SelectionInfoValue>42명</SelectionInfoValue>
          </SelectionInfoContent>
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="72" viewBox="0 0 1 72" fill="none">
            <path d="M1 0V72" stroke="#141414" stroke-linecap="round" stroke-width="1" stroke-opacity="0.25" />
          </svg>
          <SelectionInfoContent>
            <Text>경쟁률</Text>
            <SelectionInfoValue>3.59:1</SelectionInfoValue>
          </SelectionInfoContent>
        </SelectionInfoContentsWrapper>
      </SelectionInfoWrapper>
      <PasserGPAInfoWrapper>
        <PasserGPAInfoDescriptionWrapper>
          <PasserGPAInfoDescriptionBox>
            <DescriptionIcon />
            <Description>경영대학 합격자 학점 분포</Description>
          </PasserGPAInfoDescriptionBox>
          <PasserGPAInfoDescriptionBox>
            <DescriptionIcon />
            <Description>합격자 학점 분석</Description>
          </PasserGPAInfoDescriptionBox>
        </PasserGPAInfoDescriptionWrapper>
        <PasserGPAInfoDetailsWrapper>
          <PasserGPAInfoGraphWrapper></PasserGPAInfoGraphWrapper>
          <PasserGPAInfoAnalyticsWrapper>
            <PasserGPAInfoBox>
              <PasserGPAInfoIcon />
              <PasserGPAInfoTextBox>
                <Text>합격자 평균 학점</Text>
                <Text>3.85</Text>
              </PasserGPAInfoTextBox>
            </PasserGPAInfoBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
              <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
            </svg>
            <PasserGPAInfoBox>
              <PasserGPAInfoIcon />
              <PasserGPAInfoTextBox>
                <Text>합격자 학점 중위값</Text>
                <Text>4.0</Text>
              </PasserGPAInfoTextBox>
            </PasserGPAInfoBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
              <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
            </svg>
            <PasserGPAInfoBox>
              <PasserGPAInfoIcon />
              <PasserGPAInfoTextBox>
                <Text>합격자 학점 최빈값</Text>
                <Text>4.45</Text>
              </PasserGPAInfoTextBox>
            </PasserGPAInfoBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="1" viewBox="0 0 300 1" fill="none">
              <path d="M1 1H299" stroke="#141414" stroke-linecap="round" stroke-opacity="0.25" />
            </svg>
            <PasserGPAInfoBox>
              <PasserGPAInfoIcon />
              <PasserGPAInfoTextBox>
                <Text>합격자 최저 학점</Text>
                <Text>3.0</Text>
              </PasserGPAInfoTextBox>
            </PasserGPAInfoBox>
          </PasserGPAInfoAnalyticsWrapper>
        </PasserGPAInfoDetailsWrapper>
      </PasserGPAInfoWrapper>
      <KeywordWrapper>
        <KeywordDescriptionBox>
          <DescriptionIcon />
          <Description>자기소개서 합격 키워드</Description>
        </KeywordDescriptionBox>
        <KeywordContainer>
          <KeywordBox>
            <Text>리더쉽</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>목표달성</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>소통</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>비즈니스의 이해</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>도전과 극복</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>비전</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>자기개발</Text>
          </KeywordBox>
          <KeywordBox>
            <Text>팀 내 소통</Text>
          </KeywordBox>
        </KeywordContainer>
      </KeywordWrapper>
    </Wrapper>
  );
};

export default PreviousDetailPage;
