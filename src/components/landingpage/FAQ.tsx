import styled from 'styled-components';
import { useState, useRef } from 'react';
import Typography from '../../assets/OldTypography';
import FAQbox from '../../assets/landingpage/FAQbox';
import SegmentedPicker from '../../assets/SegmentedPicker';
import PageNumber from '../../assets/landingpage/PageNumber';

const MainWrapper = styled.div`
  width: 100vw;
  height: 1500px;
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
  background: rgba(255, 255, 255, 1);
  z-index: 990;
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
  margin-top: 30px;
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
  const [openedFAQKey, setOpenedFAQKey] = useState<string | null>(null);

  const handleFAQToggle = (key: string) => {
    if (openedFAQKey === key) {
      setOpenedFAQKey(null);
    } else {
      setOpenedFAQKey(key);
    }
  };

  function scrollToTop(distanceFromBottom = 2400) {
    const totalHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const yCoord = totalHeight - viewportHeight - distanceFromBottom;
    window.scrollTo(0, yCoord);
  }

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
            onClick={() => {
              setCollege(0);
              scrollToTop();
            }}
          />
          <SegmentedPicker
            state={college == 1 ? 'active' : hover1 == true ? 'hover' : 'default'}
            semester="경영대학"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            onClick={() => {
              setCollege(1);
              scrollToTop();
            }}
          />
          <SegmentedPicker
            state={college == 4 ? 'active' : hover4 == true ? 'hover' : 'default'}
            semester="정보대학"
            onClick={() => {
              setCollege(4);
              scrollToTop();
            }}
            onMouseEnter={() => setHover4(true)}
            onMouseLeave={() => setHover4(false)}
          />
        </SegmentedSlider>
      </TitleWrapper>
      <ContentWrapper>
        {college == 0 && page == 0 ? (
          <>
            <FAQbox
              key="common0"
              isOpen={openedFAQKey === 'common0'}
              onToggle={() => handleFAQToggle('common0')}
              question="이중전공 지원에 반영되는 학점은 대내용 학점인가요, 대외용 학점인가요?"
              answer={[
                [
                  {
                    text: '이중전공 지원에는 직전학기까지 수강신청한 모든 과목의 총 평점평균인',
                    bold: '400',
                  },
                  { text: ' 대내용 학점 (F를 포함한 전체성적)', bold: '700' },
                  { text: '이 반영됩니다.', bold: '400' },
                ],
              ]}
            />
            <FAQbox
              key="common1"
              isOpen={openedFAQKey === 'common1'}
              onToggle={() => handleFAQToggle('common1')}
              question="이중전공 지원 시 최대 몇 지망까지 선택 가능한가요?"
              answer={[
                [{ text: '이중전공은 서울 캠퍼스 소속 학과 범위에서 최대 2지망까지 지원할 수 있습니다.', bold: '400' }],
                [
                  {
                    text: '만약 세종 캠퍼스 소속의 학과(부)를 희망한다면, 서울 캠퍼스에 없는 학과(부)에 한해 지원 가능합니다.',
                    bold: '400',
                  },
                ],
                [
                  {
                    text: '(대상 학과(부): 전자·기계융합공학과, 스마트도시학부, 공공사회·통일외교학부 통일외교안보전공, 문화유산융합학부, 문화창의학부 미디어문예창작전공, 문화콘텐츠전공)',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="common2"
              isOpen={openedFAQKey === 'common2'}
              onToggle={() => handleFAQToggle('common2')}
              question="1지망 학과(부) 외 다른 희망하는 학과(부)가 없는 경우에는 어떻게하나요?"
              answer={[
                [
                  {
                    text: '2지망을 원하지 않는 경우, 지원 홈페이지 내 2지망 선택란의 “해당 없음”을 변경하지 않은 상태로 제출해주세요.',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="common3"
              isOpen={openedFAQKey === 'common3'}
              onToggle={() => handleFAQToggle('common3')}
              question="이중전공 선발 기준이 무엇인가요? "
              answer={[
                [
                  { text: '제 1지망 지원자들중 직전 학기까지의 학업 성적순으로', bold: '700' },
                  {
                    text: ' 우선 선발하고, 차후 2지망 순으로 선발합니다. 이때, 아래 학과(부)들의 경우에는 단순히 성적 순으로만 선발하는 것이 아니라',
                    bold: '400',
                  },
                  { text: ' 기타 심사를 시행', bold: '700' },
                  { text: '합니다.', bold: '400' },
                ],
                [
                  {
                    text: '(대상 학과(부): 경영대학 경영학과, 문과대학 철학과, 정경대학(전체), 사범대학 체육교육과, 역사교육과, 수학교육과, 디자인조형학부, 국제대학 국제학부, 미디어학부, 공과대학 건축사회환경공학부, 산업경영공학부, 기계공학부, 신소재공학부, 화공생명과학과, 정보대학 컴퓨터학과, 스마트보안학부)',
                    bold: '400',
                  },
                ],
                [{ text: '*세부 전형방법 및 제출서류는 포털 공지사항을 확인하여주시기 바랍니다.', bold: '400' }],
              ]}
            />
            <FAQbox
              key="common4"
              isOpen={openedFAQKey === 'common4'}
              onToggle={() => handleFAQToggle('common4')}
              question="이중전공 지원 요건이 어떻게 되나요?"
              answer={[
                [{ text: '이중전공은 해당 학기에 아래 요건을 모두 만족하여야 지원 가능합니다.', bold: '400' }],
                [{ text: '가. 제 1전공이 배정된 자', bold: '400' }],
                [{ text: '나. 3학기 이상 등록자 (편입생은 본교 2학기 이상 등록자)', bold: '400' }],
                [
                  { text: '다. 지원 당해 학기 재학생 (중도 휴학생을 포함한 휴학생은 지원 불가).', bold: '400' },
                  { text: '단, 당해학기 외국대학 교환학생 지원 불가.', bold: '700' },
                ],
                [{ text: '*당해 학기 재학생의 재학보유기간: 1학기(3.1~7.31), 2학기(9.1~익년.1.31)', bold: '700' }],
                [{ text: '라. 이중(융합, 학생설계)전공자 및 공학인증자(공과대)는 지원할 수 없음.', bold: '400' }],
                [
                  { text: '1) 단, 이중(융합, 학생설계)전공자', bold: '400' },
                  { text: '(공학인증자 포함)', bold: '700' },
                  { text: '가 재지원하고자 하는 경우, 반드시', bold: '400' },
                  { text: ' 2023. 5. 3.(수)', bold: '700' },
                  { text: '까지 기 합격부분이', bold: '400' },
                  { text: '포기', bold: '700' },
                  { text: '처리 되어야 함.', bold: '400' },
                ],
                [
                  {
                    text: '(신청방법 : 포탈시스템-학적/졸업-학적사항-다중전공포기신청, 공학인증-해당학과)',
                    bold: '400',
                  },
                ],
                [
                  { text: '2) 이중(융합)전공 기합격자 및 공학인증 신청자의', bold: '400' },
                  { text: ' 재지원은 1회', bold: '700' },
                  { text: '에 한함.', bold: '400' },
                ],
                [
                  {
                    text: "3) 재지원하여 불합격한 경우, '04학번 이후 학생은 제1전공의 심화전공을 이수하여야 함.'",
                    bold: '400',
                  },
                ],
              ]}
            />
          </>
        ) : college == 0 && page == 1 ? (
          <>
            <FAQbox
              key="common5"
              isOpen={openedFAQKey === 'common5'}
              onToggle={() => handleFAQToggle('common5')}
              question="이중전공에 합격하고, 다음 학기에 바로 휴학 가능한가요?"
              answer={[
                [
                  {
                    text: '가능합니다. 이중전공에 합격하고 다음 학기에 휴학하여도, 합격이 취소되지 않습니다.',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="common6"
              isOpen={openedFAQKey === 'common6'}
              onToggle={() => handleFAQToggle('common6')}
              question="현재 휴학생인 경우에도 이중전공 지원이 가능한가요?"
              answer={[[{ text: '불가합니다. 금학기 휴학생 신분이신 경우 이중전공 지원이 불가합니다.', bold: '400' }]]}
            />
            <FAQbox
              key="common7"
              isOpen={openedFAQKey === 'common7'}
              onToggle={() => handleFAQToggle('common7')}
              question="전과처럼 이중전공에 지원할 수 있는 재학연한(이수학기) 제한이 있나요?"
              answer={[
                [
                  {
                    text: '이중전공은 3학기 이상 등록한 경우, 다시 말해, 2학년 1학기부터 지원이 가능합니다. 또한 졸업까지 몇학기 남지 않은 고학년의 경우에도 아무 제한 없이 지원 가능합니다. ',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="common8"
              isOpen={openedFAQKey === 'common8'}
              onToggle={() => handleFAQToggle('common8')}
              question="학업계획서(자기소개서) 문항은 어디서 확인할 수 있나요? 그리고 문항 내용은 어떻게 구성되어 있나요?"
              answer={[
                [
                  {
                    text: '학업계획서는 별도의 파일 제출이 아닌, 포탈시스템 내 이중전공 신청 페이지에 각 문항 당 답변을 직접 입력하여 제출됩니다.',
                    bold: '400',
                  },
                ],
                [
                  {
                    text: '문항은 크게 4가지(각 항목 당 공백포함 1,000자 이내)로 구성되어 있으며, 다음과 같습니다: 지원동기, 관심분야, 학업계획, 기타',
                    bold: '400',
                  },
                ],
                [
                  {
                    text: '이중전공 실지원 기간 전까지는 이중전공 지원 페이지 조회가 불가하다는 점 참고바랍니다.',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="common9"
              isOpen={openedFAQKey === 'common9'}
              onToggle={() => handleFAQToggle('common9')}
              question="이중전공 재지원 횟수에 제한이 있나요?"
              answer={[
                [
                  {
                    text: '이전에 제2전공(이중전공, 융합전공, 학생설계전공) 합격 이력이 없다면 제한이 없습니다. ',
                    bold: '400',
                  },
                ],
                [
                  {
                    text: '그러나 이전에 합격하여 현재 제2전공이 있는 학생이 재 지원을 하고자 하는 경우라면 재지원의 기회가 1회로 제한됩니다.',
                    bold: '400',
                  },
                ],
                [
                  {
                    text: '이때 반드시 이중전공 지원 전, 포탈시스템에서 포기처리를 미리 하셔야 지원 가능합니다.',
                    bold: '400',
                  },
                ],
              ]}
            />
          </>
        ) : college == 1 ? (
          <>
            <FAQbox
              key="business0"
              isOpen={openedFAQKey === 'business0'}
              onToggle={() => handleFAQToggle('business0')}
              question="이번 학기에 면접 전형 진행하나요?"
              answer={[
                [
                  { text: '이번 학기에도', bold: '400' },
                  { text: ' 면접 전형 없이,', bold: '700' },
                  { text: ' 성적 및 학업계획서만을 바탕으로 심사가 진행됩니다.', bold: '400' },
                ],
              ]}
            />
            <FAQbox
              key="business1"
              isOpen={openedFAQKey === 'business1'}
              onToggle={() => handleFAQToggle('business1')}
              question="경영학과 이중전공생도 경영대학 소속 해외교환학생 프로그램에 지원할 수 있나요?"
              answer={[[{ text: '지원 가능합니다.', bold: '400' }]]}
            />
          </>
        ) : (
          <>
            <FAQbox
              key="computer0"
              isOpen={openedFAQKey === 'computer0'}
              onToggle={() => handleFAQToggle('computer0')}
              question="컴퓨터학과 지원 요건이 무엇인가요?"
              answer={[
                [
                  {
                    text: '컴퓨터프로그래밍1 및 컴퓨터프로그래밍2 선수과목을 이수한 학생에 한해 지원 가능합니다.',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="computer1"
              isOpen={openedFAQKey === 'computer1'}
              onToggle={() => handleFAQToggle('computer1')}
              question="이번 학기에 컴퓨터프로그래밍 과목(지원 요건) 수강하고 있는데, 지원 가능한가요?"
              answer={[
                [
                  {
                    text: '불가합니다. 지난학기(계절학기도 인정)까지 선수강 요건 과목들을 모두 이수하여야 이번 학기 지원이 가능합니다.',
                    bold: '400',
                  },
                ],
              ]}
            />
            <FAQbox
              key="computer2"
              isOpen={openedFAQKey === 'computer2'}
              onToggle={() => handleFAQToggle('computer2')}
              question="데이터과학과는 별도의 지원 요건이 없나요?"
              answer={[[{ text: '네, 없습니다.', bold: '400' }]]}
            />
          </>
        )}
        <PageWrapper>
          {college == 0 ? (
            <>
              <PageNumber
                active={page === 0 ? true : false}
                page="1"
                onClick={() => {
                  setPage(0);
                  scrollToTop();
                }}
              />
              <PageNumber
                active={page === 1 ? true : false}
                page="2"
                onClick={() => {
                  setPage(1);
                  scrollToTop();
                }}
              />
            </>
          ) : (
            <></>
          )}
        </PageWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
}

export default FAQ;
