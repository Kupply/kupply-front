import { useState } from "react";
import styled from "styled-components";

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571149828506-c48f1610314b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1668104452882-2ae0969bb2cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  },
];

const SideCarrouselContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ;
`;

const MiddleCarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background: white;
`;
//background-image: ${(props) => props.imageUrl};

const CarouselImage = styled.div<{ imageUrl: string }>`
  width: 1100px;
  height: 474px;
  background-color: pink;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CarouselBackground = styled.img`
  width: 776px;
  height: 350px;
  background-color: pink;
  opacity: 50%;
`;

const CarouselButton = styled.button`
  background: none;
  border: none;
  width: 54px;
  height: 54px;

  &:hover {
    background-color: black;
  }
`;

function MainCarousel() {
  const [middle, setMiddle] = useState(0);
  const getIndex = (index: number) => {
    if (index === -1) return data.length - 1;
    else if (index === data.length) return 0;
    else return index;
  };
  const handleButtonClick = (direction: "left" | "right") => {
    switch (direction) {
      case "left":
        setMiddle(getIndex(middle + 1));
        break;
      case "right":
        setMiddle(getIndex(middle - 1));
    }
  };
  return (
    <div style={{ marginTop: 100 }}>
      <MiddleCarouselContainer>
        <img src={data[getIndex(middle - 1)].image} />
        <CarouselBackground />
        <CarouselImage imageUrl={data[middle].image}>
          <CarouselButton
            onClick={() => {
              handleButtonClick("left");
            }}
          >
            {"<"}
          </CarouselButton>
          <CarouselButton
            onClick={() => {
              handleButtonClick("right");
            }}
          >
            {">"}
          </CarouselButton>
        </CarouselImage>
        <CarouselBackground />
        <img src={data[getIndex(middle + 1)].image} />
      </MiddleCarouselContainer>
    </div>
  );
}

export default MainCarousel;
