import { useState, useEffect } from 'react';
import { getTodos, saveTodos } from '../utils/todoStorage';
import type { Todo } from '../types/todo';

export function useTodos() {
  const [rootTodo, setRootTodo] = useState<Todo>(getTodos || []);

  useEffect(() => {
    saveTodos(rootTodo);
  }, [rootTodo]);

  const createTodo = (newTodo: Todo) => {
    setRootTodo((prev) => ({
      ...prev,
      subtodos: [...(prev.subtodos || []), newTodo],
    }));
  };

  const updateChild = (updatedSubTodo: Todo) => {
    setRootTodo((prev) => ({
      ...prev,
      subtodos: prev.subtodos?.map((todo) =>
        todo.id === updatedSubTodo.id ? updatedSubTodo : todo
      ),
    }));
  };

  const deleteChild = (id: string) => {
    setRootTodo((prev) => ({
      ...prev,
      subtodos: prev.subtodos?.filter((todo) => todo.id !== id),
    }));
  };

  return {
    rootTodo,
    createTodo,
    updateChild,
    deleteChild,
  };
}
