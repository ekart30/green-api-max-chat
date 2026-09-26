import { useSessionStore } from '@entities/session/model/sessionStore';
import { ChatPage } from '@pages/ChatPage/ChatPage';
import { ChatSetupPage } from '@pages/ChatSetupPage/ChatSetupPage';

import { GlobalStyle } from './styles/GlobalStyle';
import { useChatStore } from '@entities/chat/model/chatStore';

const App = () => {
  const activeChat = useChatStore((state) => state.activeChat);
  const session = useSessionStore((state) => state.session);

  return (
    <>
      <GlobalStyle />
      {session === null ? (
        <ChatSetupPage />
      ) : (
        <ChatPage session={session} activeChat={activeChat} />
      )}
    </>
  );
};

export { App };
