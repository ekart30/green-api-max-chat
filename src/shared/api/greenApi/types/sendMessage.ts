type SendMessageRequest = {
  chatId: string;
  message: string;
};

type SendMessageResponse = {
  idMessage: string;
};

export type { SendMessageRequest, SendMessageResponse };
