const axiosConfigs = {
  development: {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
  },
  production: {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
  },
  test: {
    baseURL: '',
    timeout: 30000,
  },
};
const getAxiosConfig = () => {
  const nodeEnv: string = process.env.NODE_ENV;
  return axiosConfigs[nodeEnv as keyof typeof axiosConfigs];
};

const axiosConfig = getAxiosConfig();

export default axiosConfig;
