import { styled } from 'styled-components';
import Typography from './Typography';

export interface CardsProps extends React.ComponentPropsWithRef<'div'> {
  name: string;
  eng: string;
  경쟁률: number;
  선발인원: number;
  min: number;
  mean: number;
  semester: string;
  imagesrc: string;
}

const DepartmentCard = ({ name, eng, 경쟁률, 선발인원, min, mean, semester, imagesrc }: CardsProps) => {
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
      <div style={{ display: 'flex', gap: '85px' }}>
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
            경쟁률
          </Typography>
          <Typography size="largeText" style={{ fontWeight: '600' }}>
            {경쟁률} : 1
          </Typography>
        </ContentWrapper>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div<{ src: string }>`
  width: 348px;
  height: 412px;
  border-radius: 10px;
  padding-left: 46px;
  padding-top: 82px;
  box-shadow: 0px 0px 20px 0px rgba(20, 20, 20, 0.25);
  background: url(src), lightgray 20% / cover no-repeat;
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
  width: 112px;
  gap: 9px;
  margin-bottom: 22px;
`;
export default DepartmentCard;
