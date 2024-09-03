// 경영학과 면접 진행여부 확인하기
// 버튼8 전부 열고 다른 페이지로 이동했을 때 스크롤 위치 조정하기

import styled from 'styled-components';
import { useState } from 'react';

import Typography from '../../../assets/Typography';
import MobileTabMenuButton from '../../assets/tabMenu/TabMenu';
import MobilePaginationButton from '../../assets/pagination/Pagination';
import Button08 from '../../assets/buttons/Button08';

function FAQ() {
  const [menuStates, setMenuStates] = useState<boolean[]>([true, false, false]);
  const [pageStates, setPageStates] = useState<boolean[]>([true, false]);

  return (
    <MainWrapper>
      <Typography size="4.44vw" bold="700" color="#D85888" style={{ lineHeight: '112.5%' }}>
        이중전공 A to Z
      </Typography>
      <Typography size="4.44vw" bold="700" style={{ lineHeight: '120%', margin: '5vw 0 3.33vw 0' }}>
        이중전공 지원 전, 이런게 궁금해요!
      </Typography>
      <Typography
        size="3.33vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ lineHeight: '133.33%', textAlign: 'center' }}
      >
        이중전공 지원자들이 가장 많이 묻는 <br /> 질문들에 대한 답변을 정리했어요.
      </Typography>
      <SegmentedControl>
        <MobileTabMenuButton isClicked={menuStates[0]} onClick={() => setMenuStates([true, false, false])}>
          공통
        </MobileTabMenuButton>
        <MobileTabMenuButton isClicked={menuStates[1]} onClick={() => setMenuStates([false, true, false])}>
          경영대학
        </MobileTabMenuButton>
        <MobileTabMenuButton isClicked={menuStates[2]} onClick={() => setMenuStates([false, false, true])}>
          정보대학
        </MobileTabMenuButton>
      </SegmentedControl>
      <FAQboxWrapper>
        {menuStates[0] && pageStates[0] ? (
          <>
            <Button08
              key="common0"
              answer={[
                [
                  '이중전공 지원에는 직전학기까지 수강신청한 모든 과목의 총 평점평균인 대내용 학점 (F를 포함한 전체성적)이 반영됩니다.',
                ],
              ]}
            />
            <Button08
              key="common1"
              question="이중전공 지원 시 최대 몇 지망까지 선택 가능한가요?"
              answer={[
                ['이중전공은 서울 캠퍼스 소속 학과 범위에서 최대 2지망까지 지원할 수 있습니다.'],
                [
                  '만약 세종 캠퍼스 소속의 학과(부)를 희망한다면, 서울 캠퍼스에 없는 학과(부)에 한해 지원 가능합니다.',
                  '(대상 학과(부): 전자·기계융합공학과, 스마트도시학부, 공공사회·통일외교학부 통일외교안보전공, 문화유산융합학부, 문화창의학부 미디어문예창작전공, 문화콘텐츠전공)',
                ],
              ]}
            />
            <Button08
              key="common2"
              question="이중전공 선발 기준이 무엇인가요? "
              answer={[
                [
                  '제 1지망 지원자들중 직전 학기까지의 학업 성적순으로 우선 선발하고, 차후 2지망 순으로 선발합니다. 이때, 아래 학과(부)들의 경우에는 단순히 성적 순으로만 선발하는 것이 아니라 기타 심사를 시행합니다.',
                  '(대상 학과(부): 경영대학 경영학과, 문과대학 철학과, 정경대학(전체), 사범대학 체육교육과, 역사교육과, 수학교육과, 디자인조형학부, 국제대학 국제학부, 미디어학부, 공과대학 건축사회환경공학부, 산업경영공학부, 기계공학부, 신소재공학부, 화공생명과학과, 정보대학 컴퓨터학과, 스마트보안학부)',
                ],
                ['*세부 전형방법 및 제출서류는 포털 공지사항을 확인하여주시기 바랍니다.'],
              ]}
            />
            <Button08 key="common3" question="이중전공 지원 요건이 어떻게 되나요?" />
            <Button08
              key="common4"
              question="1지망 학과(부) 외 다른 희망하는 학과(부)가 없는 경우에는 어떻게하나요?"
              answer={[
                [
                  '2지망을 원하지 않는 경우, 지원 홈페이지 내 2지망 선택란의 “해당 없음”을 변경하지 않은 상태로 제출해주세요.',
                ],
              ]}
            />
          </>
        ) : menuStates[0] && pageStates[1] ? (
          <>
            <Button08
              key="common5"
              question="이중전공에 합격하고, 다음 학기에 바로 휴학 가능한가요?"
              answer={[['가능합니다. 이중전공에 합격하고 다음 학기에 휴학하여도, 합격이 취소되지 않습니다.']]}
            />
            <Button08
              key="common6"
              question="현재 휴학생인 경우에도 이중전공 지원이 가능한가요?"
              answer={[['불가합니다. 금학기 휴학생 신분이신 경우 이중전공 지원이 불가합니다.']]}
            />
            <Button08
              key="common7"
              question="전과처럼 이중전공에 지원할 수 있는 재학연한(이수학기) 제한이 있나요?"
              answer={[
                [
                  '이중전공은 3학기 이상 등록한 경우, 다시 말해 2학년 1학기부터 지원이 가능합니다.',
                  '또한 졸업까지 몇학기 남지 않은 고학년의 경우에도 아무 제한 없이 지원 가능합니다. ',
                ],
              ]}
            />
            <Button08
              key="common8"
              question="학업계획서(자기소개서) 문항은 어디서 확인할 수 있나요? 그리고 문항 내용은 어떻게 구성되어 있나요?"
              answer={[
                [
                  '학업계획서는 별도의 파일 제출이 아닌, 포탈시스템 내 이중전공 신청 페이지에 각 문항 당 답변을 직접 입력하여 제출됩니다.',

                  '문항은 크게 4가지(각 항목 당 공백포함 1,000자 이내)로 구성되어 있으며, 다음과 같습니다: 지원동기, 관심분야, 학업계획, 기타',
                ],
                ['*이중전공 실지원 기간 전까지는 이중전공 신청 페이지 조회가 불가하다는 점 참고바랍니다.'],
              ]}
            />
            <Button08
              key="common9"
              question="이중전공 재지원 횟수에 제한이 있나요?"
              answer={[
                [
                  '이전에 제2전공(이중전공, 융합전공, 학생설계전공) 합격 이력이 없다면 제한이 없습니다. ',
                  '그러나 이전에 합격하여 현재 제2전공이 있는 학생이 재 지원을 하고자 하는 경우라면 재지원의 기회가 1회로 제한됩니다.',
                  '이때 반드시 이중전공 지원 전, 포탈시스템에서 포기처리를 미리 하셔야 지원 가능합니다.',
                ],
              ]}
            />
          </>
        ) : menuStates[1] ? (
          <>
            <Button08
              key="business0"
              question="이번 학기에 면접 전형 진행하나요?"
              answer={[['이번 학기에도 면접 전형 없이, 성적 및 학업계획서만을 바탕으로 심사가 진행됩니다.']]}
            />
            <Button08
              key="business1"
              question="경영학과 이중전공생도 경영대학 소속 해외교환학생 프로그램에 지원할 수 있나요?"
              answer={[['지원 가능합니다.']]}
            />
          </>
        ) : (
          <>
            <Button08
              key="informatics0"
              question="컴퓨터학과 지원 요건이 무엇인가요?"
              answer={[['컴퓨터프로그래밍1 및 컴퓨터프로그래밍2 선수과목을 이수한 학생에 한해 지원 가능합니다.']]}
            />
            <Button08
              key="informatics1"
              question="이번 학기에 컴퓨터프로그래밍 과목(지원 요건) 수강하고 있는데, 지원 가능한가요?"
              answer={[
                [
                  '불가합니다. 지난학기(계절학기도 인정)까지 선수강 요건 과목들을 모두 이수하여야 이번 학기 지원이 가능합니다.',
                ],
              ]}
            />
            <Button08
              key="computer2"
              question="데이터과학과는 별도의 지원 요건이 없나요?"
              answer={[['네, 없습니다.']]}
            />
          </>
        )}
      </FAQboxWrapper>
      {menuStates[0] && (
        <PageWrapper>
          <MobilePaginationButton isClicked={pageStates[0]} onClick={() => setPageStates([true, false])} />
          <MobilePaginationButton isClicked={pageStates[1]} onClick={() => setPageStates([false, true])}>
            2
          </MobilePaginationButton>
        </PageWrapper>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  margin-top: 5vw;
  padding-bottom: 26.11vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fefefe;
`;

const SegmentedControl = styled.div`
  width: 91.11vw;
  height: auto;
  padding: 1.94vw 0;
  margin: 1.67vw 0 3.89vw 0;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 0.51vw;
  box-shadow: 0 0.41vw 20.35vw 0 rgba(20, 20, 20, 0.05);
`;

const FAQboxWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.22vw;
`;

const PageWrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 8.89vw;
  display: flex;
  gap: 2.22vw;
`;

export default FAQ;
