import { describe, expect, it } from 'vitest';

import { createChatSchema, type CreateChatFormValues } from './schema';

const validValues: CreateChatFormValues = {
  idInstance: '1234567890',
  apiTokenInstance: 'api-token',
  phoneNumber: '+79991234567',
};

describe('createChatSchema', () => {
  it('отклоняет пустое значение каждого поля', () => {
    const valuesWithEmptyFields = [
      { ...validValues, idInstance: '' },
      { ...validValues, apiTokenInstance: '' },
      { ...validValues, phoneNumber: '' },
    ];

    valuesWithEmptyFields.forEach((values) => {
      expect(createChatSchema.safeParse(values).success).toBe(false);
    });
  });

  it('отклоняет значение из пробелов для каждого поля', () => {
    const valuesWithWhitespaceFields = [
      { ...validValues, idInstance: '   ' },
      { ...validValues, apiTokenInstance: '   ' },
      { ...validValues, phoneNumber: '   ' },
    ];

    valuesWithWhitespaceFields.forEach((values) => {
      expect(createChatSchema.safeParse(values).success).toBe(false);
    });
  });

  it('принимает обычные непустые значения', () => {
    expect(createChatSchema.safeParse(validValues).success).toBe(true);
  });
});
