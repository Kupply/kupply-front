import styled from 'styled-components';

export interface TypographyProps extends React.ComponentPropsWithoutRef<'span'> {
  size?: string;
  bold?: string;
  color?: string;
}

function Typography(props: TypographyProps) {
  const { children, size = '1.04vw', bold = '400', color = '#141414', ...rest } = props;
  return (
    <TextWrapper size={size} bold={bold} color={color} {...rest}>
      {children}
    </TextWrapper>
  );
}

const TextWrapper = styled.span<TypographyProps>`
  font-family: Pretendard;
  font-style: normal;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.bold};
  line-height: 100%;
  color: ${(props) => props.color};
`;

export default Typography;
