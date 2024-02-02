import styled from 'styled-components';

export interface Icon06Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon06({ size = '1.25vw' }: Icon06Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_06.svg" />;
}

const IconWrapper = styled.img<Icon06Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon06;
