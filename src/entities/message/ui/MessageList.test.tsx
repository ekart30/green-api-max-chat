import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useMessageStore } from '../model/messageStore';
import { MessageList } from './MessageList';

describe('MessageList', () => {
  afterEach(() => {
    useMessageStore.setState({ messages: [] });
  });

  it('отображает исходящее и входящее сообщения', () => {
    useMessageStore.setState({
      messages: [
        {
          id: 'outgoing-message-id',
          text: 'Исходящее сообщение',
          direction: 'outgoing',
        },
        {
          id: 'incoming-message-id',
          text: 'Входящее сообщение',
          direction: 'incoming',
        },
      ],
    });

    render(<MessageList />);

    expect(screen.getByText('Исходящее сообщение')).toBeInTheDocument();
    expect(screen.getByText('Входящее сообщение')).toBeInTheDocument();
  });
});
