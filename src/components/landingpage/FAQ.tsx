import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../../assets/Typography';
import FAQbox from '../../assets/landing/FAQbox';
import SegmentedPicker from '../../assets/SegmentedPicker';
import PageNumber from '../../assets/landing/PageNumber';

const MainWrapper = styled.div`
  width: 100vw;
  height: 1184px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
`;

const SegmentedSlider = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  margin-top: 23px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ceter;
  gap: 18px;
`;

function FAQ() {
  const [college, setCollege] = useState(0);
  const [hover0, setHover0] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [page, setPage] = useState(0);

  return (
    <MainWrapper>
      <TitleWrapper>
        <Typography size="mediumText" color="#D85888" bold="700" style={{ marginTop: '125px', marginBottom: '14px' }}>
          쿠플라이 FAQ
        </Typography>
        <Typography size="heading1" style={{ marginBottom: '26px' }}>
          이중전공 지원 전, 이런게 궁금해요!
        </Typography>
        <Typography size="bodyText" bold="500" color="rgba(20, 20, 20, 0.6)">
          이중전공을 준비하는 당신이 가장 궁금해할 질문들에 쿠플라이가 답해줄게요.
        </Typography>
        <SegmentedSlider>
          <SegmentedPicker
            state={college == 0 ? 'active' : hover0 == true ? 'hover' : 'default'}
            semester="공통"
            onMouseEnter={() => setHover0(true)}
            onMouseLeave={() => setHover0(false)}
            onClick={() => setCollege(0)}
          />
          <SegmentedPicker
            state={college == 1 ? 'active' : hover1 == true ? 'hover' : 'default'}
            semester="경영대학"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            onClick={() => setCollege(1)}
          />
          <SegmentedPicker
            state={college == 2 ? 'active' : hover2 == true ? 'hover' : 'default'}
            semester="정경대학"
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            onClick={() => setCollege(2)}
          />
          <SegmentedPicker
            state={college == 3 ? 'active' : hover3 == true ? 'hover' : 'default'}
            semester="미디어학부"
            onClick={() => setCollege(3)}
            onMouseEnter={() => setHover3(true)}
            onMouseLeave={() => setHover3(false)}
          />
          <SegmentedPicker
            state={college == 4 ? 'active' : hover4 == true ? 'hover' : 'default'}
            semester="정보대학"
            onClick={() => setCollege(4)}
            onMouseEnter={() => setHover4(true)}
            onMouseLeave={() => setHover4(false)}
          />
        </SegmentedSlider>
      </TitleWrapper>
      <ContentWrapper>
        <FAQbox />
        <FAQbox />
        <FAQbox />
        <FAQbox />
        <FAQbox />
        <PageWrapper>
          <PageNumber active={page == 0 ? true : false} page="1" onClick={() => setPage(0)} />
          <PageNumber active={page == 1 ? true : false} page="2" onClick={() => setPage(1)} />
          <PageNumber active={page == 2 ? true : false} page="3" onClick={() => setPage(2)} />
          <PageNumber active={page == 3 ? true : false} page="4" onClick={() => setPage(3)} />
          <PageNumber active={page == 4 ? true : false} page="5" onClick={() => setPage(4)} />
        </PageWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
}

export default FAQ;
