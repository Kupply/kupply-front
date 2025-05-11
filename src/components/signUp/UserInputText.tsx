import { UserTypeOptions } from './UserInput';
import Typography from '../../assets/Typography';

const userTypeMapping: Record<UserTypeOptions, string> = {
  name: '이름을',
  password: '비밀번호를',
  password2: '입력한 비밀번호를',
  nickname: '닉네임을',
  studentId: '고려대학교 학번을',
  firstMajor: '본전공(1전공)을',
  firstMajorSejong: '본전공(1전공)을',
  id: '쿠플라이 아이디를',
  hopeMajor1: '이중전공',
  hopeMajor2: '이중전공',
  secondMajor: '이중전공',
  kuEmail: '고려대학교 이메일을',
  koreapasID: '고파스 아이디를',
  koreapasPass: '고파스 비밀번호를',
};

interface UserInputTextProps {
  userInfoType: UserTypeOptions | 'candidateGPA' | 'passGPA' | 'candidateSemester' | 'passSemester';
}

export const UserInputText: React.FC<UserInputTextProps> = ({ userInfoType }) => {
  return (
    <div style={{ display: 'flex' }}>
      {(() => {
        switch (userInfoType) {
          case 'id':
            return (
              <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                {userTypeMapping[userInfoType].replace(/[을를]$/, '')}
              </Typography>
            );
          case 'password2':
            return (
              <>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8', marginRight: '0.2344vw' }}>
                  {userTypeMapping[userInfoType].replace(/[을를]$/, '')}
                </Typography>{' '}
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  확인
                </Typography>
                <Typography size="0.9375vw">해&nbsp;주세요.</Typography>
              </>
            );
          case 'hopeMajor1':
            return (
              <>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  관심전공
                </Typography>
                <Typography size="0.9375vw">을 선택해주세요.</Typography>
              </>
            );
          case 'hopeMajor2':
            return <></>;
          case 'candidateGPA':
          case 'passGPA':
            return (
              <>
                <Typography size="0.9375vw">
                  {userInfoType === 'candidateGPA' ? '현재' : '지원 당시의'}&nbsp;
                </Typography>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  학점
                </Typography>
                <Typography size="0.9375vw">을 소수점 둘째자리까지 기입해주세요.</Typography>
              </>
            );
          case 'candidateSemester':
          case 'passSemester':
            return (
              <>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  {userInfoType === 'candidateSemester' ? '희망 이중 지원학기' : '이중전공 지원학기'}
                </Typography>
                <Typography size="0.9375vw">를 입력해주세요.</Typography>
              </>
            );
          case 'secondMajor':
            return (
              <>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  진입한 이중전공
                </Typography>
                <Typography size="0.9375vw">을 선택해주세요.</Typography>
              </>
            );
          default:
            return (
              <>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  {userTypeMapping[userInfoType].replace(/[을를]$/, '')}
                </Typography>
                <Typography size="0.9375vw" bold="500">
                  {userTypeMapping[userInfoType].slice(-1)} 입력해주세요.
                </Typography>
              </>
            );
        }
      })()}
    </div>
  );
};
