import { Card, CardContent } from '@/components/ui/card';
import TodoTable from './components/todo-table';

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Todo Listesi</h1>
        </div>

        <Card>
          <CardContent>
            <TodoTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
