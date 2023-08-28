import React from "react";
import styled from "styled-components";

export interface VerificationBoxProps
  extends React.ComponentPropsWithoutRef<"div"> {
  active?: boolean;
}

const Container = styled.div`
  width: 75px;
  height: 75px;
`;

const BoxWrapper = styled.div<VerificationBoxProps>`
  width: 74.762px;
  height: 75px;
  border-radius: 5px;
  border: ${(props) =>
    props.active ? "1px solid #d85888" : "1px solid #B9B9B9"};
  background: var(--white, #fff);
  box-shadow: ${(props) =>
    props.active ? "0px 4px 12px 0px rgba(216, 88, 136, 0.2)" : "null"};
`;

export default function VerificationBox(props: VerificationBoxProps) {
  const { children, active = false, ...rest } = props; // 비활성화 상태로 초기화
  return (
    <Container {...rest}>
      <BoxWrapper active={active}></BoxWrapper>
    </Container>
  );
}

/*
function VerificationBox(props: VerificationBoxProps) {
  const { children, active = "false", ...rest } = props;
  return (
    <Container {...rest}>
      {active === true ? (
        <img
          src="../../design_image/verification_box/active.png"
          width="75px"
          height="75px"
        />
      ) : (
        <img
          src="../../design_image/verification_box/unactive.png"
          width="75px"
          height="75px"
        />
      )}
    </Container>
  );
}

export default VerificationBox;
*/
