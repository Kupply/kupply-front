import React from "react";
import styled from "styled-components";

export interface MockApplicationProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<MockApplicationProps>`
  display: flex;
  align-items: center;
  width: 282px;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: linear-gradient(93deg, #D85888 -24.37%, #F5BDBD 120.85%, rgba(253, 242, 242, 0.30) 161.07%);
`;  

const Text = styled.text`
  color: var(--White, #FFF);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
`;

const Icon: React.FC = () => (      // 아이콘 위치 수정... 필요
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <g clip-path="url(#clip0_3412_8527)">
      <path d="M18.3327 1.6665L9.16602 10.8332" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.3327 1.6665L12.4993 18.3332L9.16602 10.8332L1.66602 7.49984L18.3327 1.6665Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_3412_8527">
      <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

function MockApplicationButton(props: MockApplicationProps) {
  const { 
    children = <><Icon/><Text style={{marginLeft: "8px"}}>쿠플라이 모의지원 하러가기</Text></>, 
    active = false, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
};

export default MockApplicationButton;