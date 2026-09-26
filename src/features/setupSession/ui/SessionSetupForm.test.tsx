import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useSessionStore } from '@entities/session/model/sessionStore';

import { SessionSetupForm } from './SessionSetupForm';

describe('SessionSetupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useSessionStore.setState({ session: null });
  });

  afterEach(() => {
    useSessionStore.setState({ session: null });
  });

  it('не отправляет форму с пустыми credentials', async () => {
    const user = userEvent.setup();

    render(<SessionSetupForm />);

    await user.click(screen.getByRole('button', { name: 'Продолжить' }));

    expect(await screen.findByText('Введите ID Instance')).toBeInTheDocument();
    expect(await screen.findByText('Введите API Token Instance')).toBeInTheDocument();
    expect(useSessionStore.getState().session).toBeNull();
  });

  it('сохраняет валидные credentials без запроса к CheckAccount', async () => {
    const user = userEvent.setup();

    render(<SessionSetupForm />);

    await user.type(screen.getByLabelText('ID Instance'), '1234567890');
    await user.type(screen.getByLabelText('API Token Instance'), 'api-token');
    await user.click(screen.getByRole('button', { name: 'Продолжить' }));

    await waitFor(() => {
      expect(useSessionStore.getState().session).toEqual({
        idInstance: '1234567890',
        apiTokenInstance: 'api-token',
      });
    });
  });
});
