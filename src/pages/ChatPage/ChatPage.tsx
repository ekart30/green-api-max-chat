import type { Session } from '@entities/session/model/sessionStore';
import { MessageList } from '@entities/message/ui/MessageList';
import { useReceiveMessages } from '@features/receiveMessages/model/useReceiveMessages';
import { MessageForm } from '@features/sendMessage/ui/MessageForm';

import {
  Chat,
  ChatBody,
  ChatHeader,
  ChatId,
  ChatLayout,
  MessagesArea,
  Page,
  PhoneNumber,
  SelectedChat,
  Sidebar,
  SidebarTitle,
} from './ChatPage.styles';

type ChatPageProps = {
  session: Session;
};

const ChatPage = ({ session }: ChatPageProps) => {
  useReceiveMessages(session);

  return (
    <Page>
      <ChatLayout>
        <Sidebar>
          <SidebarTitle>Чаты</SidebarTitle>
          <SelectedChat>{session.phoneNumber}</SelectedChat>
        </Sidebar>

        <Chat>
          <ChatHeader>
            <PhoneNumber>{session.phoneNumber}</PhoneNumber>
            <ChatId>chatId: {session.chatId}</ChatId>
          </ChatHeader>

          <ChatBody>
            <MessagesArea>
              <MessageList />
            </MessagesArea>

            <MessageForm session={session} />
          </ChatBody>
        </Chat>
      </ChatLayout>
    </Page>
  );
};

export { ChatPage };
