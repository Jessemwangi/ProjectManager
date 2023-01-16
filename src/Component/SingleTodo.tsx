import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdAddTask, MdDone } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import Tooltip from "@mui/material/Tooltip";

type props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
};
const SingleTodo = ({ index, todo, todos, setTodos }: props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const editInput = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isDone: !todo.isDone, isStarted: false }
          : todo
      )
    );
  };

  const handleDelete = (id: number) => {

setTodos(todos.map((todo) => todo.id === id   ? { ...todo, deleted: true }: todo) );
  };

  const handleOngoing = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isStarted: !todo.isStarted, isDone: false }
          : todo
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );

    console.log(todos);
    setEdit(false);
  };

  useEffect(() => {
    editInput.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.todo} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos_single_form ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div style={{ textAlign: "right", marginBottom: "6px" , color:"#076f6b"}}>
            <small>created on: {todo.createdAt}</small>
          </div>

          <div className="todo_content">
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
              <Tooltip title="Edit task title">
                <span
                  className="icon"
                  onClick={() => {
                    if (!edit && !todo.isDone) {
                      setEdit(!edit);
                    }
                  }}
                >
                  {!todo.isDone ? <AiFillEdit /> : <></>}
                </span>
              </Tooltip>

              <span
                className="icon"
                onClick={() => {
                  handleOngoing(todo.id);
                }}
              >
                {todo.isStarted ? (
                  <Tooltip title="Set task backlog">
                    <span>
                      <FaTasks />
                    </span>
                  </Tooltip>
                ) : (
                  <Tooltip title="Start this task">
                    <span>
                      <MdAddTask />
                    </span>
                  </Tooltip>
                )}
              </span>

              <Tooltip title="delete Task">
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                  <AiFillDelete />
                </span>
              </Tooltip>

              <Tooltip title="set as completed">
                <span className="icon" onClick={() => handleDone(todo.id)}>
                  <MdDone />
                </span>
              </Tooltip>
            </div>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
