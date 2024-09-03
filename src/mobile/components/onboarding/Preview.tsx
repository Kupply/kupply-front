import styled from 'styled-components';

import Typography from '../../../assets/Typography';
import Banner03 from '../../assets/banners/Banner03';
import Banner04 from '../../assets/banners/Banner04';

function Preview() {
  return (
    <MainWrapper>
      <TextBox>
        <Typography
          size="5vw"
          bold="700"
          style={{
            lineHeight: '120%',
            textShadow: '0px 1.52px 6.081px rgba(255, 255, 255, 0.33)',
            margin: '1.67vw 0 0.83vw 0',
          }}
        >
          쿠플라이 핵심 기능 미리보기
        </Typography>
        <Typography size="3.06vw" bold="500" color="rgba(20,20,20,0.6)" style={{ lineHeight: '120%', opacity: '0.8' }}>
          카드를 클릭하여 쿠플라이의 다양한 기능들을 직접 만나보세요.
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

const BannerBox = styled.div`
  width: max-content;
  height: auto;
  padding: 0 0 0 4.44vw;
  display: flex;
  flex-direction: column;
`;

export default Preview;
