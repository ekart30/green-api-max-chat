import { useSessionStore } from '@entities/session/model/sessionStore';
import { MessageForm } from '@features/sendMessage/ui/MessageForm';

import { Card, ChatId, Page, PhoneNumber, Title } from './ChatPage.styles';

const ChatPage = () => {
  const session = useSessionStore((state) => state.session);

  if (session === null) {
    return null;
  }

  return (
    <Page>
      <Card>
        <Title>MAX Chat</Title>
        <PhoneNumber>{session.phoneNumber}</PhoneNumber>
        <ChatId>chatId: {session.chatId}</ChatId>
        <MessageForm />
      </Card>
    </Page>
  );
};

export { ChatPage };
