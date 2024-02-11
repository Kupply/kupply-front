import styled from 'styled-components';

export interface Icon18Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: string;
  type?: 'medium' | 'small';
}

function Icon18({ size = '1.56vw', type = 'medium' }: Icon18Props) {
  return type === 'medium' ? (
    <IconWrapper size={size} src="../../designImage/icon/icon_18_01.svg" />
  ) : (
    <IconWrapper size={size} src="../../designImage/icon/icon_18_02.svg" />
  );
}

const IconWrapper = styled.img<Icon18Props>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  flex-shrink: 0;
`;

export default Icon18;
