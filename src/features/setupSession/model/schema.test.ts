import { describe, expect, it } from 'vitest';

import { sessionSetupSchema, type SessionSetupFormValues } from './schema';

const validValues: SessionSetupFormValues = {
  idInstance: '1234567890',
  apiTokenInstance: 'api-token',
};

describe('sessionSetupSchema', () => {
  it('отклоняет пустое значение каждого поля', () => {
    expect(sessionSetupSchema.safeParse({ ...validValues, idInstance: '' }).success).toBe(false);
    expect(sessionSetupSchema.safeParse({ ...validValues, apiTokenInstance: '' }).success).toBe(
      false,
    );
  });

  it('отклоняет значение из пробелов для каждого поля', () => {
    expect(sessionSetupSchema.safeParse({ ...validValues, idInstance: '   ' }).success).toBe(false);
    expect(sessionSetupSchema.safeParse({ ...validValues, apiTokenInstance: '   ' }).success).toBe(
      false,
    );
  });

  it('принимает обычные непустые значения', () => {
    expect(sessionSetupSchema.safeParse(validValues).success).toBe(true);
  });
});
