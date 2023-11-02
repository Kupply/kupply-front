import axios from 'axios';

export const refresh = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const res = await axios.post(
      'https://api.kupply.devkor.club/auth/refreshAccessToken',
      { accessToken: accessToken },
      { headers: { Authorization: `Bearer ${refreshToken}` }, withCredentials: true },
    );
    if (res.data.data.accessToken) {
      localStorage.setItem('accessToken', res.data.data.accessToken);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');

  return false;
};

const client = axios.create({
  baseURL: 'https://api.kupply.devkor.club',
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error', error);
    if (error.response && error.response.status === 401) {
      const refreshSuccess = await refresh();
      if (refreshSuccess) {
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return client.request(originalRequest);
      }
      localStorage.clear();
      alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
      window.location.href = '/login';
    } else return error.response;
  },
);

export default client;
