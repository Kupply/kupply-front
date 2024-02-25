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

/*
  학과 색상
*/
// 소속, fill color, boxShadow color
export const majorColorMapping = {
  경영대학: { fill: '#787071', boxShadow: 'rgba(120, 112, 113, 0.5)' },
  정경대학: { fill: '#CC668C', boxShadow: 'rgba(204, 102, 140, 0.5)' },
  의과대학: { fill: '#99D88E', boxShadow: 'rgba(147, 216, 136, 0.5)' },
  정보대학: { fill: '#FFD35F', boxShadow: 'rgba(255, 211, 95, 0.5)' },
  미디어학부: { fill: '#EEA6BC', boxShadow: ' rgba(238, 166, 188, 0.5)' },
  스마트보안학부: { fill: '#F1A351', boxShadow: 'rgba(241, 163, 81, 0.5)' },
  문과대학: { fill: '#DFDFDF', boxShadow: 'rgba(223, 223, 223, 0.5)' },
  이과대학: { fill: '#7287AB', boxShadow: 'rgba(114, 135, 171, 0.5)' },
  사범대학: { fill: '#4C8ECC', boxShadow: 'rgba(233, 77, 94, 0.5)' },
  디자인조형학부: { fill: '#A667AE', boxShadow: 'rgba(166, 103, 174, 0.5)' },
  보건과학대학: { fill: '#E9808C', boxShadow: 'rgba(233, 128, 140, 0.5)' },
  심리학부: { fill: '#89D7E1', boxShadow: 'rgba(137, 215, 225, 0.5)' },
  생명과학대학: { fill: '#78BE94', boxShadow: 'rgba(120, 190, 148, 0.5)' },
  공과대학: { fill: '#FF8461', boxShadow: 'rgba(255, 132, 97, 0.5)' },
  간호대학: { fill: '#F5BDBD', boxShadow: 'rgba(245, 189, 189, 0.5)' },
  국제대학: { fill: '#58A2C6', boxShadow: ' rgba(88, 162, 198, 0.5)' },
  자유전공학부: { fill: '#7BBEEE', boxShadow: 'rgba(123, 190, 238, 0.5)' },
  스마트모빌리티학부: { fill: '#3F87F3', boxShadow: 'rgba(63, 135, 243, 0.5)' },
  기타: { fill: '#A8A8A8', boxShadow: 'rgba(223, 223, 223, 0.5)' },
};

// 학번, fill
export const idColorMapping: { [key: number]: string } = {
  23: '#D85888',
  22: '#E57C90',
  21: '#FFAFBD',
  20: 'var(--SECONDARY, #FDF2F2)',
};

export const idColorMappingShadow: { [key: number]: string } = {
  23: 'rgba(216, 88, 136, 0.5)',
  22: 'rgba(229, 124, 144, 0.5)',
  21: 'rgba(255, 175, 189, 0.5)',
  20: 'rgba(253, 242, 242, 0.5)',
};
