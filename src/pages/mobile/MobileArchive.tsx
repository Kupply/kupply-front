import React, { useState } from 'react';
import styled from 'styled-components';

import SearchBar from '../../mobile/assets/searchBar/SearchBar';
import MobileTabMenu04 from '../../mobile/assets/tabMenu/TabMenu04';
import DropDown02 from '../../mobile/assets/selectControl/DropDown02';

// 이미지 화질 낮음
// Card 적용 X

export const mockHashes = ['전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부'];

const MobileArchivePage = () => {
  const [clicked, setClicked] = useState(1);
  const [sortCriterion, setSortCriterion] = useState('가나다순');
  const [searchWord, setSearchWord] = useState(''); // 검색어를 위한 상태

  const handleSearch = () => {
    console.log('검색 실행:', searchWord);
    // 여기에 검색 로직을 추가하세요. 예: API 호출 등
  };
  return (
    <MobilePageWrapper>
      <ImageBox>
        <ImageTextBox>
          <ImageTitle>지난 학기 합격 지표 바로 보기</ImageTitle>
          <div style={{ marginTop: '2.78vw' }} />
          <ImageText>쿠플라이에서 지원하는 학과별 합격지표를 한 눈에 비교해 보세요!</ImageText>
        </ImageTextBox>
        <TitleImage src="../../designImage/mobile/archive/chick_monitor 24.png" />
      </ImageBox>
      <BodyBox>
        <SearchBarWrapper>
          <SearchBar
            value={searchWord}
            setValue={setSearchWord}
            placeholder="관심 학부 검색하기"
            onSearch={handleSearch}
          />
        </SearchBarWrapper>
        <TagButtonWrapper>
          {mockHashes.map((hash, index) => (
            <MobileTabMenu04
              key={index}
              status={index === clicked ? 'pressed' : 'default'}
              onClick={() => {
                setClicked(index);
              }}
              index={index}
            >
              {hash}
            </MobileTabMenu04>
          ))}
        </TagButtonWrapper>
        <DropDownBox>
          <DropDown02
            optionList={['가나다순', '선발인원순', '경쟁률순', '평균학점순', '최저학점순']}
            value={sortCriterion}
            setValue={setSortCriterion}
          />
        </DropDownBox>
        <CardWrapper></CardWrapper>
      </BodyBox>
    </MobilePageWrapper>
  );
};

//##################### BOX #####################
const MobilePageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  background: #313b80;
  width: 100%;
`;

const ImageBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 38.89vw;
  flex-shrink: 0;
`;

const ImageTextBox = styled.div`
  position: relative;
  width: 59.17vw;
  margin-left: 5vw;
`;

const BodyBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 948px; //임의 조정
  flex-shrink: 0;
  border-radius: 3.89vw 3.89vw 0 0;
  background: #fff;
`;

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 95vw;
  margin-top: 6.39vw;
`;

const TagButtonWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 91.11vw;
  gap: 2.22vw;
  margin-top: 5vw;
  -webkit-overflow-scrolling: touch; // iOS에서 스크롤 퍼포먼스 향상
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }
`;

const DropDownBox = styled.div`
  justify-content: flex-start;
  width: 91.11vw;

  margin-top: 2.78vw;
`;

const CardWrapper = styled.div`
  display: flex;
  position: relative;
  width: 91.11vw;
  height: 100px;

  column-gap: 2.22vw;
  row-gap: 2.22vw;
  border: 1px solid red;
`;

//##################### TEXT #####################
const ImageTitle = styled.text`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 4.72vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 20.4px */
`;

const ImageText = styled.text`
  color: #fff;
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 15.6px */
  opacity: 0.8;
`;

//##################### IMAGE #####################
const TitleImage = styled.img`
  width: 36.11vw;
  height: 29.72vw;
`;

export default MobileArchivePage;
