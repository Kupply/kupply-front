import styled from 'styled-components';
import { useState } from 'react';

import Typography from '../../../assets/Typography';
import CurrentInfo from './CurrentInfo';
import PastInfo from './PastInfo';

function ApplyTable() {
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [isCurrentInfo, setIsCurrentInfo] = useState<boolean>(true);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  return (
    <MainWrapper>
      <MenuWrapper>
        <MenuBox
          onClick={() => setIsAscending((isAscending) => !isAscending)}
          style={{ cursor: 'pointer', gap: '0.83vw' }}
        >
          <AscendingImage src="../../../../designImage/landing/rankTable1.png" />
          <Typography size="3.06vw" color="#a8a8a8" style={{ lineHeight: '120%' }}>
            {isAscending ? '낮은 경쟁률 순' : '높은 경쟁률 순'}
          </Typography>
        </MenuBox>
        <MenuBox style={{ gap: '1.67vw' }}>
          <MenuButton isClicked={isCurrentInfo} onClick={() => setIsCurrentInfo(true)}>
            <Typography size="3.06vw" color={isCurrentInfo ? '#D85888' : ' #b9b9b9'} style={{ lineHeight: '120%' }}>
              실시간 정보
            </Typography>
          </MenuButton>
          <MenuButton isClicked={!isCurrentInfo} onClick={() => setIsCurrentInfo(false)}>
            <Typography size="3.06vw" color={!isCurrentInfo ? '#D85888' : ' #b9b9b9'} style={{ lineHeight: '120%' }}>
              지난 정보
            </Typography>
          </MenuButton>
        </MenuBox>
      </MenuWrapper>
      {isCurrentInfo ? (
        <CurrentInfo isAscending={isAscending} isShowAll={isShowAll} />
      ) : (
        <PastInfo isAscending={isAscending} isShowAll={isShowAll} />
      )}
      <ShowAllButton onClick={() => setIsShowAll((isShowAll) => !isShowAll)}>
        <Typography size="3.61vw" bold="500" color="#b9b9b9" style={{ lineHeight: '138.46%', position: 'absolute' }}>
          {isShowAll ? '더 많은 학과 접기' : '더 많은 학과 보기'}
        </Typography>
        <ShowAllImage src="../../../../designImage/mobile/landing/showAll.svg" isShowAll={isShowAll} />
      </ShowAllButton>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  padding: 12.22vw 4.44vw 5vw 4.44vw;
  display: flex;
  flex-direction: column;
`;

const MenuWrapper = styled.div`
  width: 91.12vw;
  height: auto;
  margin-bottom: 10vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuBox = styled.div`
  width: fit-content;
  height: auto;
  display: flex;
  align-items: center;
`;

const AscendingImage = styled.img`
  width: 3.61vw;
  height: 3.61vw;
`;

const MenuButton = styled.button<{ isClicked?: boolean }>`
  width: 19.72vw;
  height: auto;
  padding: 1.11vw 2.78vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5.56vw;
  background-color: ${(props) => props.isClicked && '#FBECF2'};
`;

const ShowAllButton = styled.button`
  width: 24.72vw;
  height: 18.33vw;
  margin: 6.39vw 0 0 33.33vw;
  display: flex;
  position: relative;
`;

const ShowAllImage = styled.img<{ isShowAll?: boolean }>`
  width: 16.67vw;
  height: 16.67vw;
  transform: ${(props) => props.isShowAll && 'rotate(180deg)'};
  position: absolute;
  bottom: 0;
  left: 3.89vw;
`;

export default ApplyTable;