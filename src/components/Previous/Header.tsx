import styled from "styled-components";
import Typography from "../../assets/Typography";
import HashtagButton from "../../assets/buttons/HashtagButton";
import { useState } from "react";
import SearchBar from "../../assets/SearchBar";

export const mockHashes = [
  "학부 전체보기",
  "인문계 캠퍼스",
  "자연계 캠퍼스",
  "독립 학부",
  "가나다 순 정렬",
];

export interface HeaderProps {
  clicked: number;
  setClicked: (index: number) => void;
  searchWord: string;
  setSearchWord: (word: string) => void;
}

function Header({ clicked, setClicked, searchWord, setSearchWord }: HeaderProps) {
  return (
    <Container>
      <Title>
        <Typography size="heading1">지난 학기 합격 지표 바로 보기</Typography>
      </Title>
      <SubTitle>쿠플라이에서 지원하는 학과 별 합격지표를 한 눈에 비교 해보세요!</SubTitle>
      <TagButtonWrapper>
        {mockHashes.map((hash, index) => (
          <HashtagButton
            status={index === clicked ? "clicked" : "default"}
            onClick={() => {
              setClicked(index);
            }}
          >
            {hash}
          </HashtagButton>
        ))}
      </TagButtonWrapper>
      <div style={{ marginTop: 48, width: "100%", maxWidth: 1382 }}>
        <SearchBar value={searchWord} setValue={setSearchWord} />
      </div>
    </Container>
  );
}

const TagButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 53px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 391px;
  background-color: #fcfafb;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 102px;
`;

const SubTitle = styled.div`
  opacity: 0.8;
  margin-top: 18px;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

export default Header;
