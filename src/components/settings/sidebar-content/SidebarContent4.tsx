import styled from "styled-components";
import { ScrollLarge, ScrollSmall } from "../../../assets/scroll/Scroll";
import Typography from "../../../assets/Typography";
import { TermsText1, TermsText2 } from "../../signUp/TermsText";
import { ArrowImage } from "../../../assets/buttons/CheckBoxButton";


export function SidebarContent4(){

  return (
    <BodyContainer>
      <BodyTitle>약관보기</BodyTitle>
      <BodyContent>
            다음은 고려대학교 이중전공 지원/합격정보 통계 서비스 쿠플라이의 이용약관입니다.
      </BodyContent>{' '}

      <ScrollLarge isChecked={false}>
        <div style={{ marginTop: 30 }}>
          <div style={{ marginBottom: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Typography size="1.0416vw" bold="700" style={{ textAlign: 'left' }}>
              서비스 이용약관
            </Typography>
            <ArrowImage/>
          </div>
        </div>

        <TextOutBox>
          <ScrollSmall isChecked={false}>
            <TermsText1/>
          </ScrollSmall>
        </TextOutBox>

        <div style={{ marginTop: 30 }}>
          <div style={{ marginBottom: 22, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Typography size="1.0416vw" bold="700" style={{ textAlign: 'left' }}>
              개인정보 처리방침
            </Typography>
            <ArrowImage/>
          </div>
        </div>

        <div style={{ width: '628px', height: 'auto', marginBottom: '30', textAlign: 'left' }}>
          <Typography size="0.9375vw" bold="500" style={{ fontWeight: '400', textAlign: 'left', color: '#a8a8a8' }}>
            쿠플라이는 이용자들의 정보를 매우 중요시하며, 이용자가 쿠플라이에서 제공하는 서비스를 이용함과 동시에
            온라인 상에서 각 운영 서비스에 제공한 개인정보가 보호받을 수 있도록 최선을 다하고 있습니다.
            <br />
            <br />
          </Typography>
        </div>

        <TextOutBox>
          <ScrollSmall isChecked={false}>
            <TermsText2/>
          </ScrollSmall>
        </TextOutBox>
      </ScrollLarge>
    </BodyContainer>
  )
}

const BodyContainer = styled.div`
  //padding-left: 262px;
  padding-left: 13.645vw;
  padding-top: 70px;
  width: 628px;
`;
const BodyContent = styled.div`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 111.111% */
  opacity: 0.6;
  margin-top: 12px;
`;
const BodyTitle = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
`;

const TextOutBox = styled.div`
  width: 628px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 2px;
  margin-right: 18px;
  line-height: 123.54%; /* 22.237px */
`;
