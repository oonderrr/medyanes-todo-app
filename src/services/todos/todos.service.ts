import { getApi, postApi } from '@/services/fetch-api';
import type {
  CreateTodo,
  UpdateTodo,
  GetAllTodos,
  ITodo,
} from '@/types/todos.types';

class TodosService {
  private readonly baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/todos`;

  async getAllTodos(): Promise<GetAllTodos> {
    return await getApi({ URL: this.baseUrl });
  }

  async createTodo(todo: CreateTodo): Promise<ITodo> {
    return await postApi({
      URL: this.baseUrl,
      body: todo as unknown as Record<string, unknown>,
      method: 'POST',
    });
  }

  async updateTodo(todo: UpdateTodo): Promise<ITodo> {
    const { id, ...todoData } = todo;
    return await postApi({
      URL: `${this.baseUrl}/${id}`,
      body: todoData as unknown as Record<string, unknown>,
      method: 'PUT',
    });
  }

  async deleteTodo(id: string): Promise<{ message: string }> {
    return await postApi({
      URL: `${this.baseUrl}/${id}`,
      body: null,
      method: 'DELETE',
    });
  }
}

const todosService = new TodosService();
export default todosService;
