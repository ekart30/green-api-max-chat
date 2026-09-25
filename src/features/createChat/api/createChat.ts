import { createGreenApiClient } from '@shared/api/greenApi/client';
import type { CheckAccountResponse } from '@shared/api/greenApi/types';

import type { CreateChatFormValues } from '../model/schema';

const createChat = async ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
}: CreateChatFormValues): Promise<CheckAccountResponse> => {
  const client = createGreenApiClient({ idInstance, apiTokenInstance });
  const normalizedPhoneNumber = Number(phoneNumber.replace(/\D/g, ''));

  return client.checkAccount({ phoneNumber: normalizedPhoneNumber });
};

export { createChat };
