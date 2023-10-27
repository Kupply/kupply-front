import React from "react";
import styled from "styled-components";

const AlertImage = styled.img`
  display: flex;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: 5px;
`;

function IDAlert() {
  return <AlertImage src="../../design_image/fi_alert-circle.png" />;
}

export default IDAlert;
