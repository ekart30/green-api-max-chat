import { createGreenApiClient } from '@shared/api/greenApi/client';
import type { SendMessageResponse } from '@shared/api/greenApi/types';

type SendMessageParams = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};

const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}: SendMessageParams): Promise<SendMessageResponse> => {
  const client = createGreenApiClient({ idInstance, apiTokenInstance });

  return client.sendMessage({ chatId, message });
};

export { sendMessage };
