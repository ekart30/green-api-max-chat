import { describe, expect, it } from 'vitest';

import { createChatSchema, type CreateChatFormValues } from './schema';

const validValues: CreateChatFormValues = {
  phoneNumber: '+79991234567',
};

describe('createChatSchema', () => {
  it('отклоняет пустой номер телефона', () => {
    expect(createChatSchema.safeParse({ phoneNumber: '' }).success).toBe(false);
  });

  it('отклоняет номер телефона из пробелов', () => {
    expect(createChatSchema.safeParse({ phoneNumber: '   ' }).success).toBe(false);
  });

  it('принимает обычные непустые значения', () => {
    expect(createChatSchema.safeParse(validValues).success).toBe(true);
  });
});
