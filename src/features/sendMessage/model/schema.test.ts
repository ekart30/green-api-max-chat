import { describe, expect, it } from 'vitest';

import { sendMessageSchema } from './schema';

describe('sendMessageSchema', () => {
  it('отклоняет пустую строку', () => {
    expect(sendMessageSchema.safeParse({ message: '' }).success).toBe(false);
  });

  it('отклоняет строку из пробелов', () => {
    expect(sendMessageSchema.safeParse({ message: '   ' }).success).toBe(false);
  });

  it('принимает обычный текст', () => {
    expect(sendMessageSchema.safeParse({ message: 'Привет!' }).success).toBe(true);
  });

  it('отклоняет сообщение длиннее 4000 символов', () => {
    expect(sendMessageSchema.safeParse({ message: 'a'.repeat(4001) }).success).toBe(false);
  });
});
