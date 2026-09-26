import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useChatStore } from '@entities/chat/model/chatStore';
import { type Session } from '@entities/session/model/sessionStore';

import { createChat } from '../api/createChat';
import { createChatSchema, type CreateChatFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, Input, SubmitButton } from './CreateChatForm.styles';

type CreateChatFormProps = {
  session: Session;
};

const CreateChatForm = ({ session }: CreateChatFormProps) => {
  const [isAccountNotFound, setIsAccountNotFound] = useState(false);
  const [hasRequestError, setHasRequestError] = useState(false);
  const setActiveChat = useChatStore((state) => state.setActiveChat);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateChatFormValues>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmit: SubmitHandler<CreateChatFormValues> = async (values) => {
    setIsAccountNotFound(false);
    setHasRequestError(false);

    try {
      const result = await createChat({
        idInstance: session.idInstance,
        apiTokenInstance: session.apiTokenInstance,
        phoneNumber: values.phoneNumber,
      });

      if (!result.exist) {
        setIsAccountNotFound(true);

        return;
      }

      setActiveChat({
        chatId: result.chatId,
        phoneNumber: values.phoneNumber,
      });
    } catch {
      setHasRequestError(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        Номер телефона
        <Input
          {...register('phoneNumber')}
          type="tel"
          placeholder="+7 999 123-45-67"
          autoComplete="tel"
        />
        {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
      </Field>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Проверка...' : 'Создать чат'}
      </SubmitButton>

      {isAccountNotFound && <ErrorMessage>Аккаунт MAX с таким номером не найден</ErrorMessage>}

      {hasRequestError && <ErrorMessage>Не удалось выполнить запрос</ErrorMessage>}
    </Form>
  );
};

export { CreateChatForm };
