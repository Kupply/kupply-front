import styled from 'styled-components';

export interface IconButton01Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  state?: 'default' | 'pressed';
}

function IconButton01(props: IconButton01Props) {
  const { size = '1.04vw', state = 'default', ...rest } = props;
  return (
    <IconWrapper
      size={size}
      state={state}
      src={
        state === 'default'
          ? '../../designImage/iconButton/iconbutton_01_01.svg'
          : '../../designImage/iconButton/iconbutton_01_02.svg'
      }
      {...rest}
    />
  );
}

const IconWrapper = styled.img<IconButton01Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
  cursor: pointer;
`;

export default IconButton01;
