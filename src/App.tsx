import { useEffect, useRef, useState } from 'react';
import type { Todo } from './types/todo';
import TodoItem from './components/Todo';

const dummy_todo: Todo[] = [
  {
    id: 1,
    name: 'Test',
  },
  {
    id: 2,
    name: 'Test2',
    notes: 'yes this is test',
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(dummy_todo);
  const newTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(dummy_todo);
    };

    fetchTodos();
  }, []);

  const handleNewTodo = () => {
    const newTodoName = newTodoRef.current?.value;
    const newTodo = { id: Math.floor(Math.random() * 100), name: newTodoName! };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const editTodo = (editedTodo: Todo): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );
  };

  const handleDeleteTodo = (id: number): void => {
    const deletedTodos = todos.filter((todo) => todo.id != id);
    setTodos(deletedTodos);
  };

  return (
    <>
      <input type="text" name="todo" ref={newTodoRef} />
      <button onClick={handleNewTodo}>+</button>

      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} editTodo={editTodo} handleDeleteTodo={handleDeleteTodo} />
        ))}
      </ul>
    </>
  );
}

export default App;
