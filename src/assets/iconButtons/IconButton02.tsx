import styled from 'styled-components';

export interface IconButton02Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  gap?: string;
  state?: 'default' | 'rightPressed' | 'leftPressed';
}

function IconButton02(props: IconButton02Props) {
  const { size = '2.97vw', gap = '0vw', state = 'default', ...rest } = props;
  return (
    <MainWrapper gap={gap} {...rest}>
      <IconWrapper
        size={size}
        state={state}
        src={
          state === 'leftPressed'
            ? '../../designImage/iconButton/iconbutton_02_02.png'
            : '../../designImage/iconButton/iconbutton_02_01.png'
        }
      />
      <IconWrapper
        size={size}
        state={state}
        src={
          state === 'rightPressed'
            ? '../../designImage/iconButton/iconbutton_02_04.png'
            : '../../designImage/iconButton/iconbutton_02_03.png'
        }
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div<IconButton02Props>`
  width: auto;
  height: auto;
  display: flex;
  gap: ${(props) => props.gap};
`;

const IconWrapper = styled.img<IconButton02Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
  cursor: pointer;
`;

export default IconButton02;
