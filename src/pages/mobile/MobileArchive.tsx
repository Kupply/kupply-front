import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../mobile/assets/searchBar/SearchBar';
import MobileTabMenu04 from '../../mobile/assets/tabMenu/TabMenu04';
import DropDown02 from '../../mobile/assets/selectControl/DropDown02';
import Card01 from '../../mobile/assets/cards/Card01';
import { majorNameMapping } from '../../utils/Mappings';

import client from '../../utils/HttpClient';

// categoryMapping 정확하게 분류하기
// handleSearch 역할 아직 모름.. ?
// filteredCards 수정하기
// 카드 누르면 해당 학과 페이지로 이동 구현 X

interface CategoryMapping {
  '인문계 캠퍼스': string[];
  '자연계 캠퍼스': string[];
  '독립 학부': string[];
}

export interface CardsProps {
  clicked: number;
  searchWord: string;
}

export const mockHashes = ['전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부'];

// 정확하게 분류 X
const categoryMapping: CategoryMapping = {
  '인문계 캠퍼스': [
    '경영학과',
    '경제학과',
    '심리학부',
    '미디어학부',
    '정치외교학과',
    '행정학과',
    '식품자원경제학과',
    '통계학과',
  ],
  '자연계 캠퍼스': [
    '기계공학부',
    '데이터과학과',
    '산업경영공학부',
    '스마트보안학부',
    '수학과',
    '화학과',
    '생명과학부',
    '생명공학부',
    '화공생명공학부',
    '신소재공학부',
    '전자공학부',
    '컴퓨터학과',
  ],
  '독립 학부': ['스마트보안학부'],
};

const MobileArchivePage = () => {
  const [clicked, setClicked] = useState(0);
  const [cardClick, setCardClick] = useState(0);
  const [sortCriterion, setSortCriterion] = useState('가나다순');
  const [searchWord, setSearchWord] = useState(''); // 검색어를 위한 상태

  const category = mockHashes[clicked];
  const majors = categoryMapping[category as keyof CategoryMapping] || [];

  const handleSearch = () => {
    console.log('검색 실행:', searchWord);
  };

  const cards = Object.entries(majorNameMapping).map(([key, [korName, engName]]) => ({
    category: Object.keys(categoryMapping).find((category) => majors.includes(korName)),
    korName,
    engName,
  }));

  const filteredCards = cards
    .filter((card) => {
      if (category !== '전체보기' && !majors.includes(card.korName)) return false;
      if (searchWord && !card.korName.toLowerCase().includes(searchWord.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortCriterion) {
        case '가나다순':
          return a.korName.localeCompare(b.korName);
        // case '선발인원순':
        //   return a.TO - b.TO;
        //  case '경쟁률순':
        //    return a.compRate - b.compRate;
        //  case '평균학점순':
        //    return a.avgPass - b.avgPass;
        //  case '최저학점순':
        //    return a.minPass - b.minPass;
        default:
          return a.korName.localeCompare(b.korName);
      }
    });

  const filteredSet = new Set(filteredCards.map((card) => card.korName));

  const opaCards = cards.filter((card) => !filteredSet.has(card.korName));

  return (
    <MobilePageWrapper>
      <ImageBox>
        <ImageTextBox>
          <ImageTitle>지난 학기 합격 지표 바로 보기</ImageTitle>
          <div style={{ marginTop: '2.78vw' }} />
          <ImageText>쿠플라이에서 지원하는 학과별 합격지표를 한 눈에 비교해 보세요!</ImageText>
        </ImageTextBox>
        <TitleImage src="../../designImage/mobile/banner/Banner3_6_1.png" />
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

        <CardWrapper>
          {filteredCards.map((card) => (
            <Card01 key={card.korName} korName={card.korName} engName={card.engName} />
          ))}
        </CardWrapper>
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
  flex-wrap: wrap;
  width: 91.11vw;

  column-gap: 2.22vw;
  row-gap: 2.22vw;
  padding-bottom: 10.28vw;
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
  width: 40vw;
  //width: 36.11vw;
  //height: 29.72vw;
`;

export default MobileArchivePage;