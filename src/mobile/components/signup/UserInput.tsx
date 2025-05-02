import Input01 from '../../assets/field/Input01';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, userSettingsState } from '../../../store/atom';
import DropDown from '../../assets/selectControl/DropDown';
import { majorAllList } from '../../../mappings/MajorAll';
import { ReactNode, useEffect } from 'react';
import { errorMessageState } from '../../../store/atom';
import { majorTargetList } from '../../../mappings/MajorTarget';
import { inputState } from '../../pages/signup/SignupPage4';

export type UserTypeOptions =
  | 'name'
  | 'password'
  | 'password2'
  | 'nickname'
  | 'studentId'
  | 'firstMajor'
  | 'id'
  | 'hopeMajor1'
  | 'hopeMajor2'
  | 'secondMajor'
  | 'kuEmail';

// localStorage이나 sessionStorage에서 가져올 때 각 페이지별로 설정해 둔 이름들이 모두 다른 관계로
// 강제적으로 원하는 정보를 가져올 수 있도록 userInfoTypeManual을 만들어둠

interface UserInputProps {
  userInfoType: UserTypeOptions;
  toNext?: boolean;
  setValue?: (args: string) => void;
  setStateValid?: (args: inputState) => void;
  children?: ReactNode;
  userInfoTypeManual?: string | undefined;
  locationUsed?: 'signUp' | 'settings';
  onCustomFunction?: () => void;
  valid?: boolean;
}

export const placeholderMapping: Record<UserTypeOptions, string> = {
  name: '홍길동',
  password: '대소문자, 숫자, 특수문자를 최소 하나씩 포함하여 8글자 이상',
  password2: '대소문자, 숫자, 특수문자를 최소 하나씩 포함하여 8글자 이상',
  nickname: '2자 이상 7자 이하',
  studentId: '2020250221',
  firstMajor: '전공 선택',
  id: '쿠플라이 아이디',
  hopeMajor1: '1지망 관심전공 선택',
  hopeMajor2: '2지망 관심전공 선택',
  secondMajor: '진입 이중전공 선택',
  kuEmail: '고려대학교 이메일',
};

export const helpMessageMapping: Record<UserTypeOptions, string> = {
  name: '홍길동',
  studentId: '2020250221',
  firstMajor: '',
  id: '',
  password: '대소문자, 숫자, 특수문자를 최소 하나씩 포함하여 8글자 이상',
  password2: '대소문자, 숫자, 특수문자를 최소 하나씩 포함하여 8글자 이상',
  nickname: '2자 이상 7자 이하',
  hopeMajor1: '',
  hopeMajor2: '',
  secondMajor: '',
  kuEmail: '',
};

export const errorMessageMapping: Record<UserTypeOptions, string> = {
  name: '',
  studentId: '학번이 10자리 숫자가 아닙니다.',
  firstMajor: '',
  password: '',
  password2: '',
  nickname: '닉네임 길이가 맞지 않습니다.',
  id: '',
  hopeMajor1: '',
  hopeMajor2: '',
  secondMajor: '',
  kuEmail: '유효하지 않은 이메일 주소입니다',
};

const optionList = majorTargetList;

export const UserInput: React.FC<UserInputProps> = ({
  userInfoType,
  toNext,
  children,
  userInfoTypeManual = undefined,
  locationUsed = 'signUp',
  onCustomFunction,
  valid,
  setStateValid,
}) => {
  // info = {info: , infoState:, infoCheck: }
  const [userInfo, setUserInfo] = useRecoilState(
    locationUsed === 'signUp'
      ? userState(userInfoTypeManual !== undefined ? userInfoTypeManual : userInfoType)
      : userSettingsState(userInfoTypeManual !== undefined ? userInfoTypeManual : userInfoType),
  );

  const [firstMajor, setFirstMajor] = useRecoilState(userState('firstMajor'));

  const errorMessage = useRecoilValue(errorMessageState);

  const hopeMajor1 = useRecoilValue(userState('hopeMajor1')).info;

  const hopeMajor2 = useRecoilValue(userState('hopeMajor2')).info;

  errorMessageMapping.password = errorMessage.passwordErrorMessage;
  errorMessageMapping.password2 = errorMessage.password2ErrorMessage;

  const updatedMajorTargetList = [...majorTargetList];
  updatedMajorTargetList.unshift({ value1: '희망 없음', value2: '희망 없음' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = e.target.value;
    setUserInfo((prev) => ({
      ...prev,
      info: newData,
    }));
  };

  if (toNext) {
    sessionStorage.setItem(userInfoType, userInfo.info);
  }

  if (userInfo.info !== '') {
    setStateValid?.('complete');
  } else {
    setStateValid?.('incomplete');
  }

  //console.log(userInfo);
  return (
    <>
      {userInfoType === 'firstMajor' ||
      userInfoType === 'hopeMajor1' ||
      userInfoType === 'hopeMajor2' ||
      userInfoType === 'secondMajor' ? (
        <DropDown
          title={placeholderMapping[userInfoType]}
          optionList={
            userInfoType === 'firstMajor'
              ? majorAllList
              : userInfoType === 'secondMajor'
              ? optionList
              : userInfoType === 'hopeMajor1'
              ? optionList.filter((el) => el.value1 !== hopeMajor2 && el.value1 !== firstMajor.info)
              : updatedMajorTargetList.filter((el) => el.value1 !== hopeMajor1 && el.value1 !== firstMajor.info)
          }
          value={userInfo.info}
          setValue={(v) => setUserInfo((prev) => ({ ...prev, info: v }))}
        />
      ) : (
        <Input01
          placeholder={placeholderMapping[userInfoType]}
          value={userInfo.info}
          onChange={handleInputChange}
          state={userInfo.infoState}
          setState={
            userInfoTypeManual === 'kuEmail' || (locationUsed === 'settings' && userInfoType === 'studentId')
              ? () => {}
              : (s) => setUserInfo((prev) => ({ ...prev, infoState: s }))
          }
          setValue={
            userInfoTypeManual === 'kuEmail' || (locationUsed === 'settings' && userInfoType === 'studentId')
              ? () => {}
              : (s) => setUserInfo((prev) => ({ ...prev, info: s }))
          }
          helpMessage={helpMessageMapping[userInfoType]}
          errorMessage={errorMessageMapping[userInfoType]}
          type={userInfoType === 'password' || userInfoType === 'password2' ? 'password' : undefined}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              console.log('This is the onKeyDown');
              onCustomFunction?.();
            }
          }}
        />
      )}
    </>
  );
};
