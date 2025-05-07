import Typography from '../../assets/Typography';
import styled from 'styled-components';

type TermsTextProps = {
  koreapasNickname?: string | null;
};

function TermsText({ koreapasNickname }: TermsTextProps) {
  return (
    <>
      {koreapasNickname && (
        <div style={{ textAlign: 'left', marginBottom: '0.521vw' }}>
          <Typography size="1.25vw" bold="700">
            쿠플라이에서 '{koreapasNickname}'님의 개인정보에 접근하는 것을 동의하십니까 ?
          </Typography>
        </div>
      )}
      <br />
      <ContentsText>
        제공된 정보는 이용자 식별, 계정 연동 및 CS 등을 위해 서비스 이용기간 동안 활용/보관됩니다. <br />
        <br />
        기본 정보 및 필수 제공 항목은 쿠플라이 서비스 이용을 위해 반드시 제공되어야 하는 정보입니다.
      </ContentsText>
      <br />
      <TitleText>기본 정보</TitleText>
      <ContentsText>- 고파스 이용자 고유 식별자 (uuid)</ContentsText>
      <br />
      <TitleText>필수 제공 항목</TitleText>
      <ContentsText>- 고파스 닉네임</ContentsText>
      <ContentsText>- 고파스 레벨</ContentsText>
      <ContentsText>- 본 전공</ContentsText>
      <ContentsText>- 소속 캠퍼스</ContentsText>
      <br />
      <TitleText>추가 제공 항목</TitleText>
      <ContentsText>(없음)</ContentsText>
      <br />
      <ContentsText>
        동의 후에는 해당 서비스의 이용약관 및 개인정보처리방침에 따라 정보가 관리됩니다. <br />
        <br />
        * 로그인에 사용되는 고파스 아이디와 비밀번호는 쿠플라이에서 수집하지 않습니다. <br />
      </ContentsText>
    </>
  );
}

export { TermsText };
const ContentsText = styled.div`
  // mediumText
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw; // 18px
  font-style: normal;
  font-weight: 400;
  line-height: 122.836%;
  text-align: left;
`;

const TitleText = styled.div`
  // bodyText
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw; //18px
  font-style: normal;
  font-weight: 700;
  line-height: 122.836%; /* 22.11px */
  text-align: left;
`;

const StyledTable = styled.table`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.625vw; //12px
  font-style: normal;
  font-weight: 400;
  line-height: 123.54%;
  border-collapse: collapse;
  border: 1px solid black;
  border-radius: 10px;

  th {
    text-align: center;
    background-color: #dfdfdf;
    border: 1px solid black;
    padding: 0.104vw 0.104vw; //2px 2px;
  }

  td {
    text-align: left;
    border: 1px solid black;
  }
`;
