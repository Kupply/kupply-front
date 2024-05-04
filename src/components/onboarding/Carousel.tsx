import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';

interface MainWrapperProps {
  page: number;
}

function Carousel() {
  const [page, setPage] = useState(0);
  const totalPages = 3;
  const [autoChange, setAutoChange] = useState(false);

  const handleLeftClick = () => {
    setPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    setAutoChange(false);
  };

  const handleRightClick = () => {
    setPage((prevPage) => (prevPage + 1) % totalPages);
    setAutoChange(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoChange(true);
      setPage((prevPage) => (prevPage + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [page, autoChange]);

  return (
    <MainWrapper page={page}>
      {page === 0 ? (
        <CarouselWrapper
          onClick={() => {
            window.location.href = '/archive';
          }}
        >
          <BannerButton>
            <Typography size="1.04vw" bold="500" color="#D85888">
              합격자료
            </Typography>
          </BannerButton>
          <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
            지난학기, 지지난학기 경영학과 커트라인까지
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography size="1.67vw" bold="700" color="#121212" style={{ lineHeight: '120%' }}>
              한번에 모아서&nbsp;
            </Typography>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              보여드릴게요.
            </Typography>
          </div>
        </CarouselWrapper>
      ) : page === 1 ? (
        <CarouselWrapper
          align
          onClick={() => {
            window.location.href = '/landing';
          }}
        >
          <BannerButton>
            <Typography size="1.04vw" bold="500" color="#D85888">
              실시간 비교
            </Typography>
          </BannerButton>
          <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
            당신이 지원한 이중전공,
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography size="1.67vw" bold="700" color="#121212" style={{ lineHeight: '120%' }}>
              실시간 지원현황
            </Typography>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              에 대한 정보를 알려드릴게요.
            </Typography>
          </div>
        </CarouselWrapper>
      ) : (
        <CarouselWrapper
          onClick={() => {
            window.location.href = '/myboard';
          }}
        >
          <BannerButton>
            <Typography size="1.04vw" bold="500" color="#D85888">
              마이보드
            </Typography>
          </BannerButton>
          <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
            아직 1지망과 2지망을 고민중이신가요?
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              지난학기&nbsp;
            </Typography>
            <Typography size="1.67vw" bold="700" color="#121212" style={{ lineHeight: '120%' }}>
              성적 커트라인 한눈에 비교
            </Typography>
            <Typography size="1.67vw" bold="300" color="#121212" style={{ lineHeight: '120%' }}>
              하고 결정하세요.
            </Typography>
          </div>
        </CarouselWrapper>
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
      : `url('../designImage/carousel/Carousel3.png')`};
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
  cursor: pointer;
`;

export default Carousel;
