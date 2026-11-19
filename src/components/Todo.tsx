import { useRef, useState } from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  editTodo: (editedTodo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
}

function TodoItem({ todo, editTodo, handleDeleteTodo }: TodoItemProps) {
  const [edit, setEdit] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);

  const handleToggleEdit = (todo: Todo): void => {
    if (edit) {
      const editedTodoName = editRef.current?.value;
      const editedTodo = todo;
      editedTodo.name = editedTodoName!;

      editTodo(editedTodo);
    }

    setEdit((oldEdit) => !oldEdit);
  };

  return (
    <li key={todo.id}>
      <div className="flex flex-row gap-5">
        {edit ? <input type="text" name="edit" ref={editRef} /> : <h3>{todo.name}</h3>}
        <button onClick={() => handleToggleEdit(todo)}>Edit</button>
        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      </div>

      {todo.notes && <p>{todo.notes}</p>}
    </li>
  );
}

export default TodoItem;
