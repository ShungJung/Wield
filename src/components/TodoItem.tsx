import { useState } from 'react';
import type { Todo } from '../types/todo';

type TodoProps = {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onRemove: (id: string) => void;
};

function TodoItem({ todo, onUpdate, onRemove }: TodoProps) {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(true);
  const [editedTodo, setEditedTodo] = useState<Todo>(todo);

  const updateSubTodo = (updatedSubTodo: Todo) => {
    onUpdate({
      ...todo,
      subtodos: todo.subtodos?.map((subtodo) =>
        subtodo.id === updatedSubTodo.id ? updatedSubTodo : subtodo
      ),
    });
  };

  const createSubTodo = () => {
    onUpdate({
      ...todo,
      subtodos: [...(todo.subtodos || []), { id: crypto.randomUUID(), name: 'New Todo' }],
    });
  };

  const editToggle = () => {
    setEditedTodo(todo);
    setEdit((oldEdit) => !oldEdit);
  };

  const editTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodo({
      ...editedTodo,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditedTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(editedTodo);
    editToggle();
  };

  const removeSubTodo = (id: string) => {
    onUpdate({
      ...todo,
      subtodos: todo.subtodos?.filter((subtodo) => subtodo.id !== id),
    });
  };

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <li className="ml-3">
      <div className="flex flex-row justify-between gap-5 align-top">
        <div className="flex flex-row gap-5">
          {show ? (
            <button onClick={toggleShow}>-</button>
          ) : (
            <button onClick={toggleShow}>&gt;</button>
          )}
          {edit ? (
            <form onSubmit={submitEditedTodo} className="flex flex-row">
              <h1>Edit Name:</h1>
              <input
                type="text"
                name="name"
                onChange={editTodoChange}
                required={true}
                placeholder={todo.name}
                value={todo.name}
              />

              <h1>Edit Notes:</h1>
              <input
                type="text"
                name="notes"
                onChange={editTodoChange}
                placeholder={todo.notes}
                value={todo.notes}
              />

              <button type="submit">Edit</button>
            </form>
          ) : (
            <div>
              <h3>{todo.name}</h3>
              <p>{todo.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-5">
          <button onClick={createSubTodo}>Add</button>
          <button onClick={() => editToggle()}>Edit</button>
          <button onClick={() => onRemove(todo.id)}>Remove</button>
        </div>
      </div>

      {show ? (
        <ul>
          {todo.subtodos?.map((subtodo) => (
            <TodoItem
              key={subtodo.id}
              todo={subtodo}
              onUpdate={updateSubTodo}
              onRemove={removeSubTodo}
            />
          ))}
        </ul>
      ) : todo.subtodos ? (
        <p>Hidden</p>
      ) : (
        <></>
      )}
    </li>
  );
}

export default TodoItem;
