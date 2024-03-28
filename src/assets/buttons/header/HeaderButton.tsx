import React from 'react';
import styled, { css } from 'styled-components';

const MailButtonWrapper = styled.button<{ activated: boolean }>`
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;
  padding: 8px 1.35vw;
  white-space: nowrap;
  border-radius: 6px;

  ${(props) =>
    props.activated
      ? // When "activated" is TRUE
        css`
          background: none;
          color: #141414;
          text-align: center;
          font-family: Pretendard;
          font-size: 16px; //20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          text-transform: uppercase;
        `
      : // When "activated" is False
        css`
          color: #141414;
          text-align: center;
          font-family: Pretendard;
          font-size: 16px; //20px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          text-transform: uppercase;

          &:hover:not(:disabled) {
            background: rgba(216, 88, 136, 0.1);

            color: #d85888;
            text-align: center;
            font-family: Pretendard;
            font-size: 16px; //20px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            text-transform: uppercase;
          }

          &:disabled {
            cursor: not-allowed;
            color: #141414;
            text-align: center;
            font-family: Pretendard;
            font-size: 16px; //20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: uppercase;
            opacity: 0.6;
          }

          &:active:not(:disabled) {
            background: none;
            color: #141414;
            text-align: center;
            font-family: Pretendard;
            font-size: 16px; //20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-transform: uppercase;
          }
        `}
`;

export interface HeaderButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  activated: boolean;
}

export default function HeaderButton(props: HeaderButtonProps) {
  return <MailButtonWrapper {...props}>{props.children}</MailButtonWrapper>;
}
