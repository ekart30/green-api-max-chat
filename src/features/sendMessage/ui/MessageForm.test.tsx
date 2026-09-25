import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMessageStore } from '@entities/message/model/messageStore';
import { useSessionStore } from '@entities/session/model/sessionStore';

import { sendMessage } from '../api/sendMessage';
import { MessageForm } from './MessageForm';

vi.mock('../api/sendMessage', () => ({
  sendMessage: vi.fn(),
}));

const mockedSendMessage = vi.mocked(sendMessage);

describe('MessageForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSessionStore.setState({
      session: {
        idInstance: '1234567890',
        apiTokenInstance: 'api-token',
        chatId: '10000000',
        phoneNumber: '+7 999 123-45-67',
      },
    });
  });

  afterEach(() => {
    useSessionStore.setState({ session: null });
    useMessageStore.setState({ messages: [] });
  });

  it('очищает поле после успешной отправки', async () => {
    const user = userEvent.setup();
    mockedSendMessage.mockResolvedValue({ idMessage: 'message-id' });
    render(<MessageForm />);

    const messageField = screen.getByRole('textbox', { name: 'Сообщение' });

    await user.type(messageField, 'Привет!');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));

    await waitFor(() => {
      expect(mockedSendMessage).toHaveBeenCalledWith({
        idInstance: '1234567890',
        apiTokenInstance: 'api-token',
        chatId: '10000000',
        message: 'Привет!',
      });
      expect(useMessageStore.getState().messages).toEqual([
        {
          id: 'message-id',
          text: 'Привет!',
          direction: 'outgoing',
        },
      ]);
      expect(messageField).toHaveValue('');
    });
  });

  it('показывает ошибку при неудачной отправке', async () => {
    const user = userEvent.setup();
    mockedSendMessage.mockRejectedValue(new Error('Request failed'));
    render(<MessageForm />);

    await user.type(screen.getByRole('textbox', { name: 'Сообщение' }), 'Привет!');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));

    expect(await screen.findByText('Не удалось отправить сообщение')).toBeInTheDocument();
  });
});
