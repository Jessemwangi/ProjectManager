import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdAddTask, MdDone } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import Tooltip from "@mui/material/Tooltip";

interface TodoListProps {
  todos: Todo[],
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void,
  index: number,
  key: string | number,
  todo:Todo
}

const SingleTodo = ({
  index,
  todo,
  handleClick,
  key,
}: TodoListProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const editInput = useRef<HTMLInputElement>(null);

  // const handleDone = (todo: Todo) => {
  //   console.log(todo);
  //   if (!groupName) {
  //     return;
  //   } else {
  //     if (groupName === "backlogs") {
  //       backLog.splice(backLog.indexOf(todo), 1);
  //     } else if (groupName === "onGoingTodos") {
  //       onGoingTodos.splice(onGoingTodos.indexOf(todo), 1);
  //     }
  //     setComplitedTodos(
  //       complitedTodos.splice(1, 0, { ...todo, isDone: true, isStarted: false })
  //     );
  //   }
  // };

  // const handleDelete = (todo: Todo) => {
  //   if (groupName === "backlogs") {
  //     backLog.splice(backLog.indexOf(todo), 1);
  //   } else if (groupName === "onGoingTodos") {
  //     onGoingTodos.splice(onGoingTodos.indexOf(todo), 1);
  //   } else {
  //     complitedTodos.splice(complitedTodos.indexOf(todo), 1);
  //   }
  // };

  // const handleOngoing = (id:number) => {
  //   let index: number;
  //   console.log(todo,'groupName,',groupName);
  //   if (!groupName) {
  //     return;
  //   } else {
  //     if (groupName === "backLogs") {
  //       index = backLog.findIndex(element => element.id === id);
  //       backLog.splice(index, 1);
  //     } else if (groupName === "complitedTodos") {
  //       index = complitedTodos.findIndex(element => element.id === id);
  //       complitedTodos.splice(index, 1);

  //     }

  
  //       onGoingTodos.splice(0, 0, { ...todo, isDone: false, isStarted: true })
    
  //   }

  //   console.log('backlogs', backLog)
  //   console.log('onGoingTodos', onGoingTodos)
  //   console.log('complitedTodos', complitedTodos);
  // };

  const handleEdit = (e: React.FormEvent, todo:Todo) => {
    e.preventDefault();


    setTodos(
      setTodos.splice(setTodos.indexOf(todo),0,{...todo,todo:editTodo})
      
    );

    // console.log(todos);
    setEdit(false);
  };

  // const handleBacktoBacklog = (todo: Todo) => {
  //   if (!groupName) {
  //     return;
  //   } else {
  //     if (groupName === "onGoingTodos") {
  //       onGoingTodos.splice(onGoingTodos.indexOf(todo), 1);
  //     } else if (groupName === "complitedTodos") {
  //       complitedTodos.splice(complitedTodos.indexOf(todo), 1);
  //     }
  //     setBacklog(
  //       backLog.splice(1, 0, { ...todo, isDone: false, isStarted: false })
  //     );
  //   }

  // };

  useEffect(() => {
    editInput.current?.focus();
  }, [edit]);


  // useEffect(() => {
  //   setComplitedTodos(complitedTodos)
  //   setOnGoingTodos(onGoingTodos)
  //   setBacklog(backLog)
  // }, [backLog, complitedTodos, onGoingTodos, setBacklog, setComplitedTodos, setOnGoingTodos]) 
  
  return (
    <Draggable draggableId={todo.todo} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos_single_form ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            style={{
              textAlign: "right",
              marginBottom: "6px",
              color: "#076f6b",
            }}
          >
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

              {todo.isStarted ? (
                <Tooltip title="Set task backlog">
                  <span
                    className="icon"
                    onClick={() => {
                      handleBacktoBacklog(todo);
                    }}
                  >
                    <span>
                      <FaTasks />
                    </span>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title="Start this task">
                  <span
                    className="icon"
                    onClick={() => {
                      handleOngoing(todo.id);
                    }}
                  >
                    <span>
                      <MdAddTask />
                    </span>
                  </span>
                </Tooltip>
              )}

              <Tooltip title="delete Task">
                <span className="icon" onClick={() => handleDelete(todo)}>
                  <AiFillDelete />
                </span>
              </Tooltip>

              <Tooltip title="set as completed">
                <span className="icon" onClick={() => handleDone(todo)}>
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
