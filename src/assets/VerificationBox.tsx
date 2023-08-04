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
