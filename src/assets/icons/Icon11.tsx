import styled from 'styled-components';

export interface Icon11Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon11({ size = '1.25vw' }: Icon11Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_11.svg" />;
}

const IconWrapper = styled.img<Icon11Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon11;
