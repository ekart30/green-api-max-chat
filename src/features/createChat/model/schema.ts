import { z } from 'zod';

const createChatSchema = z.object({
  phoneNumber: z.string().trim().min(1, 'Введите номер телефона'),
});

type CreateChatFormValues = z.infer<typeof createChatSchema>;

export { createChatSchema };
export type { CreateChatFormValues };
