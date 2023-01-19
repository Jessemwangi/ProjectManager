import React, { useEffect } from "react";
import "./style.css";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
    backLog: Todo[];
    setBacklog:React.Dispatch<React.SetStateAction<Todo[]>>;
  // todoList: Todo[];
  // setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onGoingTodos: Todo[];
  setOnGoingTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  complitedTodos: Todo[];
  setComplitedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<props> = ({
  setBacklog,backLog,
  onGoingTodos,
  setOnGoingTodos,
  complitedTodos,
    setComplitedTodos,
}) => {

  useEffect(() => {
    setComplitedTodos(complitedTodos)
    setOnGoingTodos(onGoingTodos)
    setBacklog(backLog)
  }, [backLog, complitedTodos, onGoingTodos, setBacklog, setComplitedTodos, setOnGoingTodos])

    
  // console.log(todoList);
  return (
    <div className="container">
      <Droppable droppableId="todosbacklog">
        {(provided,snapshot) => (
          <div
            className={`todos_backlog todos_block ${snapshot.isDraggingOver} ? 'dragged_backlog': ''`} 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_headings">Todo Backlog</span>
                      {
                         backLog.map((todo_, index) => (
              <SingleTodo
                index={index} 
                todo={todo_}
                key={todo_.id}
                backLog={backLog}
                             setBacklog={setBacklog}
                             onGoingTodos={onGoingTodos}
                             setOnGoingTodos={setOnGoingTodos}
                             complitedTodos={complitedTodos}
                             groupName={'backLogs'}
                             setComplitedTodos={setComplitedTodos}
              />
                         )
                         )}
                      {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="todosOngoing">
        {(provided,snapshot) => (
          <div
            className={`todos_ongoing todos_block ${snapshot.isDraggingOver} ? 'dragged_ongoing': ''`} 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_headings">Active Task</span>
            {onGoingTodos.map((todo_, index) => (
              <SingleTodo
              index={index} 
              todo={todo_}
              key={todo_.id}
              backLog={backLog}
                           setBacklog={setBacklog}
                           onGoingTodos={onGoingTodos}
                           setOnGoingTodos={setOnGoingTodos}
                complitedTodos={complitedTodos}
                groupName={'onGoingTodos'}
                setComplitedTodos={setComplitedTodos}
              />
            ))}
                        {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="todosComplete">
        {(provided,snapshot) => (
          <div
            className={`todos_completed todos_block ${snapshot.isDraggingOver} ? 'dragged_completed': ''`} 
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_headings">Completed Task</span>
            {complitedTodos.map((todo_, index) => (
              <SingleTodo
              index={index} 
              todo={todo_}
              key={todo_.id}
              backLog={backLog}
                           setBacklog={setBacklog}
                           onGoingTodos={onGoingTodos}
                           setOnGoingTodos={setOnGoingTodos}
                complitedTodos={complitedTodos}
                groupName={'complitedTodos'}
                setComplitedTodos={setComplitedTodos}
              />
            ))}
                        {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>

  );
};

export default TodoList;
