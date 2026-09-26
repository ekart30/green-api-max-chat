import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useSessionStore } from '@entities/session/model/sessionStore';

import { sessionSetupSchema, type SessionSetupFormValues } from '../model/schema';
import { ErrorMessage, Field, Form, Input, SubmitButton } from './SessionSetupForm.styles';

const SessionSetupForm = () => {
  const setSession = useSessionStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionSetupFormValues>({
    resolver: zodResolver(sessionSetupSchema),
    defaultValues: {
      idInstance: '',
      apiTokenInstance: '',
    },
  });

  const onSubmit: SubmitHandler<SessionSetupFormValues> = (values) => {
    setSession(values);
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

      <SubmitButton type="submit">Продолжить</SubmitButton>
    </Form>
  );
};

export { SessionSetupForm };
