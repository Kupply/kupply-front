// 나중에 handleButtonClick 수정 필요

import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';
import Button11 from '../buttons/Button11';
import Button02 from '../buttons/Button02';

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
    '다른 지원자들은 어떤 정보를 궁금해할까?',
    //    '고려대학교 이메일 등록 후, 이중전공에 대한 모든 정보 확인하기',
    '고파스 계정 등록 후, 이중전공에 대한 모든 정보 확인하기',
    '경쟁자들과 비교해서 나의 합격 가능성을 확인해볼까요?',
  ];
  const contents = [
    '',
    //    '간단한 회원가입을 통해 쿠플라이의 다양한 서비스를 이용해보세요.',
    '고파스 통합 로그인을 통해 쿠플라이의 다양한 서비스를 이용해보세요.',
    '쿠플라이 모의지원 완료 후 내 학점 백분위 파악하기',
  ];
  const buttonTitles = ['이중전공 A to Z 바로가기', '고파스 아이디로 로그인하기', '모의지원 바로가기'];
  const buttonLinks = ['/landing', '/login', '/myboard'];

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
      <Typography size="3.06vw" color="#FFF" style={{ lineHeight: '120%', marginTop: type === 1 ? '0' : '1.11vw' }}>
        {contents[type - 1]}
      </Typography>

      {type === 2 ? (
        <Button02
          width="43.44vw"
          height="6.38vw"
          fontSize="2.5vw"
          fontBold="500"
          imgSize="3.8vw"
          onClick={handleButtonClick}
          style={{
            boxShadow:
              '9.72vw 11.94vw 4.44vw 0 rgba(216, 88, 136, 0.00), 6.11vw 7.78vw 3.89vw 0 rgba(216, 88, 136, 0.03), 3.33vw 4.44vw 3.33vw 0 rgba(216, 88, 136, 0.10), 1.67vw 1.94vw 2.5vw 0 rgba(216, 88, 136, 0.17), 0.28vw 0.56vw 1.39vw 0 rgba(216, 88, 136, 0.20)',
            marginTop: '3.06vw',
          }}
        />
      ) : (
        <Button11
          state={buttonState}
          onClick={handleButtonClick}
          style={{
            marginTop: type === 3 ? '1.11vw' : '3.06vw',
          }}
        >
          {buttonTitles[type - 1]}
        </Button11>
      )}
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
  background-image: url(${(props) => props.images[props.type - 1]});
  background-size: ${(props) => (props.type === 1 ? '120% 150%' : 'cover')};
  background-position: ${(props) => props.type === 1 && 'center 31%'};
`;

export default Banner04;
