import { request } from './request';
import type {
  CheckAccountRequest,
  CheckAccountResponse,
  GreenApiCredentials,
  SendMessageRequest,
  SendMessageResponse,
} from './types';

const createGreenApiClient = ({ idInstance, apiTokenInstance }: GreenApiCredentials) => {
  const checkAccount = ({ phoneNumber }: CheckAccountRequest) =>
    request<CheckAccountResponse>({
      method: 'POST',
      url: `/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
      data: {
        phoneNumber,
      },
    });

  const sendMessage = ({ chatId, message }: SendMessageRequest) =>
    request<SendMessageResponse>({
      method: 'POST',
      url: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      data: {
        chatId,
        message,
      },
    });

  return {
    checkAccount,
    sendMessage,
  };
};

export { createGreenApiClient };
