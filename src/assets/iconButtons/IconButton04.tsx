import styled from 'styled-components';

export interface IconButton04Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  state?: 'default';
}

function IconButton04(props: IconButton04Props) {
  const { size = '0.73vw', state = 'default', ...rest } = props;
  return (
    <IconWrapper
      size={size}
      state={state}
      src={'../../designImage/iconButton/iconbutton_04.svg'}
      {...rest}
    />
  );
}

const IconWrapper = styled.img<IconButton04Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
  cursor: pointer;
`;

export default IconButton04;
