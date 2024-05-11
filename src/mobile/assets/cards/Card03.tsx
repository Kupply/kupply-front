import styled from 'styled-components';
import Typography from '../../../assets/Typography';

export interface Card0301Props extends React.ComponentPropsWithoutRef<'div'> {
  avgPassNum: number;
  cardType: '0' | '1';
}

export interface Card0302Props extends React.ComponentPropsWithoutRef<'div'> {
  appliedNum: number;
  passNum: number;
}

export interface Card0303Props extends React.ComponentPropsWithoutRef<'div'> {
  currentApplications: number;
  TO: number;
}

export function Card0301({ avgPassNum, cardType }: Card0301Props) {
  return (
    <Container1>
      <TextWrapper style={{ top: '4.567vw' }}>
        <Typography size="3.889vw" color="rgba(20, 20, 20, 0.70)" bold="500">
          {cardType === '0' ? '평균 선발 인원' : '선발 인원'}
        </Typography>
      </TextWrapper>
      <ImageWrapper style={{ top: '1.8vw' }}>
        <img src={process.env.PUBLIC_URL + `/designImage/mobile/cards/평균선발인원.png`} alt="평균선발인원" />
      </ImageWrapper>
      <TextWrapper style={{ top: '35.556vw' }}>
        <Typography size="5.556vw" bold="700">
          {avgPassNum}
        </Typography>
        <Typography size="5.556vw" bold="500">
          &nbsp;명
        </Typography>
      </TextWrapper>
    </Container1>
  );
}

export function Card0302({ passNum, appliedNum }: Card0302Props) {
  return (
    <Container2>
      <TextWrapper style={{ top: '4.567vw' }}>
        <Typography size="3.889vw" bold="600" color="rgba(255, 255, 255, 0.70)">
          모의지원 합격자
        </Typography>
      </TextWrapper>
      <ImageWrapper style={{ top: '1.8vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={process.env.PUBLIC_URL + `/designImage/mobile/cards/모의지원합격자.png`}
          alt="모의지원합격자"
          style={{ width: '23.33vw', height: '23.33vw' }}
        />
      </ImageWrapper>
      <TextWrapper style={{ top: '32.778vw' }}>
        <Typography color="white" size="5.556vw" bold="700">
          {passNum}&nbsp;명
        </Typography>
      </TextWrapper>
      <TextWrapper style={{ top: '38.333vw' }}>
        <Typography color="rgba(255, 255, 255, 0.50)" size="2.778vw" bold="500">
          /&nbsp;{appliedNum}&nbsp;명&nbsp;모의지원
        </Typography>
      </TextWrapper>
    </Container2>
  );
}

export function Card0303({ currentApplications, TO }: Card0303Props) {
  return (
    <Container1>
      <TextWrapper style={{ top: '4.567vw' }}>
        <Typography size="3.889vw" bold="600" color="rgba(67, 67, 67, 0.80)">
          실시간 지원자
        </Typography>
      </TextWrapper>
      <ImageWrapper style={{ top: '0.7vw' }}>
        <img src={process.env.PUBLIC_URL + `/designImage/mobile/cards/실시간지원자.png`} alt="char 4" />
      </ImageWrapper>
      <TextWrapper style={{ top: '32.778vw' }}>
        <Typography color="#D85888" size="5.556vw" bold="700">
          {currentApplications}&nbsp;명
        </Typography>
      </TextWrapper>
      <TextWrapper style={{ top: '38.333vw' }}>
        <Typography color="rgba(67, 67, 67, 0.80)" size="2.778vw" bold="500">
          /&nbsp;{TO}&nbsp;명&nbsp;정원
        </Typography>
      </TextWrapper>
    </Container1>
  );
}
const Container1 = styled.div`
  //width: 160px;
  width: 44.444vw;
  //height: 171px;
  height: 47.5vw;
  flex-shrink: 0;
  //border-radius: 10px;
  border-radius: 2.778vw;
  border: 1px;
  filter: drop-shadow(0px 14.857px 37.143px rgba(223, 223, 223, 0.4));
  backdrop-filter: blur(6.685710906982422px);
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container2 = styled.div`
  //width: 160px;
  width: 44.444vw;
  //height: 171px;
  height: 47.5vw;
  flex-shrink: 0;
  //border-radius: 10px;
  border-radius: 2.778vw;
  //border: 1px;
  filter: drop-shadow(0px 14.857px 37.143px rgba(223, 223, 223, 0.4));
  backdrop-filter: blur(6.685710906982422px);
  background-color: #313b80;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrapper = styled.div`
  position: absolute;
  line-height: 5.556vw;
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-style: normal;
`;

const ImageWrapper = styled.div`
  width: 40.56vw; // Converted from 200px
  height: 40.56vw; // Converted from 200px
  flex-shrink: 0;
  position: absolute;
  //overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Maintain aspect ratio while fitting the container */
  }
`;
