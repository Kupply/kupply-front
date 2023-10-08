import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MessageWrapper = styled.div`
  display: none;
  flex-direction: column;
  margin-bottom: 4px;

  ${Wrapper}:hover & {
    display: flex;
  }
`;

const MessageBox = styled.div`
  display: flex;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: var(--PRIMARY, #d85888);
  border-radius: 5px;
`;

const NotchImage = styled.img`
  width: 12px;
  height: 8px;
  flex-shrink: 0;
`;

const AlertImage = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 8px;
`;

function AlertMessage({ message = '쿠플라이 아이디는 고려대학교 이메일 주소입니다.' }) {
  return (
    <Wrapper>
      <MessageWrapper>
        <MessageBox>
          <Typography size="smallText" bold="500" color="#FFF">
            {message}
          </Typography>
        </MessageBox>
        <NotchImage src="../../design_image/notch.svg" style={{ marginLeft: '10px' }} />
      </MessageWrapper>
      <AlertImage src="../../design_image/fi_alert-circle1.svg" style={{ marginLeft: '8px' }} />
    </Wrapper>
  );
}

export default AlertMessage;
