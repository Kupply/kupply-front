import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Banner05Props extends React.ComponentPropsWithoutRef<'div'> {
  major?: string;
}

function Banner05(props: Banner05Props) {
  const { major = '경영학과' } = props;
  const departments = [
    {
      department: '경영대학',
      majors: ['경영학과'],
      engNames: [['Business School']],
      image: '../../../designImage/mobile/banner/Banner5_1.png',
    },
    {
      department: '공과대학',
      majors: ['기계공학부', '산업경영공학부', '신소재공학부', '전기전자공학부', '화공생명공학과'],
      engNames: [
        ['School of', 'Mechanical Engineering'],
        ['College of Engineering Industrial', '& Management Engineering'],
        ['School of Materials', 'Science & Engineering'],
        ['School of', 'Electrical Engineering'],
        ['Department of Chemical', '& Biological Engineering'],
      ],
      image: '../../../designImage/mobile/banner/Banner5_2.png',
    },
    {
      department: '미디어학부',
      majors: ['미디어학부'],
      engNames: [['School of', 'Media & Communication']],
      image: '../../../designImage/mobile/banner/Banner5_3.png',
    },
    {
      department: '생명과학대학',
      majors: ['생명공학부', '생명과학부', '식품자원경제학과'],
      engNames: [['Biological Engineering'], ['School of Life Science'], ['Department of', 'Food & Resources']],
      image: '../../../designImage/mobile/banner/Banner5_4.png',
    },
    {
      department: '스마트보안학부',
      majors: ['스마트보안학부'],
      engNames: [['Division of', 'Smart Security']],
      image: '../../../designImage/mobile/banner/Banner5_5.png',
    },
    {
      department: '심리학부',
      majors: ['심리학부'],
      engNames: [['School of Psychology']],
      image: '../../../designImage/mobile/banner/Banner5_6.png',
    },
    {
      department: '이과대학',
      majors: ['수학과', '화학과'],
      engNames: [
        ['Department of', 'Mathematics'],
        ['Department of', 'chemistry'],
      ],
      image: '../../../designImage/mobile/banner/Banner5_7.png',
    },
    {
      department: '정경대학',
      majors: ['경제학과', '정치외교학과', '통계학과', '행정학과'],
      engNames: [
        ['Department of', 'Economics'],
        ['Department of Political Science', '& International Relations'],
        ['Department of Statistics'],
        ['Department of', 'Public Administration'],
      ],
      image: '../../../designImage/mobile/banner/Banner5_8.png',
    },
    {
      department: '정보대학',
      majors: ['데이터과학과', '컴퓨터학과'],
      engNames: [
        ['Department of', 'Data Science'],
        ['Department of Computer', 'Science & Engineering'],
      ],
      image: '../../../designImage/mobile/banner/Banner5_9.png',
    },
  ];
  const departmentIndex = departments.findIndex((dept) => dept.majors.includes(major));
  const majorIndex = departments[departmentIndex].majors.findIndex((majorName) => majorName === major);

  return (
    <MainWrapper departments={departments} departmentIndex={departmentIndex}>
      <Typography size="5.56vw" bold="700" style={{ lineHeight: '120%' }}>
        {major}
      </Typography>
      <Typography
        size={
          major === '미디어학과' || major === '식품자원경제학과'
            ? '3.61vw'
            : major === '컴퓨터학과' || major === '화공생명공학과'
            ? '3.33vw'
            : major === '산업경영공학부' || major === '정치외교학과'
            ? '3.06vw'
            : '3.89vw'
        }
        bold="500"
        style={{ lineHeight: '120%' }}
      >
        {departments[departmentIndex].engNames[majorIndex].map((sentence, sentenceIndex) => (
          <div key={sentenceIndex}>{sentence}</div>
        ))}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{
  departments: { department: string; majors: string[]; engNames: string[][]; image: string }[];
  departmentIndex: number;
}>`
  width: 49.44vw;
  height: 23.61vw;
  padding: 9.72vw 0 0 41.67vw;
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
  border-radius: 2.78vw;
  background-image: url(${(props) => props.departments[props.departmentIndex].image});
  background-size: cover;
`;

export default Banner05;
