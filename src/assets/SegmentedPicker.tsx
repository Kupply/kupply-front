import React from "react";
import styled, { css } from "styled-components";

export type StateOptions = "default" | "hover" | "active";

export interface SegmentedPickerProps extends React.ComponentPropsWithRef<"div"> {
  state?: StateOptions;
  semester?: string;
}

const baseWrapper = css`
  display: flex;
  width: 174px;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

const defaultWrapper = css`
  align-items: center;
  background: #ffffff;
  border: none;
`;

const activeWrapper = css`
  align-items: center;
  background: #d85888;
  box-shadow: 0px 4px 40px 6px #d8588840;
  border: 1px solid #b9b9b9;
  border-radius: 5px;
`;

const Semester = styled.text<SegmentedPickerProps>`
  color: ${(props) => (props.state === "default" ? "#141414cc" : props.state === "hover" ? "#d85888" : "#ffffff")};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
`;

const stateMapping = {
  default: defaultWrapper,
  hover: defaultWrapper,
  active: activeWrapper,
};

const SegmentedPickerWrapper = styled.div<SegmentedPickerProps>`
  ${baseWrapper}
  ${(props) => stateMapping[props.state || "default"]}
`;

function SegmentedPicker(props: SegmentedPickerProps) {
  const { state = "default", semester, ...rest } = props;

  return (
    <SegmentedPickerWrapper state={state} {...rest}>
      <Semester state={state}>{semester}</Semester>
    </SegmentedPickerWrapper>
  );
}

export default SegmentedPicker;
