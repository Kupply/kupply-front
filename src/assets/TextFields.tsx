import React, { useState } from "react";
import styled from "styled-components";

type SizeOptions = "large" | "medium";

const sizeMapping: Record<SizeOptions, string[]> = {
  large: ["22px", "518px"],
  medium: ["14px", "396px"],
};

type StatusOptions = "default" | "click";

const statusMapping: Record<StatusOptions, string[]> = {
  default: ["none"],
  click: ["rgba(216, 88, 136, 0,10"],
};

export interface TextFieldsProps extends React.ComponentPropsWithoutRef<"div"> {
  placeholder?: string;
  size?: SizeOptions;
  status?: StatusOptions;
}

const UserInput = styled.input<TextFieldsProps>`
  display: inline-flex;
  padding: ${(props) => sizeMapping[props.size || "medium"][0]} 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  border: 2px solid #d85888;
  width: ${(props) => sizeMapping[props.size || "medium"][1]};
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background: ${(props) => statusMapping[props.status || "default"][0]};
  caret-color: #d85888;
`;

function TextFields(props: TextFieldsProps) {
  const { placeholder, size, status, ...rest } = props;
  return <UserInput placeholder={placeholder} size={size} {...rest} />;
}

export default TextFields;
