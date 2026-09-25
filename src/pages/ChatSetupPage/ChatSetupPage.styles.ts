import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

const Page = styled.main`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 24px;
  background: ${designTokens.colors.background};
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  padding: 32px;
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.surface};
  box-shadow: ${designTokens.shadow};

  @media (max-width: 480px) {
    padding: 28px 24px;
  }
`;

const Header = styled.header`
  margin-bottom: 28px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  color: ${designTokens.colors.text};
  font-size: 26px;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const Description = styled.p`
  margin: 0;
  color: ${designTokens.colors.secondaryText};
  font-size: 15px;
  line-height: 1.6;
`;

export { Card, Description, Header, Page, Title };
