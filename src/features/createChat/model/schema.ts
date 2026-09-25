import { z } from 'zod';

const createChatSchema = z.object({
  idInstance: z.string().trim().min(1, 'Введите ID Instance'),
  apiTokenInstance: z.string().trim().min(1, 'Введите API Token Instance'),
  phoneNumber: z.string().trim().min(1, 'Введите номер телефона'),
});

type CreateChatFormValues = z.infer<typeof createChatSchema>;

export { createChatSchema };
export type { CreateChatFormValues };
