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
  bioeng: 'bio',
  lifesci: 'bio',
  political: 'political',
  pubadmin: 'political',
  materials: 'engineering',
  mechanical: 'engineering',
  industrial: 'engineering',
  electrical: 'engineering',
  chembio: 'engineering',
  datasci: 'info',
  smartsec: 'smartsecurity',
};

export const collegeNameMappingByKR = {
  식품자원경제학과: 'bio',
  미디어학부: 'media',
  컴퓨터학과: 'info',
  경영학과: 'business',
  심리학부: 'psycho',
  화학과: 'science',
  수학과: 'science',
  경제학과: 'political',
  통계학과: 'political',
  생명공학부: 'bio',
  생명과학부: 'bio',
  정치외교학과: 'political',
  행정학과: 'political',
  신소재공학부: 'engineering',
  기계공학부: 'engineering',
  산업경영공학부: 'engineering',
  전기전자공학부: 'engineering',
  화공생명공학과: 'engineering',
  데이터과학과: 'info',
  스마트보안학부: 'smartsecurity',
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
  생명공학부: 'bioeng',
  생명과학부: 'lifesci',
  정치외교학과: 'political',
  행정학과: 'pubadmin',
  신소재공학부: 'materials',
  기계공학부: 'mechanical',
  산업경영공학부: 'industrial',
  전기전자공학부: 'electrical',
  화공생명공학과: 'chembio',
  데이터과학과: 'datasci',
  스마트보안학부: 'smartsec',
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
  bioeng: ['생명공학부', 'Biological Engineering'],
  lifesci: ['생명과학부', 'School of Life Sciences'],
  political: ['정치외교학과', 'Department of Political Science & International Relations'],
  pubadmin: ['행정학과', 'Department of Public Administration'],
  materials: ['신소재공학부', 'School of Materials Science & Engineering'],
  mechanical: ['기계공학부', 'School of Mechanical Engineering'],
  industrial: ['산업경영공학부', 'School of Industrial & Management Engineering'],
  electrical: ['전기전자공학부', 'School of Electrical Engineering'],
  chembio: ['화공생명공학과', 'Department of Chemical & Biological Engineering'],
  datasci: ['데이터과학과', 'Department of Data Science'],
  smartsec: ['스마트보안학부', 'Division of Smart Security'],
};

export const majorNmaeMappingByKr = {
  경영학과: 'Business School',
  경제학과: 'Department of Economics',
  심리학부: 'School of Psychology',
  통계학과: 'Department of Statistics',
  수학과: 'Department of Mathematics',
  화학과: 'Department of Chemistry',
  미디어학부: 'School of Media & Communication',
  식품자원경제학과: 'Department of Food & Resources',
  컴퓨터학과: 'Department of Computer Science & Engineering',
  생명공학부: 'Biological Engineering',
  생명과학부: 'School of Life Sciences',
  정치외교학과: 'Department of Political Science & International Relations',
  행정학과: 'Department of Public Administration',
  신소재공학부: 'School of Materials Science & Engineering',
  기계공학부: 'School of Mechanical Engineering',
  산업경영공학부: 'School of Industrial Management Engineering',
  전기전자공학부: 'School of Electrical Engineering',
  화공생명공학과: 'Department of Chemical & Biological Engineering',
  데이터과학과: 'Department of Data Science',
  스마트보안학부: 'Division of Smart Security',
};

/*
  학기
*/
// for archive detail page
const getSemesterMapping = () => {
  const today = new Date();
  let currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // getMonth() returns 0-based month

  let currentSemester;
  if (currentMonth >= 2 && currentMonth <= 7) {
    currentSemester = 1; // First semester (Spring)
  } else {
    currentSemester = 2; // Second semester (Fall)
  }

  const semesters = [];
  for (let i = 0; i < 4; i++) {
    // 지난 N 개 학기 수에 따라 i index 의 loop range 조정
    // Decrement the semester and year correctly
    if (currentSemester === 1) {
      currentSemester = 2;
      currentYear--;
    } else {
      currentSemester = 1;
    }

    const semesterString = `${currentYear}-${currentSemester}R`;
    semesters.push(semesterString);
  }

  semesters.unshift('모든 학기 누적'); // Add "전학기 누적" at the beginning
  return semesters;
};
export const semesterMapping: string[] = getSemesterMapping();

