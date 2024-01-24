import { styled } from 'styled-components';
import Typography from '../OldTypography';

export interface CardsProps extends React.ComponentPropsWithRef<'div'> {
  name: string;
  eng: string;
  합격자수: number;
  선발인원: number;
  min: number;
  mean: number;
  semester: string;
  imagesrc: string;
}

const DepartmentCard = ({ name, eng, 합격자수, 선발인원, min, mean, semester, imagesrc }: CardsProps) => {
  return (
    <CardContainer src={imagesrc}>
      <div style={{ display: 'flex' }}>
        <CardImage src={imagesrc} />
        <SubjectWrapper>
          <Typography size="largeText">{name}</Typography>
          <SubjectEng>{eng}</SubjectEng>
        </SubjectWrapper>
      </div>
      <Typography style={{ fontWeight: '600', marginBottom: '34px' }}>20{semester}R 모집정보</Typography>
      <div style={{ display: 'flex', gap: '70px' }}>
        <ContentWrapper>
          <Typography size="mediumText" color="rgba(20, 20, 20, 0.60)">
            {semester} 선발 인원
          </Typography>
          <Typography size="largeText" style={{ fontWeight: '600' }}>
            {선발인원}명
          </Typography>
        </ContentWrapper>
        <ContentWrapper>
          <Typography size="mediumText" color="rgba(20, 20, 20, 0.60)">
            합격자 수
          </Typography>
          <Typography size="largeText" style={{ fontWeight: '600' }}>
            {합격자수}명
          </Typography>
        </ContentWrapper>
      </div>
      <div style={{ display: 'flex', gap: '70px' }}>
        <ContentWrapper>
          <Typography size="mediumText" color="rgba(20, 20, 20, 0.60)">
            합격자 평균 학점
          </Typography>
          <Typography size="largeText" style={{ fontWeight: '600' }}>
            {mean}
          </Typography>
        </ContentWrapper>
        <ContentWrapper>
          <Typography size="mediumText" color="rgba(20, 20, 20, 0.60)">
            합격자 최저 학점
          </Typography>
          <Typography size="largeText" style={{ fontWeight: '600' }}>
            {min}
          </Typography>
        </ContentWrapper>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ src?: string }>`
  position: relative; /* 가상 요소를 포함하기 위해 부모 요소를 상대 위치로 설정 */
  width: 348px;
  height: 412px;
  border-radius: 10px;
  padding-left: 36px;
  padding-right: 30px;
  padding-top: 82px;
  box-shadow: 0px 0px 20px 0px rgba(20, 20, 20, 0.25);

  /* 가상 요소를 사용하여 이미지에 blur 효과 추가 */
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.src});
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: lightgray;
    filter: blur(10px) opacity(50%); /* 이미지에 blur 효과 적용 */
    border-radius: 10px; /* 부모와 같은 모양을 유지하기 위해 border-radius 추가 */
  }
`;

const CardImage = styled.img`
  margin-top: 3px;
  width: 41px;
  height: 54px;
  object-fit: cover;
`;

const SubjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px;
  margin-left: 13px;
  margin-bottom: 74px;
`;

const SubjectEng = styled.div`
  color: #141414;
  margin-top: 12px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 118px;
  gap: 9px;
  margin-bottom: 22px;
`;
export default DepartmentCard;
