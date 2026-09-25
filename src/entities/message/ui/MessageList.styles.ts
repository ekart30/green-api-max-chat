import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

import type { Message } from '../model/messageStore';

type MessageBubbleProps = {
  $direction: Message['direction'];
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 32px 0 0;
  padding: 24px 0 0;
  border-top: 1px solid ${designTokens.colors.border};
  list-style: none;
`;

const MessageBubble = styled.li<MessageBubbleProps>`
  max-width: 75%;
  align-self: ${({ $direction }) => ($direction === 'outgoing' ? 'flex-end' : 'flex-start')};
  padding: 10px 14px;
  border: 1px solid
    ${({ $direction }) =>
      $direction === 'outgoing' ? designTokens.colors.primary : designTokens.colors.border};
  border-radius: ${designTokens.borderRadius};
  background: ${({ $direction }) =>
    $direction === 'outgoing' ? designTokens.colors.primary : designTokens.colors.background};
  color: ${({ $direction }) =>
    $direction === 'outgoing' ? designTokens.colors.surface : designTokens.colors.text};
  line-height: 1.5;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

export { List, MessageBubble };
