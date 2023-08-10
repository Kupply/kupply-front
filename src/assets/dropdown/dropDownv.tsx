import { useEffect, useState, MutableRefObject } from "react";
import styled, { css } from "styled-components";
import useDetectClose from "./useDetectClose";

// optionList 타입 수정 필요
function Container({ optionList }: any) {
  const [dropDownList, setDropDownList] = useState([]); // 드롭다운 메뉴의 옵션 리스트
  const [selectedValue, setSeletedValue] = useState("");
  const [isOpen, ref, toggleIsOpen] = useDetectClose(false);

  useEffect(() => {
    setDropDownList(optionList);
  }, [optionList]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeletedValue(e.target.value);
  };

  return (
    <div ref={ref.current}>
      <input
        onClick={toggleIsOpen}
        type="button"
        value={selectedValue || "Dropdown Menu"}
      />

      {isOpen && ( // isOpen 값이 True 인 경우에만 렌더링
        <select onChange={handleOptionChange} value={selectedValue}>
          {optionList.map(function (data: any) {
            return (
              <option key={data.key} value={data.value}>
                {data.value}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}

export default Container;

/* 이하는 스타일 적용 */

const optionWrapper = styled.option`
  display: flex;
  width: 570.04px;
  height: 34px;
  padding: 8px 18px;
  align-items: flex-end;
  gap: 422px;
  border-radius: 5px;
`;

// 1지망 이중전공 선택 (내부 텍스트)
const inputWrapper = styled.input`
  width: 628px;
  height: 68px;
  border-radius: 10px;
  border: 1px solid #d85888;
  background: #fff;
`;

const optionStyleMapping = styled.div`
  // default
  display: flex;
  width: 598px;
  height: 34px;
  padding: 8px 18px;
  align-items: flex-end;
  border-radius: 5px;

  &:hover {
    border-radius: 5px;
    background: rgba(217, 217, 217, 0.2);
  }

  &:active {
    border-radius: 5px;
    background: rgba(216, 88, 136, 0.05);
  }
`;

// 기본 폰트 스타일은 타이포그래피 에셋 참고
const optionFontMapping = {
  dept: css`
    color: var(--main-black, #141414);

    &:active {
      color: var(--primary, #d85888);
      font-weight: 700;
    }
  `,
  college: css`
    color: rgba(20, 20, 20, 0.8);
    opacity: 0.8;

    &:active {
      color: rgba(216, 88, 136, 0.8);
    }
  `,
};
