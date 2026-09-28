import { describe, expect, it } from 'vitest';

import { normalizePhoneNumber } from './phoneNumber';

describe('normalizePhoneNumber', () => {
  it('нормализует форматированный номер РФ', () => {
    expect(normalizePhoneNumber('+7 999 123-45-67')).toBe('79991234567');
  });

  it('нормализует форматированный номер РБ', () => {
    expect(normalizePhoneNumber('+375 (29) 123-45-67')).toBe('375291234567');
  });
});
