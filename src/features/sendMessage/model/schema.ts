import { z } from 'zod';

const sendMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Введите сообщение')
    .max(4000, 'Сообщение не должно превышать 4000 символов'),
});

type SendMessageFormValues = z.infer<typeof sendMessageSchema>;

export { sendMessageSchema };
export type { SendMessageFormValues };
