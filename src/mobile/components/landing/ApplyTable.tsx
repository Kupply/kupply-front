import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Typography from '../../../assets/Typography';
import CurrentInfo from './CurrentInfo';
import PastInfo from './PastInfo';
import { client } from '../../../utils/HttpClient';
import { isDateInRange } from '../../../common/ApplicationPeriod';

export interface ITableData {
  rank: number;
  secondMajor: string;
  engName: string;
  pastRecruitNumber: number;
  recruitNumber: number;
  applyNumber: number;
  competition: number;
  pastPassedRate: number;
  pastPassedNum: number;
  pastmin: number;
  pastmean: number;
  interest: number;
  interestedNum: number;
  imagesrc: string;
}

function ApplyTable() {
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [isCurrentInfo, setIsCurrentInfo] = useState<boolean>(true);
  const [isShowAll, setIsShowAll] = useState<boolean>(false);

  const [isLogined, setisLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  const [tableData, setTableData] = useState<ITableData[]>(dummyData); // blur 고친 후에 이것으로 바꾸기
  //const [tableData, setTableData] = useState<ITableData[]>([]);

  const loadData = async () => {
    try {
      const response = await client.get('/landing');
      if (response.data.data.length > 0) {
        setTableData(response.data.data);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (isLogined) loadData();
  }, [isLogined]);

  return (
    <MainWrapper>
      <MenuWrapper>
        <MenuBox
          onClick={() => setIsAscending((isAscending) => !isAscending)}
          style={{ cursor: 'pointer', gap: '0.83vw' }}
        >
          <AscendingImage src="../../../../designImage/landing/rankTable1.png" />
          <Typography size="3.06vw" color="#a8a8a8" style={{ lineHeight: '120%' }}>
            {isCurrentInfo
              ? isAscending
                ? '낮은 경쟁률 순'
                : '높은 경쟁률 순'
              : isAscending
              ? '낮은 합격률 순'
              : '높은 합격률 순'}
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
        <CurrentInfo isAscending={isAscending} isShowAll={isShowAll} tableData={tableData} />
      ) : (
        <PastInfo isAscending={isAscending} isShowAll={isShowAll} tableData={tableData} />
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
  padding: 12.22vw 4.44vw 0 4.44vw;
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

const dummyData = [
  {
    rank: 1,
    secondMajor: '경영대학',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 1,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 2,
    secondMajor: '미디어학부',
    engName: 'School of Media & Communication',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 2,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 3,
    secondMajor: '컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 4,
    secondMajor: '식품자원경제학과',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 1,
    secondMajor: '경영대학',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 1,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 2,
    secondMajor: '미디어학부',
    engName: 'School of Media & Communication',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 2,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 3,
    secondMajor: '컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 4,
    secondMajor: '식품자원경제학과',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
];