export const semesterAPIMapping: string[] = [
  'all',
  '2023-2',
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
  의과대학: { fill: '#99D88E', boxShadow: 'rgb(153, 216, 142, 0.5)' },
  정보대학: { fill: '#FFD35F', boxShadow: 'rgba(255, 211, 95, 0.5)' },
  미디어학부: { fill: '#EEA6BC', boxShadow: ' rgba(238, 166, 188, 0.5)' },
  스마트보안학부: { fill: '#F1A351', boxShadow: 'rgba(241, 163, 81, 0.5)' },
  문과대학: { fill: '#DFDFDF', boxShadow: 'rgba(223, 223, 223, 0.5)' },
  이과대학: { fill: '#7287AB', boxShadow: 'rgba(114, 135, 171, 0.5)' },
  사범대학: { fill: '#4C8ECC', boxShadow: 'rgb(76, 142, 204, 0.5)' },
  디자인조형학부: { fill: '#A667AE', boxShadow: 'rgba(166, 103, 174, 0.5)' },
  보건과학대학: { fill: '#E9808C', boxShadow: 'rgba(233, 128, 140, 0.5)' },
  심리학부: { fill: '#89D7E1', boxShadow: 'rgba(137, 215, 225, 0.5)' },
  생명과학대학: { fill: '#78BE94', boxShadow: 'rgba(120, 190, 148, 0.5)' },
  공과대학: { fill: '#FF8461', boxShadow: 'rgba(255, 132, 97, 0.5)' },
  간호대학: { fill: '#F5BDBD', boxShadow: 'rgba(245, 189, 189, 0.5)' },
  국제대학: { fill: '#58A2C6', boxShadow: ' rgba(88, 162, 198, 0.5)' },
  자유전공학부: { fill: '#7BBEEE', boxShadow: 'rgba(123, 190, 238, 0.5)' },
  스마트모빌리티학부: { fill: '#3F87F3', boxShadow: 'rgba(63, 135, 243, 0.5)' },
  기타: { fill: '#A8A8A8', boxShadow: 'rgb(168, 168, 168,0.5)' },
};

// 학번, fill
export const idColorMapping: { [key: number]: string } = {
  23: '#D85888',
  22: '#E57C90',
  21: '#FFAFBD',
  20: 'var(--SECONDARY, #FDF2F2)',
};

export const majorNameMappingBySID: Record<number, string> = {
  1000: '자유전공학부',
  1200: '경영학과',
  1300: '국어국문학과',
  1301: '영어영문학과',
  1302: '철학과',
  1303: '한국사학과',
  1304: '사학과',
  1305: '사회학과',
  1306: '독어독문학과',
  1307: '불어불문학과',
  1308: '중어중문학과',
  1309: '노어노문학과',
  1310: '일어일문학과',
  1311: '서어서문학과',
  1312: '한문학과',
  1314: '언어학과',
  1400: '생명과학부',
  1401: '생명공학부',
  1402: '식품공학과',
  1403: '환경생태공학부',
  1404: '식품자원경제학과',
  1500: '정치외교학과',
  1501: '경제학과',
  1502: '통계학과',
  1503: '행정학과',
  1600: '수학과',
  1601: '물리학과',
  1602: '화학과',
  1603: '지구환경과학과',
  1700: '화공생명공학과',
  1701: '신소재공학부',
  1702: '건축사회환경공학부',
  1703: '건축학과',
  1704: '기계공학부',
  1705: '산업경영공학부',
  1706: '전기전자공학부',
  1707: '반도체공학과',
  1708: '융합에너지공학과',
  1709: '차세대통신학과',
  1900: '교육학과',
  1901: '체육교육과',
  1902: '가정교육과',
  1903: '수학교육과',
  1904: '국어교육과',
  1905: '영어교육과',
  1906: '지리교육과',
  1907: '역사교육과',
  2000: '간호학과',
  2200: '디자인조형학부',
  2300: '국제학부',
  2301: '글로벌한국융합학부',
  2302: '글로벌자유학부',
  2400: '미디어학부',
  2500: '바이오의공학부',
  2501: '바이오시스템의과학부',
  2502: '보건환경융합과학부',
  2503: '보건정책관리학부',
  3200: '컴퓨터학과',
  3201: '데이터과학과',
  3400: '심리학부',
  3500: '사이버국방학과',
  3501: '스마트보안학부',
  4200: '스마트모빌리티학부',
};

export const idColorMappingShadow: { [key: number]: string } = {
  23: 'rgba(216, 88, 136, 0.5)',
  22: 'rgba(229, 124, 144, 0.5)',
  21: 'rgba(255, 175, 189, 0.5)',
  20: 'rgba(253, 242, 242, 0.5)',
};
