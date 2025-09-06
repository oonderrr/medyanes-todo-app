'use client';

import todosService from '@/services/todos/todos.service';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-all-todos'],
    queryFn: () => todosService.getAllTodos(),
  });

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error.message}</div>;
  }

  if (!data) {
    return <div>Veri yok</div>;
  }

  return <div>{JSON.stringify(data.todos.map((todo) => todo.title))}</div>;
};

export default Page;
