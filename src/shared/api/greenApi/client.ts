import { request } from './request';
import type { CheckAccountRequest, CheckAccountResponse, GreenApiCredentials } from './types';

const createGreenApiClient = ({ idInstance, apiTokenInstance }: GreenApiCredentials) => {
  const checkAccount = ({ phoneNumber }: CheckAccountRequest) =>
    request<CheckAccountResponse>({
      method: 'POST',
      url: `/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
      data: {
        phoneNumber,
      },
    });

  return {
    checkAccount,
  };
};

export { createGreenApiClient };
