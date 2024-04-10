// animation 작업 필요

import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Banner03Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: 'small' | 'large';
}

function Banner03(props: Banner03Props) {
  const { size = 'small', ...rest } = props;

  const contentsIndex = size === 'small' ? 0 : 1;

  const contents = [
    [
      {
        buttonText: '마이페이지',
        title: ['같은 과를 지원한', '경쟁자 정보 살펴보기'],
        text: [],
        image: { link: '../../../designImage/mobile/banner/Banner3_4.png', width: '33.13%', height: '50.55%' },
      },
      {
        buttonText: '마이페이지',
        title: ['나의 이중전공', '합격 예측하기'],
        text: [],
        image: { link: '../../../designImage/mobile/banner/Banner3_5.png', width: '50%', height: '64.12%' },
      },
      {
        buttonText: '마이페이지',
        title: ['지난 이중전공', '모집정보 한 눈에 보기'],
        text: [],
        image: { link: '../../../designImage/mobile/banner/Banner3_6.png', width: '44.38%', height: '65.21%' },
      },
      {
        buttonText: '자소서 엿보기',
        title: ['나의 경쟁자들의', '자소서 엿보기'],
        text: [],
        image: { link: '../../../designImage/mobile/banner/Banner3_7.png', width: '44.38%', height: '67.38%' },
      },
    ],
    [
      {
        buttonText: '마이페이지',
        title: ['경쟁자들 중', '나의 등수 보기'],
        text: ['실시간으로 변하는 지원자들 중', '나의 등수를 예측해드릴게요.'],
        image: { link: '../../../designImage/mobile/banner/Banner3_1.png', width: '100%', height: '54.79%' },
      },
      {
        buttonText: '합격자료',
        title: ['자기소개서', '키워드 둘러보기'],
        text: ['합격 자소서 키워드를 통해 더 나은', '자기소개서 작성을 도와드릴게요.'],
        image: { link: '../../../designImage/mobile/banner/Banner3_2.png', width: '100%', height: '100%' },
      },
      {
        buttonText: '실시간 모의지원 현황',
        title: ['실시간 경쟁률', '살펴보기'],
        text: ['이번학기 나의 희망 학과(부)의', '실시간 지원자 수와 경쟁률을', '제공해드릴게요.'],
        image: { link: '../../../designImage/mobile/banner/Banner3_3.png', width: '100%', height: '43.53%' },
      },
    ],
  ];

  return (
    <MainWrapper size={size} {...rest}>
      {contents[contentsIndex].map((dictionary, dictionaryIndex) => (
        <CardBox size={size} cardIndex={dictionaryIndex} key={dictionaryIndex}>
          <Button size={size} cardIndex={dictionaryIndex}>
            <Typography
              size={size === 'small' ? '1.88vw' : '2.13vw'}
              bold="500"
              color={
                (size === 'small' && dictionaryIndex === 1) || (size === 'large' && dictionaryIndex === 0)
                  ? '#141414'
                  : '#FFF'
              }
            >
              {dictionary.buttonText}
            </Typography>
          </Button>
          <Typography
            size={size === 'small' ? '3.89vw' : '4.44vw'}
            bold="700"
            color={size === 'large' && dictionaryIndex === 0 ? '#FFF' : '#141414'}
            style={{ lineHeight: '120%' }}
          >
            {dictionary.title.map((sentence, sentenceIndex) => (
              <div key={sentenceIndex}>{sentence}</div>
            ))}
          </Typography>
          <Typography
            size="3.06vw"
            bold="500"
            color={size === 'large' && dictionaryIndex === 0 ? '#FFF' : '#141414'}
            style={{ lineHeight: '120%' }}
          >
            {dictionary.text.map((sentence, sentenceIndex) => (
              <div key={sentenceIndex}>{sentence}</div>
            ))}
          </Typography>
          <Image
            size={size}
            src={dictionary.image.link}
            style={{ width: dictionary.image.width, height: dictionary.image.height }}
          />
        </CardBox>
      ))}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<Banner03Props>`
  width: ${(props) => (props.size === 'small' ? '182.78vw' : '160.83vw')};
  height: auto;
  margin-left: 0;
  display: flex;
  justify-content: flex-start;
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
  background: ${(props) =>
    props.size === 'large' && props.cardIndex === 0
      ? 'linear-gradient(159deg, #FFA9C5 13.78%, #FFD1C0 73.99%)'
      : props.size === 'small' && props.cardIndex === 1
      ? '#FEF2C0'
      : '#FFF'};
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

const Image = styled.img<{ size: string }>`
  position: absolute;
  right: 0;
  top: ${(props) => props.size === 'small' && '0'};
  bottom: ${(props) => props.size === 'large' && '0'};
`;

export default Banner03;
