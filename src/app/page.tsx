import React from 'react';
import todosService from '@/services/todos/todos.service';

const page = async () => {
  const data = await todosService.getAllTodos();

  return <div>{JSON.stringify(data.todos.map((todo) => todo.title))}</div>;
};

export default page;
