import React, { useState } from 'react';
import styled from 'styled-components';

import MobileArchiveGraph, { Data, LineData } from '../../mobile/assets/graph/Graph';
import { MobileScroll } from '../../mobile/assets/scroll/MobileScroll';
import { TermsText1 } from '../../components/signUp/TermsText';
//import MobileTabMenu02 from '../../mobile/assets/tabMenu/TabMenu02';
import MobileTabMenu04 from '../../mobile/assets/tabMenu/TabMenu04';
import MobileTabMenu05 from '../../mobile/assets/tabMenu/TabMenu05';

export const mockHashes = ['전체보기', '인문계 캠퍼스', '자연계 캠퍼스', '독립 학부'];

// f(x) = -(x-3)^2*(x-4.5)
const tmpRandomData = [
  { gpa: 3, num: 0 },
  { gpa: 3.1, num: 0.014 },
  { gpa: 3.2, num: 0.052 },
  { gpa: 3.3, num: 0.108 },
  { gpa: 3.4, num: 0.176 },
  { gpa: 3.5, num: 0.25 },
  { gpa: 3.6, num: 0.324 },
  { gpa: 3.7, num: 0.392 },
  { gpa: 3.8, num: 0.448 },
  { gpa: 3.9, num: 0.486 },
  { gpa: 4, num: 0.5 },
  { gpa: 4.1, num: 0.484 },
  { gpa: 4.2, num: 0.432 },
  { gpa: 4.3, num: 0.338 },
  { gpa: 4.4, num: 0.196 },
  { gpa: 4.5, num: 0 },
];

const MobileTest = () => {
  const [clicked, setClicked] = useState(1);
  const [lineData, setLineData] = useState<LineData>(tmpRandomData);
  return (
    <Wrapper>
      <MobileWrapper>
        <MobileArchiveGraph
          lineData={tmpRandomData}
          meanGpa={{
            gpa: 4.2,
            num: 0,
          }}
          medianGpa={{
            gpa: 4.25,
            num: 0,
          }}
          modeGpa={{
            gpa: 4.1,
            num: 0,
          }}
          minGpa={{
            gpa: 4.0,
            num: 0,
          }}
          width={0}
          height={0}
        />
        {/*
        <TextOutBox>
          <MobileScroll height={'228px'}>
            <TermsText1 />
          </MobileScroll>
        </TextOutBox>
      

        <MobileTabMenu02 />

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

        <MobileTabMenu05 majorName={''} recruitNum={4} applyNum={4} rank={1} />
          */}
      </MobileWrapper>
    </Wrapper>
  );
};

const TagButtonWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100vw;
  gap: 8px;
  margin-left: 12px;
  -webkit-overflow-scrolling: touch; // iOS에서 스크롤 퍼포먼스 향상
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(152, 21, 255, 0.1);
`;

const MobileWrapper = styled.div`
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 자식 요소들을 세로로 쌓음 */
  justify-content: center; /* 세로 방향으로 가운데 정렬 */
  align-items: center; /* 가로 방향으로 가운데 정렬, 필요한 경우 */
  margin-top: 50px;
  width: 100%;
  height: 100vh; /* 세로 정렬을 위해 높이 지정, 필요에 따라 조정 */
  overflow-y: auto;
`;

const TextOutBox = styled.div`
  //width: 100%; // 32.7083vw; // (628/1920)*100vw  width: 628px;
  width: 31.7vw;
  //max-width: 628px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4167vw; // 8px;

  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw; // 18px
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
  z-index: 1;
`;

export default MobileTest;
