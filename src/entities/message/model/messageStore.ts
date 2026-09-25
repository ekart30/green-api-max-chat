import { create } from 'zustand';

type Message = {
  id: string;
  text: string;
  direction: 'outgoing' | 'incoming';
};

type MessageStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export { useMessageStore };
export type { Message };
