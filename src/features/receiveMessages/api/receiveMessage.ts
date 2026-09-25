import type { Message } from '@entities/message/model/messageStore';
import { createGreenApiClient } from '@shared/api/greenApi/client';

import { isIncomingTextMessage } from '../lib/isIncomingTextMessage';

type ReceiveMessageParams = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
};

const receiveMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
}: ReceiveMessageParams): Promise<Message | null> => {
  const client = createGreenApiClient({ idInstance, apiTokenInstance });
  const notification = await client.receiveNotification();

  if (notification === null) {
    return null;
  }

  const { body, receiptId } = notification;

  try {
    if (!isIncomingTextMessage(body)) {
      return null;
    }

    if (body.senderData.chatId !== chatId) {
      return null;
    }

    return {
      id: body.idMessage,
      text: body.messageData.textMessageData.textMessage,
      direction: 'incoming',
    };
  } finally {
    await client.deleteNotification(receiptId);
  }
};

export { receiveMessage };
