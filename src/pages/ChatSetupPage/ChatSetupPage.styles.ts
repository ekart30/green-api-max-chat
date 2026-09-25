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
  max-width: 440px;
  padding: 40px;
  border: 1px solid ${designTokens.colors.border};
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.surface};
  box-shadow: 0 20px 50px rgb(23 33 30 / 8%);

  @media (max-width: 480px) {
    padding: 28px 24px;
  }
`;

const Header = styled.header`
  margin-bottom: 32px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 28px;
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
