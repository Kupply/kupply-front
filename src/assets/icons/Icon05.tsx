import styled from 'styled-components';

export interface Icon05Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'show' | 'hide';
}

function Icon05({ size = '1.25vw', type = 'show' }: Icon05Props) {
  return type === 'show' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_05_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_05_02.svg" />
  );
}

const IconWrapper = styled.img<Icon05Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon05;
