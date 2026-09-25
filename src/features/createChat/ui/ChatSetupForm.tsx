import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import type { CheckAccountResponse } from '@shared/api/greenApi/types';

import { createChat } from '../api/createChat';
import { createChatSchema, type CreateChatFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, Input, SubmitButton } from './ChatSetupForm.styles';

const ChatSetupForm = () => {
  const [response, setResponse] = useState<CheckAccountResponse | null>(null);
  const [hasRequestError, setHasRequestError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateChatFormValues>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit: SubmitHandler<CreateChatFormValues> = async (values) => {
    setResponse(null);
    setHasRequestError(false);

    try {
      const result = await createChat(values);

      setResponse(result);
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

      {response && (
        <span>
          {response.exist
            ? `Чат найден. chatId: ${response.chatId}`
            : 'Аккаунт MAX с таким номером не найден'}
        </span>
      )}

      {hasRequestError && <ErrorMessage>Не удалось выполнить запрос</ErrorMessage>}
    </Form>
  );
};

export { ChatSetupForm };
