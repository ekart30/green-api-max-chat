import { create } from 'zustand';

type Session = {
  idInstance: string;
  apiTokenInstance: string;
};

type SessionStore = {
  session: Session | null;
  setSession: (session: Session) => void;
};

const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));

export { useSessionStore };
export type { Session };
