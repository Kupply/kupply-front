import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '../../assets/OldTypography';
import DepartmentCard from '../../assets/landingpage/DepartmentCard';
import { Navigate } from 'react-router-dom';
import { major계열 } from '../../common/majorTarget';

type buttonOptions = 'default' | 'hover' | 'active';

export interface ICardData {
  name: string;
  eng: string;
  합격자수: number;
  선발인원: number;
  min: number;
  mean: number;
  semester: string;
  imagesrc: string;
}
type cardProps = {
  cardData: ICardData[];
};

const Wrapper = styled.div`
  width: 86%;
  height: 900px;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const SubjectWrapper = styled.div`
  width: 380px;
  height: 495px;
`;

const SubTextWrapper = styled.div`
  margin-top: 10px;
  width: 290px;
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 100% */
`;

const LinkButton = styled.button<{ isClicked: boolean }>`
  margin-top: 52px;
  margin-bottom: 33px;
  border-radius: 10px;
  background: ${({ isClicked }) => (isClicked ? 'rgba(216, 88, 136, 0.1)' : '#d85888')};
  display: flex;
  width: 355px;
  height: 60px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
  }
`;

const SmallLinkButton = styled.button<{ state: buttonOptions }>`
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  display: flex;
  width: 230px;
  height: 46px;
  justify-content: center;
  align-items: center;
  background: ${({ state }) =>
    state === 'active' ? 'rgba(216, 88, 136, 0.1)' : state === 'hover' ? 'rgba(255, 255, 255, 0.1)' : 'white'};

  &:hover {
    box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
  }
`;

export default function PassedDataCard(props: cardProps) {
  const [cardData, setCardData] = useState<ICardData[]>([]);
  console.log(cardData);

  //합격 자료 바로가기 버튼의 click을 조정
  const [isActive, setisActive] = useState<boolean>(false);

  const navigate = useNavigate();

  //자연계, 인문계 바로가기 버튼 click 조정
  const [upperButtonState, setUpperButtonState] = useState<buttonOptions>('default');
  const [upperButtonClicked, setUpperButtonClicked] = useState(false);
  const [underButtonState, setUnderButtonState] = useState<buttonOptions>('default');
  const [underButtonClicked, setUnderButtonClicked] = useState(false);

  useEffect(() => {
    if (upperButtonClicked) {
      const newCardData = props.cardData.filter((data) => major계열[data.name] === '인문계');
      setCardData(newCardData);
    } else if (underButtonClicked) {
      const newCardData = props.cardData.filter((data) => major계열[data.name] === '자연계');
      setCardData(newCardData);
    } else setCardData(props.cardData);
  }, [upperButtonClicked, underButtonClicked]);

  return (
    <Wrapper>
      <SubjectWrapper>
        <Typography size="mediumText" color="#D85888" style={{ marginBottom: '10px' }}>
          합격자료
        </Typography>
        <Typography size="heading1" style={{ lineHeight: '58.5px' }}>
          인기학과 합격지표 한눈에 보기
        </Typography>
        <SubTextWrapper>지난 학기 가장 핫했던 학과의 정보를 나의 스펙과 비교 해보세요!</SubTextWrapper>
        <LinkButton
          isClicked={isActive}
          onMouseDown={() => setisActive(true)}
          onMouseUp={() => setisActive(false)}
          onClick={() => {
            navigate('/archive');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5.83398 14.1663L14.1673 5.83301"
              stroke={isActive ? '#D85888' : 'white'}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.83398 5.83301H14.1673V14.1663"
              stroke={isActive ? '#D85888' : 'white'}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Typography color={isActive ? '#D85888' : 'white'} size="bodyText">
            더 다양한 합격 자료가 궁금하다면?
          </Typography>
        </LinkButton>
        <SmallLinkButton
          onClick={() => {
            setUpperButtonClicked(!upperButtonClicked);
            if (underButtonClicked === true) {
              setUnderButtonClicked(false);
              setUnderButtonState('default');
            }
            upperButtonClicked ? setUpperButtonState('hover') : setUpperButtonState('active');
          }}
          onMouseOver={() => {
            if (upperButtonClicked === false) setUpperButtonState('hover');
          }}
          onMouseOut={() => {
            if (upperButtonClicked === false) setUpperButtonState('default');
          }}
          state={upperButtonState}
        >
          <Typography size="mediumText" color={upperButtonState === 'default' ? '#B9B9B9' : '#D85888'}>
            인문계 캠퍼스만 보기
          </Typography>
        </SmallLinkButton>
        <SmallLinkButton
          onClick={() => {
            setUnderButtonClicked(!underButtonClicked);
            if (upperButtonClicked == true) {
              setUpperButtonClicked(false);
              setUpperButtonState('default');
            }
            underButtonClicked ? setUnderButtonState('hover') : setUnderButtonState('active');
          }}
          onMouseOver={() => {
            if (underButtonClicked == false) setUnderButtonState('hover');
          }}
          onMouseOut={() => {
            if (underButtonClicked == false) setUnderButtonState('default');
          }}
          state={underButtonState}
        >
          <Typography size="mediumText" color={underButtonState === 'default' ? '#B9B9B9' : '#D85888'}>
            자연계 캠퍼스만 보기
          </Typography>
        </SmallLinkButton>
      </SubjectWrapper>
      {cardData[0] ? (
        <DepartmentCard {...cardData[0]}></DepartmentCard>
      ) : (
        <DepartmentCard {...props.cardData[0]}></DepartmentCard>
      )}
      {cardData[1] ? (
        <DepartmentCard {...cardData[1]}></DepartmentCard>
      ) : (
        <DepartmentCard {...props.cardData[1]}></DepartmentCard>
      )}
      {cardData[2] ? (
        <DepartmentCard {...cardData[2]}></DepartmentCard>
      ) : (
        <DepartmentCard {...props.cardData[2]}></DepartmentCard>
      )}
    </Wrapper>
  );
}
