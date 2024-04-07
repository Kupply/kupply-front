import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Typography from '../../../assets/Typography';
import Button15 from '../buttons/Button15';
import CarouselKey from '../CarouselKey';

export interface Banner02Props extends React.ComponentPropsWithoutRef<'button'> {
  images?: string[];
  titles?: string[];
  contents?: string[][];
}

function Banner02(props: Banner02Props) {
  const {
    images = [
      '../../../designImage/mobile/banner/Banner2_1.png',
      '../../../designImage/mobile/banner/Banner2_2.png',
      '../../../designImage/mobile/banner/Banner2_3.png',
    ],
    titles = ['합격자료', '실시간 지원현황', '마이보드'],
    contents = [
      ['지난학기, 지지난학기 경영학과 커트라인까지', '한번에 모아서 보여드릴게요.'],
      ['당신이 지원한 이중전공,', '실시간 지원현황에 대한 정보를 알려드릴게요.'],
      ['아직 1지망과 2지망을 고민중이신가요?', '지난 학기 성적 커트라인 한 눈에 비교하고', '결정하세요.'],
    ],
  } = props;

  const [index, setIndex] = useState(0);
  const [resetIntervalFlag, setResetIntervalFlag] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [resetIntervalFlag]);
  // 3초마다 캐러슬 변경

  function LeftArrowClick() {
    setIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    setResetIntervalFlag((prevFlag) => !prevFlag);
  }
  function RightArrowClick() {
    setIndex((prevIndex) => (prevIndex + 1) % 3);
    setResetIntervalFlag((prevFlag) => !prevFlag);
  }

  return (
    <MainWrapper index={index} images={images}>
      <TextBox index={index}>
        <Button15>{titles[index]}</Button15>
        <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%', opacity: '0.8' }}>
          {contents[index].map((sentence, sentenceIndex) => (
            <div key={sentenceIndex}>{sentence}</div>
          ))}
        </Typography>
      </TextBox>
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
      <CarouselKey type={index} style={{ position: 'absolute', left: '41.77%', bottom: '4.27%' }} />
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
