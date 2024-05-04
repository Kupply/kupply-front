import styled from 'styled-components';

export interface Icon19Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon19({ size = '1.25vw' }: Icon19Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_19.svg" />;
}

const IconWrapper = styled.img<Icon19Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon19;
