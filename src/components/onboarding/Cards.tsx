import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Typography from '../../assets/Typography';
import Button11 from '../../assets/buttons/Button11';

function Cards() {
  const navigate = useNavigate();

  return (
    <MainWrapper>
      <Typography size="0.94vw" bold="700" color="#D85888" style={{ marginTop: '6.56vw' }}>
        쿠플라이 미리보기
      </Typography>
      <Typography
        size="2.5vw"
        bold="700"
        style={{ marginTop: '8px', lineHeight: '2.6vw', textShadow: '0px 4px 16px rgba(255, 255, 255, 0.33)' }}
      >
        쿠플라이의 핵심 기능을 소개합니다
      </Typography>
      <Typography bold="500" color="rgba(20, 20, 20, 0.6)" style={{ marginTop: '1.46vw', opacity: '0.8' }}>
        모두의 성공적인 이중전공 진입 메이트 쿠플라이와 함께해요!
      </Typography>
      <ContentWrapper>
        <HorizontalWrapper>
          <Box
            style={{
              width: '20.2vw',
              height: '29.27vw',
              background: 'linear-gradient(159deg, #FFA9C5 13.78%, #FFD1C0 73.99%)',
            }}
          >
            <Menu style={{ color: '#141414', background: '#FFF' }}>마이페이지</Menu>
            <Typography size="1.88vw" bold="700" color="#FFF" style={{ lineHeight: '2.4vw' }}>
              경쟁자들 중 <br /> 나의 등수 보기
            </Typography>
            <Typography
              size="0.94vw"
              bold="500"
              color="#FFF"
              style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}
            >
              실시간으로 변하는 지원자들 중 <br /> 나의 등수를 예측하여 제공해 드릴게요.
            </Typography>
            <img
              width="100%"
              height="55%"
              src="../../designImage/preview/preview_01_01.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Box>
          <Box style={{ width: '20.2vw', height: '29.27vw', background: '#FFF' }}>
            <Menu style={{ color: '#FFF', background: '#E57C90' }}>합격자료</Menu>
            <Typography size="1.88vw" bold="700" style={{ lineHeight: '2.4vw' }}>
              자기소개서 <br /> 키워드 둘러보기
            </Typography>
            <Typography size="0.94vw" bold="500" style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}>
              합격자의 자소서 키워드를 추출하여, <br /> 더 나은 자기소개서 작성을 도와드릴게요.
            </Typography>
            <img
              width="60.61%"
              height="37.65%"
              src="../../designImage/preview/preview_02_01.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
            <img
              width="46.93%"
              height="24.67%"
              src="../../designImage/preview/preview_02_02.png"
              style={{ position: 'absolute', bottom: '21.5%', right: '55.9%' }}
            />
            <img
              width="29.18%"
              height="16.15%"
              src="../../designImage/preview/preview_02_03.png"
              style={{ position: 'absolute', bottom: '77.7%', right: '14.37%' }}
            />
            <img
              width="32.08%"
              height="20.33%"
              src="../../designImage/preview/preview_02_04.png"
              style={{ position: 'absolute', bottom: '38.5%', right: '-4.72%' }}
            />
          </Box>
          <VerticalWrapper>
            <Box style={{ width: '20.1vw', height: '13.75vw', background: '#FFF' }}>
              <Menu style={{ color: '#FFF', background: '#E57C90' }}>마이페이지</Menu>
              <Typography size="1.88vw" bold="700" style={{ lineHeight: '2.4vw' }}>
                희망 이중전공 <br /> 최신 합격컷 모아보기
              </Typography>
              <Typography size="0.94vw" bold="500" style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}>
                학과 별 합격자의 최저학점, 평균, <br /> 중위값, 최빈값을 정리해드릴게요.
              </Typography>
              <img
                width="34.43%"
                height="43%"
                src="../../designImage/preview/preview_03_01.png"
                style={{ position: 'absolute', bottom: '54.67%', right: '2.59%' }}
              />
            </Box>
            <Box style={{ width: '20.2vw', height: '12.08vw', background: '#FFF' }}>
              <Typography size="1.88vw" color="#000" style={{ lineHeight: '2.4vw', marginTop: '3.33vw' }}>
                이제껏 가져왔던
              </Typography>
              <Typography size="1.88vw" bold="700" color="#000" style={{ lineHeight: '2.4vw', marginTop: '-0.83vw' }}>
                이중전공에 대한 궁금증, <br /> 다<span style={{ display: 'inline-block', width: '13.44%' }} />
                풀어드려요.
              </Typography>
              <img
                width="20.52%"
                height="38.15%"
                src="../../designImage/preview/preview_04_01.png"
                style={{ position: 'absolute', bottom: '50%', right: '9.67%' }}
              />
              <img
                width="7.28%"
                height="11.43%"
                src="../../designImage/preview/preview_04_02.svg"
                style={{
                  position: 'absolute',
                  bottom: '73.13%',
                  right: '32.11%',
                  filter: 'drop-shadow(0px 6px 10px rgba(229, 124, 144, 0.43))',
                }}
              />
              <img
                width="13.44%"
                height="2.4%"
                src="../../designImage/preview/preview_04_03.png"
                style={{ position: 'absolute', bottom: '19.17%', right: '72.7%' }}
              />
            </Box>
          </VerticalWrapper>
        </HorizontalWrapper>
        <HorizontalWrapper>
          <VerticalWrapper>
            <HorizontalWrapper>
              <Box style={{ width: '20.1vw', height: '13.75vw', background: '#FFF' }}>
                <Menu style={{ color: '#FFF', background: '#E57C90' }}>마이페이지</Menu>
                <Typography size="1.88vw" bold="700" style={{ lineHeight: '2.4vw' }}>
                  같은 과를 지원한 <br /> 경쟁자 정보 살펴보기
                </Typography>
                <Typography size="0.94vw" bold="500" style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}>
                  지원자들의 출신 단과대 분포와 <br /> 단과대별 평균 학점 분포를 살펴보세요.
                </Typography>
                <img
                  width="33.49%"
                  height="40.67%"
                  src="../../designImage/preview/preview_05_01.png"
                  style={{ position: 'absolute', bottom: '59.12%', right: 0 }}
                />
              </Box>
              <Box
                style={{
                  width: '20.2vw',
                  height: '13.65vw',
                  background: '#fef2c0',
                  boxShadow: ' 0px 14.857px 37.143px 0px rgba(223, 223, 223, 0.4)',
                  backdropFilter: 'blur(6.685710906982422px)',
                }}
              >
                <Menu style={{ color: '#141414', background: '#FFF' }}>마이페이지</Menu>
                <Typography size="1.88vw" bold="700" style={{ lineHeight: '2.4vw' }}>
                  나의 이중전공
                  <br /> 합격 예측하기
                </Typography>
                <Typography size="0.94vw" bold="500" style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}>
                  최신 3학기의 합격자료들을 바탕으로, <br /> 학점에 맞는 적정지원인지 예측해드릴게요.
                </Typography>
                <img
                  width="50%"
                  height="52.67%"
                  src="../../designImage/preview/preview_06_01.png"
                  style={{ position: 'absolute', bottom: '44%', right: 0 }}
                />
              </Box>
            </HorizontalWrapper>
            <Box
              style={{
                width: '43.54vw',
                height: '12.08vw',
                background: '#FFF',
                boxShadow: '0px 14.857px 37.143px 0px rgba(223, 223, 223, 0.4)',
                backdropFilter: 'blur(6.685710906982422px)',
              }}
            >
              <Menu style={{ color: '#FFF', background: '#E57C90' }}>합격자료</Menu>
              <Typography size="1.88vw" bold="700" style={{ lineHeight: '2.4vw' }}>
                지난 이중전공 <br /> 모집정보 한 눈에 보기
              </Typography>
              <Typography size="0.94vw" bold="500" style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}>
                흩어져 있던 지난 모집정원, 경쟁률에 대한 정보를 모아드릴게요.
              </Typography>
              <img
                width="44.5%"
                height="100%"
                src="../../designImage/preview/preview_07_01.png"
                style={{ position: 'absolute', bottom: 0, right: 0 }}
              />
            </Box>
          </VerticalWrapper>
          <Box style={{ width: '20.2vw', height: '29.27vw', background: '#FFF' }}>
            <Menu style={{ color: '#FFF', background: '#E57C90' }}>실시간 모의지원 현황</Menu>
            <Typography size="1.88vw" bold="700" style={{ lineHeight: '2.4vw' }}>
              실시간 경쟁률 <br /> 살펴보기
            </Typography>
            <Typography size="0.94vw" bold="500" style={{ lineHeight: '1.56vw', opacity: '0.8', zIndex: 10 }}>
              이번학기 나의 희망 학과(부)의
              <br /> 실시간 지원자 수와 경쟁률을 제공해드릴게요.
            </Typography>
            <img
              width="100%"
              height="43.67%"
              src="../../designImage/preview/preview_08_01.png"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </Box>
        </HorizontalWrapper>
        <Box
          style={{
            width: '66.76vw',
            height: '12.08vw',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#D85888',
          }}
        >
          <Typography size="1.98vw" bold="700" color="#FFF" style={{ zIndex: '10' }}>
            다른 지원자들은 어떤 정보를 궁금해하고 있을까?
          </Typography>
          <Button11
            onClick={() => {
              navigate('/landing', { state: { fromButton: true } });
            }}
            style={{ color: '#FFF', zIndex: '10' }}
          >
            이중전공 A to Z 바로가기
          </Button11>
          <img
            width="100%"
            height="100%"
            src="../../designImage/preview/preview_09_01.png"
            style={{ position: 'absolute', bottom: 0, right: 0 }}
          />
        </Box>
      </ContentWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  border-top: 2px solid #e6e6e6;
  border-bottom: 2px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  background: #fbfbfb;
`;

const ContentWrapper = styled.div`
  width: 68.75vw;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.56vw;
  margin: 2.76vw 0 7.55vw 0;
`;

const HorizontalWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const VerticalWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.83vw;
  position: relative;
  padding: 1.98vw 0 0 1.88vw;
  border-radius: 1.56vw;
`;

const Menu = styled.div`
  width: fit-content;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.57vw 1.04vw;
  border-radius: 32.29vw;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 500;
`;

export default Cards;
