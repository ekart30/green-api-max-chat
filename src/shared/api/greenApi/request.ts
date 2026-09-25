import axios, { type AxiosRequestConfig } from 'axios';

import { GREEN_API_URL } from '@shared/config/env';

const httpClient = axios.create({
  baseURL: GREEN_API_URL,
});

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const { data } = await httpClient.request<T>(config);

  return data;
};

export { request };
