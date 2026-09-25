type ReceiveNotificationResponse = {
  receiptId: number;
  body: unknown;
};

type IncomingTextMessage = {
  typeWebhook: 'incomingMessageReceived';
  idMessage: string;
  senderData: {
    chatId: string;
  };
  messageData: {
    typeMessage: 'textMessage';
    textMessageData: {
      textMessage: string;
    };
  };
};

export type { IncomingTextMessage, ReceiveNotificationResponse };
