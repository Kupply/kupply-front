import styled from 'styled-components';

export interface Icon16Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'outline' | 'fill';
}

function Icon16({ size = '1.04vw', type = 'outline' }: Icon16Props) {
  return type === 'outline' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_16_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_16_02.svg" />
  );
}

const IconWrapper = styled.img<Icon16Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon16;
