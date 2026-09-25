import { useMessageStore } from '../model/messageStore';
import { List, MessageBubble } from './MessageList.styles';

const MessageList = () => {
  const messages = useMessageStore((state) => state.messages);

  if (messages.length === 0) {
    return null;
  }

  return (
    <List>
      {messages.map((message) => (
        <MessageBubble key={message.id} $direction={message.direction}>
          {message.text}
        </MessageBubble>
      ))}
    </List>
  );
};

export { MessageList };
