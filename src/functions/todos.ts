import {
  createData,
  deleteData,
  getAllData,
  updateData,
} from '@/services/service-operations';
import type { CreateTodo, UpdateTodo } from '@/types/todos.types';

export async function getAllTodos() {
  const { data, error } = await getAllData('todo');
  return { data, error };
}

export async function createTodo(todo: CreateTodo) {
  const { data, error } = await createData('todo', todo);
  return { data, error };
}

export async function updateTodo(todo: UpdateTodo) {
  const { id, ...todoData } = todo;
  const { data, error } = await updateData('todo', { id }, todoData);
  return { data, error };
}

export async function deleteTodo(id: string) {
  const { data, error } = await deleteData('todo', id);
  return { data, error };
}
