import styled from 'styled-components';

// import HashtagButton from '../../assets/buttons/HashtagButton';
import HashtagButton from '../../assets/tabMenu/TabMenu04';
import SearchBar from '../../assets/SearchBar';

export const mockHashes = ['학과 전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부'];

// searchbar 크기 조절해야 됨 폰트 적용 X

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
        <TitleText>과거 합격지표 바로 보기</TitleText>
      </Title>
      <SubTitleText>쿠플라이에서 지원하는 학과 별 합격지표를 한 눈에 비교할 수 있어요.</SubTitleText>
      <TagButtonWrapper>
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
          </HashtagButton>
        ))}
      </TagButtonWrapper>
      <SearchBarWrapper>
        <SearchBar value={searchWord} setValue={setSearchWord} />
      </SearchBarWrapper>
    </Container>
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

  margin-bottom: 5.21vw;
`;

const Title = styled.div`
  margin-top: 5.3125vw;
`;

const SearchBarWrapper = styled.div`
  position: relative;
  justify-content: center;

  margin-top: 2.5vw;
  width: 68.75vw;
  max-width: 1320px;
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
