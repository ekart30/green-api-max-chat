import { createGreenApiClient } from '@shared/api/greenApi/client';
import type { CheckAccountResponse } from '@shared/api/greenApi/types';

import { normalizePhoneNumber } from '../model/phoneNumber';

type CreateChatParams = {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
};

const createChat = async ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
}: CreateChatParams): Promise<CheckAccountResponse> => {
  const client = createGreenApiClient({ idInstance, apiTokenInstance });
  const normalizedPhoneNumber = Number(normalizePhoneNumber(phoneNumber));

  return client.checkAccount({ phoneNumber: normalizedPhoneNumber });
};

export { createChat };
export type { CreateChatParams };
