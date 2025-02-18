import { useQuery, useQueries } from 'react-query';
import client from '../utils/HttpClient';

const fetchPastApplyData = async (majorName: string, semester: string) => {
  if (!majorName || !semester) {
    throw new Error('Major name and semester are required');
  }

  // console.log(`time: ${new Date().toLocaleTimeString()} / fetching ${majorName} ${semester}`);
  const response = await client.get(`/pastData/${majorName}/${semester}`);
  return response.data;
};

export const usePastApplyData = (majorName: string, semester: string) => {
  return useQuery(['majorData', majorName, semester], () => fetchPastApplyData(majorName, semester), {
    enabled: !!majorName && !!semester, // 둘 없으면 fetch 안함
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000, // 캐시 시간 60분
    retry: 2,
    refetchOnWindowFocus: false, // Avoid refetching on window focus
  });
};
