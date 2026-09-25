import { useSessionStore } from '@entities/session/model/sessionStore';
import { ChatPage } from '@pages/ChatPage/ChatPage';
import { ChatSetupPage } from '@pages/ChatSetupPage/ChatSetupPage';

import { GlobalStyle } from './styles/GlobalStyle';

const App = () => {
  const session = useSessionStore((state) => state.session);

  return (
    <>
      <GlobalStyle />
      {session === null ? <ChatSetupPage /> : <ChatPage session={session} />}
    </>
  );
};

export { App };
