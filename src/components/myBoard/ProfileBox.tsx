import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import EditModal from './EditModals/EditModal';
import Card02 from '../../assets/cards/Card02';
import CTA02 from '../../assets/CTAs/CTA02';

// 데이터 연결 X
// isApplied={isApplied}
// editmodal 위치 수정 해야 됨
// CTA02 부모 컨포넌트에 따라 크기 변경되게? 수정해야 될듯

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  hopeMajor: string;
}

const ProfileBox = () => {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [scrollY, setScrollY] = useState(window.scrollY + 62.02);

  const onClickEditModal = () => {
    setOpenEditModal(true);
  };

  const closeModal = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      let newPositionY = window.scrollY + 62.02;
      if (newPositionY < 0) {
        newPositionY = 0;
      }
      if (newPositionY > 850) {
        newPositionY = 800;
      }
      setScrollY(newPositionY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Wrapper translateY={scrollY}>
      <CharacterImage src="designImage/character/rectProfile/RectProfile1.png" alt="profile" />
      <NickNameBox>
        <NickNameText>고대빵없어...</NickNameText>
        <RoleText>도전자 님</RoleText>
        <EditImage src="designImage/myBoard/Edit.svg" alt="edit" onClick={onClickEditModal} />
      </NickNameBox>
      <MajorTextBox>
        <MajorText>디자인조형학부 20학번</MajorText>
      </MajorTextBox>

      {isOpenEditModal && (
        <EditModal
          isOpenModal={isOpenEditModal}
          setOpenModal={setOpenEditModal}
          onClickModal={closeModal}
          isApplied={false} /* 임시로 false */
        />
      )}

      <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '10.63vw' }} />
      <SubTitleBox style={{ top: '12.11vw' }}>
        <IconImage src="designImage/myBoard/ProfileBoxMajorIcon.svg" alt="major" />
        <SubTitleText>관심 전공</SubTitleText>
      </SubTitleBox>

      <InterestMajorBox>
        <Card02 korName="경영학과" hopeMajor="business" />
        <Card02 korName="경영학과" hopeMajor="business" />
      </InterestMajorBox>

      <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '26.38vw' }} />
      <SubTitleBox style={{ top: '27.85vw' }}>
        <IconImage src="designImage/myBoard/ProfileBoxGPAIcon.svg" alt="major" />
        <SubTitleText>현재 내 학점</SubTitleText>
        <HopeSemesterText>4.2</HopeSemesterText>
      </SubTitleBox>

      <SubTitleBox style={{ top: '29.82vw' }}>
        <IconImage src="designImage/myBoard/ProfileBoxSemester.svg" alt="major" />
        <SubTitleText>희망 진입학기</SubTitleText>
        <GPAText>2023-2R</GPAText>
      </SubTitleBox>

      <ApplyBox>
        <CTA02 size="small" />
      </ApplyBox>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ translateY: number }>`
  display: flex;
  position: relative;

  justify-content: left;
  width: 14.68vw;
  height: 42.32vw;
  flex-shrink: 0;

  transform: ${(props) => `translateY(${props.translateY}px)`};
`;

const NickNameBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  gap: 0.47vw;
  top: 6.35vw;
`;

const MajorTextBox = styled.div`
  position: absolute;
  display: flex;

  top: 8.07vw;
`;

const SubTitleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  height: 0.98vw;
  flex-shrink: 0;

  gap: 0.52vw;
`;

const InterestMajorBox = styled.div`
  position: absolute;
  display: column;
  justify-content: left;
  justify-content: flex-start;

  margin-top: 0.98vw;

  top: 13.09vw;
  & > div {
    margin-bottom: 0.98vw;
  }
`;

const ApplyBox = styled.div`
  position: absolute;
  top: 32.28vw;
`;

///////////////// image /////////////////

const CharacterImage = styled.img`
  justify-content: center;
  width: 5.78vw;
  max-width: 5.78125vw;
  height: 5.46vw;
  object-fit: cover;
`;

const EditImage = styled.img`
  width: 1.04vw;
  height: 0.98vw;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }
`;

const VectorImage = styled.img`
  position: absolute;

  width: 14.68vw;
  flex-shrink: 0;
`;

const IconImage = styled.img`
  width: 1.04vw;
  height: 0.98vw;
  flex-shrink: 0;
`;

///////////////// text /////////////////

const NickNameText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const RoleText = styled.div`
  color: rgba(20, 20, 20, 0.8);
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const MajorText = styled.div`
  color: rgba(67, 67, 67, 0.6);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 500;
`;

const SubTitleText = styled.div`
  color: rgba(67, 67, 67, 0.6);
  /* normal_Medium */
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const GPAText = styled.div`
  position: absolute;

  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  white-space: nowrap;

  left: 9.27vw;
`;

const HopeSemesterText = styled.div`
  position: absolute;

  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;

  left: 9.27vw;
`;

export default ProfileBox;
