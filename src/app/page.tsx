import { Card, CardContent } from '@/components/ui/card';
import CreateTodo from './components/create-todo';
import TodoList from './components/todo-list';

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-5xl space-y-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Todo Listesi</h1>
          <CreateTodo />
        </div>

        <Card>
          <CardContent>
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
