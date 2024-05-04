import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface CheckBox01Props extends React.ComponentPropsWithoutRef<'div'> {
  state?: 'default' | 'active';
  onImageClick?: () => void;
  textSize?: number;
  textBold?: number;
}
// parent component에서 state를 바꾸는 기능 추가시, props로 onClick 대신 onImageClick 사용 -> image를 눌렀을 시만 동작

function CheckBox01(props: CheckBox01Props) {
  const { state = 'default', children = '약관 전체동의 하기', onImageClick, textBold, textSize, ...rest } = props;

  return (
    <MainWrapper {...rest}>
      <ImageWrapper
        src={
          state === 'default'
            ? '../../../designImage/mobile/checkBox/CheckBox1_2.svg'
            : '../../../designImage/mobile/checkBox/CheckBox1_1.svg'
        }
        onClick={onImageClick}
      />
      <Typography size={`${textSize}vw`} bold={`${textBold}`} style={{ lineHeight: '128.57%' }}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<CheckBox01Props>`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  gap: 1.94vw;
`;

const ImageWrapper = styled.img`
  width: 4.17vw;
  height: 4.17vw;
  cursor: pointer;
`;

export default CheckBox01;
