'use client';

import todosService from '@/services/todos/todos.service';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useTodoStore } from '@/stores/todo-store';
import TodoCard from './todo-card';

const TodoList = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['get-all-todos'],
    queryFn: () => todosService.getAllTodos(),
  });

  const { setRefetchTodos } = useTodoStore();

  useEffect(() => {
    setRefetchTodos(refetch);
  }, [refetch, setRefetchTodos]);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error.message}</div>;
  if (!data) return <div>Veri yok</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
      {data.todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
