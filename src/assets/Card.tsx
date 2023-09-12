import { styled } from "styled-components";

export interface CardsProps extends React.ComponentPropsWithRef<"div"> {
  name: string;
  eng: string;
  filter: string[];
  TO: number;
  경쟁률: number;
  avg: number;
  min: number;
  src: string;
}

const Card = ({ name, eng, filter, TO, 경쟁률, avg, min, src }: CardsProps) => {
  return (
    <Container>
      <img src={src} alt="백그라운드" />
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.div`
  width: 444px;
  height: 572px;
  border-radius: 10px;
`;

const Name = styled.div`
  position: absolute;
  z-index: 3;
`;

export default Card;
