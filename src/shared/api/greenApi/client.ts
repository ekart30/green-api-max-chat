import { request } from './request';
import type {
  CheckAccountRequest,
  CheckAccountResponse,
  DeleteNotificationResponse,
  GreenApiCredentials,
  ReceiveNotificationResponse,
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

  const receiveNotification = () =>
    request<ReceiveNotificationResponse>({
      method: 'GET',
      url: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    });

  const deleteNotification = (receiptId: number) =>
    request<DeleteNotificationResponse>({
      method: 'DELETE',
      url: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    });

  return {
    checkAccount,
    sendMessage,
    receiveNotification,
    deleteNotification,
  };
};

export { createGreenApiClient };
