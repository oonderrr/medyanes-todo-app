import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import UpdateTodo from './update-todo';
import { ITodo } from '@/types/todos.types';
import { EllipsisVerticalIcon } from 'lucide-react';

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoActions;
