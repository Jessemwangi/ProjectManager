import React from "react";
import "./style.css";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todoList: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    onGoingTodos: Todo[],
    setOnGoingTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  complitedTodos: Todo[],
  setComplitedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<props> = ({ todoList, setTodos, complitedTodos,onGoingTodos,setOnGoingTodos }) => {
  console.log(todoList);
  return (
    <div className="container">
      <Droppable droppableId="todolist">
        {(provided) => (
          <div className="todos_active todos_block" ref={provided.innerRef}{...provided.droppableProps}>
            <span className="todos_headings">Todo Backlog</span>
            {todoList.map((todo_,index) => (
                <SingleTodo
                    index={index}
                todo={todo_}
                key={todo_.id}
                todos={todoList}
                setTodos={setTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
          <Droppable droppableId="TodoOngoing">
              {(provided) => (
                        <div className="todos_ongoing todos_block" ref={provided.innerRef}{...provided.droppableProps}>
                        <span className="todos_headings">Active Task</span>
                        {onGoingTodos.map((todo_,index) => (
                            <SingleTodo
                                index={index}
                            todo={todo_}
                            key={todo_.id}
                            todos={todoList}
                            setTodos={setTodos}
                          />
                        ))}
                      </div>
              )}
                </Droppable>

          <Droppable droppableId="TodoRemove">
              {(provided) => (
                        <div className="todos_complete todos_block" ref={provided.innerRef}{...provided.droppableProps}>
                        <span className="todos_headings">Completed Task</span>
                        {complitedTodos.map((todo_,index) => (
                            <SingleTodo
                                index={index}
                            todo={todo_}
                            key={todo_.id}
                            todos={todoList}
                            setTodos={setTodos}
                          />
                        ))}
                      </div>
              )}
              </Droppable>

    </div>
    //     <div className='todos'>

    //              {todoList.map(todo_ =>
    //         <SingleTodo todo={todo_}
    //         key={todo_.id} todos={todoList}
    //         setTodos={setTodos} />

    //   )}
    //     </div>
  );
};

export default TodoList;
