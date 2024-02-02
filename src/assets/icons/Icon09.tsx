import styled from 'styled-components';

export interface Icon09Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon09({ size = '1.25vw' }: Icon09Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_09.svg" />;
}

const IconWrapper = styled.img<Icon09Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon09;
