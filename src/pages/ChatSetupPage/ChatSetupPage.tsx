import { ChatSetupForm } from '@features/createChat/ui/ChatSetupForm';

import { Card, Description, Header, Page, Title } from './ChatSetupPage.styles';

const ChatSetupPage = () => {
  return (
    <Page>
      <Card>
        <Header>
          <Title>GREEN-API MAX Chat</Title>
          <Description>
            Укажите данные инстанса и номер телефона, чтобы подключиться к чату.
          </Description>
        </Header>

        <ChatSetupForm />
      </Card>
    </Page>
  );
};

export { ChatSetupPage };
