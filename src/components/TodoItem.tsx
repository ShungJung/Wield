import { useState } from 'react';
import type { Todo } from '../types/todo';

// interface TodoItemProps {
//   todo: Todo;
//   editTodo: (editedTodo: Todo) => void;
//   createNewSubTodo: (todo: Todo, newSubTodo: Todo) => void;
//   handleDeleteTodo: (id: number) => void;
// }

// function TodoItem({ todo, editTodo, createNewSubTodo, handleDeleteTodo }: TodoItemProps) {
//   const [edit, setEdit] = useState(false);
//   const [addSub, setAddSub] = useState(false);
//   const editRef = useRef<HTMLInputElement>(null);

//   const [newSubTodo, setNewSubTodo] = useState<Todo>({
//     id: 0,
//     name: '',
//     notes: '',
//   });

//   const handleToggleEdit = (todo: Todo): void => {
//     if (edit) {
//       const editedTodoName = editRef.current?.value;
//       const editedTodo = { ...todo };
//       editedTodo.name = editedTodoName!;

//       editTodo(editedTodo);
//     }

//     setEdit((oldEdit) => !oldEdit);
//   };

//   return (
//     <li key={todo.id} className="ml-1">
//       <div className="flex flex-row gap-5">
//         {edit ? <input type="text" name="edit" ref={editRef} /> : <h3>{todo.name}</h3>}
//         <button onClick={() => handleToggleEdit(todo)}>Edit</button>
//         <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
//         {addSub ? (
//           <form onSubmit={handleSubmitNewSubTodo} className="flex flex-row">
//             <h1>Name:</h1>
//             <input type="text" name="name" onChange={handleNewSubTodoChange} required={true} />

//             <h1>Notes:</h1>
//             <input type="text" name="notes" onChange={handleNewSubTodoChange} />

//             <button type="submit">Add</button>
//           </form>
//         ) : (
//           <button onClick={() => handleToggleAddSubTodo()}>Add</button>
//         )}
//       </div>

//       {todo.notes && <p>{todo.notes}</p>}

//       {todo.subtodos && (
//         <ul>
//           {todo.subtodos?.map((subtodo) => (
//             <TodoItem
//               todo={subtodo}
//               editTodo={editTodo}
//               createNewSubTodo={createNewSubTodo}
//               handleDeleteTodo={handleDeleteTodo}
//             />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

// export default TodoItem;

type TodoProps = {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onRemove: (id: string) => void;
};

function TodoItem({ todo, onUpdate, onRemove }: TodoProps) {
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo>(todo);

  const updateSubTodo = (updatedSubTodo: Todo) => {
    onUpdate({
      ...todo,
      subtodos: todo.subtodos?.map((subtodo) =>
        subtodo.id === updatedSubTodo.id ? updatedSubTodo : subtodo
      ),
    });
  };

  const addSubTodo = (newTodo: Todo) => {
    onUpdate({
      ...todo,
      subtodos: [...(todo.subtodos || []), newTodo],
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

  return (
    <li className="ml-3 flex-row gap-5">
      {edit ? (
        <form onSubmit={submitEditedTodo} className="flex flex-row">
          <h1>Edit Name:</h1>
          <input
            type="text"
            name="name"
            onChange={editTodoChange}
            required={true}
            placeholder={todo.name}
          />

          <h1>Edit Notes:</h1>
          <input type="text" name="notes" onChange={editTodoChange} placeholder={todo.notes} />

          <button type="submit">Edit</button>
        </form>
      ) : (
        <div>
          <h3>{todo.name}</h3>
          <p>{todo.notes}</p>
        </div>
      )}

      <button
        onClick={() =>
          addSubTodo({
            id: crypto.randomUUID(),
            name: 'New Todo',
          })
        }
      >
        Add SubTodo
      </button>
      <button onClick={() => editToggle()}>Edit</button>
      <button onClick={() => onRemove(todo.id)}>Remove</button>

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
    </li>
  );
}

export default TodoItem;
