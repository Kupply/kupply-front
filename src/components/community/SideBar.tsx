import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/OldTypography';

const Wrapper = styled.div`
  width: 423px;
  height: 1152px;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, #fff 100%);
  display: flex;
  flex-direction: column;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function SideBar() {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <Wrapper>
      <Typography size="title1" style={{ marginTop: '42px' }}>
        이중전공 진입생
      </Typography>
      <TextBox style={{ marginTop: '12px', gap: '8px' }}>
        <Typography size="title1" bold="400">
          커뮤니티
        </Typography>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          onMouseEnter={onHover}
          onMouseLeave={onHover}
          style={{ position: 'absolute', marginLeft: '162px' }}
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#141414"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0117 8L12.0017 8"
            stroke="#141414"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.0117 16L12.0117 12"
            stroke="#141414"
            stroke-opacity="0.8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {hover && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 120,
            }}
          >
            <HoverInfo>
              커뮤니티 글 작성 권한은 이중전공 진입생에게 부여됩니다.
              <br />
              도전생은 커뮤니티 열람만 가능합니다.
            </HoverInfo>
            <SvgNotch>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                <g filter="url(#filter0_b_3298_4378)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.060303 0L0 0.079604L6 8L12 0.079604L11.9397 0H0.060303Z"
                    fill="#141414"
                    fill-opacity="0.6"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_b_3298_4378"
                    x="-54.3656"
                    y="-54.3656"
                    width="120.731"
                    height="116.731"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3298_4378" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3298_4378" result="shape" />
                  </filter>
                </defs>
              </svg>
            </SvgNotch>
          </div>
        )}
      </TextBox>
      <TextBox style={{ marginRight: '22px' }}></TextBox>
    </Wrapper>
  );
}

const HoverInfo = styled.div`
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  background: #434343;
  display: flex;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;

  width: 331px;
  height: 52px;
  margin-bottom: -7px;
`;

const SvgNotch = styled.div`
  width: 12px;
  height: 8px;
  flex-shrink: 0;
  fill: rgba(20, 20, 20, 0.6);
`;
