import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: ${designTokens.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border: 1px solid ${designTokens.colors.border};
  border-radius: ${designTokens.borderRadius};
  outline: none;
  background: ${designTokens.colors.surface};
  color: ${designTokens.colors.text};
  font-size: 15px;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::placeholder {
    color: ${designTokens.colors.secondaryText};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${designTokens.colors.primary};
    box-shadow: 0 0 0 3px ${`${designTokens.colors.primary}1f`};
  }

  &[aria-invalid='true'] {
    border-color: ${designTokens.colors.error};
  }
`;

const ErrorMessage = styled.span`
  color: ${designTokens.colors.error};
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  height: 48px;
  margin-top: 4px;
  border: 0;
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.primary};
  color: ${designTokens.colors.surface};
  font-weight: 700;
  cursor: pointer;
  transition:
    filter 160ms ease,
    transform 160ms ease;

  &:hover {
    filter: brightness(0.94);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid ${`${designTokens.colors.primary}33`};
    outline-offset: 2px;
  }
`;

export { ErrorMessage, Field, Form, Input, SubmitButton };
