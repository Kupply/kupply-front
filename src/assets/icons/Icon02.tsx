import styled from 'styled-components';

export interface Icon02Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon02({ size = '3.13vw' }: Icon02Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_02.svg" />;
}

const IconWrapper = styled.img<Icon02Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon02;
