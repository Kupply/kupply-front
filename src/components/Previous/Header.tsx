// 서치바 크기 조정 필요?
// 버튼 state 이게 맞나? 좀 이상한데,,, 디자인 확인 필요

import styled from 'styled-components';

import Typography from '../../assets/Typography';
import TabMenu04 from '../../assets/tabMenu/TabMenu04';
import SearchBar from '../../assets/SearchBar';

export const mockHashes = ['학부 전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부'];

// searchbar 크기 조절해야 됨 폰트 적용 X

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

          <HashtagButton
            key={index}

            status={index === clicked ? 'pressed' : 'default'}
            onClick={() => {
              setClicked(index);
            }}
            index={index}
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


const TagButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  gap: 1.04vw;
  margin-top: 2.76vw;
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1920px;
  height: 19.8vw;

  background-color: #fcfafb;


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
  margin-top: 2.5vw;
  width: 68.75vw;
  max-width: 1382px;
`;

const TitleText = styled.div`
  color: #141414;

  /* Heading 1 */
  font-family: Pretendard;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 104.167%;
`;

const SubTitleText = styled.div`
  color: #141414;

  /* Large Text (Subtitle) */
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  opacity: 0.8;

  margin-top: 0.9375vw;

`;

export default Header;
