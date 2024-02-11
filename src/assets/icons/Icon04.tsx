import styled from 'styled-components';

export interface Icon04Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon04({ size = '1.25vw' }: Icon04Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_04.svg" />;
}

const IconWrapper = styled.img<Icon04Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon04;
