import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Chat } from '@entities/chat/model/chatStore';
import { useMessageStore } from '@entities/message/model/messageStore';
import type { Session } from '@entities/session/model/sessionStore';

import { sendMessage } from '../api/sendMessage';
import { MessageForm } from './MessageForm';

vi.mock('../api/sendMessage', () => ({
  sendMessage: vi.fn(),
}));

const mockedSendMessage = vi.mocked(sendMessage);

const session: Session = {
  idInstance: '1234567890',
  apiTokenInstance: 'api-token',
};

const activeChat: Chat = {
  chatId: '10000000',
  phoneNumber: '+7 999 123-45-67',
};

describe('MessageForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useMessageStore.setState({
      messages: [],
    });
  });

  afterEach(() => {
    useMessageStore.setState({ messages: [] });
  });

  it('очищает поле после успешной отправки', async () => {
    const user = userEvent.setup();

    mockedSendMessage.mockResolvedValue({
      idMessage: 'message-id',
    });

    render(<MessageForm session={session} activeChat={activeChat} />);

    const messageField = screen.getByPlaceholderText('Сообщение');

    await user.type(messageField, 'Привет!');
    await user.click(
      screen.getByRole('button', {
        name: '↑',
      }),
    );

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

    render(<MessageForm session={session} activeChat={activeChat} />);

    await user.type(screen.getByPlaceholderText('Сообщение'), 'Привет!');

    await user.click(
      screen.getByRole('button', {
        name: '↑',
      }),
    );

    expect(await screen.findByText('Не удалось отправить сообщение')).toBeInTheDocument();
  });

  it('позволяет отправить несколько сообщений подряд', async () => {
    const user = userEvent.setup();

    mockedSendMessage
      .mockResolvedValueOnce({
        idMessage: 'message-1',
      })
      .mockResolvedValueOnce({
        idMessage: 'message-2',
      });

    render(<MessageForm session={session} activeChat={activeChat} />);

    const submitButton = screen.getByRole('button', {
      name: '↑',
    });

    const getMessageField = () => screen.getByPlaceholderText('Сообщение');

    await user.type(getMessageField(), 'Первое');
    await user.click(submitButton);

    await waitFor(() => {
      expect(getMessageField()).toHaveValue('');
      expect(submitButton).toBeEnabled();
    });

    await user.type(getMessageField(), 'Второе');

    expect(getMessageField()).toHaveValue('Второе');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedSendMessage).toHaveBeenCalledTimes(2);
    });

    expect(mockedSendMessage).toHaveBeenLastCalledWith({
      idInstance: '1234567890',
      apiTokenInstance: 'api-token',
      chatId: '10000000',
      message: 'Второе',
    });
  });

  it('отправляет сообщение по Enter', async () => {
    const user = userEvent.setup();

    mockedSendMessage.mockResolvedValue({
      idMessage: 'message-id',
    });

    render(<MessageForm session={session} activeChat={activeChat} />);

    await user.type(screen.getByPlaceholderText('Сообщение'), 'Сообщение по Enter{Enter}');

    await waitFor(() => {
      expect(mockedSendMessage).toHaveBeenCalledWith({
        idInstance: '1234567890',
        apiTokenInstance: 'api-token',
        chatId: '10000000',
        message: 'Сообщение по Enter',
      });
    });
  });

  it('не отправляет сообщение по Shift+Enter и оставляет перенос строки', async () => {
    const user = userEvent.setup();

    render(<MessageForm session={session} activeChat={activeChat} />);

    const messageField = screen.getByPlaceholderText('Сообщение');

    await user.type(messageField, 'Первая строка{Shift>}{Enter}{/Shift}Вторая строка');

    expect(mockedSendMessage).not.toHaveBeenCalled();
    expect(messageField).toHaveValue('Первая строка\nВторая строка');
  });
});
