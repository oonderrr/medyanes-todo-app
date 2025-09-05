interface ITodo {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

interface GetAllTodos {
  todos: ITodo[];
}

interface CreateTodo {
  title: string;
  description: string;
}

interface UpdateTodo {
  id: string;
  title: string;
  description: string;
  status: string;
}

export type { ITodo, CreateTodo, UpdateTodo, GetAllTodos };
