import styled from 'styled-components';

export interface Icon07Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon07({ size = '1.46vw' }: Icon07Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_07.svg" />;
}

const IconWrapper = styled.img<Icon07Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon07;
