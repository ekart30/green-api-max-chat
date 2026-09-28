import { z } from 'zod';

import { normalizePhoneNumber } from './phoneNumber';

const hasValidPhoneNumberLength = (value: string) => {
  const normalizedPhoneNumber = normalizePhoneNumber(value);

  if (normalizedPhoneNumber.startsWith('375')) {
    return normalizedPhoneNumber.length === 12;
  }

  if (normalizedPhoneNumber.startsWith('7')) {
    return normalizedPhoneNumber.length === 11;
  }

  return normalizedPhoneNumber.length === 11 || normalizedPhoneNumber.length === 12;
};

const hasSupportedCountryCode = (value: string) => {
  const normalizedPhoneNumber = normalizePhoneNumber(value);

  return normalizedPhoneNumber.startsWith('7') || normalizedPhoneNumber.startsWith('375');
};

const createChatSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(1, 'Введите номер телефона')
    .regex(/^\+?\d[\d\s()-]*$/, 'Номер содержит недопустимые символы')
    .refine(hasValidPhoneNumberLength, 'Номер должен содержать 11 или 12 цифр')
    .refine(hasSupportedCountryCode, 'Введите номер РФ или РБ в международном формате'),
});

type CreateChatFormValues = z.infer<typeof createChatSchema>;

export { createChatSchema };
export type { CreateChatFormValues };
