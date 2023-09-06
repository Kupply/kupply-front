import React, { useState } from "react";
import styled from "styled-components";
import SegmentedPicker from "../assets/SegmentedPicker";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SegmentedWrapper = styled.div`
  display: flex;
  gap: 18px;
  padding: 48px 128px 20px 128px;
  align-items: center;
`;

const PreviousPage = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleButtonClick = (idx: number) => {
    if (activeIdx !== idx) {
      // Clicked on the currently active item, toggle it off
      setActiveIdx(idx);
    }
  };

  const handleMouseEnter = (idx: number) => {
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  return (
    <Wrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="2" viewBox="0 0 1920 2" fill="none">
        <path d="M0 1H1920" stroke="#141414" stroke-linecap="round" stroke-width="0.3" stroke-opacity="0.25" />
      </svg>
      <SegmentedWrapper>
        <SegmentedPicker
          state={activeIdx === 0 ? "active" : hoveredIdx === 0 ? "hover" : "default"}
          semester="종합"
          onClick={() => handleButtonClick(0)}
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 1 ? "active" : hoveredIdx === 1 ? "hover" : "default"}
          semester="2023-1R"
          onClick={() => handleButtonClick(1)}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 2 ? "active" : hoveredIdx === 2 ? "hover" : "default"}
          semester="2022-2R"
          onClick={() => handleButtonClick(2)}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 3 ? "active" : hoveredIdx === 3 ? "hover" : "default"}
          semester="2022-1R"
          onClick={() => handleButtonClick(3)}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 4 ? "active" : hoveredIdx === 4 ? "hover" : "default"}
          semester="2021-2R"
          onClick={() => handleButtonClick(4)}
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 5 ? "active" : hoveredIdx === 5 ? "hover" : "default"}
          semester="2021-1R"
          onClick={() => handleButtonClick(5)}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
        />
        <SegmentedPicker
          state={activeIdx === 6 ? "active" : hoveredIdx === 6 ? "hover" : "default"}
          semester="2020-2R"
          onClick={() => handleButtonClick(6)}
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
        />
        {/* <SegmentedPicker
        state={activeIdx === 7 ? "active" : hoveredIdx === 7 ? "hover" : "default"}
        semester="2020-1R"
        onClick={() => handleButtonClick(7)}
        onMouseEnter={() => handleMouseEnter(7)}
        onMouseLeave={handleMouseLeave}
      /> */}
      </SegmentedWrapper>
    </Wrapper>
  );
};

export default PreviousPage;
