import styled from 'styled-components';

type CardKind = 'Mean' | 'Median' | 'Mode' | 'Min';

interface Card05Props {
  kind: CardKind;
  text: string;
  textNumber: number;
  modeNumber?: number; // 최빈값 숫자 추가
}

export default function Card05({ kind, text, textNumber, modeNumber }: Card05Props) {
  return (
    <PasserGPAInfoBox>
      <Sidebar kind={kind} />
      <PasserGPAInfoTextBox>
        <Text>{text}</Text>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
          <TextNumber>{textNumber.toFixed(2)}</TextNumber>
          {kind === 'Mode' && modeNumber !== undefined && <ModeNumberText>({modeNumber.toFixed(0)}명)</ModeNumberText>}
        </div>
      </PasserGPAInfoTextBox>
    </PasserGPAInfoBox>
  );
}

interface SidebarProps {
  kind: CardKind;
}

const PasserGPAInfoBox = styled.div`
  display: flex;
  gap: 5.28vw; // Converted from 19px
  align-items: center;
  width: 44.44vw; // Converted from 160px
  height: 20.28vw; // Converted from 73px
  flex-shrink: 0;
  background-color: white;
  border-radius: 3.61vw; // Converted from 13px
  box-shadow: 0px 4.13vw 10.32vw rgba(223, 223, 223, 0.4); // Converted x and y of box-shadow
  backdrop-filter: blur(1.86vw); // Converted from 6.68571px
  flex-direction: row;
`;

const Sidebar = styled.div<SidebarProps>`
  width: 3.33vw; // Converted from 12px
  height: 100%;
  background-color: ${(props) =>
    props.kind === 'Mean'
      ? '#F5BDBD'
      : props.kind === 'Median'
      ? '#E96D6D'
      : props.kind === 'Mode'
      ? '#D85888'
      : '#313B80'};
  border-radius: 3.61vw 0 0 3.61vw; // Converted from 13px
`;

const PasserGPAInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 0.22vw; // Approximate conversion from 0.78125vw
`;

const Text = styled.div`
  color: rgba(20, 20, 20, 0.7);
  text-align: center;
  font-family: Pretendard;
  font-size: 3.61vw; // Converted from 13px
  font-style: normal;
  font-weight: 500;
  line-height: 3.89vw; // Converted from 14px, maintaining the same percentage
`;

const TextNumber = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 5.56vw; // Converted from 20px
  font-style: normal;
  font-weight: 700;
  line-height: 120%; // 6.67vw, derived from font size to maintain 120% line height
`;

const ModeNumberText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 3.33vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;
