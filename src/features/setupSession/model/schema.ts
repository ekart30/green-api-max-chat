import { z } from 'zod';

const sessionSetupSchema = z.object({
  idInstance: z.string().trim().min(1, 'Введите ID Instance'),
  apiTokenInstance: z.string().trim().min(1, 'Введите API Token Instance'),
});

type SessionSetupFormValues = z.infer<typeof sessionSetupSchema>;

export { sessionSetupSchema };
export type { SessionSetupFormValues };
