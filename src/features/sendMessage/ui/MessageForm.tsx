import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useMessageStore } from '@entities/message/model/messageStore';
import { type Session } from '@entities/session/model/sessionStore';

import { sendMessage } from '../api/sendMessage';
import { sendMessageSchema, type SendMessageFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, SubmitButton, Textarea } from './MessageForm.styles';

type MessageFormProps = {
  session: Session;
};

const MessageForm = ({ session }: MessageFormProps) => {
  const [hasRequestError, setHasRequestError] = useState(false);
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
