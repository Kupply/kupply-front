import styled from 'styled-components';
import { TextButton04, TextButton03Settings } from '../../assets/buttons/TextButton';
import { SBContentState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export function SideBar() {
  const [selected, setSelected] = useRecoilState(SBContentState);
  const navigate = useNavigate();
  const onClick = (index: number) => {
    setSelected(index);
  };

  return (
    <Sidebar>
      <Content>
        <Title>환경설정</Title>
        <Flex>
          <TextButton04
            selected={selected === 0}
            onCustomFunction={() => {
              onClick(0);
            }}
          >
            나의 기본정보 수정하기
          </TextButton04>
          <TextButton04
            selected={selected === 1}
            onCustomFunction={() => {
              onClick(1);
            }}
          >
            프로필 수정하기
          </TextButton04>
          <TextButton04
            selected={selected === 2}
            onCustomFunction={() => {
              onClick(2);
            }}
          >
            마이보드 프로필 수정하기
          </TextButton04>
          <TextButton04
            selected={selected === 3}
            onCustomFunction={() => {
              onClick(3);
            }}
          >
            보안
          </TextButton04>
          <div style={{ marginTop: 160 }}>
            <TextButton04
              selected={selected === 4}
              onCustomFunction={() => {
                onClick(4);
              }}
            >
              약관 보기
            </TextButton04>
          </div>
          <div style={{ marginTop: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14.7916vw" height="2" viewBox="0 0 284 2" fill="none">
              <path d="M283 1L0.999988 1" stroke="#DFDFDF" stroke-linecap="round" />
            </svg>
          </div>{' '}
          <div style={{ marginTop: 0 }}>
            <TextButton03Settings
              selected={selected === 5}
              onCustomFunction={() => {
                navigate('/delete');
              }}
            >
              계정 삭제
            </TextButton03Settings>
          </div>
        </Flex>
      </Content>
    </Sidebar>
  );
}

const Sidebar = styled.div`
  width: 27.135vw;
  height: 1153px;
  flex-shrink: 0;
  border-right: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.3) 100%);
`;

const Title = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; //24px; /* 100% */
  padding-top: 3.646vw; //70px;
  padding-bottom: 3.646vw; //70px;
`;

const Content = styled.div`
  padding-left: 6.667vw; //128px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.604vw; //50px;
`;
