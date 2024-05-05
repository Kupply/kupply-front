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
      <AlertWrapper style={{ marginTop: '30vw' }}>
          {currentModal === 3? 
          <AlertIconExclamation width="22.2vw" height="22.2vw" /> : <AlertIconCheck width="22.2vw" height="22.2vw"/>}
          {children}
      </AlertWrapper>
  )
}


const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 82.5vw;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;
