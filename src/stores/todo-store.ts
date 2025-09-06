import { create } from 'zustand';

interface TodoStore {
  refetchTodos: (() => void) | null;
  setRefetchTodos: (refetch: () => void) => void;
  triggerRefetch: () => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  refetchTodos: null,
  setRefetchTodos: (refetch) => set({ refetchTodos: refetch }),
  triggerRefetch: () => {
    const { refetchTodos } = get();
    if (refetchTodos) {
      refetchTodos();
    }
  },
}));
