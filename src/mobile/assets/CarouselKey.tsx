import styled from 'styled-components';

export interface CarouselKeyProps extends React.ComponentPropsWithoutRef<'div'> {
  type?: number;
}

function CarouselKey(props: CarouselKeyProps) {
  const { type = 0, ...rest } = props;
  // default 값 지정이 안됨... 이유는 모름... props로 값 적어주면 정상 작동

  const types = [0, 1, 2, 3];

  return (
    <MainWrapper {...rest}>
      {types.map((type, typeIndex) => (
        <CircleWrapper key={typeIndex}>{type === props.type ? <LargeCircle /> : <SmallCircle />}</CircleWrapper>
      ))}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<CarouselKeyProps>`
  width: 20vw;
  height: 2.78vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallCircle = styled.div`
  width: 2.22vw;
  height: 2.22vw;
  border-radius: 999px;
  background-color: rgba(253, 242, 242, 0.4);
`;

const LargeCircle = styled.div`
  width: 2.78vw;
  height: 2.78vw;
  border-radius: 999px;
  background-color: rgba(253, 242, 242, 1);
  box-shadow: 0px 0px 2.78vw rgba(216, 88, 136, 0.2);
`;

export default CarouselKey;
