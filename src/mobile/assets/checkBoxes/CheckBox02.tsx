import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface CheckBox02Props extends React.ComponentPropsWithoutRef<'div'> {
  state?: 'default' | 'active';
  onImageClick?: () => void;
}
// parent component에서 state를 바꾸는 기능 추가시, props로 onClick 대신 onImageClick 사용 -> image를 눌렀을 시만 동작

function CheckBox02(props: CheckBox02Props) {
  const { state = 'default', children = '로그인 상태 유지', onImageClick, ...rest } = props;

  return (
    <MainWrapper {...rest}>
      <ImageWrapper
        src={
          state === 'default'
            ? '../../../designImage/mobile/checkBox/CheckBox2_1.svg'
            : '../../../designImage/mobile/checkBox/CheckBox1_1.svg'
        }
        onClick={onImageClick}
      />
      <Typography
        size="3.33vw"
        bold={state === 'default' ? '500' : '600'}
        color={state === 'default' ? 'rgba(20,20,20,0.6)' : '#D85888'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<CheckBox02Props>`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  gap: 2.5vw;
`;

const ImageWrapper = styled.img`
  width: 4.17vw;
  height: 4.17vw;
  cursor: pointer;
`;

export default CheckBox02;
