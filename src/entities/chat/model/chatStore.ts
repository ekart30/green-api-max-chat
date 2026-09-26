import { create } from 'zustand';

type Chat = {
  chatId: string;
  phoneNumber: string;
};

type ChatStore = {
  activeChat: Chat | null;
  setActiveChat: (chat: Chat) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  activeChat: null,
  setActiveChat: (activeChat) => set({ activeChat }),
}));

export { useChatStore };
export type { Chat };
