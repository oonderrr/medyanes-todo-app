'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import todosService from '@/services/todos/todos.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const TodoTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-all-todos'],
    queryFn: () => todosService.getAllTodos(),
  });

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error.message}</div>;
  if (!data) return <div>Veri yok</div>;

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.title}</TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{todo.status}</TableCell>
              <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-end">
                <Button>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoTable;
