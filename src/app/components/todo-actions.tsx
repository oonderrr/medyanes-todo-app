import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import UpdateTodo from './update-todo';
import { ITodo } from '@/types/todos.types';
import { EllipsisVerticalIcon } from 'lucide-react';
import DeleteTodo from './delete-todo';

const TodoActions = ({ todo }: { todo: ITodo }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <UpdateTodo todo={todo} />
        <DropdownMenuSeparator />
        <DeleteTodo id={todo.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoActions;
