import styled from 'styled-components';

export interface Icon10Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon10({ size = '1.25vw' }: Icon10Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_10.svg" />;
}

const IconWrapper = styled.img<Icon10Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon10;
