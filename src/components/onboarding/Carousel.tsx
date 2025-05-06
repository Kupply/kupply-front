import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';

interface MainWrapperProps {
  page: number;
}

function Carousel() {
  const [page, setPage] = useState(3);
  const totalPages = 4; // 3; 고파스 회원 전환 공지 배너 추가
  const [autoChange, setAutoChange] = useState(false);

  const handleLeftClick = () => {
    setPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    setAutoChange(false);
  };

  const handleRightClick = () => {
    setPage((prevPage) => (prevPage + 1) % totalPages);
    setAutoChange(false);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setAutoChange(true);
  //     setPage((prevPage) => (prevPage + 1) % totalPages);
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, [page, autoChange]); // 고파스 회원 전환 공지 고정되도록 timer 임시 제거

  return (
    <MainWrapper page={page}>
      {page === 0 ? (
        <CarouselWrapper>
          <BannerButton
            onClick={() => {
              window.location.href = '/archive';
            }}
          >
            <Typography size="1.04vw" bold="500" color="#D85888">
              합격자료
            </Typography>
          </BannerButton>
          <div style={{ display: 'flex' }}>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              최근 3학기&nbsp;
            </Typography>
            <Typography size="1.67vw" bold="700" color="#121212" style={{ lineHeight: '120%' }}>
              이중전공 합격 커트라인
            </Typography>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              ,
            </Typography>
          </div>
          <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
            쿠플라이가 한 번에 보여드릴게요.
          </Typography>
        </CarouselWrapper>
      ) : page === 1 ? (
        <CarouselWrapper align>
          <BannerButton
            onClick={() => {
              window.location.href = '/landing';
            }}
          >
            <Typography size="1.04vw" bold="500" color="#D85888">
              실시간 지원현황
            </Typography>
          </BannerButton>
          <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
            당신이 지원한 이중전공 학과,
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              쿠플라이가&nbsp;
            </Typography>
            <Typography size="1.67vw" bold="700" color="#121212" style={{ lineHeight: '120%' }}>
              실시간 모의지원현황
            </Typography>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              을 알려드릴게요.
            </Typography>
          </div>
        </CarouselWrapper>
      ) : page === 2 ? (
        <CarouselWrapper>
          <BannerButton
            onClick={() => {
              window.location.href = '/myboard';
            }}
          >
            <Typography size="1.04vw" bold="500" color="#D85888">
              마이보드
            </Typography>
          </BannerButton>
          <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
            지원자들 중 나는 몇 등일까?
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              쿠플라이가&nbsp;
            </Typography>
            <Typography size="1.67vw" bold="700" color="#121212" style={{ lineHeight: '120%' }}>
              나의 학점 백분위
            </Typography>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              를 비교해드릴게요.
            </Typography>
          </div>
        </CarouselWrapper>
      ) : (
        // 고파스 회원 전환 배너 추가 (4번째 페이지) - 이미지 자체에 배너 버튼 포함
        <CarouselWrapper></CarouselWrapper>
      )}
      <ArrowButton
        onClick={handleLeftClick}
        src="../designImage/carousel/CarouselLeftButton.png"
        style={{ left: '6.67%', top: '46.37%' }}
      />
      <ArrowButton
        onClick={handleRightClick}
        src="../designImage/carousel/CarouselRightButton.png"
        style={{ right: '6.67%', top: '46.37%' }}
      />
      <CircleButton
        onClick={() => {
          setPage(0);
          setAutoChange(false);
        }}
        style={{ left: '48%' }}
        active={page === 0}
      />
      <CircleButton
        onClick={() => {
          setPage(1);
          setAutoChange(false);
        }}
        style={{ left: '50%' }}
        active={page === 1}
      />
      <CircleButton
        onClick={() => {
          setPage(2);
          setAutoChange(false);
        }}
        style={{ left: '52%' }}
        active={page === 2}
      />
      <CircleButton
        onClick={() => {
          setPage(3);
          setAutoChange(false);
        }}
        style={{ left: '54%' }}
        active={page === 3}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div<MainWrapperProps>`
  width: 100vw;
  height: 23.7vw;
  position: relative;
  background-size: cover;
  background-position: center;
  background-image: ${(props) =>
    props.page === 0
      ? `url('../designImage/carousel/Carousel1.png')`
      : props.page === 1
      ? `url('../designImage/carousel/Carousel2.png')`
      : props.page === 2
      ? `url('../designImage/carousel/Carousel3.png')`
      : `url('../designImage/carousel/Carousel4.png')`};
`;

const ArrowButton = styled.img`
  width: 1.67vw;
  height: 1.67vw;
  position: absolute;
  cursor: pointer;
`;

const CircleButton = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? '0.73vw' : '0.52vw')};
  height: ${({ active }) => (active ? '0.73vw' : '0.52vw')};
  background-color: #fff;
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  border-radius: 999px;
  position: absolute;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  top: ${({ active }) => (active ? '85.31%' : '85.81%')};
  cursor: pointer;
`;

const BannerButton = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  padding: 0.63vw 1.25vw;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 40px 0px rgba(216, 88, 136, 0.2);
  margin: 7.24vw 0 1.77vw 0;
  cursor: pointer;
`;

const CarouselWrapper = styled.div<{ align?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-left: 12vw;
  padding-right: 12vw;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  align-items: ${(props) => (props.align ? 'flex-end' : '')};
`;

export default Carousel;
