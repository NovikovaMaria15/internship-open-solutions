import { ChangeEventHandler, useState } from 'react';

type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [newTodoName, setNewTodoName] = useState('');

  const handleChangeNewTodoName: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setNewTodoName(value);
  };

  const handleAddTodo = () => {
    if (!newTodoName.trim()) {
      setError('too empty =(');
      return;
    }

    setTodos((prev) => {
      return [...prev, { name: newTodoName, isCompleted: false, id: Date.now() }];
    });
    // setTodos((prev) => {
    //   prev.push({ name: newTodoName, isCompleted: false, id: Date.now() });
    //   return prev;
    // });
    setNewTodoName('');
    setError('');
  };

  const handleToggleCompleteStatus = ({ id }: { id: number }) => {
    const todosCopy = [...todos];
    const todo = todosCopy.find((elem) => elem.id === id);
    if (!todo) return;
    todo.isCompleted = !todo.isCompleted;
    setTodos(todosCopy);
  };

  return {
    handleChangeNewTodoName,
    handleAddTodo,
    handleToggleCompleteStatus,
    error,
    todos,
    newTodoName,
  };
};
