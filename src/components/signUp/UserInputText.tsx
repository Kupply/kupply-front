import { UserTypeOptions } from "./UserInput";
import Typography from "../../assets/Typography";

const userTypeMapping: Record<UserTypeOptions, string> = {
  name: "이름을",
  password: '비밀번호를',
  password2: '비밀번호를',
  nickname: '닉네임을',
  studentId: '고려대학교 학번을',
  firstMajor: '본전공(1전공)을',
  email: '쿠플라이 아이디를',
  hopeMajor1: '이중전공',
  hopeMajor2: '이중전공',
  doubleMajor: '이중전공'
}

interface UserInputTextProps{
  userInfoType: UserTypeOptions | 'GPAcandidate' | 'GPApasser' | 'hopeSemester' | 'enterSemester';
}

export const UserInputText: React.FC<UserInputTextProps> = ({userInfoType}) =>{
  return (
    <div style={{ display: 'flex' }}>
      {
        (() => {
          switch (userInfoType) {
            case 'email':
              return (
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  {userTypeMapping[userInfoType].replace(/[을를]$/, '')}
                </Typography>
              );
            case 'password2':
              return (
                <>
                  <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                    {userTypeMapping[userInfoType].replace(/[을를]$/, '')}
                  </Typography>
                  <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                    확인
                  </Typography>
                  <Typography size="0.9375vw">해&nbsp;주세요.</Typography>
                </>
              );
            case 'hopeMajor1':
              return (
                <>
                  <Typography size="0.9375vw">희망하는&nbsp;</Typography>
                  <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                    이중전공
                  </Typography>
                  <Typography size="0.9375vw">을 선택해주세요.</Typography>
                </>
              );
            case 'hopeMajor2':
              return (
                <>
                </>
              );
            case 'GPAcandidate':
            case 'GPApasser':
              return (
                <>
                  <Typography size="0.9375vw">{userInfoType === 'GPAcandidate' ? '현재' : '지원 당시의'}&nbsp;</Typography>
                  <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                    학점
                  </Typography>
                  <Typography size="0.9375vw">을 소수점 두 자리까지 기입해주세요.</Typography>
                </>
              );
            case 'hopeSemester':
            case 'enterSemester':
              return(
                <>
                  <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                    {userInfoType === 'hopeSemester' ? '희망 이중 지원학기' : '이중전공 진입학기'}
                  </Typography>
                  <Typography size="0.9375vw">를 입력해주세요.</Typography>
                </>
              );
            case 'doubleMajor':
              return(
                <>
                <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                  진입한 이중전공
                </Typography>
                <Typography size="0.9375vw">을 선택해주세요.</Typography>
                </>
              )
            default:
              return (
                <>
                  <Typography size="0.9375vw" bold="700" style={{ opacity: '0.8' }}>
                    {userTypeMapping[userInfoType].replace(/[을를]$/, '')}
                  </Typography>
                  <Typography size="0.9375vw" bold="500">{userTypeMapping[userInfoType].slice(-1)} 입력해주세요</Typography>
                </>
              );
          }
        })()
      }
    </div>
  )
}
