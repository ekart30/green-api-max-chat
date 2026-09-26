import { useState } from 'react';

import type { Chat as ActiveChat } from '@entities/chat/model/chatStore';
import type { Session } from '@entities/session/model/sessionStore';
import { MessageList } from '@entities/message/ui/MessageList';
import { CreateChatForm } from '@features/createChat/ui/CreateChatForm';
import { useReceiveMessages } from '@features/receiveMessages/model/useReceiveMessages';
import { MessageForm } from '@features/sendMessage/ui/MessageForm';

import {
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
} from './ChatPage.styles';

type ChatPageProps = {
  session: Session;
  activeChat: ActiveChat | null;
};

const ChatPage = ({ session, activeChat }: ChatPageProps) => {
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);

  useReceiveMessages(session, activeChat);

  const handleCreateChatToggle = () => {
    setIsCreateChatOpen((isOpen) => !isOpen);
  };

  return (
    <Page>
      <ChatLayout>
        <Sidebar $hasActiveChat={activeChat !== null}>
          <SidebarHeader>
            <SidebarTitle>Чаты</SidebarTitle>
            {activeChat === null && (
              <AddChatButton type="button" onClick={handleCreateChatToggle}>
                +
              </AddChatButton>
            )}
          </SidebarHeader>

          {isCreateChatOpen && activeChat === null && <CreateChatForm session={session} />}

          {activeChat !== null && <SelectedChat>{activeChat.phoneNumber}</SelectedChat>}
        </Sidebar>

        <Chat $hasActiveChat={activeChat !== null}>
          {activeChat === null ? (
            <EmptyChat>
              <EmptyStateText>Создайте чат, чтобы начать переписку</EmptyStateText>
            </EmptyChat>
          ) : (
            <>
              <ChatHeader>
                <PhoneNumber>{activeChat.phoneNumber}</PhoneNumber>
                <ChatId>chatId: {activeChat.chatId}</ChatId>
              </ChatHeader>

              <ChatBody>
                <MessagesArea>
                  <MessageList />
                </MessagesArea>

                <MessageForm session={session} activeChat={activeChat} />
              </ChatBody>
            </>
          )}
        </Chat>
      </ChatLayout>
    </Page>
  );
};

export { ChatPage };
