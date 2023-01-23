import React from 'react'
import { Progress, Todo } from './model'
import { Droppable } from 'react-beautiful-dnd';
import SingleTodo from './SingleTodo';


interface TodoListProps {
  todos: Todo[]
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void
}

export const TodoList = (
{todos, handleClick }: TodoListProps
) => {
  let progressArray = Object.values(Progress).filter(
    (progress) => progress !== Progress.DELETED
  )

  // const backlog = todos.filter(todo=> todo.progress == Progress.BACKLOG)
  // const started = todos.filter(todo=> todo.progress == Progress.STAETED)
  // const completed = todos.filter(todo=> todo.progress == Progress.DONE)
  // const deleted = todos.filter(todo=> todo.progress == Progress.DELETED)





  return (
    <div className="container">
      {progressArray.map(progress => (
        <Droppable droppableId={progress} type='PERSON'>
       
     
        {(provided, snapshot) => (
          <div
            className={`todos_backlog todos_block ${snapshot.isDraggingOver} ? 'dragged_backlog': ''`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
              <span className="todos_headings">
                {progress} ({
                  progressArray.filter(progres => progres === progress)
                })
              </span>
            {todos.map((todo_, index) => (
              <SingleTodo
                 index={index}
                todo={todo_}
                key={todo_.id}
                handleClick={handleClick}
                // setBacklog={setBacklog}
                // onGoingTodos={onGoingTodos}
                // setOnGoingTodos={setOnGoingTodos}
                // complitedTodos={complitedTodos}
                // groupName={"backLogs"}
                // setComplitedTodos={setComplitedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      ))} 

     
    </div>
  );
}







// return (
//   <div className="container">
//     <Droppable droppableId="todosbacklog">
//       {(provided, snapshot) => (
//         <div
//           className={`todos_backlog todos_block ${snapshot.isDraggingOver} ? 'dragged_backlog': ''`}
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//         >
//           <span className="todos_headings">Todo Backlog</span>
//           {backLog.map((todo_, index) => (
//             <SingleTodo
//               index={index}
//               todo={todo_}
//               key={todo_.id}
//               backLog={backLog}
//               setBacklog={setBacklog}
//               onGoingTodos={onGoingTodos}
//               setOnGoingTodos={setOnGoingTodos}
//               complitedTodos={complitedTodos}
//               groupName={"backLogs"}
//               setComplitedTodos={setComplitedTodos}
//             />
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//     <Droppable droppableId="todosOngoing">
//       {(provided, snapshot) => (
//         <div
//           className={`todos_ongoing todos_block ${snapshot.isDraggingOver} ? 'dragged_ongoing': ''`}
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//         >
//           <span className="todos_headings">Active Task</span>
//           {onGoingTodos.map((todo_, index) => (
//             <SingleTodo
//               index={index}
//               todo={todo_}
//               key={todo_.id}
//               backLog={backLog}
//               setBacklog={setBacklog}
//               onGoingTodos={onGoingTodos}
//               setOnGoingTodos={setOnGoingTodos}
//               complitedTodos={complitedTodos}
//               groupName={"onGoingTodos"}
//               setComplitedTodos={setComplitedTodos}
//             />
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>

//     <Droppable droppableId="todosComplete">
//       {(provided, snapshot) => (
//         <div
//           className={`todos_completed todos_block ${snapshot.isDraggingOver} ? 'dragged_completed': ''`}
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//         >
//           <span className="todos_headings">Completed Task</span>
//           {complitedTodos.map((todo_, index) => (
//             <SingleTodo
//               index={index}
//               todo={todo_}
//               key={todo_.id}
//               backLog={backLog}
//               setBacklog={setBacklog}
//               onGoingTodos={onGoingTodos}
//               setOnGoingTodos={setOnGoingTodos}
//               complitedTodos={complitedTodos}
//               groupName={"complitedTodos"}
//               setComplitedTodos={setComplitedTodos}
//             />
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   </div>
// );
