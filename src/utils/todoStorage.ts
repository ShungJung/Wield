import type { Todo } from '../types/todo';

const STORAGE_KEY = 'my-todo-app:todos';

export function getTodos() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const todos = data ? JSON.parse(data) : [];

    if (todos) {
      return todos;
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: 'Root', notes: 'Root Todo, that spawns all Todos' })
      );

      return { name: 'Root', notes: 'Root Todo, that spawns all Todos' };
    }
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
}

export function saveTodos(rootTodo: Todo) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rootTodo));
    return true;
  } catch (error) {
    console.error('Failed to save todos:', error);
    return false;
  }
}

export function clearTodos() {
  localStorage.removeItem(STORAGE_KEY);
}
