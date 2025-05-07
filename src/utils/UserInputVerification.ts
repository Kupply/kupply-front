import { useRecoilState, useResetRecoilState } from "recoil";
import { userState, errorMessageState,  userSettingsState } from "../store/atom";
import { useEffect, useState } from "react";
import { users } from "../admin/_mock/user";

type verificationProps = 'signUp' | 'settings';

export function useEmailVerification(locationUsed: verificationProps){
  
  const [ID, setID] = useRecoilState(locationUsed === 'signUp' ? userState('kuEmail') : userSettingsState('loginedUser'));
  //console.log(ID);
  const [idVerified, setIdVerified] = useState(false);

  const IDPattern = /.+@korea\.ac\.kr$/;
  useEffect(() => {
    if (ID.infoState === 'filled') {
      if (!IDPattern.test(ID.info)) {
        setID((prev) => ({...prev, infoState: 'error'}));
        setIdVerified(true);
      }
      else {
        // console.log('test passed');
        setID((prev) => ({...prev, infoState: 'filled'}));
        setIdVerified(true);
      }
    } 
    // else{
    //   setIdVerified(false);
    // }
  }, [ID.info, ID.infoState]);

  return {
    idVerified,
    ID,
    setID
  };
}


export function useStudentIdVerification(locationUsed: verificationProps){
  const [stdId, setStdId] = useRecoilState(locationUsed === 'signUp' ? userState('studentId') : userSettingsState('studentId'));
  const [stdIdVerified, setStdIdVerified] = useState(false);
  

  useEffect(() => {
    const passwordCheck = /^\d{10}$/;
    if (stdId.infoState === 'filled') {
      if (!passwordCheck.test(stdId.info)){
        setStdId((prev) => ({...prev, infoState: 'error'}));
        setStdIdVerified(false);
        
      }
      else {
        setStdId((prev) => ({...prev, infoState: 'filled'}));
        setStdIdVerified(true);
      }
    }
  }, [stdId.info, stdId.infoState]);

  return {stdIdVerified};
}

export function usePasswordVerification(locationUsed: verificationProps){
  const [password, setPassword] = useRecoilState(locationUsed === 'signUp' ? userState('password') : userSettingsState('password'));
  const [errorMessages, setErrorMessages] = useRecoilState(errorMessageState);
  const [passwordVerified, setPasswordVerified] = useState(false);

  useEffect(() => {
    const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*?])[a-zA-Z\d~!@#$%^&*?ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{8,20}$/;
    if (password.infoState === 'filled') {
      if (!passwordCheck.test(password.info)) {
        let errorMessage = '비밀번호가 ';

        if (!/(?=.*[a-zA-Z])/.test(password.info)) {
          errorMessage += ' 영문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-])/.test(password.info)) {
          errorMessage += ' 특수 문자를 포함하고 있지 않아요!';
        } else if (!/(?=.*[0-9])/.test(password.info)) {
          errorMessage += ' 숫자를 포함하고 있지 않아요!';
        } else if (password.info.length < 8) errorMessage += ' 최소 8자 이상이어야 해요!';
        else if (password.info.length > 20) errorMessage = '비밀번호는 20자를 넘어갈 수 없어요!';
        else errorMessage = '비밀번호에 허용되지 않은 문자가 포함되었어요!';
        setErrorMessages({
          ...errorMessages,
          passwordErrorMessage: errorMessage,
        });
        setPassword((prev) => ({...prev, infoState: 'error'}));
        setPasswordVerified(false);
      } else {
        setPassword((prev) => ({...prev, infoState: 'filled'}));
        setPasswordVerified(true);
      }
    }
  }, [password.info, password.infoState]);

  return {passwordVerified};

}

export function usePassword2Verification(locationUsed: verificationProps){
  const [password, setPassword] = useRecoilState(locationUsed === 'signUp' ?userState('password') : userSettingsState('password'));
  const [password2, setPassword2] = useRecoilState(locationUsed === 'signUp' ?userState('password2') : userSettingsState('password2'));
  const [errorMessages, setErrorMessages] = useRecoilState(errorMessageState);
  const [password2Verified, setPassword2Verified] = useState(false);

  useEffect(() => {
    // password와 password2에 모두 기입이 되었을 때
    if (!!password.info && !!password2.info && password.infoState === 'filled' && password2.infoState === 'filled') {
      if (password.info === password2.info) {
        setPassword2((prev) => ({...prev, infoState: 'filled'}));
        setPassword2Verified(true);
      } else {
        setPassword2((prev) => ({...prev, infoState: 'error'}));
        setPassword2Verified(false);
        setErrorMessages({
          ...errorMessages,
          password2ErrorMessage: '비밀번호가 일치하지 않아요!',
        });
      }
    } 
    // password2에는 입력이 됨 but password1의 verification이 valid하지 않음
    else if(!!password2.info && password2.infoState === 'filled' && password.infoState !== 'filled'){
      setPassword2((prev) => ({...prev, infoState: 'error'}))
      setPassword2Verified(false);
      setErrorMessages({
        ...errorMessages,
        password2ErrorMessage: '비밀번호를 먼저 올바르게 기입해주세요!',
      });
    }
  }, [password.info, password.infoState, password2.info, password2.infoState]);

  return {password2Verified};
}


export function useNicknameVerification(locationUsed: verificationProps){
  const [nickname, setNickname] = useRecoilState(locationUsed === 'signUp' ? userState('nickname') : userSettingsState('nickname'));
  const [errorMessages, setErrorMessages] = useRecoilState(errorMessageState);
  const [nicknameVerified, setNicknameVerified] = useState(false);

  useEffect(() => {
    if (nickname.infoState === 'filled') {
      if ((nickname.info.length === 1 || nickname.info.length > 7)){
        setNickname((prev) => ({...prev, infoState: 'error'}));
        setNicknameVerified(false);
      }
      else {
        setNickname((prev) => ({...prev, infoState: 'filled'}));
        setNicknameVerified(true);
      }
    }
  }, [nickname.info, nickname.infoState]);

  // console.log('nicknameverified state', nicknameVerified);
  return {
    nicknameVerified, 
    errorMessages, 
    nickname, 
    setNickname
  };
}