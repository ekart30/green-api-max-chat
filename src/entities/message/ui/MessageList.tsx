import { useEffect, useRef } from 'react';

import { useMessageStore } from '../model/messageStore';
import { List, MessageBubble } from './MessageList.styles';

const MessageList = () => {
  const messages = useMessageStore((state) => state.messages);
  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView?.({ block: 'end' });
  }, [messages.length]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <List>
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          ref={index === messages.length - 1 ? lastMessageRef : undefined}
          $direction={message.direction}
        >
          {message.text}
        </MessageBubble>
      ))}
    </List>
  );
};

export { MessageList };
