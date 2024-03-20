import styled from "styled-components"
import AlertIconExclamation from "../../../../assets/icons/AlertIconExclamation";
import React from "react";
import AlertIconCheck from "../../../../assets/icons/AlertIconCheck";

interface SubmittedWrapperProps{
  currentModal: number;
  children: React.ReactNode;
}
export default function SubmittedWrapper(props: SubmittedWrapperProps){
  const {children, currentModal} = props;

  return (
      <AlertWrapper style={{ marginTop: '9.375vw' }}>
          {currentModal === 3? <AlertIconExclamation width="5.885vw" height="5.885vw" /> : <AlertIconCheck width="5.885vw" height="5.885vw"/>}
          {children}
      </AlertWrapper>
  )
}


const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 32.708vw;
  height: 41.458vw;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;
