/* 
  단과대 / 전공명
*/
export const collegeNameMappingByEng = {
  foodecon: 'bio',
  media: 'media',
  computer: 'info',
  business: 'business',
  psychology: 'psycho',
  chemistry: 'science',
  mathematics: 'science',
  economics: 'political',
  statistics: 'political',
};

export const collegeNameMappingByKR = {
  식품자원경제학과: 'bio',
  미디어학부: 'media',
  컴퓨터학과: 'info',
  경영학과: 'bussiness',
  심리학부: 'psycho',
  화학과: 'science',
  수학과: 'science',
  경제학과: 'political',
  통계학과: 'political',
};

export const collegeAPIMappingByKR = {
  식품자원경제학과: 'foodecon',
  미디어학부: 'media',
  컴퓨터학과: 'computer',
  경영학과: 'business',
  심리학부: 'psychology',
  화학과: 'chemistry',
  수학과: 'mathematics',
  경제학과: 'economics',
  통계학과: 'statistics',
};

export const majorNameMapping = {
  business: ['경영학과', 'Business School'],
  economics: ['경제학과', 'Department of Economics'],
  psychology: ['심리학부', 'School of Psychology'],
  statistics: ['통계학과', 'Department of Statistics'],
  mathematics: ['수학과', 'Department of Mathematics'],
  chemistry: ['화학과', 'Department of Chemistry'],
  media: ['미디어학부', 'School of Media & Communication'],
  foodecon: ['식품자원경제학과', 'Department of Food & Resources'],
  computer: ['컴퓨터학과', 'Department of Computer Science & Engineering'],
};

/*
  학기
*/
export const semesterMapping: string[] = [
  '전학기 누적',
  '2023-1R',
  '2022-2R',
  '2022-1R',
  '2021-2R',
  '2021-1R',
  '2020-2R',
  '2020-1R',
];

export const semesterAPIMapping: string[] = [
  'all',
  '2023-1',
  '2022-2',
  '2022-1',
  '2021-2',
  '2021-1',
  '2020-2',
  '2020-1',
];
