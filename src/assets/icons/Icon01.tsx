import styled from 'styled-components';

export interface Icon01Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon01({ size = '1.22vw' }: Icon01Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_01.svg" />;
}

const IconWrapper = styled.img<Icon01Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon01;
