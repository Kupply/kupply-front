import React from 'react';
import styled from 'styled-components';

export interface MockApplicationProps extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<MockApplicationProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 282px;
  padding: 16px 32px;
  gap: 8px;
  border-radius: 10px;
  // default
  background: linear-gradient(93deg, #d85888 -24.37%, #f5bdbd 120.85%, rgba(253, 242, 242, 0.3) 161.07%);
  // hover
  &:hover:not(:disabled) {
    box-shadow: 0px 20px 50px 0px rgba(232, 88, 136, 0.41);
  }
  // active
  &:active:not(:disabled) {
    background: linear-gradient(273deg, #d85888 -13.05%, #f5bdbd 93.4%, rgba(253, 242, 242, 0.3) 122.88%);
  }
  // unactive
  &:disabled {
    opacity: 0.5;
    background: linear-gradient(93deg, #d85888 -24.37%, #f5bdbd 120.85%, rgba(253, 242, 242, 0.3) 161.07%);
  }
`;

const Text = styled.text`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

// 아이콘 위치 수정 완료
const Icon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_3412_8527)">
      <path
        d="M18.3327 1.6665L9.16602 10.8332"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.3327 1.6665L12.4993 18.3332L9.16602 10.8332L1.66602 7.49984L18.3327 1.6665Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3412_8527">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

function MockApplicationButton(props: MockApplicationProps) {
  const {
    children = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Icon />
        <Text style={{ marginLeft: '8px' }}>쿠플라이 모의지원 하러가기</Text>
      </div>
    ),
    active = true,
    ...rest
  } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}

export default MockApplicationButton;
