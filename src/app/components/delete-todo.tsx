import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import todosService from '@/services/todos/todos.service';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTodoStore } from '@/stores/todo-store';

const DeleteTodo = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerRefetch } = useTodoStore();

  const mutate = useMutation({
    mutationFn: () => todosService.deleteTodo(id),
    onSuccess: () => {
      setIsOpen(false);
      toast.success('Todo başarıyla silindi.');
      triggerRefetch();
    },
    onError: (error) => {
      toast.error('Todo silinemedi:', { description: error.message });
    },
  });

  const onSubmit = () => {
    mutate.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} className="w-full">
          Sil
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sil</AlertDialogTitle>
          <AlertDialogDescription>
            Silmek istediğinize emin misiniz?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={'outline'}>İptal</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={'destructive'} onClick={onSubmit}>
              Sil{' '}
              {mutate.isPending && (
                <Loader2 className="size-4 mr-2 animate-spin" />
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodo;
