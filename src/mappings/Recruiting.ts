type RecruitData = {
  [department: string]: {
    [semester: string]: number;
  };
};

export const recruit: RecruitData = {
  경영학과: {
    all: 224,
    '2024-2': 33,
    '2024-1': 60,
    '2023-2': 37, // 2024모집인원 all 반영 X
    '2023-1': 62,
    '2022-2': 42,
    '2022-1': 83,
    '2021-2': 34,
    '2021-1': 66,
    '2020-2': 75,
    '2020-1': 94,
  },
  경제학과: {
    all: 229,
    '2024-2': 30,
    '2024-1': 62,
    '2023-2': 29,
    '2023-1': 63,
    '2022-2': 13,
    '2022-1': 124,
    '2021-2': 53,
    '2021-1': 52,
    '2020-2': 44,
    '2020-1': 90,
  },
  심리학부: {
    // 단과대 - 학부이름 동일 주의 1
    all: 110,
    '2024-2': 15,
    '2024-1': 32,
    '2023-2': 27,
    '2023-1': 18,
    '2022-2': 44,
    '2022-1': 21,
    '2021-2': 48,
    '2021-1': 21,
    '2020-2': 3,
    '2020-1': 3,
  },
  통계학과: {
    all: 150,
    '2024-2': 43,
    '2024-1': 54,
    '2023-2': 29,
    '2023-1': 41,
    '2022-2': 28,
    '2022-1': 52,
    '2021-2': 37,
    '2021-1': 51,
    '2020-2': 28,
    '2020-1': 56,
  },
  수학과: {
    all: 53,
    '2024-2': 11,
    '2024-1': 10,
    '2023-2': 7,
    '2023-1': 16,
    '2022-2': 17,
    '2022-1': 13,
    '2021-2': 10,
    '2021-1': 13,
    '2020-2': 6,
    '2020-1': 9,
  },
  화학과: {
    all: 38,
    '2024-2': 13,
    '2024-1': 8,
    '2023-2': 10,
    '2023-1': 11,
    '2022-2': 11,
    '2022-1': 6,
    '2021-2': 6,
    '2021-1': 8,
    '2020-2': 9,
    '2020-1': 11,
  },
  미디어학부: {
    // 단과대 - 학부이름 동일 주의 2
    all: 105,
    '2024-2': 24,
    '2024-1': 27,
    '2023-2': 21,
    '2023-1': 29,
    '2022-2': 25,
    '2022-1': 30,
    '2021-2': 14,
    '2021-1': 15,
    '2020-2': 13,
    '2020-1': 18,
  },
  식품자원경제학과: {
    all: 111,
    '2024-2': 11,
    '2024-1': 45,
    '2023-2': 21,
    '2023-1': 32,
    '2022-2': 30,
    '2022-1': 28,
    '2021-2': 23,
    '2021-1': 30,
    '2020-2': 28,
    '2020-1': 21,
  },
  컴퓨터학과: {
    all: 274,
    '2024-2': 9,
    '2024-1': 21,
    '2023-2': 20,
    '2023-1': 23,
    '2022-2': 19,
    '2022-1': 26,
    '2021-2': 27,
    '2021-1': 102,
    '2020-2': 31,
    '2020-1': 26,
  },
  생명공학부: {
    all: 110,
    '2024-2': 17,
    '2024-1': 18,
    '2023-2': 11,
    '2023-1': 23,
    '2022-2': 31,
    '2022-1': 45,
    '2021-2': 26,
    '2021-1': 24,
    '2020-2': 25,
    '2020-1': 33,
  },
  생명과학부: {
    all: 10,
    '2024-2': 0,
    '2024-1': 7,
    '2023-2': 3,
    '2023-1': 2,
    '2022-2': 2,
    '2022-1': 3,
    '2021-2': 3,
    '2021-1': 4,
    '2020-2': 2,
    '2020-1': 2,
  },
  정치외교학과: {
    all: 103,
    '2024-2': 23,
    '2024-1': 29,
    '2023-2': 27,
    '2023-1': 32,
    '2022-2': 20,
    '2022-1': 24,
    '2021-2': 20,
    '2021-1': 35,
    '2020-2': 19,
    '2020-1': 37,
  },
  행정학과: {
    all: 27,
    '2024-2': 10,
    '2024-1': 6,
    '2023-2': 7,
    '2023-1': 8,
    '2022-2': 7,
    '2022-1': 5,
    '2021-2': 10,
    '2021-1': 9,
    '2020-2': 11,
    '2020-1': 12,
  },
  화공생명공학과: {
    all: 53,
    '2024-2': 10,
    '2024-1': 24,
    '2023-2': 7,
    '2023-1': 15,
    '2022-2': 10,
    '2022-1': 21,
    '2021-2': 24,
    '2021-1': 23,
    '2020-2': 13,
    '2020-1': 17,
  },
  신소재공학부: {
    all: 33,
    '2024-2': 4,
    '2024-1': 9,
    '2023-2': 5,
    '2023-1': 7,
    '2022-2': 10,
    '2022-1': 11,
    '2021-2': 8,
    '2021-1': 9,
    '2020-2': 7,
    '2020-1': 6,
  },
  기계공학부: {
    all: 24,
    '2024-2': 7,
    '2024-1': 5,
    '2023-2': 6,
    '2023-1': 10,
    '2022-2': 4,
    '2022-1': 4,
    '2021-2': 9,
    '2021-1': 7,
    '2020-2': 10,
    '2020-1': 7,
  },
  산업경영공학부: {
    all: 31,
    '2024-2': 16,
    '2024-1': 18,
    '2023-2': 7,
    '2023-1': 7,
    '2022-2': 7,
    '2022-1': 10,
    '2021-2': 8,
    '2021-1': 16,
    '2020-2': 7,
    '2020-1': 7,
  },
  전기전자공학부: {
    all: 99,
    '2024-2': 20,
    '2024-1': 33,
    '2023-2': 14,
    '2023-1': 36,
    '2022-2': 16,
    '2022-1': 33,
    '2021-2': 16,
    '2021-1': 17,
    '2020-2': 15,
    '2020-1': 20,
  },
  데이터과학과: {
    all: 37,
    '2024-2': 9,
    '2024-1': 22,
    '2023-2': 9,
    '2023-1': 21,
    '2022-2': 7,
    '2022-1': 21, // 평균값 유지하도록 임시값
    '2021-2': 8, // 평균값 유지하도록 임시값
    '2021-1': 21, // 평균값 유지하도록 임시값
    '2020-2': 8, // 평균값 유지하도록 임시값
    '2020-1': 0,
  },
  스마트보안학부: {
    all: 23,
    '2024-2': 4, // 단과대 - 학부이름 동일 주의 3
    '2024-1': 10,
    '2023-2': 3,
    '2023-1': 10,
    '2022-2': 10,
    '2022-1': 10, // 평균값 유지하도록 임시값
    '2021-2': 6, // 평균값 유지하도록 임시값
    '2021-1': 10, // 평균값 유지하도록 임시값
    '2020-2': 6, // 평균값 유지하도록 임시값
    '2020-1': 0,
  },
  // 인공지능학과: {
  //   all: 0,
  //   '2024-2': 0,
  //   '2024-1': 0,
  //   '2023-2': 0,
  //   '2023-1': 0,
  //   '2022-2': 0,
  //   '2022-1': 0, // 평균값 유지하도록 임시값
  //   '2021-2': 0, // 평균값 유지하도록 임시값
  //   '2021-1': 0, // 평균값 유지하도록 임시값
  //   '2020-2': 0, // 평균값 유지하도록 임시값
  //   '2020-1': 0,
  // },
  '희망 없음': {
    all: 0,
    '2024-2': 0, // 해당 항목의 존재이유를 알 수 없으나 일단 추가
    '2024-1': 0,
    '2023-2': 0,
    '2023-1': 0,
    '2022-2': 0,
    '2022-1': 0,
    '2021-2': 0,
    '2021-1': 0,
    '2020-2': 0,
    '2020-1': 0,
  },
};