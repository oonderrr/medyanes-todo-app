import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import TodoActions from './todo-actions';
import type { ITodo } from '@/types/todos.types';

const TodoCard = ({ todo }: { todo: ITodo }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>{todo.title}</p>
          <TodoActions todo={todo} />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground flex-1 overflow-hidden">
        <p className="break-words line-clamp-4">{todo.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <Badge>{todo.status}</Badge>
        <p className="text-sm text-muted-foreground">
          {new Date(todo.createdAt).toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
