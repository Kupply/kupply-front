import React, { useState } from 'react';
import styled from 'styled-components';

import MobileArchiveGraph, { Data, LineData } from '../../mobile/assets/graph/Graph';
import { MobileScroll } from '../../mobile/assets/scroll/MobileScroll';
import { TermsText1 } from '../../components/signUp/TermsText';

const tmpRandomData = [
  {
    gpa: 4.5,
    num: 1,
  },
  {
    gpa: 4.3,
    num: 1,
  },
  {
    gpa: 4.25,
    num: 1,
  },
  {
    gpa: 4.1,
    num: 2,
  },
  {
    gpa: 4.0,
    num: 1,
  },
];

const MobileTest = () => {
  const [lineData, setLineData] = useState<LineData>(tmpRandomData);
  return (
    <Wrapper>
      <MobileWrapper>
        <MobileArchiveGraph
          lineData={tmpRandomData}
          meanGpa={{
            gpa: 4.2,
            num: 1,
          }}
          medianGpa={{
            gpa: 4.25,
            num: 1,
          }}
          modeGpa={{
            gpa: 4.1,
            num: 2,
          }}
          minGpa={{
            gpa: 4.0,
            num: 1,
          }}
          width={0}
          height={0}
        />

        <TextOutBox>
          <MobileScroll height={'228px'}>
            <TermsText1 />
          </MobileScroll>
        </TextOutBox>
      </MobileWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
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
