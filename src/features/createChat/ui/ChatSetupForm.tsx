import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useSessionStore } from '@entities/session/model/sessionStore';

import { createChat } from '../api/createChat';
import { createChatSchema, type CreateChatFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, Input, SubmitButton } from './ChatSetupForm.styles';

const ChatSetupForm = () => {
  const [isAccountNotFound, setIsAccountNotFound] = useState(false);
  const [hasRequestError, setHasRequestError] = useState(false);
  const setSession = useSessionStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateChatFormValues>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit: SubmitHandler<CreateChatFormValues> = async (values) => {
    setIsAccountNotFound(false);
    setHasRequestError(false);

    try {
      const result = await createChat(values);

      if (!result.exist) {
        setIsAccountNotFound(true);

        return;
      }

      setSession({
        idInstance: values.idInstance,
        apiTokenInstance: values.apiTokenInstance,
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
        ID Instance
        <Input {...register('idInstance')} placeholder="Введите ID Instance" autoComplete="off" />
        {errors.idInstance && <ErrorMessage>{errors.idInstance.message}</ErrorMessage>}
      </Field>

      <Field>
        API Token Instance
        <Input
          {...register('apiTokenInstance')}
          type="password"
          placeholder="Введите API Token Instance"
          autoComplete="off"
        />
        {errors.apiTokenInstance && <ErrorMessage>{errors.apiTokenInstance.message}</ErrorMessage>}
      </Field>

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

      {isAccountNotFound && <span>Аккаунт MAX с таким номером не найден</span>}

      {hasRequestError && <ErrorMessage>Не удалось выполнить запрос</ErrorMessage>}
    </Form>
  );
};

export { ChatSetupForm };
