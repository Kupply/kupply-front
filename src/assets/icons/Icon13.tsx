import styled from 'styled-components';

export interface Icon13Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'outline' | 'fill';
}

function Icon13({ size = '1.04vw', type = 'outline' }: Icon13Props) {
  return type === 'outline' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_13_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_13_02.svg" />
  );
}

const IconWrapper = styled.img<Icon13Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon13;
