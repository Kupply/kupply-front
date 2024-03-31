// 나중에 handleButtonClick 수정 필요

import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import Button11 from '../buttons/Button11';

export interface Banner04Props extends React.ComponentPropsWithoutRef<'div'> {
  type?: number;
}

function Banner04(props: Banner04Props) {
  const { type = 1 } = props;
  const images = [
    '../../../designImage/mobile/banner/Banner4_1.png',
    '../../../designImage/mobile/banner/Banner4_2.png',
    '../../../designImage/mobile/banner/Banner4_3.png',
  ];
  const titles = [
    '다른 지원자들은 어떤 정보를 궁금해하고 있을까?',
    '간편 이메일 등록 후 이중전공에 대한 모든 정보 확인하기!',
    '경쟁자들과 비교하여 나의 합격 가능성 확인해볼까?',
  ];
  const contents = [
    '',
    '몇가지 회원가입 단계를 거친 후, 쿠플라이만의 다양한 서비스를 이용해보세요.',
    '쿠플라이 모의지원하고 나의 학점 위치 파악하기',
  ];
  const buttonTitles = ['이중전공 A to Z 바로가기', '회원가입 바로가기', '모의지원 바로가기'];
  const buttonLinks = ['/landing', '/signup0', '/myboard'];

  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState<'default' | 'pressed' | undefined>('default');

  function handleButtonClick() {
    setButtonState(() => 'pressed');
    navigate(buttonLinks[type - 1]);
  }

  return (
    <MainWrapper type={type} images={images}>
      <Typography
        size="3.89vw"
        bold="700"
        color="#FFF"
        style={{
          lineHeight: '120%',
          textShadow:
            type === 1
              ? '58px 41.5px 20px rgba(202, 63, 130, 0.00), 37px 26.5px 18.5px rgba(202, 63, 130, 0.04), 21px 15px 15.5px rgba(202, 63, 130, 0.13), 2.5px 1.5px 6.5px rgba(202, 63, 130, 0.25);'
              : type === 2
              ? '35.784px 25.604px 12.339px rgba(202, 63, 130, 0.00), 22.828px 16.35px 11.414px rgba(202, 63, 130, 0.04), 12.956px 9.254px 9.563px rgba(202, 63, 130, 0.13), 1.542px 0.925px 4.01px rgba(202, 63, 130, 0.25);'
              : '28.824px 20.624px 9.939px rgba(202, 63, 130, 0.00), 18.388px 13.17px 9.194px rgba(202, 63, 130, 0.04), 10.436px 7.455px 7.703px rgba(202, 63, 130, 0.13), 1.242px 0.745px 3.23px rgba(202, 63, 130, 0.25);',
          marginTop: type === 1 ? '4.72vw' : type === 2 ? '5.56vw' : '4.17vw',
        }}
      >
        {titles[type - 1]}
      </Typography>
      <Typography size="3.06vw" color="#FFF" style={{ lineHeight: '120%', marginTop: type === 1 ? '0' : '0.83vw' }}>
        {contents[type - 1]}
      </Typography>
      <Button11 state={buttonState} onClick={handleButtonClick} style={{ marginTop: type === 3 ? '1.11vw' : '3.06vw' }}>
        {buttonTitles[type - 1]}
      </Button11>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ type: number; images: string[] }>`
  width: ${(props) => (props.type === 1 ? '91.11vw' : props.type === 2 ? '100vw' : '86.94vw')};
  height: ${(props) => (props.type === 2 ? '30vw' : '25vw')};
  padding-left: ${(props) => props.type === 3 && '4.17vw'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => (props.type === 3 ? 'flex-start' : 'center')};
  border-radius: ${(props) => (props.type === 2 ? '0' : '3.33vw')};
  background-color: #d85888;
  background-image: url(${(props) => props.images[props.type - 1]});
  background-size: cover;
`;

export default Banner04;
