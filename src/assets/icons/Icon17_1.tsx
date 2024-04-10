import styled from 'styled-components';

export interface Icon17Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon17_1({ size = '1.46vw' }: Icon17Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_17_03.svg" />;
}

const IconWrapper = styled.img<Icon17Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon17_1;
