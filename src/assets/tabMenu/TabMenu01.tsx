import React from 'react';
import styled, { css } from 'styled-components';

export type StateOptions = 'default' | 'hover' | 'active' | 'disabled';

export interface SegmentedPickerProps extends React.ComponentPropsWithRef<'div'> {
  state?: StateOptions;
  semester?: string;
}

const baseWrapper = css`
  display: flex;
  width: 9.06vw;
  height: 2.5vw;
  justify-content: center;
  align-items: center;
`;

const defaultWrapper = css`
  align-items: center;
  background: none;
  border: none;
`;

const activeWrapper = css`
  align-items: center;
  background: #d85888;
  box-shadow: 0px 4px 40px 6px #d8588840;
  border: 1px solid #d85888;
  border-radius: 0.26vw;
`;

const disabledWrapper = css`
  align-items: center;
  background: none;
  border: none;
  pointer-events: none;
`;

const Semester = styled.text<SegmentedPickerProps>`
  color: ${(props) =>
    props.state === 'default'
      ? 'rgba(20, 20, 20, 0.80)'
      : props.state === 'disabled'
      ? 'rgba(20, 20, 20, 0.40)'
      : props.state === 'hover'
      ? '#d85888'
      : '#ffffff'};
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  text-align: center;
`;

const stateMapping = {
  default: defaultWrapper,
  hover: defaultWrapper,
  active: activeWrapper,
  disabled: disabledWrapper,
};

const SegmentedPickerWrapper = styled.button<SegmentedPickerProps>`
  ${baseWrapper}
  ${(props) => stateMapping[props.state || 'default']}
`;

function SegmentedPicker(props: SegmentedPickerProps) {
  const { state = 'default', semester, ...rest } = props;

  return (
    <SegmentedPickerWrapper state={state} {...rest}>
      <Semester state={state}>{semester}</Semester>
    </SegmentedPickerWrapper>
  );
}

export default SegmentedPicker;
