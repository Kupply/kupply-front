import { css, styled } from "styled-components";

export type HashtagButtonStatus = "clicked" | "default" | "inactive";

export interface HashtagButtonProps extends React.ComponentPropsWithRef<"button"> {
  status: HashtagButtonStatus;
}

const HashtagButton = (props: HashtagButtonProps) => {
  return (
    <Container {...props}>
      <InnerText>#</InnerText>
      <InnerText>{props.children}</InnerText>
    </Container>
  );
};

const Container = styled.button<{ status: HashtagButtonStatus }>`
  padding: 15px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 999px;
  transition: 0.3s ease-in-out;
  ${(props) => {
    switch (props.status) {
      case "clicked":
        return css`
          background-color: #e57c90;
          box-shadow: 0px 0px 20px 0px rgba(229, 124, 144, 0.5);
          border: none;
          color: white;
        `;
      case "default":
        return css`
          border: 1px solid #d85888;
          background: rgba(255, 255, 255, 0.3);
          color: #d85888;
        `;
      case "inactive":
        return css`
          border-radius: 999px;
          border: 1px solid #d85888;
          opacity: 0.5;
          background: rgba(255, 255, 255, 0.3);
        `;
    }
  }}
`;

const InnerText = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
`;

export default HashtagButton;
