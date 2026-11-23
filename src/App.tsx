import { useEffect, useState } from 'react';
import type { Todo } from './types/todo';
import RootTodoList from './components/RootTodo';

const root_todo: Todo = {
  id: crypto.randomUUID(),
  name: 'root',
  notes: 'master todo that spawns all todos',
  subtodos: [
    {
      id: crypto.randomUUID(),
      name: 'Test',
    },
    {
      id: crypto.randomUUID(),
      name: 'Test2',
      notes: 'yes this is test',
    },
  ],
};

function App() {
  const [rootTodo, setRootTodo] = useState<Todo>(root_todo);
  // const [newTodo, setNewTodo] = useState<Todo>({
  //   id: 0,
  //   name: '',
  //   notes: '',
  // });

  useEffect(() => {
    const fetchTodos = async () => {
      setRootTodo(root_todo);
    };

    fetchTodos();
  }, []);

  // const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTodo({
  //     ...newTodo,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmitNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setNewTodo({
  //     ...newTodo,
  //     id: Math.floor(Math.random() * 100),
  //   });
  //   setTodos((prevTodos) => [...prevTodos, newTodo]);
  // };

  // const editTodo = (editedTodo: Todo): void => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
  //   );
  // };

  // const createNewSubTodo = (todo: Todo, newSubTodo: Todo) => {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((t) =>
  //       t.id === todo.id ? { ...todo, subtodo: [...(todo.subtodo ?? []), newSubTodo] } : t
  //     )
  //   );
  // };

  // const handleDeleteTodo = (id: number): void => {
  //   const deletedTodos = todos.filter((todo) => todo.id != id);
  //   setTodos(deletedTodos);
  // };

  return <RootTodoList todo={rootTodo} />;
}

export default App;
