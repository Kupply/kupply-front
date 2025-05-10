import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import CTA02 from '../../assets/CTAs/CTA02';
import { Card02 } from '../../assets/cards/Card02';
import EditModal from './EditModals/OldEditModalModified';
import ApplicationModal from './SubmitModals/ApplicationModal';
import { isDateInRange } from '../../common/ApplicationPeriod';
import { MajorOptionsKR as MajorOptions } from '../../mappings/MajorTypes';
import { collegeNameMappingByKR } from '../../mappings/Mappings';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: keyof typeof collegeNameMappingByKR;
  hopeMajor: string;
}

const ProfileBox = ({
  userData,
  isApplied,
  isOpenEditModal,
  setOpenEditModal,
  closeEditModal,
  onClickEditModal,
  isOpenAppModal,
  setOpenAppModal,
  closeAppModal,
  onClickAppModal,
  locationUsed,
}: any) => {
  const [freshman, setFreshman] = useState(isApplied);
  const [isButtonDisabled, setIsButtonDisabled] = useState<'default' | 'disabled'>('default');
  const id = userData.studentId.slice(2, 4);
  const major: MajorOptions = userData.firstMajor;
  const major1: MajorOptions = userData.hopeMajor1;
  const major2: MajorOptions = userData.hopeMajor2;
  const profilePic = userData.userProfilePic;
  const navigate = useNavigate();
  useEffect(() => {
    const currentYearLastTwoDigits = new Date().getFullYear().toString().slice(-2);
    if (id === currentYearLastTwoDigits || isApplied || !isDateInRange) {
      setFreshman(false);
      setIsButtonDisabled('disabled');
    } else {
      setFreshman(true);
      setIsButtonDisabled('default');
    }
  }, [id, isApplied]);

  const [scrollY, setScrollY] = useState(window.scrollY + 62.02);

  const adjustScrollPositionByWidth = (width: number, scrollPosition: number) => {
    let maxScrollValue;

    if (width < 600) {
      maxScrollValue = 300;
    } else if (width < 800) {
      maxScrollValue = 400;
    } else if (width < 1000) {
      maxScrollValue = 500;
    } else if (width < 1200) {
      maxScrollValue = 600;
    } else {
      maxScrollValue = 800;
    }

    // 스크롤 위치 조정
    return Math.min(Math.max(scrollPosition + 62.02, 0), maxScrollValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      const newPositionY = adjustScrollPositionByWidth(window.innerWidth, window.scrollY);
      setScrollY(newPositionY);
    };

    const handleResize = () => {
      const newPositionY = adjustScrollPositionByWidth(window.innerWidth, window.scrollY);
      setScrollY(newPositionY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // 초기 로딩 시에도 스크롤 위치 조정
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ModalBox>
        {isOpenEditModal && (
          <EditModal
            isOpenModal={isOpenEditModal}
            setOpenModal={setOpenEditModal}
            onClickModal={closeEditModal}
            isApplied={false} /* 임시로 false */
          />
        )}
        {freshman && !isApplied && isOpenAppModal && isDateInRange && (
          <ApplicationModal isOpenModal={isOpenAppModal} setOpenModal={setOpenAppModal} onClickModal={closeAppModal} />
        )}
      </ModalBox>

      <Wrapper translateY={scrollY}>
        <CharacterImage src={`../../../designImage/character/rectProfile/${profilePic}.png`} alt="profile" />
        <NickNameBox>
          <NickNameText>{userData.userNickname}</NickNameText>
          <RoleText>{userData.userRole === 'candidate' ? '도전자' : '합격자'} 님</RoleText>
          <EditImage src="designImage/myBoard/Edit.svg" alt="edit" onClick={onClickEditModal} />
        </NickNameBox>
        <MajorTextBox>
          <MajorText>
            {major} {id}학번
          </MajorText>
        </MajorTextBox>

        <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '10.63vw' }} />
        <SubTitleBox style={{ top: '12.11vw' }}>
          <IconImage src="designImage/myBoard/ProfileBoxMajorIcon.svg" alt="major" />
          <SubTitleText>관심 전공</SubTitleText>
        </SubTitleBox>

        <InterestMajorBox>
          {userData.hopeMajor2 !== '희망 없음' ? (
            <>
              <Card02 korName={major1} hopeMajor="1지망" />
              <Card02 korName={major2} hopeMajor="2지망" />
            </>
          ) : (
            <>
              <Card02 korName={major1} hopeMajor="1지망" />
            </>
          )}
        </InterestMajorBox>
        {userData.hopeMajor2 !== '희망 없음' ? (
          <>
            <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '26.38vw' }} />
            <SubTitleBox style={{ top: '28.85vw' }}>
              <IconImage src="designImage/myBoard/ProfileBoxGPAIcon.svg" alt="major" />
              <SubTitleText>현재 내 학점</SubTitleText>
              <HopeSemesterText>{userData.curGPA}</HopeSemesterText>
            </SubTitleBox>
            <ApplyBox>
              <CTA02
                size="small"
                onClick={
                  locationUsed === 'Landing'
                    ? () => {
                        navigate('/myboard');
                      }
                    : onClickAppModal
                }
                state={isButtonDisabled}
              />
            </ApplyBox>
          </>
        ) : (
          <>
            <VectorImage src="designImage/myBoard/ProfileBoxVector.svg" alt="vector" style={{ top: '21.38vw' }} />
            <SubTitleBox style={{ top: '22.85vw' }}>
              <IconImage src="designImage/myBoard/ProfileBoxGPAIcon.svg" alt="major" />
              <SubTitleText>현재 내 학점</SubTitleText>
              <HopeSemesterText>{userData.curGPA}</HopeSemesterText>
            </SubTitleBox>
            <ApplyBox style={{ top: '28.28vw' }}>
              <CTA02
                size="small"
                onClick={
                  locationUsed === 'Landing'
                    ? () => {
                        navigate('/myboard');
                      }
                    : onClickAppModal
                }
                state={isButtonDisabled}
              />
            </ApplyBox>
          </>
        )}
      </Wrapper>
    </>
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

const ModalBox = styled.div`
  position: fixed;

  top: 15%;
  left: 25%;
  -webkit-transform: translate(-20%, -50%);
  -moz-transform: translate(-20%, -50%);
  -ms-transform: translate(-20%, -50%);
  -o-transform: translate(-20%, -50%);
  transform: translate(-20%, -50%);

  z-index: 1;
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
