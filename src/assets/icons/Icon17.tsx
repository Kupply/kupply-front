import styled from 'styled-components';

export interface Icon17Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'medium' | 'small';
}

function Icon17({ size = '1.56vw', type = 'medium' }: Icon17Props) {
  return type === 'medium' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_17_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_17_02.svg" />
  );
}

const IconWrapper = styled.img<Icon17Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon17;
