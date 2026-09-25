import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Message } from '@entities/message/model/messageStore';
import { useMessageStore } from '@entities/message/model/messageStore';
import type { Session } from '@entities/session/model/sessionStore';

import { receiveMessage } from '../api/receiveMessage';
import { useReceiveMessages } from './useReceiveMessages';

vi.mock('../api/receiveMessage', () => ({
  receiveMessage: vi.fn(),
}));

const mockedReceiveMessage = vi.mocked(receiveMessage);

const pendingReceiveMessage = () => new Promise<Message | null>(() => undefined);

const session: Session = {
  idInstance: '1234567890',
  apiTokenInstance: 'api-token',
  chatId: '10000000',
  phoneNumber: '+7 999 123-45-67',
};

describe('useReceiveMessages', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    useMessageStore.setState({
      messages: [],
    });
  });

  afterEach(() => {
    useMessageStore.setState({ messages: [] });
  });

  it('добавляет полученное сообщение в messageStore', async () => {
    const message: Message = {
      id: 'incoming-message-id',
      text: 'Входящее сообщение',
      direction: 'incoming',
    };

    mockedReceiveMessage.mockResolvedValueOnce(message).mockImplementation(pendingReceiveMessage);

    const { unmount } = renderHook(() => useReceiveMessages(session));

    await waitFor(() => {
      expect(useMessageStore.getState().messages).toEqual([message]);
    });

    unmount();
  });

  it('не добавляет сообщение при результате null', async () => {
    mockedReceiveMessage.mockResolvedValueOnce(null).mockImplementation(pendingReceiveMessage);

    const { unmount } = renderHook(() => useReceiveMessages(session));

    await waitFor(() => {
      expect(mockedReceiveMessage).toHaveBeenCalledTimes(2);
    });

    expect(useMessageStore.getState().messages).toEqual([]);

    unmount();
  });

  it('прерывает активный polling при cleanup', async () => {
    let activeSignal: AbortSignal | undefined;

    mockedReceiveMessage.mockImplementation(({ signal }) => {
      activeSignal = signal;

      return new Promise((_, reject) => {
        signal?.addEventListener(
          'abort',
          () => {
            reject(new DOMException('Aborted', 'AbortError'));
          },
          { once: true },
        );
      });
    });

    const { unmount } = renderHook(() => useReceiveMessages(session));

    await waitFor(() => {
      expect(activeSignal).toBeDefined();
    });

    unmount();

    expect(activeSignal?.aborted).toBe(true);
  });
});
