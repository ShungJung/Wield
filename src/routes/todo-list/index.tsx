import { component$, useSignal, $, useStore } from "@builder.io/qwik";
import { TodoItems } from "~/components/todo-items/todo-items";

interface Todo {
    id: number;
    name: string;
    subTodos: Todo[];
}

interface TodosStore {
    todos: Todo[]
}

export default component$(() => {
    const todosStore = useStore<TodosStore>({ todos: [] });
    const inputTodo = useSignal<string>("");

    const createTodo = $(() => {
        const newTodo: Todo = {
            id: Date.now(),
            name: inputTodo.value.trim(),
            subTodos: []
        }

        todosStore.todos.push(newTodo)
        inputTodo.value = ""
    })

    return (
        <>
            <h1 class="text-3xl font-bold mb-4">Todo List</h1>

            <form class="mb-4" preventdefault:submit onSubmit$={createTodo}>
                <input type="text" class="border rounded px-3 py-2 w-64" bind:value={inputTodo} placeholder="Add a new todo..." />
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add</button>
            </form>

            <TodoItems parentTodos={todosStore.todos} />
        </>
    )
})