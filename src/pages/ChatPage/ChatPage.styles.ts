import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

import chatPattern from '/pattern.svg?url';

const Page = styled.main`
  display: grid;
  height: 100vh;
  place-items: center;
  overflow: hidden;
  background: ${designTokens.colors.surface};

  @media (max-width: 760px) {
    height: 100dvh;
  }
`;

const ChatLayout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: ${designTokens.colors.surface};

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Sidebar = styled.aside<{ $hasActiveChat: boolean }>`
  min-width: 0;
  padding: 22px 12px;
  background: ${designTokens.colors.sidebar};

  @media (max-width: 760px) {
    display: ${({ $hasActiveChat }) => ($hasActiveChat ? 'none' : 'block')};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px 24px;
`;

const SidebarTitle = styled.h1`
  margin: 0;
  color: ${designTokens.colors.text};
  font-size: 26px;
  line-height: 1.2;
  letter-spacing: -0.03em;
`;

const AddChatButton = styled.button`
  display: grid;
  height: 34px;
  place-items: center;
  padding: 0 12px;
  border: 0;
  border-radius: 50%;
  background: ${designTokens.colors.primary};
  color: ${designTokens.colors.accentText};
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition:
    filter 160ms ease,
    transform 160ms ease;

  &:hover {
    filter: brightness(0.94);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid ${designTokens.colors.focusRing};
    outline-offset: 2px;
  }
`;

const SelectedChat = styled.div`
  overflow: hidden;
  padding: 14px 16px;
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.selectedChat};
  color: ${designTokens.colors.text};
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Chat = styled.section<{ $hasActiveChat: boolean }>`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-width: 0;
  min-height: 0;
  background: ${designTokens.colors.background};

  @media (max-width: 760px) {
    display: ${({ $hasActiveChat }) => ($hasActiveChat ? 'grid' : 'none')};
  }
`;

const ChatBackground = styled.div`
  position: relative;
  isolation: isolate;
  min-height: 0;
  overflow: hidden;
  background-image: linear-gradient(
    28deg,
    ${designTokens.colors.chatBackgroundStart} 8.03%,
    ${designTokens.colors.chatBackgroundEnd} 91.51%
  );
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    background-image:
      url(${chatPattern}),
      linear-gradient(
        28deg,
        ${designTokens.colors.chatBackgroundStart} 8.03%,
        ${designTokens.colors.chatBackgroundEnd} 91.51%
      );
    background-repeat: repeat, no-repeat;
    background-position:
      top left,
      center;
    background-size: auto, cover;
    opacity: 0.06;
    pointer-events: none;
  }
`;

const ChatBody = styled(ChatBackground)`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
`;

const EmptyChat = styled(ChatBackground)`
  display: grid;
  grid-row: 1 / -1;
  place-items: center;
  padding: 24px;
`;

const EmptyStateText = styled.p`
  margin: 0;
  color: ${designTokens.colors.text};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
`;

const ChatHeader = styled.header`
  padding: 16px 24px;
  background: ${designTokens.colors.header};

  @media (max-width: 560px) {
    padding: 14px 16px;
  }
`;

const PhoneNumber = styled.h2`
  margin: 0;
  color: ${designTokens.colors.text};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`;

const ChatId = styled.p`
  margin: 3px 0 0;
  color: ${designTokens.colors.secondaryText};
  font-size: 12px;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

const MessagesArea = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 24px 24px 12px;
  overflow-y: auto;

  @media (max-width: 560px) {
    padding: 16px 16px 10px;
  }
`;

export {
  AddChatButton,
  Chat,
  ChatBody,
  ChatHeader,
  ChatId,
  ChatLayout,
  EmptyChat,
  EmptyStateText,
  MessagesArea,
  Page,
  PhoneNumber,
  SelectedChat,
  Sidebar,
  SidebarHeader,
  SidebarTitle,
};
