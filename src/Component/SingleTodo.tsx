import React, {  useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdAddTask, MdDone } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

type props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   index:number, 
};
const SingleTodo = ({ index, todo, todos, setTodos }: props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const editInput = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone, isStarted: false} : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  const handleOngoing = (id:number ) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isStarted: !todo.isStarted } : todo))
    );


}

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    editInput.current?.focus();
  }, [edit]);

  return (
    <form
      className="todos_single_form"
      onSubmit={(e) => handleEdit(e, todo.id)}
    >
      {edit ? (
        <>
          <input
            type="text"
            value={editTodo}
            ref={editInput}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos_single_text"
          />
        </>
      ) : todo.isDone ? (
        <s className="todos_single_text">{todo.todo}</s>
      ) : (
        <span className="todos_single_text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />

        </span>

        <span
          className="icon"
          onClick={() => {handleOngoing(todo.id)}}
        >
          {todo.isStarted ? (
          <FaTasks/>
            ) : (
                 <MdAddTask/>      
          )}
          
        </span>

        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
        <MdDone /> 
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
