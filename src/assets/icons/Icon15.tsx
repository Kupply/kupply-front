import styled from 'styled-components';

export interface Icon15Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'outline' | 'fill';
}

function Icon15({ size = '1.04vw', type = 'outline' }: Icon15Props) {
  return type === 'outline' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_15_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_15_02.svg" />
  );
}

const IconWrapper = styled.img<Icon15Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon15;
