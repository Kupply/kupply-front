import styled, { css } from 'styled-components';
import Typography, { TypographyProps } from '../../../assets/OldTypography';

interface SelectBoxProps {
  value: string;
  setSelectedValue: (val: string) => void;
  closeDropDown: () => void;
  subValue: string;
  selectedValue: string;
}

function SelectBox({ value, subValue, selectedValue, setSelectedValue, closeDropDown }: SelectBoxProps) {
  return (
    <SelectBoxWrapper
      isSelectedValue={value === selectedValue ? true : false}
      key={value}
      onClick={() => {
        setSelectedValue(value);
        closeDropDown();
      }}
    >
      {value}
      <SubValueTypo size={'normalText'} color={value === value ? 'var(--primary, #d85888)' : '#141414'}>
        {subValue}
      </SubValueTypo>
    </SelectBoxWrapper>
  );
}

const SubValueTypo = styled(Typography)<TypographyProps>`
  color: rgba(20, 20, 20, 0.8);
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 400;
  opacity: 0.8;
`;

const SelectBoxWrapper = styled.button<{
  isSelectedValue: boolean;
}>`
  display: flex;
  justify-content: space-between;
  //max-width: 310px;
  width: 95%;
  height: 7.78vw;

  /* height: 25%; */
  align-items: center;
  border-radius: 5px;

  padding: 2.22vw;
  margin-bottom: 4px;

  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 500;

  ${(props) =>
    props.isSelectedValue &&
    css`
      background: rgba(216, 88, 136, 0.05);
      color: var(--primary, #d85888);
      font-weight: 700;
    `}
`;

export default SelectBox;
