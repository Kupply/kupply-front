import styled from 'styled-components';
import { useState, useEffect } from 'react';
import React, { forwardRef } from 'react';
import MobileHeader from '../../mobile/assets/base/Header';
import MobileFooter from '../../mobile/assets/base/Footer';
import MobileTabMenuButton from '../assets/tabMenu/TabMenu';
import Button08_notice from '../assets/buttons/Button08_notice';
import MobilePaginationButton from '../assets/pagination/Pagination';
import { noticeData, FAQData } from '../../pages/notice/noticeScript';

const NoticePage = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [college, setCollege] = useState(0); // 0: 공지사항, 1: 자주 묻는 질문
  const [currentPage, setCurrentPage] = useState(1);
  const [openedFAQId, setOpenedFAQId] = useState<number | null>(null);
  const [openedNoticeId, setOpenedNoticeId] = useState<number | null>(null);

  const ITEMS_PER_PAGE = 5; // 페이지당 아이템 수

  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

  // 공지사항 토글 핸들러 추가
  const handleNoticeToggle = (id: number) => {
    if (openedNoticeId === id) {
      setOpenedNoticeId(null);
    } else {
      setOpenedNoticeId(id);
    }
  };

  // 공지사항 토글 핸들러 추가
  const handleFAQToggle = (id: number) => {
    if (openedFAQId === id) {
      setOpenedFAQId(null);
    } else {
      setOpenedFAQId(id);
    }
  };

  // 탭이 변경될 때 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [college]);

  // 공지사항 데이터를 필독 여부에 따라 정렬
  const getSortedNoticeData = () => {
    // 필독 항목을 먼저, 그 다음 일반 항목을 정렬
    return [...noticeData].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // 같은 카테고리(필독 또는 일반) 내에서는 id 순으로 정렬
      return a.id - b.id;
    });
  };

  // 공지사항 데이터를 필독 여부에 따라 정렬
  const getSortedFAQData = () => {
    // 필독 항목을 먼저, 그 다음 일반 항목을 정렬
    return [...FAQData].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // 같은 카테고리(필독 또는 일반) 내에서는 id 순으로 정렬
      return a.id - b.id;
    });
  };

  // 현재 페이지에 표시할 정렬된 공지사항 데이터 계산
  const getCurrentPageNotices = () => {
    const sortedData = getSortedNoticeData();

    // 필독 항목과 일반 항목 분리
    const pinnedNotices = sortedData.filter((notice) => notice.isPinned);
    const regularNotices = sortedData.filter((notice) => !notice.isPinned);

    // 현재 페이지에서 표시할 수 있는 일반 항목 수 계산
    const availableSlots = Math.max(0, ITEMS_PER_PAGE - pinnedNotices.length);

    // 일반 항목을 페이지네이션으로 나눔
    let currentRegularNotices: {
      id: number;
      isPinned: boolean;
      title: string;
      content: { text: string; bold: string }[][];
    }[] = [];
    if (availableSlots > 0) {
      const startIndex = (currentPage - 1) * availableSlots;
      const endIndex = startIndex + availableSlots;
      currentRegularNotices = regularNotices.slice(startIndex, endIndex);
    }

    // 모든 페이지에 필독 항목 표시 (필독 항목 + 현재 페이지의 일반 항목)
    return [...pinnedNotices, ...currentRegularNotices];
  };

  const getCurrentPageFAQ = () => {
    const sortedData = getSortedFAQData();

    // 필독 항목과 일반 항목 분리
    const pinnedFAQ = sortedData.filter((faq) => faq.isPinned);
    const regularFAQ = sortedData.filter((faq) => !faq.isPinned);

    // 현재 페이지에서 표시할 수 있는 일반 항목 수 계산
    const availableSlots = Math.max(0, ITEMS_PER_PAGE - pinnedFAQ.length);

    // 일반 항목을 페이지네이션으로 나눔
    let currentRegularFAQ: {
      id: number;
      isPinned: boolean;
      title: string;
      content: { text: string; bold: string }[][];
    }[] = [];
    if (availableSlots > 0) {
      const startIndex = (currentPage - 1) * availableSlots;
      const endIndex = startIndex + availableSlots;
      currentRegularFAQ = regularFAQ.slice(startIndex, endIndex);
    }

    // 모든 페이지에 필독 항목 표시 (필독 항목 + 현재 페이지의 일반 항목)
    return [...pinnedFAQ, ...currentRegularFAQ];
  };

  // 총 페이지 수 계산
  const getTotalPages = (Data: any) => {
    const pinnedItems = Data.filter((item: { isPinned: any }) => item.isPinned);
    const regularItems = Data.filter((item: { isPinned: any }) => !item.isPinned);

    const availableSlots = Math.max(1, ITEMS_PER_PAGE - pinnedItems.length);

    return Math.ceil(regularItems.length / availableSlots);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 공지사항 컨텐츠 렌더링 함수
  const renderNoticeContent = () => {
    const currentNotices = getCurrentPageNotices();

    return (
      <>
        <TextTitleBox>
          <TextTitle1>공지사항</TextTitle1>
          <TextTitle2>쿠플라이 개발팀이 전하는 공지사항을 모았습니다.</TextTitle2>
        </TextTitleBox>
        <NoticeBox>
          {currentNotices.map((notice) => (
            <Button08_notice
              key={notice.id}
              question={notice.title}
              answer={notice.content}
              isOpen={openedNoticeId === notice.id}
              onToggle={() => handleNoticeToggle(notice.id)}
              isPinned={notice.isPinned}
            />
          ))}
        </NoticeBox>
        <PaginationContainer>
          {Array.from({ length: getTotalPages(noticeData) }, (_, i) => i + 1).map((pageNum) => (
            <MobilePaginationButton
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              isClicked={currentPage === pageNum}
            >
              {pageNum}
            </MobilePaginationButton>
          ))}
        </PaginationContainer>
      </>
    );
  };

  // 자주 묻는 질문 컨텐츠 렌더링 함수
  const renderFAQContent = () => {
    const currentFAQs = getCurrentPageFAQ();

    return (
      <>
        <TextTitleBox>
          <TextTitle1>자주 묻는 질문</TextTitle1>
          <TextTitle2>
            쿠플라이 서비스에 대해 <br /> 궁금해하시는 사항들을 정리했습니다.
          </TextTitle2>
        </TextTitleBox>
        <NoticeBox>
          {currentFAQs.map((faq) => (
            <Button08_notice
              key={faq.id}
              question={faq.title}
              answer={faq.content}
              isOpen={openedFAQId === faq.id}
              onToggle={() => handleFAQToggle(faq.id)}
              isPinned={faq.isPinned}
            />
          ))}
        </NoticeBox>
        <PaginationContainer>
          {Array.from({ length: getTotalPages(FAQData) }, (_, i) => i + 1).map((pageNum) => (
            <MobilePaginationButton
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              isClicked={currentPage === pageNum}
            >
              {pageNum}
            </MobilePaginationButton>
          ))}
        </PaginationContainer>
      </>
    );
  };

  return (
    <>
      <Wrapper ref={ref}>
        <MobileHeader logined={isLogined} setLogin={setisLogined} />
        <TitleBox>
          <TitleTitleBox>
            <TextTitleTitle1>고객센터</TextTitleTitle1>
            <TextTitleTitle2>
              쿠플라이의 공지사항, <br /> 자주 묻는 질문을 확인해보세요.
            </TextTitleTitle2>
          </TitleTitleBox>
          <TitleImage src={`/designImage/notice/notice_2.png`} alt="공지사항 이미지" />
        </TitleBox>
        <SegmentedSlider>
          <MobileTabMenuButton
            isClicked={college === 0}
            onClick={() => {
              setCollege(0);
            }}
          >
            공지사항
          </MobileTabMenuButton>
          <MobileTabMenuButton
            isClicked={college === 1}
            onClick={() => {
              setCollege(1);
            }}
          >
            자주 묻는 질문
          </MobileTabMenuButton>
        </SegmentedSlider>
        {college === 0 ? renderNoticeContent() : renderFAQContent()}
        <MobileFooter />
      </Wrapper>
    </>
  );
});

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 20.55vw;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  height: 38.89vw;
  position: relative; /* 자식 요소의 absolute 포지셔닝을 위해 필요 */
  overflow: hidden;

  background:
    linear-gradient(0deg, rgba(190, 68, 68, 0.2) 0%, rgba(190, 68, 68, 0.2) 100%),
    linear-gradient(180deg, #f1d7de 0%, #e79ff7 100%);
`;

const TitleTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.65vw;
  position: absolute;
  left: 7.78vw;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const TitleImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
`;

const SegmentedSlider = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  // width: 67.78vw;
  // height: 13.89vw;

  border-radius: 0.51vw;
  background: var(--White, #fff);
  box-shadow: 0px 0.41vw 20.35vw 0px rgba(20, 20, 20, 0.05);
  padding: 1.94vw 5vw 1.94vw 5vw;
  margin-top: 10.83vw;
  margin-bottom: 8.06vw;

  gap: 2.5vw;
`;

const TextTitleBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;

  gap: 2.78vw;
  align-items: center;
  text-align: center;
  margin-bottom: 6.67vw;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8.06vw;
  margin-bottom: 25.83vw;
  gap: 2.78vw;
`;

const NoticeBox = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;

  gap: 2.22vw;
`;

///////////////////////////

const TextTitleTitle1 = styled.div`
  color: #fff;
  text-shadow:
    2.78vw 1.94vw 0.83vw rgba(202, 63, 130, 0),
    1.67vw 1.11vw 0.83vw rgba(202, 63, 130, 0.04),
    0.83vw 0.56vw 0.83vw rgba(202, 63, 130, 0.13),
    0.56vw 0.28vw 0.56vw rgba(202, 63, 130, 0.21),
    0px 0px 0.56vw rgba(202, 63, 130, 0.25);
  font-family: Pretendard;
  font-size: 4.72vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

const TextTitleTitle2 = styled.div`
  color: #fff;
  text-shadow:
    7.22vw 5vw 2.5vw rgba(202, 63, 130, 0),
    4.72vw 3.33vw 2.22vw rgba(202, 63, 130, 0.04),
    2.5vw 1.94vw 1.94vw rgba(202, 63, 130, 0.13),
    1.11vw 0.83vw 1.39vw rgba(202, 63, 130, 0.21),
    0.28vw 0.28vw 0.83vw rgba(202, 63, 130, 0.25);
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  opacity: 0.8;
`;

const TextTitle1 = styled.div`
  color: #141414;
  text-align: center;

  /* mob_small_Bold */
  font-family: Pretendard;
  font-size: 4.44vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

const TextTitle2 = styled.div`
  height: 8.89vw;

  color: rgba(20, 20, 20, 0.6);
  text-align: center;
  font-family: Pretendard;
  font-size: 3.33vw;
  font-style: normal;
  font-weight: 500;
  line-height: 133.333%;
`;

export default NoticePage;
