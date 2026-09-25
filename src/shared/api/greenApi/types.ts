type GreenApiCredentials = {
  idInstance: string;
  apiTokenInstance: string;
};

type CheckAccountRequest = {
  phoneNumber: number;
};

type CheckAccountResponse = {
  exist: boolean;
  chatId: string;
  fromCache: boolean;
};

export type { CheckAccountRequest, CheckAccountResponse, GreenApiCredentials };
