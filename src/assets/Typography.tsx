import styled from "styled-components";

type SizeOptions =
  | "heading1"
  | "heading2"
  | "title1"
  | "title2"
  | "largeText"
  | "bodyText"
  | "mediumText"
  | "normalText"
  | "smallText"
  | "details";

const sizeMapping: Record<SizeOptions, string[]> = {
  heading1: ["48px", "700"],
  heading2: ["40px", "700"],
  title1: ["38px", "700"],
  title2: ["36px", "700"],
  largeText: ["24px", "700"],
  bodyText: ["20px", "700"],
  mediumText: ["18px", "500"],
  normalText: ["16px", "500"],
  smallText: ["14px", "400"],
  details: ["12px", "400"],
};

export interface TypographyProps extends React.ComponentPropsWithoutRef<"div"> {
  size?: SizeOptions;
}

const Container = styled.div<TypographyProps>`
  color: #141414;
  font-family: Pretendard;
  font-style: normal;
  line-height: 50px;
  font-size: ${(props) => sizeMapping[props.size || "bodyText"][0]};
  font-weight: ${(props) => sizeMapping[props.size || "bodyText"][1]};
`;

function Typography(props: TypographyProps) {
  const { children, size, ...rest } = props;
  return (
    <Container size={size} {...rest}>
      {children}
    </Container>
  );
}

export default Typography;
