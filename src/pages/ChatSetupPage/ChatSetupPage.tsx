import { SessionSetupForm } from '@features/setupSession/ui/SessionSetupForm';

import { Card, Description, Header, Page, Title } from './ChatSetupPage.styles';

const ChatSetupPage = () => {
  return (
    <Page>
      <Card>
        <Header>
          <Title>GREEN-API MAX Chat</Title>
          <Description>Укажите данные инстанса, чтобы подключиться к приложению.</Description>
        </Header>

        <SessionSetupForm />
      </Card>
    </Page>
  );
};

export { ChatSetupPage };
