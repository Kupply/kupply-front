import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import Button15 from '../buttons/Button15';
import CarouselKey from '../CarouselKey';

export interface Banner02Props extends React.ComponentPropsWithoutRef<'button'> {
  images?: string[];
  titles?: string[];
  contents?: string[][];

  links?: string[];
}

// Carousel
function Banner02(props: Banner02Props) {
  const {
    images = [
      '../../../designImage/mobile/banner/Banner2_1.png',
      '../../../designImage/mobile/banner/Banner2_2.png',
      '../../../designImage/mobile/banner/Banner2_3.png',
      '../../../designImage/mobile/banner/Banner2_4.png',
    ],
    titles = ['합격자료', '실시간 지원현황', '마이보드', ''], // dummy
    contents = [
      ['최근 3학기 이중전공 합격 커트라인,', '쿠플라이가 한 번에 보여드릴게요.'],
      ['당신이 지원한 이중전공 학과,', '쿠플라이가 실시간 모의지원현황을 알려드릴게요.'],
      ['지원자들 중 나는 몇 등일까?', '쿠플라이가 나의 학점 백분위를 비교 해드릴게요.'],
      [''], // dummy
    ],
    links = ['/archive', '/landing', '/myboard', '/notice'],
  } = props;

  const [index, setIndex] = useState(3);
  const [resetIntervalFlag, setResetIntervalFlag] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % 4);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [resetIntervalFlag]);
  // 3초마다 캐러셀 변경
  // 고파스 회원 전환 공지 고정되도록 timer 임시 제거

  function LeftArrowClick() {
    setIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
    setResetIntervalFlag((prevFlag) => !prevFlag);
  }
  function RightArrowClick() {
    setIndex((prevIndex) => (prevIndex + 1) % 4);
    setResetIntervalFlag((prevFlag) => !prevFlag);
  }

  function handleButtonClick() {
    navigate(links[index]);
  }

  return (
    <MainWrapper index={index} images={images}>
      {index !== 3 && (
        <TextBox index={index}>
          <Button15 onClick={() => navigate(links[index])}>{titles[index]}</Button15>
          <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%', opacity: '0.8' }}>
            {contents[index].map((sentence, sentenceIndex) => (
              <div key={sentenceIndex}>{sentence}</div>
            ))}
          </Typography>
        </TextBox>
      )}
      <ArrowButton
        src="../../designImage/carousel/CarouselLeftButton.png"
        onClick={LeftArrowClick}
        style={{ left: '7.01%' }}
      />
      <ArrowButton
        src="../../designImage/carousel/CarouselRightButton.png"
        onClick={RightArrowClick}
        style={{ right: '7.01%' }}
      />
      <CarouselKey type={index} style={{ position: 'absolute', left: '39.77%', bottom: '4.27%' }} />
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ index: number; images: string[] }>`
  width: 91.11vw;
  height: 104.17vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 5.56vw;
  background-image: url(${(props) => props.images[props.index]});
  background-size: cover;
  position: relative;
`;

const TextBox = styled.div<{ index: number }>`
  width: 84.17vw;
  height: 28.61vw;
  padding: 4.17vw 0 0 6.94vw;
  display: flex;
  flex-direction: column;
  gap: 1.67vw;
  border-radius: 0 0 5.56vw 5.56vw;
  background: radial-gradient(231% 135.8% at 0.9% 2.98%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
  box-shadow: 0px 0px 30px 0px rgba(245, 189, 189, 0.4);
  backdrop-filter: blur(100px);
`;

const ArrowButton = styled.img`
  width: 5.56vw;
  height: 5.56vw;
  cursor: pointer;
  position: absolute;
  top: 36.53%;
`;

export default Banner02;
