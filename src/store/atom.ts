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

export const isOpenModalState = atom<boolean>({
  key: 'isOpenModalState',
  default: false
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
    info: sessionStorage.getItem(kind) || localStorage.getItem(kind) || '',
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

type GpaSemesterType = {
  num1: string;
  num2: string;
  num3: string;
}

export type userType = 'candidate' | 'passer';

export const gpaState = atomFamily<GpaSemesterType, userType>({
  key: "GpaState",
  default: (kind: userType) => ({
    num1: sessionStorage.getItem(`${kind}GPA`)?.charAt(0) || '',
    num2: sessionStorage.getItem(`${kind}GPA`)?.charAt(2) || '',
    num3: sessionStorage.getItem(`${kind}GPA`)?.charAt(3) || '',
  })
})


export const semesterState = atomFamily<GpaSemesterType, userType>({
  key: "SemesterState",
  default: (kind: userType) => ({
    num1: sessionStorage.getItem(`${kind}Semester`)?.charAt(2) || '',
    num2: sessionStorage.getItem(`${kind}Semester`)?.charAt(3) || '',
    num3: sessionStorage.getItem(`${kind}Semester`)?.charAt(5) || '',
  })
})

// settings의 sidebar에서 어떤 번호가 selected인지
export const SBContentState = atom<number>({
  key: 'SideBarContentSelectedNumberState',
  default: 0
});


export const isAppliedState = atom<boolean>({
  key: 'isAppliedState',
  default: localStorage.getItem('isApplied') === 'true' || false
});

export const userProfileState = atom({
  key: 'userProfileState',
  default: {
    pic: localStorage.getItem('userProfilePic') || 'rectProfile1',
    link: localStorage.getItem('userProfileLink') || ''
  }
})

// gpa가 바뀐 여부와 바뀐것이 이상행동으로 감지되었는지 여부 
type gpaChangeType = {
  changed: boolean;
  strange: boolean;
};
export const isGpaChangedState = atom<gpaChangeType>({
  key: 'hasGPAChanged',
  default: {
    changed: false,
    strange: false
  }
})

export const settingsModalState = atom<boolean>({
  key: 'settingsModalState',
  default: false
})