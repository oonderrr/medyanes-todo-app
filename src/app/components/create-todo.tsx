'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { CreateTodo } from '@/types/todos.types';
import todosService from '@/services/todos/todos.service';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, 'Başlık alanı zorunludur'),
  description: z.string().min(1, 'Açıklama alanı zorunludur'),
});

const CreateTodo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mutate = useMutation({
    mutationFn: (todo: CreateTodo) => todosService.createTodo(todo),
    onSuccess: () => {
      setIsOpen(false);
      form.reset();
      toast.success('Todo başarıyla oluşturuldu.');
    },
    onError: (error) => {
      toast.error('Todo oluşturulamadı:', { description: error.message });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Yeni Todo Ekle</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Todo Ekle</DialogTitle>
          <DialogDescription>Yeni Todo Ekle</DialogDescription>
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
                    <Textarea {...field} placeholder="Açıklama" rows={4} />
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
                Ekle{' '}
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

export default CreateTodo;
