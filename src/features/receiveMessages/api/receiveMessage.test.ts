import { beforeEach, describe, expect, it, vi } from 'vitest';

import type {
  DeleteNotificationResponse,
  ReceiveNotificationResponse,
} from '@shared/api/greenApi/types';

import { receiveMessage } from './receiveMessage';

const clientMocks = vi.hoisted(() => {
  const receiveNotification = vi.fn<() => Promise<ReceiveNotificationResponse | null>>();
  const deleteNotification = vi.fn<(receiptId: number) => Promise<DeleteNotificationResponse>>();

  return {
    createGreenApiClient: vi.fn(() => ({
      receiveNotification,
      deleteNotification,
    })),
    deleteNotification,
    receiveNotification,
  };
});

vi.mock('@shared/api/greenApi/client', () => ({
  createGreenApiClient: clientMocks.createGreenApiClient,
}));

const receiveMessageParams = {
  idInstance: '1234567890',
  apiTokenInstance: 'api-token',
  chatId: '10000000',
};

const incomingTextBody = {
  typeWebhook: 'incomingMessageReceived',
  idMessage: 'incoming-message-id',
  senderData: {
    chatId: receiveMessageParams.chatId,
  },
  messageData: {
    typeMessage: 'textMessage',
    textMessageData: {
      textMessage: 'Входящее сообщение',
    },
  },
};

describe('receiveMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clientMocks.deleteNotification.mockResolvedValue({ result: true, reason: '' });
  });

  it('возвращает null и не удаляет уведомление при пустом ответе', async () => {
    clientMocks.receiveNotification.mockResolvedValue(null);

    await expect(receiveMessage(receiveMessageParams)).resolves.toBeNull();
    expect(clientMocks.deleteNotification).not.toHaveBeenCalled();
  });

  it('возвращает входящее текстовое сообщение текущего чата и удаляет уведомление', async () => {
    clientMocks.receiveNotification.mockResolvedValue({
      receiptId: 42,
      body: incomingTextBody,
    });

    await expect(receiveMessage(receiveMessageParams)).resolves.toEqual({
      id: 'incoming-message-id',
      text: 'Входящее сообщение',
      direction: 'incoming',
    });
    expect(clientMocks.deleteNotification).toHaveBeenCalledWith(42);
  });

  it('возвращает null для уведомления другого типа, но удаляет его', async () => {
    clientMocks.receiveNotification.mockResolvedValue({
      receiptId: 43,
      body: {
        typeWebhook: 'outgoingMessageReceived',
      },
    });

    await expect(receiveMessage(receiveMessageParams)).resolves.toBeNull();
    expect(clientMocks.deleteNotification).toHaveBeenCalledWith(43);
  });

  it('возвращает null для сообщения другого чата, но удаляет уведомление', async () => {
    clientMocks.receiveNotification.mockResolvedValue({
      receiptId: 44,
      body: {
        ...incomingTextBody,
        senderData: {
          chatId: '20000000',
        },
      },
    });

    await expect(receiveMessage(receiveMessageParams)).resolves.toBeNull();
    expect(clientMocks.deleteNotification).toHaveBeenCalledWith(44);
  });
});
