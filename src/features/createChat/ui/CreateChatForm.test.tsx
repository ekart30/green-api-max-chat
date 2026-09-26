import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useChatStore } from '@entities/chat/model/chatStore';
import type { Session } from '@entities/session/model/sessionStore';

import { createChat } from '../api/createChat';
import { CreateChatForm } from './CreateChatForm';

vi.mock('../api/createChat', () => ({
  createChat: vi.fn(),
}));

const mockedCreateChat = vi.mocked(createChat);

const session: Session = {
  idInstance: '1234567890',
  apiTokenInstance: 'api-token',
};

describe('CreateChatForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useChatStore.setState({ activeChat: null });
  });

  afterEach(() => {
    useChatStore.setState({ activeChat: null });
  });

  it('не отправляет форму с пустым номером телефона', async () => {
    const user = userEvent.setup();

    render(<CreateChatForm session={session} />);

    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(await screen.findByText('Введите номер телефона')).toBeInTheDocument();
    expect(mockedCreateChat).not.toHaveBeenCalled();
  });

  it('передаёт credentials из session при проверке аккаунта', async () => {
    const user = userEvent.setup();

    mockedCreateChat.mockResolvedValue({
      exist: true,
      chatId: '10000000',
      fromCache: false,
    });

    render(<CreateChatForm session={session} />);

    await user.type(screen.getByLabelText('Номер телефона'), '+7 999 123-45-67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    await waitFor(() => {
      expect(mockedCreateChat).toHaveBeenCalledWith({
        idInstance: '1234567890',
        apiTokenInstance: 'api-token',
        phoneNumber: '+7 999 123-45-67',
      });
    });
  });

  it('показывает ошибку, если аккаунт не найден', async () => {
    const user = userEvent.setup();

    mockedCreateChat.mockResolvedValue({
      exist: false,
      chatId: '',
      fromCache: false,
    });

    render(<CreateChatForm session={session} />);

    await user.type(screen.getByLabelText('Номер телефона'), '+7 999 123-45-67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(await screen.findByText('Аккаунт MAX с таким номером не найден')).toBeInTheDocument();
    expect(useChatStore.getState().activeChat).toBeNull();
  });

  it('сохраняет созданный чат в chatStore', async () => {
    const user = userEvent.setup();

    mockedCreateChat.mockResolvedValue({
      exist: true,
      chatId: '10000000',
      fromCache: false,
    });

    render(<CreateChatForm session={session} />);

    await user.type(screen.getByLabelText('Номер телефона'), '+7 999 123-45-67');
    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    await waitFor(() => {
      expect(useChatStore.getState().activeChat).toEqual({
        chatId: '10000000',
        phoneNumber: '+7 999 123-45-67',
      });
    });
  });
});
