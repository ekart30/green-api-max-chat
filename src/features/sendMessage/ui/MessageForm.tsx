import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useSessionStore } from '@entities/session/model/sessionStore';

import { sendMessage } from '../api/sendMessage';
import { sendMessageSchema, type SendMessageFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, SubmitButton, Textarea } from './MessageForm.styles';

const MessageForm = () => {
  const [hasRequestError, setHasRequestError] = useState(false);
  const session = useSessionStore((state) => state.session);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageSchema),
  });

  const onSubmit: SubmitHandler<SendMessageFormValues> = async (values) => {
    if (session === null) {
      return;
    }

    setHasRequestError(false);

    try {
      await sendMessage({
        idInstance: session.idInstance,
        apiTokenInstance: session.apiTokenInstance,
        chatId: session.chatId,
        message: values.message,
      });

      reset();
    } catch {
      setHasRequestError(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        Сообщение
        <Textarea {...register('message')} placeholder="Введите сообщение" />
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </Field>

      <SubmitButton type="submit" disabled={isSubmitting}>
        Отправить
      </SubmitButton>

      {hasRequestError && <ErrorMessage>Не удалось отправить сообщение</ErrorMessage>}
    </Form>
  );
};

export { MessageForm };
