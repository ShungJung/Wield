import { QRL, Signal, component$, $, useSignal } from "@builder.io/qwik";

interface Todo {
    id: number;
    name: string;
    subTodos: Todo[];
}

interface TodoItemsProps {
    parentTodos: Todo[];
}

export const TodoItems = component$(({ parentTodos }: TodoItemsProps) => {
    const editingTodoId = useSignal<number | null>(null);
    const inputEditTodo = useSignal<string>("");

    const createSubTodo = $((todo: Todo) => {
        const newSubTodo: Todo = {
            id: Date.now(),
            name: "",
            subTodos: [],
        }

        todo.subTodos.push(newSubTodo)
    })

    const updateTodo = $(() => {
        const index = parentTodos.findIndex(todo => todo.id == editingTodoId.value)

        parentTodos[index] = {
            ...parentTodos[index],
            name: inputEditTodo.value,
        }

        editingTodoId.value = null;
    })

    const deleteTodo = $((id: number) => {
        parentTodos.splice(parentTodos.findIndex(todo => todo.id == id), 1);
    });

    return (
        <ul class="border rounded p-4">
            {parentTodos.map(todo => (
                <li key={todo.id}>
                    {editingTodoId.value != todo.id ? (
                        <>
                            <p>{todo.name}</p>
                            <button onClick$={() => {
                                editingTodoId.value = todo.id;
                                inputEditTodo.value = todo.name;
                            }}>Edit</button>
                            <button onClick$={() => createSubTodo(todo)}>Add</button>
                            <button onClick$={() => deleteTodo(todo.id)}>Delete</button>
                        </>
                    ) : (
                        <>
                            <form preventdefault:submit onSubmit$={updateTodo}>
                                <input type="text" bind:value={inputEditTodo} />
                                <button type="submit">Update</button>
                            </form>
                        </>
                    )
                    }

                    <div>
                        <TodoItems
                            parentTodos={todo.subTodos}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
})