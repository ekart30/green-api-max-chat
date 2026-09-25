import type { IncomingTextMessage } from '@shared/api/greenApi/types';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isIncomingTextMessage = (value: unknown): value is IncomingTextMessage => {
  if (!isObject(value)) {
    return false;
  }

  const { typeWebhook, idMessage, senderData, messageData } = value;

  if (typeWebhook !== 'incomingMessageReceived' || typeof idMessage !== 'string') {
    return false;
  }

  if (!isObject(senderData) || typeof senderData.chatId !== 'string') {
    return false;
  }

  if (!isObject(messageData) || messageData.typeMessage !== 'textMessage') {
    return false;
  }

  const { textMessageData } = messageData;

  if (!isObject(textMessageData) || typeof textMessageData.textMessage !== 'string') {
    return false;
  }

  return true;
};

export { isIncomingTextMessage };
