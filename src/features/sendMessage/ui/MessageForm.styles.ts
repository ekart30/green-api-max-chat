import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid ${designTokens.colors.border};
`;

const Field = styled.label`
  display: grid;
  gap: 8px;
  color: ${designTokens.colors.text};
  font-size: 14px;
  font-weight: 600;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 14px;
  border: 1px solid ${designTokens.colors.border};
  border-radius: ${designTokens.borderRadius};
  outline: none;
  background: ${designTokens.colors.surface};
  color: ${designTokens.colors.text};
  font-size: 15px;
  line-height: 1.5;
  resize: vertical;
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
`;

const ErrorMessage = styled.span`
  color: ${designTokens.colors.error};
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  min-width: 120px;
  height: 44px;
  justify-self: end;
  padding: 0 20px;
  border: 0;
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.primary};
  color: ${designTokens.colors.surface};
  font-weight: 700;
  cursor: pointer;
  transition:
    filter 160ms ease,
    opacity 160ms ease,
    transform 160ms ease;

  &:hover:not(:disabled) {
    filter: brightness(0.94);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export { ErrorMessage, Field, Form, SubmitButton, Textarea };
