import styled from 'styled-components';

export interface Icon08Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon08({ size = '1.46vw' }: Icon08Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_08.svg" />;
}

const IconWrapper = styled.img<Icon08Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon08;
