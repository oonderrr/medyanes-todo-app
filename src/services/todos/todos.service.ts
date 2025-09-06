import { getApi, postApi } from '@/services/fetch-api';
import type { CreateTodo, UpdateTodo, GetAllTodos } from '@/types/todos.types';

class TodosService {
  private readonly baseUrl = '/api/todos';

  async getAllTodos(): Promise<GetAllTodos> {
    return await getApi({ URL: this.baseUrl });
  }

  async createTodo(todo: CreateTodo): Promise<void> {
    return await postApi({
      URL: this.baseUrl,
      body: todo,
      method: 'POST',
    });
  }

  async updateTodo(todo: UpdateTodo): Promise<void> {
    return await postApi({
      URL: `${this.baseUrl}`,
      body: todo,
      method: 'PUT',
    });
  }

  async deleteTodo(id: string): Promise<void> {
    return await postApi({
      URL: `${this.baseUrl}/${id}`,
      body: { id },
      method: 'DELETE',
    });
  }
}

const todosService = new TodosService();
export default todosService;
