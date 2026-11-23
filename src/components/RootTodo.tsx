import { useState } from 'react';
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface RootTodoProps {
  todo: Todo;
}

function RootTodoList({ todo }: RootTodoProps) {
  const [todos, setTodos] = useState<Todo[]>(todo.subtodos || []);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: '',
    name: '',
    notes: '',
  });

  const newTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const submitNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewTodo({
      ...newTodo,
      id: crypto.randomUUID(),
    });
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateChild = (updatedSubTodo: Todo) => {
    setTodos((prev) => prev.map((todo) => (todo.id === updatedSubTodo.id ? updatedSubTodo : todo)));
  };

  const removeChild = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1>{todo.name}</h1>
      <p>{todo.notes}</p>

      <form onSubmit={submitNewTodo} className="flex flex-row">
        <h1>Name:</h1>
        <input type="text" name="name" onChange={newTodoChange} required={true} />

        <h1>Notes:</h1>
        <input type="text" name="notes" onChange={newTodoChange} />

        <button type="submit">Add</button>
      </form>
      <ul>
        {todos?.map((todo) => (
          <TodoItem todo={todo} onUpdate={updateChild} onRemove={removeChild} />
        ))}
      </ul>
    </>
  );
}

export default RootTodoList;
