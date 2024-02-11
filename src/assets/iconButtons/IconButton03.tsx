import styled from 'styled-components';

export interface IconButton03Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  state?: 'default' | 'hover';
}

function IconButton03(props: IconButton03Props) {
  const { size = '2.97vw', state = 'default', ...rest } = props;
  return (
    <IconWrapper
      size={size}
      state={state}
      src={
        state === 'default'
          ? '../../designImage/iconButton/iconbutton_03_01.png'
          : '../../designImage/iconButton/iconbutton_03_02.png'
      }
      {...rest}
    />
  );
}

const IconWrapper = styled.img<IconButton03Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
  cursor: pointer;
`;

export default IconButton03;
