// 서치바 크기 조정 필요?
// 버튼 state 이게 맞나? 좀 이상한데,,, 디자인 확인 필요

import styled from 'styled-components';

import Typography from '../../assets/Typography';
import TabMenu04 from '../../assets/tabMenu/TabMenu04';
import SearchBar from '../../assets/SearchBar';

export const mockHashes = ['학부 전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부', '가나다 순 정렬'];

// searchbar 크기 조절해야 됨

export interface HeaderProps {
  clicked: number;
  setClicked: (index: number) => void;
  searchWord: string;
  setSearchWord: (word: string) => void;
}

function Header({ clicked, setClicked, searchWord, setSearchWord }: HeaderProps) {
  return (
    <MainWrapper>
      <Typography size="2.5vw" bold="700" style={{ lineHeight: '2.6vw', marginTop: '5.31vw' }}>
        지난 학기 합격 지표 바로 보기
      </Typography>
      <Typography size="1.25vw" bold="500" style={{ opacity: 0.8, marginTop: '0.52vw' }}>
        쿠플라이에서 지원하는 학과 별 합격지표를 한 눈에 비교해보세요!
      </Typography>
      <MenuWrapper>
        {mockHashes.map((hash, index) => (
          <TabMenu04
            status={index === clicked ? 'pressed' : 'default'}
            onClick={() => {
              setClicked(index);
            }}
          >
            {hash}
          </TabMenu04>
        ))}
      </MenuWrapper>
      <SearchBarWrapper>
        <SearchBar value={searchWord} setValue={setSearchWord} />
      </SearchBarWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 19.42vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fcfafb;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.04vw;
  margin: 2.76vw 0 2.5vw 0;
`;

const SearchBarWrapper = styled.div`
  width: 68.75vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;
