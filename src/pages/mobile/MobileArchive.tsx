import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../../mobile/assets/searchBar/SearchBar';
import MobileTabMenu04 from '../../mobile/assets/tabMenu/TabMenu04';
import DropDown02 from '../../mobile/assets/selectControl/DropDown02';
import Card01 from '../../mobile/assets/cards/Card01';
import { majorNameMapping } from '../../mappings/Mappings';
import MobileFooter from '../../mobile/assets/base/Footer';
import MobileHeader from '../../mobile/assets/base/Header';
import { categoryMapping, CategoryMapping } from '../../mappings/Mappings';
// categoryMapping 정확하게 분류하기
// handleSearch 역할 아직 모름.. ?
// filteredCards 수정하기
// 카드 누르면 해당 학과 페이지로 이동 구현 X

export interface CardsProps {
  clicked: number;
  searchWord: string;
}

export const mockHashes = ['학과 전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부'];


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
      if (category !== '학과 전체보기' && !majors.includes(card.korName)) return false;
      if (searchWord && !card.korName.toLowerCase().includes(searchWord.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortCriterion) {
        case '가나다순':
          return a.korName.localeCompare(b.korName);
        default:
          return a.korName.localeCompare(b.korName);
      }
    });

  const filteredSet = new Set(filteredCards.map((card) => card.korName));

  const opaCards = cards.filter((card) => !filteredSet.has(card.korName));

  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

  return (
    <MobilePageWrapper>
      <MobileHeader logined={isLogined} setLogin={setisLogined} />
      <ImageBox>
        <ImageTextBox>
          <ImageTitle>과거 합격지표 바로 보기</ImageTitle>
          <div style={{ marginTop: '2.78vw' }} />
          <ImageText>
            쿠플라이에서 지원하는 학과 별 <br />
            합격지표를 한 눈에 비교할 수 있어요.
          </ImageText>
        </ImageTextBox>
        <TitleImage src="../../designImage/mobile/banner/Banner3_6_1.png" />
      </ImageBox>
      <BodyBox>
        <SearchBarWrapper>
          <SearchBar
            value={searchWord}
            setValue={setSearchWord}
            placeholder="관심 학과 검색하기"
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
          <DropDown02 optionList={['가나다순']} value={sortCriterion} setValue={setSortCriterion} />
        </DropDownBox>

        <CardWrapper>
          {filteredCards.map((card) => (
            <Card01 key={card.korName} korName={card.korName} engName={card.engName} />
          ))}
        </CardWrapper>
      </BodyBox>
      <MobileFooter />
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
  margin-top: 23.33vw;
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
