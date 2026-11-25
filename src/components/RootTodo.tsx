import { useState } from 'react';
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';
import { useTodos } from '../hooks/useTodos';

function RootTodoList() {
  const { rootTodo, createTodo, updateChild, deleteChild } = useTodos();
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
    createTodo(newTodo);
  };

  return (
    <div>
      <h1>{rootTodo.name}</h1>
      <p>{rootTodo.notes}</p>

      <form onSubmit={submitNewTodo} className="flex flex-row">
        <h1>Name:</h1>
        <input type="text" name="name" onChange={newTodoChange} required={true} />

        <h1>Notes:</h1>
        <input type="text" name="notes" onChange={newTodoChange} />

        <button type="submit">Create</button>
      </form>
      <ul>
        {rootTodo.subtodos?.map((todo) => (
          <TodoItem todo={todo} onUpdate={updateChild} onRemove={deleteChild} />
        ))}
      </ul>
    </div>
  );
}

export default RootTodoList;
