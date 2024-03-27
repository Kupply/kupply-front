import styled from "styled-components";
import Typography from "../../../assets/Typography";
import backgroundImage1 from './backgroundImage1.svg';
import backgroundImage2 from './backgroundImage2.svg';

export interface Card0301Props extends React.ComponentPropsWithoutRef<'div'>{
  avgPassNum: number;
};

export interface Card0302Props extends React.ComponentPropsWithoutRef<'div'>{
  appliedNum: number;
  passNum: number;
};

export function Card0301({avgPassNum}: Card0301Props){
  return (
    <Container1>
      <TextWrapper style={{top: '4.167vw'}}>
        <Typography size="3.889vw" color="rgba(20, 20, 20, 0.70)" bold="500">
          평균 선발 인원
        </Typography>
      </TextWrapper>
      <Image1Wrapper>
        <img src={process.env.PUBLIC_URL + `/designImage/character/cards/shh.png`} alt="char 1" />
      </Image1Wrapper>
      <Image2Wrapper>
        <img src={process.env.PUBLIC_URL + `/designImage/character/cards/zio 1.png`} alt="char 2" />
      </Image2Wrapper>
      <Image3Wrapper>
        <img src={process.env.PUBLIC_URL + `/designImage/character/cards/njh.png`} alt="char 3" />
      </Image3Wrapper>
      <TextWrapper style={{top: '35.556vw'}}>
        <Typography size="5.556vw" bold="700">{avgPassNum}</Typography>
        <Typography size="5.556vw" bold="500">&nbsp;명</Typography>
      </TextWrapper>
    </Container1>
  )
}

export function Card0302({passNum, appliedNum}: Card0302Props){
  return (
    <Container2>
      <TextWrapper style={{top: '4.167vw'}}>
        <Typography size="3.889vw" bold="600" color="rgba(255, 255, 255, 0.70)">
          모의지원 합격자
        </Typography>
      </TextWrapper>
      <Image4Wrapper>
        <img src={process.env.PUBLIC_URL + `/designImage/character/cards/oyj 1.png`} alt="char 4" />
      </Image4Wrapper>
      <TextWrapper style={{top: '32.778vw'}}>
        <Typography color="white" size="5.556vw" bold="700">
          {passNum}&nbsp;명
        </Typography>
      </TextWrapper>
      <TextWrapper style={{top: '38.333vw'}}>
        <Typography color="rgba(255, 255, 255, 0.50)" size="2.778vw" bold="500">/&nbsp;{appliedNum}&nbsp;명&nbsp;모의지원</Typography>
      </TextWrapper>
    </Container2>
  )
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
filter: drop-shadow(0px 14.857px 37.143px rgba(223, 223, 223, 0.40));
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
filter: drop-shadow(0px 14.857px 37.143px rgba(223, 223, 223, 0.40));
backdrop-filter: blur(6.685710906982422px);
background-color: #313B80;
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


const Image1Wrapper = styled.div`
//width: 72px;
width: 20vw;
//height: 72px;
height: 20vw;
flex-shrink: 0;
position: absolute;
//top: 51px;
top: 14.167vw;
//left: 5px;
left: 1.389vw;
& img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Maintain aspect ratio while fitting the container */
}
`;

const Image2Wrapper = styled.div`
//width: 84px;
width: 23.333vw;
//height: 84px;
height: 23.333vw;
flex-shrink: 0;
position: absolute;
//top: 39px;
top: 10.833vw;
//left: 38px;
left: 10.556vw;
& img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Maintain aspect ratio while fitting the container */
}
`;

const Image3Wrapper = styled.div`
//width: 72px;
width: 20vw;
//height: 72px;
height: 20vw;
flex-shrink: 0;
position: absolute;
//top: 51px;
top: 14.167vw;
//right: 5px;
right: 1.389vw;
& img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Maintain aspect ratio while fitting the container */
}
`;

const Image4Wrapper = styled.div`
//width: 84px;
width: 23.333vw;
//height: 84px;
height: 23.333vw;
flex-shrink: 0;
position: absolute;
//top: 31px;
top: 8.611vw;
& img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Maintain aspect ratio while fitting the container */
}
`;