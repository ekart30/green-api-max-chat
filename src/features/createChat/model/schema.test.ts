import { describe, expect, it } from 'vitest';

import { createChatSchema } from './schema';

const getPhoneNumberError = (phoneNumber: string) => {
  const result = createChatSchema.safeParse({ phoneNumber });

  if (result.success) {
    return null;
  }

  return result.error.issues[0]?.message;
};

describe('createChatSchema', () => {
  it.each(['79991234567', '+7 999 123-45-67', '375291234567', '+375 29 123-45-67'])(
    'принимает валидный номер %s',
    (phoneNumber) => {
      expect(createChatSchema.safeParse({ phoneNumber }).success).toBe(true);
    },
  );

  it.each([
    ['', 'Введите номер телефона'],
    ['   ', 'Введите номер телефона'],
    ['abc', 'Номер содержит недопустимые символы'],
    ['+7abc9991234567', 'Номер содержит недопустимые символы'],
    ['+++79991234567', 'Номер содержит недопустимые символы'],
    ['7+9991234567', 'Номер содержит недопустимые символы'],
    ['-79991234567', 'Номер содержит недопустимые символы'],
    ['123', 'Номер должен содержать 11 или 12 цифр'],
    ['7999123456', 'Номер должен содержать 11 или 12 цифр'],
    ['799912345678', 'Номер должен содержать 11 или 12 цифр'],
    ['89991234567', 'Введите номер РФ или РБ в международном формате'],
    ['380991234567', 'Введите номер РФ или РБ в международном формате'],
  ])('отклоняет невалидный номер %j', (phoneNumber, expectedError) => {
    expect(createChatSchema.safeParse({ phoneNumber }).success).toBe(false);
    expect(getPhoneNumberError(phoneNumber)).toBe(expectedError);
  });
});
