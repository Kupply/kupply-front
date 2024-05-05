import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

import Typography from '../../../assets/Typography';

export interface Banner03Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: 'small' | 'large';
}

function Banner03(props: Banner03Props) {
  const { size = 'small' } = props;

  const [smallCurrentOrder, setSmallCurrentOrder] = useState<number[]>([0, 1, 2, 3]);
  const [largeCurrentOrder, setLargeCurrentOrder] = useState<number[]>([0, 1, 2]);

  const smallSwipeHandlers = useSwipeable({
    onSwipedLeft: () => smallHandleSwipe(),
    trackMouse: true,
    trackTouch: true,
  });
  const largeSwipeHandlers = useSwipeable({
    onSwipedLeft: () => largeHandleSwipe(),
    trackMouse: true,
    trackTouch: true,
  });

  const smallHandleSwipe = () => {
    const newOrder = [...smallCurrentOrder];
    newOrder.push(newOrder.shift() as number);
    setSmallCurrentOrder(newOrder);
  };
  const largeHandleSwipe = () => {
    const newOrder = [...largeCurrentOrder];
    newOrder.push(newOrder.shift() as number);
    setLargeCurrentOrder(newOrder);
  };

  const contents = [
    [
      {
        buttonText: '마이페이지',
        title: ['같은 과를 지원한', '경쟁자 정보 살펴보기'],
        text: [],
        image: '../../../designImage/mobile/banner/Banner3_4.png',
      },
      {
        buttonText: '마이페이지',
        title: ['나의 이중전공', '합격 예측하기'],
        text: [],
        image: '../../../designImage/mobile/banner/Banner3_5.png',
      },
      {
        buttonText: '마이페이지',
        title: ['지난 이중전공', '모집정보 한 눈에 보기'],
        text: [],
        image: '../../../designImage/mobile/banner/Banner3_6.png',
      },
      {
        buttonText: '자소서 엿보기',
        title: ['나의 경쟁자들의', '자소서 엿보기'],
        text: [],
        image: '../../../designImage/mobile/banner/Banner3_7.png',
      },
    ],
    [
      {
        buttonText: '마이페이지',
        title: ['경쟁자들 중', '나의 등수 보기'],
        text: ['실시간으로 변하는 지원자들 중', '나의 등수를 예측해드릴게요.'],
        image: '../../../designImage/mobile/banner/Banner3_1.png',
      },
      {
        buttonText: '합격자료',
        title: ['자기소개서', '키워드 둘러보기'],
        text: ['합격 자소서 키워드를 통해 더 나은', '자기소개서 작성을 도와드릴게요.'],
        image: '../../../designImage/mobile/banner/Banner3_2.png',
      },
      {
        buttonText: '실시간 모의지원 현황',
        title: ['실시간 경쟁률', '살펴보기'],
        text: ['이번학기 나의 희망 학과(부)의', '실시간 지원자 수와 경쟁률을', '제공해드릴게요.'],
        image: '../../../designImage/mobile/banner/Banner3_3.png',
      },
    ],
  ];

  return (
    <MainWrapper size={size} {...(size === 'small' ? smallSwipeHandlers : largeSwipeHandlers)}>
      {(size === 'small' ? smallCurrentOrder : largeCurrentOrder).map((index) => (
        <CardBox
          cardIndex={index}
          size={size}
          style={{ backgroundImage: `url(${contents[size === 'large' ? 1 : 0][index].image})` }}
        >
          <Button size={size} cardIndex={index}>
            <Typography
              size={size === 'small' ? '1.88vw' : '2.13vw'}
              bold="500"
              color={(size === 'small' && index === 1) || (size === 'large' && index === 0) ? '#141414' : '#FFF'}
            >
              {contents[size === 'large' ? 1 : 0][index].buttonText}
            </Typography>
          </Button>
          <Typography
            size={size === 'small' ? '3.89vw' : '4.44vw'}
            bold="700"
            color={size === 'large' && index === 0 ? '#FFF' : '#141414'}
            style={{ lineHeight: '120%' }}
          >
            {contents[size === 'large' ? 1 : 0][index].title.map((sentence, sentenceIndex) => (
              <div key={sentenceIndex}>{sentence}</div>
            ))}
          </Typography>
          <Typography
            size="3.06vw"
            bold="500"
            color={size === 'large' && index === 0 ? '#FFF' : '#141414'}
            style={{ lineHeight: '120%' }}
          >
            {contents[size === 'large' ? 1 : 0][index].text.map((sentence, sentenceIndex) => (
              <div key={sentenceIndex}>{sentence}</div>
            ))}
          </Typography>
        </CardBox>
      ))}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<Banner03Props>`
  width: ${(props) => (props.size === 'small' ? '182.78vw' : '160.56vw')};
  height: auto;
  margin-left: 0;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.size === 'small' ? '1.67vw' : '5.28vw')};
`;

const CardBox = styled.div<{ size: string; cardIndex: number }>`
  width: ${(props) => (props.size === 'small' ? '40.27vw' : '45.83vw')};
  height: ${(props) => (props.size === 'small' ? '21.11vw' : '66.94vw')};
  padding: 4.17vw 0 0 4.17vw;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.size === 'small' ? '3.33vw' : '1.94vw')};
  background-size: cover;
  border-radius: 3.33vw;
  position: relative;
`;

const Button = styled.div<{ size: string; cardIndex: number }>`
  width: fit-content;
  height: fit-content;
  padding: ${(props) => (props.size === 'large' ? '1.3vw 2.37vw' : '1.15vw 2.08vw')};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    (props.size === 'large' && props.cardIndex === 0) || (props.size === 'small' && props.cardIndex === 1)
      ? '#FFF'
      : '#E57C90'};
  border-radius: 5.56vw;
`;

export default Banner03;
