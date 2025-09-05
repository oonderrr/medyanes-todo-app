import { CreateTodo, UpdateTodo } from '@/types/todos.types';

export function validateCreateTodo(data: CreateTodo): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title) {
    errors.push('Title is required');
  } else if (typeof data.title !== 'string') {
    errors.push('Title must be a string');
  }

  if (!data.description) {
    errors.push('Description is required');
  } else if (typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUpdateTodo(data: UpdateTodo): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.title) {
    errors.push('Title is required');
  } else if (typeof data.title !== 'string') {
    errors.push('Title must be a string');
  }

  if (!data.status) {
    errors.push('Status is required');
  } else if (typeof data.status !== 'string') {
    errors.push('Status must be a string');
  }

  if (!data.description) {
    errors.push('Description is required');
  } else if (typeof data.description !== 'string') {
    errors.push('Description must be a string');
  }

  if (!data.id) {
    errors.push('ID is required');
  } else if (typeof data.id !== 'string') {
    errors.push('ID must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
