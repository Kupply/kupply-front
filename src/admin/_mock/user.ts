import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
// 백엔드 연결하여 수정 필요
// ----------------------------------------------------------------------

// 모두 가짜 데이터, 추후 수정 필요
// 숫자 24는 전체 회원 수로 변경 필요
export const users = [...Array(24)].map((_, index) => ({
  role: sample(['도전생', '진입생']),
  name: faker.person.fullName(),
  nickname: faker.person.fullName(),
  studentID: faker.string.uuid(),
  firstMajor: sample(['경영학과', '철학과', '영어영문학과', '전기전자공학부']),
  secondMajor: sample(['경영학과', '철학과', '영어영문학과', '전기전자공학부']),
  email: faker.phone.number(),
}));
