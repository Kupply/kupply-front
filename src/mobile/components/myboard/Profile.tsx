import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import EditModal from './EditModals/OldEditModal';
//import EditModal from './EditModals/EditModal';
//import EditModal from './EditModals/OldEditModalModified';
import CTA02 from '../../assets/CTAs/CTA02';
import { MajorOptionsKR as MajorOptions } from '../../../types/MajorTypes';
import { collegeNameMappingByEng as collegeNameMapping, majorNameMapping } from '../../../utils/Mappings';
// isApplied={isApplied}
// editmodal 위치 수정 해야 됨

// Wrapper의 배경 색상 이상함... 수정 필요

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  hopeMajor: string;
}

const MobileProfile = ({ userData }: { userData: any }) => {
  const id = userData.studentId.slice(2, 4);
  const major: MajorOptions = userData.firstMajor;
  const profilePic = userData.userProfilePic;

  // const majorKoreanName = majorNameMapping[major][0];

  // const majorKoreanName1 = majorNameMapping[major1][0];
  // const majorEngishName1 = majorNameMapping[major1][1];

  // const majorKoreanName2 = majorNameMapping[major2][0];
  // const majorEngishName2 = majorNameMapping[major2][1];

  const [isOpenEditModal, setOpenEditModal] = useState(true);

  const onClickEditModal = () => {
    setOpenEditModal(true);
  };

  const closeModal = () => {
    setOpenEditModal(false);
  };

  return (
    <>
      <Wrapper>
        <HeadWrapper>
          <CharacterImage src={`designImage/character/rectProfile/${profilePic}.png`} alt="profile" />
          <NickNameBox>
            <NickNameText>{userData.userNickname}</NickNameText>
            <RoleText>{userData.userRole === 'candidate' ? '도전자' : '합격자'} 님</RoleText>
            <EditImage src="designImage/myBoard/Edit.svg" alt="edit" onClick={onClickEditModal} />
            <MajorText>
              {major} {id}학번
            </MajorText>
          </NickNameBox>
        </HeadWrapper>

        <VectorImage src="designImage/mobile/myboard/ProfileVector.svg" alt="vector" style={{ marginTop: '3.61vw' }} />

        <SubTitleBox style={{ marginTop: '5.28vw' }}>
          <IconImage src="designImage/myBoard/ProfileBoxGPAIcon.svg" alt="major" />
          <SubTitleText>현재 내 학점</SubTitleText>
          <HopeSemesterText>{userData.curGPA}</HopeSemesterText>
        </SubTitleBox>

        <SubTitleBox2 style={{ marginTop: '5.56vw' }}>
          <IconImage src="designImage/myBoard/ProfileBoxSemester.svg" alt="major" />
          <SubTitleText>희망 진입학기</SubTitleText>
          <GPAText>{userData.hopeSemester}R</GPAText>
        </SubTitleBox2>

        <ApplyBox>
          <CTA02 size="large">나도 모의지원 하러가기!</CTA02>
        </ApplyBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background: #fefefe;
  width: 100vw;
  height: 90.56vw;
  overflow: hidden;
`;

const HeadWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 91.11vw;
  height: 30.84vw;
  margin-top: 5.28vw;
`;

const NickNameBox = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 41.11vw;
  height: 13.33vw;
  margin-left: 6.94vw;

  > :first-child {
    margin-right: 2.5vw;
  }

  > :nth-child(2) {
    margin-right: 1.94vw;
  }
`;

const SubTitleBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;

  width: 91.11vw;

  > :first-child {
    margin-right: 1.67vw;
  }

  > :nth-child(2) {
    margin-right: 12.5vw;
  }
`;

const SubTitleBox2 = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;

  width: 91.11vw;

  > :first-child {
    margin-right: 1.67vw;
  }

  > :nth-child(2) {
    margin-right: 10vw;
  }
`;

const ApplyBox = styled.div`
  position: relative;
  display: flex;
  margin-top: 5.83vw;
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  z-index: 1;
`;

///////////////// image /////////////////

const CharacterImage = styled.img`
  position: relative;
  display: flex;
  width: 30.83vw;
  height: 30.83vw;
  object-fit: cover;
  //left: 4.44vw;
`;

const EditImage = styled.img`
  width: 5.56vw;
  height: 5.56vw;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }
`;

const VectorImage = styled.img`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const IconImage = styled.img`
  width: 4.44vw;
  height: 4.44vw;
  flex-shrink: 0;
`;

///////////////// text /////////////////

const NickNameText = styled.div`
  color: #141414;

  /* mob_title3_Bold */
  font-family: Pretendard;
  font-size: 5.55vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const RoleText = styled.div`
  color: rgba(20, 20, 20, 0.8);

  /* mob_small_Medium */
  font-family: Pretendard;
  font-size: 4.44vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
`;

const MajorText = styled.div`
  color: rgba(67, 67, 67, 0.6);

  /* mob_small_Regular */
  font-family: Pretendard;
  font-size: 4.44vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
`;

const SubTitleText = styled.div`
  color: rgba(67, 67, 67, 0.6);
  /* normal_Medium */
  font-family: Pretendard;
  font-size: 3.88vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const GPAText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 3.88vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  white-space: nowrap;
`;

const HopeSemesterText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 3.88vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export default MobileProfile;