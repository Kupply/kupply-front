import styled from 'styled-components';

export interface Icon03Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
}

function Icon03({ size = '3.13vw' }: Icon03Props) {
  return <IconWrapper size={size} src="../../designImage/icon/icon_03.svg" />;
}

const IconWrapper = styled.img<Icon03Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon03;
