import { useEffect } from 'react';

import { useMessageStore } from '@entities/message/model/messageStore';
import { type Session } from '@entities/session/model/sessionStore';

import { receiveMessage } from '../api/receiveMessage';

const useReceiveMessages = (session: Session) => {
  const addMessage = useMessageStore((state) => state.addMessage);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const poll = async () => {
      try {
        while (!signal.aborted) {
          const message = await receiveMessage({
            idInstance: session.idInstance,
            apiTokenInstance: session.apiTokenInstance,
            chatId: session.chatId,
            signal,
          });

          if (message && !signal.aborted) {
            addMessage(message);
          }
        }
      } catch {
        if (signal.aborted) {
          return;
        }
      }
    };

    void poll();

    return () => {
      controller.abort();
    };
  }, [addMessage, session]);
};

export { useReceiveMessages };
