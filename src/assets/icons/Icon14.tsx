import styled from 'styled-components';

export interface Icon14Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'outline' | 'fill';
}

function Icon14({ size = '1.04vw', type = 'outline' }: Icon14Props) {
  return type === 'outline' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_14_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_14_02.svg" />
  );
}

const IconWrapper = styled.img<Icon14Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon14;
