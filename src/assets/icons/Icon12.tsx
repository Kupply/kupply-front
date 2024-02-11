import styled from 'styled-components';

export interface Icon12Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon12({ size = '1.46vw' }: Icon12Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_12.svg" />;
}

const IconWrapper = styled.img<Icon12Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon12;
