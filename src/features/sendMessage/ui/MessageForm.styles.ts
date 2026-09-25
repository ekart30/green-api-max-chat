import { designTokens } from '@app/styles/tokens';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px;
  width: calc(100% - 48px);
  max-width: 840px;
  margin: 0 auto 16px;
  padding: 6px 6px 6px 16px;
  border: 0;
  border-radius: 24px;
  background: ${designTokens.colors.surface};
  box-shadow: 0 8px 28px rgb(21 23 26 / 14%);

  @media (max-width: 560px) {
    width: calc(100% - 24px);
    margin-bottom: 12px;
    padding-left: 12px;
  }
`;

const Field = styled.div`
  flex: 1;
  min-width: 0;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 44px;
  min-height: 44px;
  max-height: 144px;
  padding: 11px 4px;
  border: 0;
  outline: none;
  background: transparent;
  color: ${designTokens.colors.text};
  font-size: 15px;
  line-height: 22px;
  overflow-y: hidden;
  resize: none;

  &::placeholder {
    color: ${designTokens.colors.secondaryText};
    opacity: 1;
  }
`;

const ErrorMessage = styled.span`
  flex-basis: 100%;
  padding: 0 8px 4px;
  color: ${designTokens.colors.error};
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  display: grid;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: ${designTokens.colors.primary};
  color: ${designTokens.colors.accentText};
  font-size: 22px;
  font-weight: 600;
  line-height: 1;
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
