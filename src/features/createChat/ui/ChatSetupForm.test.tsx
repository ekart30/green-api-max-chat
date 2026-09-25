import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ChatSetupForm } from './ChatSetupForm';

const renderChatSetupForm = () => {
  return render(<ChatSetupForm />);
};

describe('ChatSetupForm', () => {
  it('показывает ошибки обязательных полей после отправки пустой формы', async () => {
    const user = userEvent.setup();
    renderChatSetupForm();

    await user.click(screen.getByRole('button', { name: 'Создать чат' }));

    expect(await screen.findByText('Введите ID Instance')).toBeInTheDocument();
    expect(await screen.findByText('Введите API Token Instance')).toBeInTheDocument();
    expect(await screen.findByText('Введите номер телефона')).toBeInTheDocument();
  });

  it('убирает ошибку заполненного поля после повторной отправки формы', async () => {
    const user = userEvent.setup();
    renderChatSetupForm();

    const submitButton = screen.getByRole('button', { name: 'Создать чат' });

    await user.click(submitButton);
    expect(await screen.findByText('Введите ID Instance')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: /^ID Instance/ }), '1234567890');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Введите ID Instance')).not.toBeInTheDocument();
    });
  });
});
