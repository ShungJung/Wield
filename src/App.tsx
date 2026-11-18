import { useEffect, useRef, useState } from 'react';

interface Todo {
  id: number;
  name: string;
  notes?: string;
}

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

  const handleDeleteTodo = (id: number) => {
    const deletedTodos = todos.filter((todo) => todo.id != id);
    setTodos(deletedTodos);
  };

  return (
    <>
      <input type="text" name="todo" ref={newTodoRef} />
      <button onClick={handleNewTodo}>+</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.name}</h3>
          {todo.notes && <p>{todo.notes}</p>}
          <button onClick={() => handleDeleteTodo(todo.id)}>Del</button>
        </div>
      ))}
    </>
  );
}

export default App;
