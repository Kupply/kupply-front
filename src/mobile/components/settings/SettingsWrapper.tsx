import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '../../../assets/Typography';
import { useRecoilState } from 'recoil';
import { MobileSelectedState } from '../../../store/atom';
import CTA01 from '../../assets/CTAs/CTA01';

interface SettingsWrapperProps {
  selected: number;
  children?: ReactNode;
  onClickFunction: () => void;
}

export default function SettingsWrapper({ selected, children, onClickFunction }: SettingsWrapperProps) {
  const navigate = useNavigate();
  const [selectedNumber, setSelected] = useRecoilState(MobileSelectedState);
  let mainText = '';
  let subText = '';

  switch (selected) {
    case 0:
      mainText = '환경설정';
      subText = '';
      break;
    case 1:
      mainText = '나의 기본정보 수정하기';
      subText = '나의 기본정보 사항과 맞지 않는 내용을 수정하세요.';
      break;
    case 2:
      mainText = '프로필 수정하기';
      subText = '쿠플라이에서 사용할 프로필 사진과 닉네임을 수정하세요';
      break;
    case 3:
      mainText = '마이보드 프로필 수정하기';
      subText =
        '쿠플라이는 도전자님이 작성하신 정보를 바탕으로, 도전자님의 성공적인 이중전공 진입을 위한 다양한 정보를 제공합니다. 신뢰할 수 있는 마이보드를 제공받기 위해 정확한 정보를 입력해주세요.';
      break;
    case 4:
      mainText = '보안';
      subText = '안전한 개인정보 보호를 위해 비밀번호를 변경하세요. 쿠플라이 아이디는 고려대학교 이메일 주소입니다.';
      break;
    case 5:
      mainText = '약관 보기';
      subText = '다음은 고려대학교 이중전공 지원/합격 정보 통계 서비스 쿠플라이의 이용약관 입니다.';
      break;
  }
  return (
    <MainWrapper>
      <HeaderBar>
        <Button
          onClick={() => {
            if (selected == 0) navigate('/');
            else setSelected(0);
          }}
        >
          <Icon />
        </Button>
        <div>
          <Typography size="3.89vw" bold="700">
            {mainText}
          </Typography>
        </div>
      </HeaderBar>
      <Contents>
        <div>
          <Typography size="3.89vw" bold="400" style={{ lineHeight: '120%', opacity: 0.6, wordBreak: 'keep-all' }}>
            {subText}
          </Typography>
        </div>
        {children}
        {selected !== 0 && selected !== 5 && (
          <FixedCTA>
            <CTA01
              size="large"
              onClick={() => {
                onClickFunction();
              }}
            >
              저장하기
            </CTA01>
          </FixedCTA>
        )}
      </Contents>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10.833vw;
  margin-top: 5vw;
`;

const Contents = styled.div`
  width: 91.11vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5vw;
`;

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
    <path d="M9.25 1L3.25 6.25" stroke="#434343" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M3.25 6.25L9.25 12.25" stroke="#434343" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const Button = styled.button`
  //margin-left: 5vw;
  position: absolute;
  left: 5vw;
`;

const TempHeader = styled.div`
  height: 43px;
`;

const FixedCTA = styled.div`
  position: fixed; // This makes the CTA button fixed at the bottom
  bottom: 80px; // Distance from the bottom
  display: flex;
  justify-content: center;
  align-items: center;
`;
