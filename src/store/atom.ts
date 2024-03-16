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
  default: sessionStorage.getItem('kuEmail') ? 'filled' : 'default'
});

export const emailAtom = atom({
  key: 'email',
  default: sessionStorage.getItem('kuEmail') || ''
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
    info: sessionStorage.getItem(kind) || '',
    infoState: 'default',
    infoCheck: 'default'
  })
});

export const userSettingsState = atomFamily<InfoState, string>({
  key: "userSettingsState",
  default: (kind: string) => {
    return {
    info: localStorage.getItem(kind) || 'whatisthis',
    infoState: 'default',
    infoCheck: 'default'
  }}
});

type errorMessageType = {
  passwordErrorMessage: string;
  nicknameErrorMessage: string;
  password2ErrorMessage: string;
};

export const errorMessageState = atom<errorMessageType>({
  key: "errorMessageState",
  default: {
    passwordErrorMessage: '',
    nicknameErrorMessage: '',
    password2ErrorMessage: ''
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

export const appModalUserTypeState = atom<
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
    num1: sessionStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(0) || '',
    num2: sessionStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(2) || '',
    num3: sessionStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(3) || '',
  })
})

// SettingsPage에서 사용할 gpa
export const gpaSettingsState = atomFamily<GpaSemesterType, userType>({
  key: "GpaSettingsState",
  default: (kind: userType) => ({
    num1: localStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(0) || '',
    num2: localStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(2) || '',
    num3: localStorage.getItem(kind === 'candidate' ? 'curGPA' : `passGPA`)?.charAt(3) || '',
  })
})


export const semesterState = atomFamily<GpaSemesterType, userType>({
  key: "SemesterState",
  default: (kind: userType) => ({
    num1: sessionStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(2) || '',
    num2: sessionStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(3) || '',
    num3: sessionStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(5) || '',
  })
})

// SettingsPage에서 사용하는 gpa
export const semesterSettingsState = atomFamily<GpaSemesterType, userType>({
  key: "SemesterSettingsState",
  default: (kind: userType) => ({
    num1: localStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(2) || '',
    num2: localStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(3) || '',
    num3: localStorage.getItem(kind === 'candidate' ? 'hopeSemester' : 'passSemester')?.charAt(5) || '',
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

export const selectedFileState = atom<File|null>({
  key: 'selectedFileState',
  default: null
});

export const applicationModalState = atom<number>({
  key: 'applicationModalState',
  default: 0
});

export const applicationSubmittedState = atom<boolean>({
  key: 'applicationSubmittedState',
  default: false
});

export const editSubmittedState = atom<boolean>({
  key: 'editSubmittedState',
  default: false
});

export const editModalState = atom<number>({
  key: 'editModalState',
  default: 0
});


export type headerButtonStateType = 'basicMajor' | 'interestMajor' | 'currentGPA' | 'hopeSemester';

export const headerButtonState = atom<headerButtonStateType>({
  key: 'headerButtonState',
  default: 'basicMajor'
});


