import { zodResolver } from '@hookform/resolvers/zod';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useMessageStore } from '@entities/message/model/messageStore';
import { type Session } from '@entities/session/model/sessionStore';

import { sendMessage } from '../api/sendMessage';
import { sendMessageSchema, type SendMessageFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, SubmitButton, Textarea } from './MessageForm.styles';

type MessageFormProps = {
  session: Session;
};

const MIN_TEXTAREA_HEIGHT = 44;
const MAX_TEXTAREA_HEIGHT = 144;

const MessageForm = ({ session }: MessageFormProps) => {
  const [hasRequestError, setHasRequestError] = useState(false);
  const [textareaResetVersion, setTextareaResetVersion] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const addMessage = useMessageStore((state) => state.addMessage);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      message: '',
    },
  });

  const messageField = register('message');

  const setTextareaRef = (textarea: HTMLTextAreaElement | null) => {
    messageField.ref(textarea);
    textareaRef.current = textarea;
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = 'auto';

    const nextHeight = Math.min(
      Math.max(textarea.scrollHeight, MIN_TEXTAREA_HEIGHT),
      MAX_TEXTAREA_HEIGHT,
    );

    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    textarea.style.overflowY = 'hidden';
  }, [textareaResetVersion]);

  const onSubmit: SubmitHandler<SendMessageFormValues> = async (values) => {
    setHasRequestError(false);

    try {
      const result = await sendMessage({
        idInstance: session.idInstance,
        apiTokenInstance: session.apiTokenInstance,
        chatId: session.chatId,
        message: values.message,
      });

      addMessage({
        id: result.idMessage,
        text: values.message,
        direction: 'outgoing',
      });
      resetField('message');
      setTextareaResetVersion((currentVersion) => currentVersion + 1);
    } catch {
      setHasRequestError(true);
    }
  };

  const submit = handleSubmit(onSubmit);

  const handleMessageKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    void submit();
  };

  return (
    <Form onSubmit={submit}>
      <Field>
        <Textarea
          {...messageField}
          ref={setTextareaRef}
          placeholder="Сообщение"
          onInput={resizeTextarea}
          onKeyDown={handleMessageKeyDown}
        />
      </Field>

      <SubmitButton type="submit" disabled={isSubmitting}>
        ↑
      </SubmitButton>

      {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      {hasRequestError && <ErrorMessage>Не удалось отправить сообщение</ErrorMessage>}
    </Form>
  );
};

export { MessageForm };
