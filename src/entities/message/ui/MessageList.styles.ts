import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

import type { Message } from '../model/messageStore';

type MessageBubbleProps = {
  $direction: Message['direction'];
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: auto 0 0;
  padding: 0;
  list-style: none;
`;

const MessageBubble = styled.li<MessageBubbleProps>`
  max-width: min(72%, 560px);
  align-self: ${({ $direction }) => ($direction === 'outgoing' ? 'flex-end' : 'flex-start')};
  padding: 9px 13px;
  border-radius: 16px;
  background: ${({ $direction }) =>
    $direction === 'outgoing'
      ? designTokens.colors.outgoingMessage
      : designTokens.colors.incomingMessage};
  color: ${({ $direction }) =>
    $direction === 'outgoing' ? designTokens.colors.accentText : designTokens.colors.text};
  font-size: 15px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  white-space: pre-wrap;

  @media (max-width: 560px) {
    max-width: 86%;
  }
`;

export { List, MessageBubble };
