import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px;
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.input};
`;

const Field = styled.label`
  display: grid;
  gap: 7px;
  color: ${designTokens.colors.text};
  font-size: 13px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 0;
  border-radius: ${designTokens.borderRadius};
  outline: none;
  background: ${designTokens.colors.surface};
  color: ${designTokens.colors.text};
  font-size: 14px;
  transition: box-shadow 160ms ease;

  &::placeholder {
    color: ${designTokens.colors.secondaryText};
    opacity: 0.7;
  }

  &:focus {
    box-shadow: 0 0 0 3px ${designTokens.colors.focusRing};
  }
`;

const ErrorMessage = styled.span`
  color: ${designTokens.colors.error};
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  height: 42px;
  border: 0;
  border-radius: ${designTokens.borderRadius};
  background: ${designTokens.colors.primary};
  color: ${designTokens.colors.accentText};
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

  &:focus-visible {
    outline: 3px solid ${designTokens.colors.focusRing};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export { ErrorMessage, Field, Form, Input, SubmitButton };
