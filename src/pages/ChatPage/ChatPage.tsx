import type { Session } from '@entities/session/model/sessionStore';
import { MessageList } from '@entities/message/ui/MessageList';
import { useReceiveMessages } from '@features/receiveMessages/model/useReceiveMessages';
import { MessageForm } from '@features/sendMessage/ui/MessageForm';

import { Card, ChatId, Page, PhoneNumber, Title } from './ChatPage.styles';

type ChatPageProps = {
  session: Session;
};

const ChatPage = ({ session }: ChatPageProps) => {
  useReceiveMessages(session);

  return (
    <Page>
      <Card>
        <Title>MAX Chat</Title>
        <PhoneNumber>{session.phoneNumber}</PhoneNumber>
        <ChatId>chatId: {session.chatId}</ChatId>

        <MessageList />
        <MessageForm session={session} />
      </Card>
    </Page>
  );
};

export { ChatPage };
