import React from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';

const Wrapper = styled.div`
  width: 29%;
  height: 1152x;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, #fff 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function SideBar() {
  return (
    <Wrapper>
      <Typography size="title1" style={{ marginRight: '185px', marginTop: '42px' }}>
        이중전공 진입생
      </Typography>
      <TextBox style={{ marginRight: '259px', marginTop: '12px', gap: '8px' }}>
        <Typography size="title1" bold="400">
          커뮤니티
        </Typography>
        <img src="../design_image/fi_alert-circle.png" style={{ width: '24px', height: '24px' }} />
      </TextBox>
      <TextBox style={{ marginRight: '22px' }}></TextBox>
    </Wrapper>
  );
}
