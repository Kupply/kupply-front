import React from 'react';
import styled from 'styled-components';
import { MobileSelectedState } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import Typography from '../../../assets/Typography';

const Table = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 10px;
  border: 1.5px solid #eee;
  overflow: hidden;
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4.44vw;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const Arrow = styled.svg`
  width: 1.67vw;
  height: 3.125vw;
`;

const RightArrow = () => (
  <Arrow width="8" height="15" viewBox="0 0 8 15" fill="none">
    <path
      d="M0.341495 12.3724C-0.0741413 12.7361 -0.116259 13.3679 0.247423 13.7835C0.611105 14.1991 1.24287 14.2413 1.6585 13.8776L0.341495 12.3724ZM7 7.875L7.6585 8.62758C7.8668 8.44532 7.99024 8.18489 7.99945 7.90828C8.00866 7.63166 7.90281 7.3636 7.70711 7.16789L7 7.875ZM1.70711 1.16789C1.31658 0.777369 0.683417 0.777369 0.292893 1.16789C-0.0976311 1.55842 -0.0976311 2.19158 0.292893 2.58211L1.70711 1.16789ZM1.6585 13.8776L7.6585 8.62758L6.3415 7.12242L0.341495 12.3724L1.6585 13.8776ZM7.70711 7.16789L1.70711 1.16789L0.292893 2.58211L6.29289 8.58211L7.70711 7.16789Z"
      fill="#434343"
    />
  </Arrow>
);

type TableProps = {
  rows: Array<{
    id: number;
    title: string;
    onClick: () => void;
  }>;
};

const MyTable: React.FC<TableProps> = ({ rows }) => {
  const policy_idx = 3;
  return (
    <>
      <Table>
        {rows.slice(0, policy_idx).map((row) => (
          <Row key={row.id} onClick={row.onClick}>
            <Typography size="4.44vw" bold="400" style={{ color: 'black' }}>
              {row.title}
            </Typography>
            <RightArrow />
          </Row>
        ))}
      </Table>
      <Table>
        <Row key={rows[policy_idx].id} onClick={rows[policy_idx].onClick}>
          <Typography size="4.44vw" bold="400" style={{ color: 'black' }}>
            {rows[policy_idx].title}
          </Typography>
          <RightArrow />
        </Row>
      </Table>
    </>
  );
};

export const MainTable: React.FC = () => {
  const [selected, setSelected] = useRecoilState(MobileSelectedState);
  const handleRowClick = (id: number) => {
    setSelected(id);
  };

  const rows = [
    { id: 1, title: '나의 기본정보 수정하기', onClick: () => handleRowClick(1) },
    { id: 2, title: '프로필 수정하기', onClick: () => handleRowClick(2) },
    { id: 3, title: '마이보드 프로필 수정하기', onClick: () => handleRowClick(3) },
    // { id: 4, title: '보안', onClick: () => handleRowClick(4) },
    { id: 5, title: '약관 보기', onClick: () => handleRowClick(5) },
  ];

  return <MyTable rows={rows} />;
};
