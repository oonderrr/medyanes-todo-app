import { NextApiRequest, NextApiResponse } from 'next';
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from '@/functions/todos';
import {
  validateCreateTodo,
  validateUpdateTodo,
} from '@/validators/todos.validator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req) return res.status(400).json({ error: 'Request is required' });

  const method = req.method;

  if (!method || !['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: `Method ${method} not allowed`,
    });
  }

  if (method === 'GET') {
    const { data: todos, error } = await getAllTodos();

    if (error)
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Todos fetching failed',
      });

    res.status(200).json({
      success: true,
      data: todos,
      message: 'Todos fetched successfully',
    });
  }

  if (method === 'POST') {
    const { title, description } = req.body;

    const { isValid, errors } = validateCreateTodo({ title, description });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: errors.join(', '),
      });
    }

    const { data: todo, error } = await createTodo({ title, description });

    if (error)
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Todo creation failed',
      });

    res.status(201).json({
      success: true,
      data: todo,
      message: 'Todo created successfully',
    });
  }

  if (method === 'PUT') {
    const { id, title, description, status } = req.body;

    const { isValid, errors } = validateUpdateTodo({
      id,
      title,
      description,
      status,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: errors.join(', '),
      });
    }

    const { data: todo, error } = await updateTodo({
      id,
      title,
      description,
      status,
    });

    if (error)
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Todo update failed',
      });

    res.status(200).json({
      success: true,
      data: todo,
      message: 'Todo updated successfully',
    });
  }

  if (method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID is required',
        message: 'ID is required',
      });
    }

    const { data: todo, error } = await deleteTodo(id);

    if (error)
      return res.status(500).json({
        success: false,
        error: error.message,
        message: 'Todo deletion failed',
      });

    res.status(200).json({
      success: true,
      data: todo,
      message: 'Todo deleted successfully',
    });
  }
}
