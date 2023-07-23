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
  {
    image:
      "https://images.unsplash.com/photo-1570475735025-6cd1cd5c779d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  },
];

const Wrapper = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 474px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const MainImage = styled.img`
  width: 70%;
  height: 474px;
`;

const SubImage = styled.img`
  width: 776px;
  height: 350px;
  opacity: 50%;
`;

const ButtonWrapper = styled.div`
  width: 200px;
  height: 8px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
`;

const Button = styled.button<{ index: number }>`
  width: 40px;
  height: 8px;
  background: ${(props) => (props.key === props.index ? "pink" : "gray")};
  opacity: 50%;
  border: none;
`;

const LeftArrow = styled.button`
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  position: absolute;
  left: 520px;
  color: white;
`;

const RightArrow = styled.button`
  width: 60px;
  height: 60px;
  background: none;
  border: none;
  position: absolute;
  right: 520px;
  color: white;
`;

function Carousel() {
  const [index, setIndex] = useState(0);
  const getIndex = (index: number) => {
    if (index === -1) return data.length - 1;
    else if (index === data.length) return 0;
    else return index;
  };

  return (
    <Wrapper>
      <CarouselWrapper>
        <SubImage src={data[getIndex(index + 1)].image} />
        <LeftArrow onClick={() => setIndex(getIndex(index - 1))}>
          <h1>{"<"}</h1>
        </LeftArrow>
        <MainImage src={data[index].image} />
        <RightArrow onClick={() => setIndex(getIndex(index + 1))}>
          <h1>{">"}</h1>
        </RightArrow>
        <SubImage src={data[getIndex(index - 1)].image} />
      </CarouselWrapper>
      <ButtonWrapper>
        <Button onClick={() => setIndex(0)} key={0} index={index} />
        <Button onClick={() => setIndex(1)} key={1} index={index} />
        <Button onClick={() => setIndex(2)} key={2} index={index} />
        <Button onClick={() => setIndex(3)} key={3} index={index} />
      </ButtonWrapper>
    </Wrapper>
  );
}

export default Carousel;
