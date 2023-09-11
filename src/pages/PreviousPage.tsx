import React, { useState } from "react";
import styled from "styled-components";
import SegmentedPicker from "../assets/SegmentedPicker";

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
  background-color: green;
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

const SegmentedWrapper = styled.div`
  display: flex;
  gap: 18px;
  padding: 6px 197px;
  align-items: center;
`;

const DescriptionBox = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const SelectionInfoWrapper = styled.div`
  // background-color: #ffffff99;
  background-color: blue;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  height: 126px;
  width: 1665px;
  margin-top: 36px;
`;

const PasserGPAInfoWrapper = styled.div`
  height: 573px;
  width: 1665px;
  // background-color: #ffffff99;
  background-color: red;
  border: 1px solid;
  border-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 200px #1414140d;
  margin-top: 18px;
`;

const Description = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  padding: 23px 0px 0px 36px;
`;

const KeywordWrapper = styled.div`
  gap: 16px;
  height: 144px;
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

const Keyword = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

const PreviousPage = () => {
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
      </MajorWrapper>
      <SegmentedWrapper>
        <SegmentedPicker
          state={activeIdx === 0 ? "active" : hoveredIdx === 0 ? "hover" : "default"}
          semester="누적"
          onClick={() => handleButtonClick(0)}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 1 ? "active" : hoveredIdx === 1 ? "hover" : "default"}
          semester="2023-1R"
          onClick={() => handleButtonClick(1)}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 2 ? "active" : hoveredIdx === 2 ? "hover" : "default"}
          semester="2022-2R"
          onClick={() => handleButtonClick(2)}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 3 ? "active" : hoveredIdx === 3 ? "hover" : "default"}
          semester="2022-1R"
          onClick={() => handleButtonClick(3)}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 4 ? "active" : hoveredIdx === 4 ? "hover" : "default"}
          semester="2021-2R"
          onClick={() => handleButtonClick(4)}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 5 ? "active" : hoveredIdx === 5 ? "hover" : "default"}
          semester="2021-1R"
          onClick={() => handleButtonClick(5)}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 6 ? "active" : hoveredIdx === 6 ? "hover" : "default"}
          semester="2020-2R"
          onClick={() => handleButtonClick(6)}
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 7 ? "active" : hoveredIdx === 7 ? "hover" : "default"}
          semester="2020-1R"
          onClick={() => handleButtonClick(7)}
          onMouseEnter={() => handleMouseEnter(7)}
          onMouseLeave={handleMouseLeave}
        />
      </SegmentedWrapper>
      <SelectionInfoWrapper />
      <PasserGPAInfoWrapper />
      <KeywordWrapper>
        <DescriptionBox>
          <Description>자기소개서 합격 키워드</Description>
        </DescriptionBox>
        <KeywordContainer>
          <KeywordBox>
            <Keyword>리더쉽</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>목표달성</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>소통</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>비즈니스의 이해</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>도전과 극복</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>비전</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>자기개발</Keyword>
          </KeywordBox>
          <KeywordBox>
            <Keyword>팀 내 소통</Keyword>
          </KeywordBox>
        </KeywordContainer>
      </KeywordWrapper>
    </Wrapper>
  );
};

export default PreviousPage;
