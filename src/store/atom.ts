import { atom, selectorFamily, atomFamily } from "recoil";
import { StateOptions } from "../assets/OldTextFieldBox";

type NumStateType = {
  num1: string;
  num2: string;
  num3: string;
  num4: string;
  num5: string;
  num6: string;
}

export const verificationCodeState = atom<NumStateType>({
  key: 'verificationCode',
  default: {
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: ''
  }
})

export const emailStateAtom = atom<StateOptions>({
  key: 'emailState',
  default: sessionStorage.getItem('email') ? 'filled' : 'default'
});

export const emailAtom = atom({
  key: 'email',
  default: sessionStorage.getItem('email') || ''
});

export const sendNumState = atom<number>({
  key: 'sendNumState',
  default: 0
})

export const currentModalState = atom<number>({
  key: 'currentModalState',
  default: 100
});

export const nextButtonState = atom<boolean>({
  key: 'nextButtonState',
  default: false
})



type InfoState = {
  info: string;
  infoState: StateOptions;
  infoCheck: StateOptions;
}

// 이름, 비밀번호, 닉네임...
export const userState = atomFamily<InfoState, string>({
  key: "userState", 
  default: (kind: string) => ({
    info: sessionStorage.getItem(kind) || '',
    infoState: 'default',
    infoCheck: 'default'
  })
});

type errorMessageType = {
  passwordErrorMessage: string;
  nicknameErrorMessage: string;
};

export const errorMessageState = atom<errorMessageType>({
  key: "errorMessageState",
  default: {
    passwordErrorMessage: '',
    nicknameErrorMessage: ''
  }
});

// 유저가 candidate이거나 passer이고 그에 따른 state가 결정 
type userTypetype = 'candidate' | 'passer' | '';
type userStatetype = 'clicked' | 'default' | 'inactive';

export const userTypeState = atom<
{userType: userTypetype, userState: userStatetype[]}>({
  key: 'userTypeState',
  default: {
    userType: '',
    userState: ['default', 'default']
  }
});

