import styled from 'styled-components';

import Typography from '../../../assets/Typography';
import Banner03 from '../../assets/banners/Banner03';
import Banner04 from '../../assets/banners/Banner04';

function Preview() {
  return (
    <MainWrapper>
      <TextBox>
        <Typography size="3.33vw" bold="700" color="#D85888" style={{ lineHeight: '120%' }}>
          쿠플라이 미리보기
        </Typography>
        <Typography
          size="5vw"
          bold="700"
          style={{
            lineHeight: '120%',
            textShadow: '0px 1.52px 6.081px rgba(255, 255, 255, 0.33)',
            margin: '1.67vw 0 0.83vw 0',
          }}
        >
          쿠플라이의 핵심 기능을 소개합니다
        </Typography>
        <Typography size="3.06vw" bold="500" color="rgba(20,20,20,0.6)" style={{ lineHeight: '120%', opacity: '0.8' }}>
          모두의 성공적인 이중전공 진입 메이트 쿠플라이와 함께해요!
        </Typography>
      </TextBox>
      <BannerBox>
        <Banner03 size="large" />
        <Banner03 style={{ margin: '4.44vw 0 15.56vw 0' }} />
        <Banner04 />
      </BannerBox>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  box-sizing: border-box;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 16.11vw;
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  overflow-x: hidden;
`;

const TextBox = styled.div`
  width: 100vw;
  height: auto;
  padding: 9.44vw 0 5.56vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BannerScrollBox = styled.div`
  width: 100vw;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const BannerBox = styled.div`
  width: max-content;
  height: auto;
  padding: 0 0 0 4.44vw;
  display: flex;
  flex-direction: column;
`;

export default Preview;
