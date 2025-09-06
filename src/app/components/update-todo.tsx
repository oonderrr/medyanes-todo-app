'use client';

import z from 'zod';
import { useState } from 'react';
import { useTodoStore } from '@/stores/todo-store';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ITodo, UpdateTodo } from '@/types/todos.types';
import todosService from '@/services/todos/todos.service';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  id: z.string().min(1, 'ID alanı zorunludur'),
  title: z.string().min(1, 'Başlık alanı zorunludur'),
  description: z.string().min(1, 'Açıklama alanı zorunludur'),
  status: z.string().min(1, 'Durum alanı zorunludur'),
});

const UpdateTodo = ({ todo }: { todo: ITodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerRefetch } = useTodoStore();

  const mutate = useMutation({
    mutationFn: (todo: UpdateTodo) => todosService.updateTodo(todo),
    onSuccess: () => {
      setIsOpen(false);
      triggerRefetch();
      toast.success('Todo başarıyla güncellendi.');
    },
    onError: (error) => {
      toast.error('Todo güncellenemedi:', { description: error.message });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="w-full">
          Güncelle
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Güncelle</DialogTitle>
          <DialogDescription>Todo güncelle</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Başlık</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Başlık" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Açıklama" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durum</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Durum" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button variant={'outline'}>İptal</Button>
              </DialogClose>
              <Button type="submit">
                Güncelle{' '}
                {mutate.isPending && (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodo;
