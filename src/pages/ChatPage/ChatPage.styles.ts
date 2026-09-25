import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

const Page = styled.main`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
`;

const Card = styled.section`
  width: 100%;
  max-width: 720px;
  padding: 32px;
  border: 1px solid ${designTokens.colors.border};
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.surface};
  box-shadow: 0 20px 50px rgb(23 33 30 / 8%);

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const PhoneNumber = styled.p`
  margin: 24px 0 8px;
  font-size: 18px;
  font-weight: 600;
`;

const ChatId = styled.p`
  margin: 0;
  color: ${designTokens.colors.secondaryText};
  font-size: 13px;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

export { Card, ChatId, Page, PhoneNumber, Title };
