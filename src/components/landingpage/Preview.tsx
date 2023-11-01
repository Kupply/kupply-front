import styled from 'styled-components';
import Typography from '../../assets/Typography';

const MainWrapper = styled.div`
  width: 100vw;
  height: 2550px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  background: linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 80%, rgba(255, 255, 255, 0.4) 100%);
  z-index: 990;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
`;

const CardList = styled.div`
  width: 392px;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  width: 359px;
  height: 469px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
  border-radius: 10px;
  padding-top: 92px;
  padding-left: 33px;
  box-shadow: 0px 20px 50px rgba(223, 223, 223, 0.4);
  backdrop-filter: blur(18px);
`;

function Preview() {
  return (
    <MainWrapper>
      <TitleWrapper>
        <Typography size="mediumText" color="#D85888" bold="700" style={{ marginTop: '130px', marginBottom: '14px' }}>
          쿠플라이 미리보기
        </Typography>
        <Typography size="heading1" style={{ marginBottom: '26px' }}>
          당신이 찾고있던 이중전공에 대한 모든 정보
        </Typography>
        <Typography size="bodyText" bold="500" color="rgba(20, 20, 20, 0.6)">
          당신의 성공적인 이중 진입을 도울 쿠플라이의 다양한 기능을 소개할게요
        </Typography>
      </TitleWrapper>
      <ContentWrapper>
        <CardList style={{ gap: '57px', marginTop: '324.5px' }}>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              실시간 모의지원 현황
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              실시간 경쟁률
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              살펴보기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              이번학기 나의 희망 학과(부)의 실시간 지
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              원자 수와 경쟁률을 제공해드릴게요.
            </Typography>
            <img
              width="392px"
              height="245px"
              src="../../design_image/preview/preview1.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              합격지표
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              지난 이중전공
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              모집정보 한 눈에 보기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              흩어져 있던 지난 이중 모집정원, 경쟁률
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              에 대한 정보를 모두 모아드릴게요.
            </Typography>
            <img
              width="284px"
              height="284px"
              src="../../design_image/preview/preview2.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
        </CardList>
        <CardList style={{ gap: '42px', marginTop: '189.5px' }}>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              합격지표
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              희망 이중전공
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              최신 합격컷 모아보기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              학과 별 합격자의 최저학점, 평균, 중위
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              값, 최빈값을 정리해드릴게요.
            </Typography>
            <img
              width="254px"
              height="254px"
              src="../../design_image/preview/preview3.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              마이페이지
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              나의 이중전공
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              합격 예측하기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              최신 3학기의 합격자료들을 바탕으로, 학
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              점에 맞는 적정지원인지 예측해드릴게요.
            </Typography>
            <img
              width="338px"
              height="267px"
              src="../../design_image/preview/preview4.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              마이페이지
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              경쟁자들 중
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              나의 등수보기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              실시간으로 변하는 지원자들 중 나의 등
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              수를 예측하여 제공 해드릴게요.
            </Typography>
            <img
              width="320px"
              height="256px"
              src="../../design_image/preview/preview5.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
        </CardList>
        <CardList style={{ gap: '57px', marginTop: '324.5px' }}>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              합격지표
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              자기소개서
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              키워드 둘러보기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              합격자의 자소서 키워드를 추출하여, 더
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              나은 자기소개서 작성을 도와드릴게요.
            </Typography>
            <img
              width="289x"
              height="289px"
              src="../../design_image/preview/preview6.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
          <Card>
            <Typography size="smallText" bold="500" color="#E57C90" style={{ marginBottom: '11px' }}>
              마이페이지
            </Typography>
            <Typography size="title2" style={{ marginBottom: '2px' }}>
              같은 과를 지원한
            </Typography>
            <Typography size="title2" style={{ marginBottom: '20px' }}>
              경쟁자 정보 살펴보기
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              지원자들의 출신 단과대 분포와 단과대
            </Typography>
            <Typography size="bodyText" color="rgba(20, 20, 20, 0.8)" bold="400" style={{ marginBottom: '2px' }}>
              별 평균 학점 분포를 살펴보세요.
            </Typography>
            <img
              width="289px"
              height="236px"
              src="../../design_image/preview/preview7.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Card>
        </CardList>
      </ContentWrapper>
    </MainWrapper>
  );
}

export default Preview;
