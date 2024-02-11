import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import EditModal from './EditModals/EditModal';

// 에셋 머지를 안해서 Card02 머지되면 나머지 완성 가능
// 데이터 연결 X
//  isApplied={isApplied}

const ProfileBox = () => {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const onClickEditModal = () => {
    setOpenEditModal(true);
  };

  const closeModal = () => {
    setOpenEditModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      let newPositionY = window.scrollY + 50;
      if (newPositionY < 0) {
        newPositionY = 0;
      }
      if (newPositionY > 1350) {
        newPositionY = 1350;
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
      <ProfileImageBox>
        <CharacterImage src="designImage/character/rectProfile/RectProfile1.png" alt="profile" />
        <EditImage src="designImage/myBoard/Edit.svg" alt="edit" onClick={onClickEditModal} />
        <NickNameBox>
          <NickNameText>고대빵없어</NickNameText>
          <RoleText>도전자 님</RoleText>
        </NickNameBox>
        <MajorBox>
          <MajorText>디자인조형학부</MajorText>
        </MajorBox>
      </ProfileImageBox>

      {isOpenEditModal && (
        <EditModal
          isOpenModal={isOpenEditModal}
          setOpenModal={setOpenEditModal}
          onClickModal={closeModal}
          isApplied={false} /* 임시로 false */
        />
      )}

      <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '229px' }} />
      <SubTitleBox style={{ top: '249px' }}>
        <IconImage src="designImage/myBoard/ProfileBoxMajorIcon.svg" alt="major" />
        <SubTitleText>관심 전공</SubTitleText>
      </SubTitleBox>

      <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '467px' }} />
      <SubTitleBox style={{ top: '490px' }}>
        <IconImage src="designImage/myBoard/ProfileBoxGPAIcon.svg" alt="major" />
        <SubTitleText>현재 내 학점</SubTitleText>
      </SubTitleBox>
      <TextBox2 style={{ top: '519px' }}>
        <HopeSemesterText>4.2</HopeSemesterText>
      </TextBox2>

      <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '561px' }} />
      <SubTitleBox style={{ top: '584px' }}>
        <IconImage src="designImage/myBoard/ProfileBoxSemester.svg" alt="major" />
        <SubTitleText>희망 진입학기</SubTitleText>
      </SubTitleBox>
      <TextBox2 style={{ top: '613px' }}>
        <GPAText>2023-2R</GPAText>
      </TextBox2>
    </Wrapper>
  );
};

//

const Wrapper = styled.div<{ translateY: number }>`
  display: flex;
  position: relative;

  justify-content: center; /* 수평 중앙 정렬 */
  //align-items: center; /* 수직 중앙 정렬 */
  width: 13.54vw;
  // min-width: 260px;
  max-width: 260px;
  height: 660px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 0px solid var(--White, #fff);
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 14.857px 37.143px 0px rgba(213, 213, 213, 0.4);
  backdrop-filter: blur(6.685710906982422px);

  transform: ${(props) => `translateY(${props.translateY}px)`};
  //border: 1px solid black;
`;

const ProfileImageBox = styled.div`
  position: relative;
  display: column;
  justify-content: center;

  width: 9.27vw;
  max-width: 178px;
  height: 178px;
  flex-shrink: 0;
  border-radius: 10px;

  margin-top: 31px;
  //border: 1px solid black;
`;

const NickNameBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  gap: 0.26vw;
  margin-top: 18px;
  // border: 1px solid black;
`;

const MajorBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  margin-top: 10px;
  //border: 1px solid black;
`;

const SubTitleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  height: 20px;
  flex-shrink: 0;

  gap: 0.52vw;
  left: 1.46vw;
`;

const TextBox1 = styled.div`
  position: absolute;
  display: flex;
  justify-content: left;

  left: 6.35vw;
`;

const TextBox2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  left: 3.02vw;
`;

///////////////// image /////////////////

const CharacterImage = styled.img`
  justify-content: center;
  width: 5.78vw;
  max-width: 111px;
  height: 111px;
  object-fit: cover;

  margin-left: 1.77vw;
`;

const EditImage = styled.img`
  position: absolute;

  width: 1.04vw;
  height: 20px;
  flex-shrink: 0;

  top: 100px;
  margin-left: 0.68vw;

  &:hover {
    cursor: pointer;
  }
`;

const VectorImage = styled.img`
  position: absolute;

  width: 13.54vw;
  max-width: 260px;
  flex-shrink: 0;
`;

const IconImage = styled.img`
  width: 1.04vw;
  height: 20px;
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
  line-height: 120%; /* 24px */
`;

const MajorText = styled.div`
  color: rgba(67, 67, 67, 0.6);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 500;
  // line-height: 277.778%; /*50px*/
`;

const SubTitleText = styled.div`
  color: rgba(67, 67, 67, 0.6);
  /* normal_Medium */
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 500;
  line-height: 19.2px; /* 120% */
`;

const HopeText = styled.div`
  color: rgba(67, 67, 67, 0.6);

  /* normal_Regular */
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
`;

const HopeMajorText = styled.div`
  color: #141414;
  text-align: center;

  /* BODY TEXT_Bold */
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const GPAText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
`;

const HopeSemesterText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
`;

export default ProfileBox;
